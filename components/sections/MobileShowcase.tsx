"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    MotionConfig,
    motion,
    useAnimationControls,
    useInView,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import Container from "@/components/ui/Container";
import Reveal from "@/components/site/Reveal";
import AnimatedHeading from "@/components/site/AnimatedHeading";
import phoneFrame from "@/public/phone/iphone-frame.png";

/**
 * Geometry of the supplied iPhone render (public/phone/iphone-frame.png).
 * The screen of that PNG is a fully transparent cut-out, so anything placed
 * BEHIND the image shows through it — that is what the screen slot below
 * relies on. Numbers are percentages of the frame box, measured from the
 * asset's own alpha channel, so the slot lines up pixel-exactly at any size.
 */
const SCREEN = { left: 5.263, top: 2.381, width: 89.035, height: 95.238 };

/** Scroll window (in section progress) the four pillars are spread across. */
const LIST_FROM = 0.3;
const LIST_TO = 0.96;

const EASE = [0.16, 1, 0.3, 1] as const;

const PILLARS = [
    {
        num: "01",
        title: "Швидкість",
        text: "Легкий код і сучасний стек: сторінка встигає відкритись, поки палець ще тягнеться до кнопки «назад».",
        color: "#A855F7",
    },
    {
        num: "02",
        title: "Результат",
        text: "Кнопка, форма й оффер — у зоні великого пальця. Дизайн заточений під заявки, а не під «просто красиво».",
        color: "#6366F1",
    },
    {
        num: "03",
        title: "Адмінка",
        text: "Тексти, фото й ціни змінюєте самі — з ноутбука або з того ж телефона, без розробника.",
        color: "#3B82F6",
    },
    {
        num: "04",
        title: "Підтримка",
        text: "Не зникаю після здачі: лишаюсь на зв'язку, оновлюю й підстраховую далі.",
        color: "#22D3EE",
    },
];

/**
 * Environment flags for the scroll-linked choreography.
 *
 * Both default to `false` so the server render and the first client render
 * agree (no hydration mismatch); the real values land one effect later.
 * The *visual* fallbacks for reduced motion are handled by CSS in the same
 * component, so nothing flashes in the gap.
 */
function useStageEnv() {
    const [env, setEnv] = useState({ wide: false, reduce: false });

    useEffect(() => {
        const wideMq = window.matchMedia("(min-width: 1024px)");
        const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const sync = () =>
            setEnv({ wide: wideMq.matches, reduce: reduceMq.matches });

        sync();
        wideMq.addEventListener("change", sync);
        reduceMq.addEventListener("change", sync);
        return () => {
            wideMq.removeEventListener("change", sync);
            reduceMq.removeEventListener("change", sync);
        };
    }, []);

    return env;
}

export default function MobileShowcase() {
    const track = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
    /** Vertical centre of every row, relative to the list box. */
    const rowCentres = useRef<number[]>([]);

    const stageRef = useRef<HTMLDivElement>(null);

    const [active, setActive] = useState(0);
    const { wide, reduce } = useStageEnv();
    /** Scroll-linked choreography runs on wide screens only, motion allowing. */
    const linked = wide && !reduce;

    /* Unpinned mode (mobile / reduced motion) reveals on view instead. These
       drive `animate` rather than `whileInView` on purpose: the mode is only
       known after hydration, and swapping between `whileInView` and `animate`
       props mid-life would strand whatever `initial` set at mount. */
    const stageSeen = useInView(stageRef, { once: true, margin: "-12% 0px" });
    const listSeen = useInView(listRef, { once: true, margin: "-10% 0px" });

    // Progress through this section's own pin…
    const { scrollYProgress } = useScroll({
        target: track,
        offset: ["start start", "end end"],
    });
    // …and through the whole page, for the slow band parallax.
    const { scrollYProgress: pageProgress } = useScroll();

    const eased = useSpring(scrollYProgress, {
        stiffness: 90,
        damping: 26,
        restDelta: 0.001,
    });

    /* Phone: flies in tilted, settles flat, then keeps a lazy counter-drift.
       Every one of these is derived from `eased` (a spring) rather than
       straight off scrollYProgress — a pure scroll→property chain is eligible
       for Motion's native ScrollTimeline hand-off, whose range does not agree
       with this pinned section, and the animated element drifts out of sync
       (it cost the phone its opacity once already). */
    const rotateY = useTransform(eased, [0, 0.34, 1], [26, 0, -7]);
    const rotateX = useTransform(eased, [0, 0.34, 1], [13, 0, 2]);
    const phoneY = useTransform(eased, [0, 0.34], [90, 0]);
    const phoneScale = useTransform(eased, [0, 0.34], [0.9, 1]);
    const phoneOpacity = useTransform(eased, [0, 0.14], [0, 1]);

    // Diagonal band: slow page-wide parallax on the outer layer…
    const bandX = useSpring(useTransform(pageProgress, [0, 1], [-46, 46]), {
        stiffness: 40,
        damping: 22,
    });
    const bandRotate = useSpring(useTransform(pageProgress, [0, 1], [-21, -13]), {
        stiffness: 40,
        damping: 22,
    });
    // …and an imperative kick on the inner one whenever the pillar changes.
    const band = useAnimationControls();

    // Measure row centres so the band can snap to whichever row is live.
    const measure = useCallback(() => {
        const list = listRef.current;
        if (!list) return;
        const top = list.getBoundingClientRect().top;
        rowCentres.current = rowRefs.current.map((row) =>
            row ? row.getBoundingClientRect().top - top + row.offsetHeight / 2 : 0
        );
    }, []);

    useEffect(() => {
        measure();
        const ro = new ResizeObserver(measure);
        if (listRef.current) ro.observe(listRef.current);
        window.addEventListener("resize", measure);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [measure]);

    // Split the pin's progress into four equal slices → one active pillar each.
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (!linked) return;
        const t = (v - LIST_FROM) / (LIST_TO - LIST_FROM);
        const i = Math.min(
            PILLARS.length - 1,
            Math.max(0, Math.floor(t * PILLARS.length))
        );
        setActive((prev) => (prev === i ? prev : i));
    });

    // Band follows the active row and shudders on arrival.
    useEffect(() => {
        // fresh numbers rather than the cached ones: fonts, wrapping and the
        // vh-driven type scale can all have moved the rows since mount
        measure();
        const centres = rowCentres.current;
        const target = linked
            ? centres[active] ?? 0
            : // unpinned: park it across the middle of the list
              (centres[0] + centres[centres.length - 1]) / 2 || 0;

        if (!linked) {
            band.start({ y: target, x: 0, rotate: 0, transition: { duration: 0.4 } });
            return;
        }

        band.start({
            y: target,
            x: [0, 26, -9, 0],
            rotate: [0, 1.8, -1.2, 0],
            scaleY: [1, 1.16, 0.97, 1],
            transition: {
                y: { type: "spring", stiffness: 130, damping: 17, mass: 0.7 },
                x: { duration: 0.75, ease: EASE, times: [0, 0.24, 0.55, 1] },
                rotate: { duration: 0.8, ease: EASE, times: [0, 0.22, 0.5, 1] },
                scaleY: { duration: 0.7, ease: EASE, times: [0, 0.2, 0.5, 1] },
            },
        });
    }, [active, linked, band, measure]);

    const accent = PILLARS[linked ? active : 0].color;

    return (
        <MotionConfig reducedMotion="user">
            <section id="about" className="ms-section">
                <style>{styles}</style>

                <div ref={track} className="ms-track">
                    <div className="ms-pin">
                        <Container>
                            <div className="ms-grid">
                                {/* ── LEFT: the phone ─────────────────────────── */}
                                <div className="ms-stage-wrap">
                                    {/* Two nested layers on purpose: the outer one
                                        owns the unpinned on-view reveal (`animate`),
                                        the inner one owns the scroll-linked 3D
                                        (`style` motion values). Driving one element
                                        with both would let a left-over WAAPI
                                        animation outrank the motion values. */}
                                    <motion.div
                                        ref={stageRef}
                                        className="ms-stage"
                                        initial={false}
                                        animate={
                                            linked
                                                ? { opacity: 1, y: 0 }
                                                : {
                                                      opacity: stageSeen ? 1 : 0,
                                                      y: stageSeen ? 0 : 40,
                                                  }
                                        }
                                        transition={{ duration: 0.9, ease: EASE }}
                                    >
                                    <motion.div
                                        className="ms-stage-3d"
                                        style={
                                            linked
                                                ? {
                                                      rotateX,
                                                      rotateY,
                                                      y: phoneY,
                                                      scale: phoneScale,
                                                      opacity: phoneOpacity,
                                                  }
                                                : undefined
                                        }
                                    >
                                        {/* halo, tinted by whichever pillar is live */}
                                        <motion.div
                                            aria-hidden
                                            className="ms-halo"
                                            animate={{
                                                background: `radial-gradient(closest-side, ${accent}55, ${accent}12 55%, transparent 78%)`,
                                            }}
                                            transition={{ duration: 0.8, ease: EASE }}
                                        />

                                        <div className="ms-phone">
                                            {/* ── SCREEN SLOT ───────────────────────
                                    Sits BEHIND the frame PNG and is clipped to
                                    its transparent cut-out. To drop the real
                                    demo in later, swap the placeholder children
                                    for e.g.

                                      <video src="/phone/demo.mp4" autoPlay muted
                                             loop playsInline
                                             style={{width:"100%",height:"100%",
                                                     objectFit:"cover"}} />

                                    or an <iframe style={{width:"100%",
                                    height:"100%",border:0}} />. Radius and
                                    overflow already live on the slot — nothing
                                    else needs to change. */}
                                            <div className="ms-screen">
                                                <motion.div
                                                    aria-hidden
                                                    className="ms-screen-glow"
                                                    animate={{
                                                        background: `radial-gradient(120% 60% at 50% 8%, ${accent}4D, transparent 70%)`,
                                                    }}
                                                    transition={{
                                                        duration: 0.8,
                                                        ease: EASE,
                                                    }}
                                                />
                                                <div
                                                    aria-hidden
                                                    className="ms-sweep"
                                                />
                                                <div className="ms-screen-label">
                                                    <span className="ms-dot" />
                                                    демо · скоро
                                                </div>
                                            </div>

                                            <Image
                                                className="ms-frame"
                                                src={phoneFrame}
                                                alt=""
                                                aria-hidden
                                                sizes="(max-width: 1023px) 62vw, 320px"
                                            />

                                            <div aria-hidden className="ms-glare" />
                                        </div>
                                    </motion.div>
                                    </motion.div>

                                    <div aria-hidden className="ms-reflection" />
                                </div>

                                {/* ── RIGHT: the copy ─────────────────────────── */}
                                <div className="ms-copy">
                                    <Reveal style={{ marginBottom: 18 }}>
                                        <span className="eyebrow">Про мене</span>
                                    </Reveal>

                                    <Reveal delay={0.05} style={{ marginBottom: 18 }}>
                                        <p className="ms-accent-line">
                                            Ваш сайт спершу відкривають{" "}
                                            <span className="gradient-text">
                                                з телефона
                                            </span>{" "}
                                            — і саме там вирішують, лишатися чи
                                            піти. Тому адаптив у мене не «опція
                                            наприкінці», а точка відліку.
                                        </p>
                                    </Reveal>

                                    <AnimatedHeading
                                        segments={[
                                            { text: "Роблю сайти, які" },
                                            {
                                                text: "працюють на бізнес,",
                                                gradient: true,
                                            },
                                            { text: "а не просто існують" },
                                        ]}
                                        className="ms-heading"
                                    />

                                    <Reveal delay={0.15} style={{ marginTop: 18 }}>
                                        <p className="ms-lede">
                                            Fullstack-розробник для малого бізнесу:
                                            дизайн, розробка, адмінка й підтримка —
                                            від першої ідеї до запуску.
                                        </p>
                                    </Reveal>

                                    <div className="ms-list-wrap">
                                        {/* diagonal accent band, behind the list */}
                                        <motion.div
                                            aria-hidden
                                            className="ms-band-outer"
                                            style={{ x: bandX, rotate: bandRotate }}
                                        >
                                            <motion.div
                                                className="ms-band"
                                                animate={band}
                                                initial={false}
                                            />
                                        </motion.div>

                                        <ul ref={listRef} className="ms-list">
                                            {PILLARS.map((p, i) => {
                                                const on = !linked || i === active;
                                                return (
                                                    <motion.li
                                                        key={p.title}
                                                        ref={(el) => {
                                                            rowRefs.current[i] = el;
                                                        }}
                                                        className="ms-row"
                                                        initial={false}
                                                        animate={
                                                            linked
                                                                ? {
                                                                      opacity: on
                                                                          ? 1
                                                                          : 0.36,
                                                                      y: 0,
                                                                  }
                                                                : {
                                                                      opacity: listSeen
                                                                          ? 1
                                                                          : 0,
                                                                      y: listSeen
                                                                          ? 0
                                                                          : 22,
                                                                  }
                                                        }
                                                        transition={
                                                            linked
                                                                ? {
                                                                      duration: 0.5,
                                                                      ease: EASE,
                                                                  }
                                                                : {
                                                                      duration: 0.7,
                                                                      delay: i * 0.09,
                                                                      ease: EASE,
                                                                  }
                                                        }
                                                    >
                                                        <motion.span
                                                            aria-hidden
                                                            className="ms-bar"
                                                            animate={{
                                                                scaleY: on ? 1 : 0.2,
                                                                background: on
                                                                    ? p.color
                                                                    : "rgba(255,255,255,0.22)",
                                                                boxShadow: on
                                                                    ? `0 0 18px ${p.color}`
                                                                    : "0 0 0px rgba(0,0,0,0)",
                                                            }}
                                                            transition={{
                                                                duration: 0.55,
                                                                ease: EASE,
                                                            }}
                                                        />

                                                        <div className="ms-row-body">
                                                            <motion.span
                                                                className="ms-num"
                                                                animate={{
                                                                    color: on
                                                                        ? p.color
                                                                        : "rgba(233,235,255,0.4)",
                                                                }}
                                                                transition={{
                                                                    duration: 0.5,
                                                                    ease: EASE,
                                                                }}
                                                            >
                                                                {p.num}
                                                            </motion.span>

                                                            <motion.h3
                                                                className="ms-title"
                                                                animate={{
                                                                    scale: on ? 1 : 0.9,
                                                                    textShadow: on
                                                                        ? `0 0 36px ${p.color}66`
                                                                        : "0 0 0px rgba(0,0,0,0)",
                                                                }}
                                                                transition={{
                                                                    duration: 0.55,
                                                                    ease: EASE,
                                                                }}
                                                            >
                                                                {p.title}
                                                            </motion.h3>

                                                            <motion.p
                                                                className="ms-desc"
                                                                animate={{
                                                                    opacity: on ? 1 : 0,
                                                                }}
                                                                transition={{
                                                                    duration: 0.45,
                                                                    ease: EASE,
                                                                }}
                                                            >
                                                                {p.text}
                                                            </motion.p>
                                                        </div>
                                                    </motion.li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            </section>
        </MotionConfig>
    );
}

const styles = `
.ms-section { position: relative; }

/* Mobile / narrow: plain document flow, no pin. */
.ms-track { position: relative; }
.ms-pin { padding: 96px 0; }

.ms-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;
    align-items: center;
}

/* ── Phone ─────────────────────────────────────────────── */
.ms-stage-wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}
/* perspective lives here so that .ms-stage-3d, its direct child, is the
   element the rotateX/rotateY actually foreshortens */
.ms-stage {
    position: relative;
    perspective: 1400px;
    perspective-origin: 50% 45%;
    will-change: transform, opacity;
}
.ms-stage-3d {
    position: relative;
    transform-style: preserve-3d;
    will-change: transform, opacity;
}
.ms-halo {
    position: absolute;
    inset: -22% -34%;
    z-index: 0;
    filter: blur(26px);
    pointer-events: none;
}
.ms-phone {
    --phone-w: min(62vw, 260px);
    position: relative;
    z-index: 1;
    width: var(--phone-w);
    filter: drop-shadow(0 40px 60px rgba(0, 0, 0, 0.55));
}
.ms-frame {
    position: relative;
    z-index: 2;
    display: block;
    width: 100%;
    height: auto;
    pointer-events: none;
}
/* The slot the future <video>/<iframe> drops into — clipped to the frame's
   transparent screen cut-out, which the PNG then overlaps on all sides. */
.ms-screen {
    position: absolute;
    left: ${SCREEN.left}%;
    top: ${SCREEN.top}%;
    width: ${SCREEN.width}%;
    height: ${SCREEN.height}%;
    z-index: 1;
    overflow: hidden;
    border-radius: calc(var(--phone-w) * 0.09);
    background:
        linear-gradient(168deg, #0A0B16 0%, #12142C 48%, #080A16 100%);
    display: grid;
    place-items: center;
}
.ms-screen > * { max-width: 100%; }
.ms-screen-glow { position: absolute; inset: 0; }
.ms-sweep {
    position: absolute;
    inset: -40% -60%;
    background: linear-gradient(
        104deg,
        transparent 38%,
        rgba(255, 255, 255, 0.055) 48%,
        rgba(255, 255, 255, 0.11) 51%,
        transparent 62%
    );
    animation: ms-sweep 5.5s var(--ease-out) infinite;
}
@keyframes ms-sweep {
    0%, 100% { transform: translate3d(-38%, 0, 0); }
    55%      { transform: translate3d(38%, 0, 0); }
}
.ms-screen-label {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-display);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(233, 235, 255, 0.34);
}
.ms-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #22C55E;
    animation: pulse-dot 2.4s ease-in-out infinite;
}
/* Glass glare — stays above whatever ends up in the slot. */
.ms-glare {
    position: absolute;
    left: ${SCREEN.left}%;
    top: ${SCREEN.top}%;
    width: ${SCREEN.width}%;
    height: ${SCREEN.height}%;
    z-index: 3;
    border-radius: calc(var(--phone-w) * 0.09);
    background: linear-gradient(
        118deg,
        rgba(255, 255, 255, 0.10) 0%,
        rgba(255, 255, 255, 0.02) 26%,
        transparent 46%
    );
    pointer-events: none;
}
.ms-reflection {
    width: min(62vw, 230px);
    height: 46px;
    margin-top: 10px;
    border-radius: 50%;
    background: radial-gradient(closest-side, rgba(139, 92, 246, 0.22), transparent 72%);
    filter: blur(10px);
}

/* ── Copy ──────────────────────────────────────────────── */
.ms-copy { position: relative; }
.ms-accent-line {
    font-size: clamp(14px, 1.1vw, 16px);
    line-height: 1.65;
    color: var(--text-2);
    max-width: 560px;
}
.ms-heading {
    font-size: clamp(27px, 3.6vw, 44px);
    font-weight: 700;
    letter-spacing: -1.4px;
    line-height: 1.1;
    color: var(--text);
}
.ms-lede {
    font-size: clamp(15px, 1.15vw, 17px);
    line-height: 1.7;
    color: var(--text-2);
    max-width: 560px;
}

/* ── Pillars ───────────────────────────────────────────── */
.ms-list-wrap { position: relative; margin-top: 40px; }
.ms-band-outer {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
}
.ms-band {
    position: absolute;
    top: 0;
    left: -8%;
    width: 116%;
    height: 88px;
    margin-top: -44px;
    border-radius: 999px;
    background: linear-gradient(
        90deg,
        rgba(168, 85, 247, 0) 0%,
        rgba(168, 85, 247, 0.85) 18%,
        rgba(99, 102, 241, 0.85) 52%,
        rgba(34, 211, 238, 0.55) 82%,
        rgba(34, 211, 238, 0) 100%
    );
    opacity: 0.26;
    filter: blur(17px);
}
/* crisp core line, so the band reads as a stripe and not just a haze */
.ms-band::after {
    content: "";
    position: absolute;
    left: 12%;
    right: 12%;
    top: 50%;
    height: 2px;
    margin-top: -1px;
    border-radius: 2px;
    background: linear-gradient(90deg, transparent, #C084FC, #22D3EE, transparent);
    opacity: 0.5;
}
.ms-list {
    position: relative;
    z-index: 1;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: clamp(14px, 2vh, 26px);
}
.ms-row {
    display: flex;
    gap: 18px;
    align-items: stretch;
    will-change: opacity, transform;
}
.ms-bar {
    flex: 0 0 2px;
    width: 2px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.22);
    transform-origin: center;
}
.ms-row-body { min-width: 0; }
.ms-num {
    display: block;
    font-family: var(--font-display);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 3px;
    line-height: 1;
    margin-bottom: 7px;
}
.ms-title {
    font-family: var(--font-display);
    font-size: clamp(26px, 3.1vw, 40px);
    font-weight: 700;
    letter-spacing: -1px;
    line-height: 1.05;
    color: var(--text);
    transform-origin: left center;
}
.ms-desc {
    margin-top: 7px;
    font-size: clamp(13.5px, 1vw, 15px);
    line-height: 1.6;
    color: var(--text-2);
    max-width: 460px;
}

/* ── Wide screens: two columns + the pinned scroll stage ──
   Everything in the pinned view is sized against vh as well as vw: the
   whole column has to survive a 700px-tall laptop viewport without
   spilling out of the pin. */
@media (min-width: 1024px) {
    .ms-track { height: 340vh; }
    .ms-pin {
        position: sticky;
        top: 0;
        height: 100vh;
        display: flex;
        align-items: center;
        padding: 84px 0 40px;
        overflow: hidden;
    }
    .ms-grid {
        width: 100%;
        grid-template-columns: minmax(240px, 34%) 1fr;
        gap: clamp(32px, 4vw, 76px);
    }
    .ms-phone { --phone-w: min(280px, 34vh); }
    .ms-reflection { width: min(220px, 26vh); height: 34px; }
    .ms-accent-line {
        font-size: clamp(13px, 1.7vh, 15.5px);
        line-height: 1.55;
        max-width: 520px;
    }
    .ms-heading {
        font-size: clamp(24px, 3.6vh, 38px);
        letter-spacing: -1.1px;
    }
    .ms-lede {
        font-size: clamp(13.5px, 1.75vh, 16px);
        line-height: 1.6;
        max-width: 520px;
    }
    .ms-list { gap: clamp(8px, 1.4vh, 22px); }
    .ms-title { font-size: clamp(24px, 4.4vh, 42px); }
    .ms-desc {
        margin-top: 4px;
        font-size: clamp(12.5px, 1.6vh, 14.5px);
        line-height: 1.5;
    }
    .ms-list-wrap { margin-top: clamp(14px, 3vh, 40px); }
}

/* Short laptop viewports: the pinned column has no room for the lede as
   well — the accent line and the heading already carry the pitch. */
@media (min-width: 1024px) and (max-height: 800px) {
    .ms-lede { display: none; }
    .ms-pin { padding: 76px 0 32px; }
}

/* ── Reduced motion: static final state, no pin, no 3D ──
   These win over Framer's inline styles (hence !important) so the
   fallback is correct on the very first paint, before hydration. */
@media (prefers-reduced-motion: reduce) {
    .ms-track { height: auto !important; }
    .ms-pin {
        position: static !important;
        height: auto !important;
        padding: 96px 0 !important;
        overflow: visible !important;
    }
    .ms-stage,
    .ms-stage-3d,
    .ms-row {
        opacity: 1 !important;
        transform: none !important;
    }
    .ms-desc { opacity: 1 !important; }
    .ms-bar { transform: none !important; }
    .ms-sweep, .ms-dot { animation: none !important; }
    .ms-band-outer, .ms-band { transform: none !important; }
    .ms-band { top: 50%; }
}
`;
