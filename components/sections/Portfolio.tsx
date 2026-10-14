"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/site/Reveal";
import Counter from "@/components/site/Counter";
import MagneticButton from "@/components/site/MagneticButton";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import { HERO_BROWSER_PROJECTS } from "@/lib/constants";
import { screenOf } from "@/lib/gallery";

// Which projects have a live detail page.
const LIVE: ReadonlySet<string> = new Set(["tokarchuk-dental", "bavovnastore"]);

// The facts under the work are counted from the data above, never typed
// in, so they stay true when a project is added.
const FACTS = [
    { value: HERO_BROWSER_PROJECTS.length, label: "проєкти в портфоліо" },
    { value: LIVE.size, label: "кейси з детальним розбором" },
    {
        value: new Set(HERO_BROWSER_PROJECTS.flatMap((p) => p.tags)).size,
        label: "технологій у роботі",
    },
];

// The 3D ring replaces the card grid from 1024px up. Which of the two is
// visible is decided in CSS (no layout jump on hydration); this query only
// decides whether the ring's code is fetched at all.
const RING_QUERY = "(min-width: 1024px)";

const PortfolioRing = dynamic(() => import("@/components/sections/PortfolioRing"), {
    ssr: false,
});

/** True once the slot is near the viewport on a ring-sized screen. */
function useRingMount(slot: React.RefObject<HTMLDivElement | null>) {
    const [mount, setMount] = useState(false);

    useEffect(() => {
        const el = slot.current;
        if (!el) return;
        const query = window.matchMedia(RING_QUERY);
        let io: IntersectionObserver | null = null;

        const sync = () => {
            io?.disconnect();
            io = null;
            if (!query.matches) {
                setMount(false);
                return;
            }
            io = new IntersectionObserver(
                ([entry]) => {
                    if (!entry.isIntersecting) return;
                    setMount(true);
                    io?.disconnect();
                },
                { rootMargin: "600px 0px" }
            );
            io.observe(el);
        };

        sync();
        query.addEventListener("change", sync);
        return () => {
            query.removeEventListener("change", sync);
            io?.disconnect();
        };
    }, [slot]);

    return mount;
}

export default function Portfolio() {
    const router = useRouter();
    const { scrollTo } = useSmoothScroll();
    const ringSlot = useRef<HTMLDivElement>(null);
    const ringMounted = useRingMount(ringSlot);

    return (
        <section id="portfolio" style={{ padding: "130px 0", position: "relative" }}>
            <style>{`
                .pf-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
                    gap: 24px;
                }
                .pf-card[data-live="true"]:hover .pf-img { transform: scale(1.06); }
                .pf-card[data-live="false"] .pf-img { opacity: 0.92; }
                /* Sits on the screenshot, so it is dark glass on any theme. */
                .pf-domain {
                    position: absolute;
                    top: 14px;
                    left: 14px;
                    padding: 5px 11px;
                    font-family: var(--font-mono);
                    font-size: 11px;
                    color: var(--white);
                    background: rgba(7, 12, 11, 0.62);
                    border: 1px solid rgba(244, 255, 251, 0.24);
                    border-radius: 100px;
                    -webkit-backdrop-filter: blur(10px) saturate(1.4);
                    backdrop-filter: blur(10px) saturate(1.4);
                }
                .pf-soon {
                    position: absolute;
                    top: 14px;
                    right: 14px;
                    padding: 5px 11px;
                    font-family: var(--font-mono);
                    font-size: 11px;
                    font-weight: 500;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: var(--text-on-accent);
                    background: var(--accent);
                    border-radius: 100px;
                }
                .pf-arrow {
                    display: grid;
                    place-items: center;
                    flex-shrink: 0;
                    width: 32px;
                    height: 32px;
                    margin-top: -3px;
                    border-radius: 50%;
                    border: 1px solid var(--border-strong);
                    color: var(--text);
                    transition: background-color 0.22s, border-color 0.22s, color 0.22s;
                }
                .pf-card:hover .pf-arrow,
                .pf-card:focus-visible .pf-arrow {
                    background: var(--accent);
                    border-color: var(--accent);
                    color: var(--text-on-accent);
                }
                @media (max-width: 720px) { .pf-grid { grid-template-columns: 1fr; } }

                /* ── 3D ring (PortfolioRing.tsx), 1024px and up ── */
                .pf-ring-slot { display: none; }
                @media (min-width: 1024px) {
                    .pf-grid { display: none; }
                    /* Height is reserved before the ring's code arrives:
                       ring 470 + gap 24 + panel 182. */
                    .pf-ring-slot { display: block; min-height: 676px; }
                }
                /* The ring breaks out of the 1200px container to the
                   sheet's width: its size is set by width, so the extra
                   width is what makes the front card large. */
                .pf-ring {
                    position: relative;
                    height: 470px;
                    margin-inline: calc((100% - min(100vw - 96px, 1640px)) / 2);
                }
                /* Overrides for the third-party carousel, kept out of its
                   own CSS: the site's focus ring instead of the grey inset
                   shadow, and a soft edge so cards dissolve into the sheet. */
                .pf-ring .circular-carousel { border-radius: 20px; }
                /* on the inner view, not the root: a mask on the root would
                   also erase its focus outline */
                .pf-ring .circular-carousel__view {
                    -webkit-mask-image: linear-gradient(to right, transparent, #000 9%, #000 91%, transparent);
                    mask-image: linear-gradient(to right, transparent, #000 9%, #000 91%, transparent);
                }
                .pf-ring .circular-carousel:focus-visible {
                    box-shadow: none;
                    outline: 2px solid var(--accent-text);
                    outline-offset: 2px;
                }
                .pf-info {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 40px;
                    min-height: 182px;
                    margin-top: 24px;
                    padding-top: 28px;
                    border-top: 1px solid var(--border);
                }
                .pf-info-text, .pf-info-actions { animation: pf-info-in 0.45s var(--ease-out) both; }
                @keyframes pf-info-in {
                    from { opacity: 0; transform: translateY(8px); }
                    to   { opacity: 1; transform: none; }
                }
                .pf-info-meta { display: flex; flex-wrap: wrap; gap: 6px 18px; margin-bottom: 12px; }
                .pf-info-count { color: var(--accent-text); }
                .pf-info-title {
                    font-size: 28px;
                    font-weight: 600;
                    letter-spacing: -0.5px;
                    color: var(--text);
                    margin-bottom: 8px;
                }
                .pf-info-desc {
                    font-size: 15.5px;
                    line-height: 1.6;
                    color: var(--text-muted);
                    max-width: 560px;
                    margin-bottom: 16px;
                }
                .pf-info-tags { display: flex; flex-wrap: wrap; gap: 8px; }
                .pf-info-actions { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
                .pf-info-actions .btn-face { padding: 14px 26px; }
                .pf-info-soon { position: static; padding: 9px 18px; font-size: 12px; }
                /* ── Facts + CTA, every width ── */
                .pf-facts {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr)) minmax(0, 2.1fr);
                    gap: 16px;
                    margin-top: 72px;
                }
                .pf-fact {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    gap: 18px;
                    height: 100%;
                    padding: 22px 24px;
                }
                .pf-fact-num {
                    display: block;
                    font-family: var(--font-display);
                    font-size: 44px;
                    font-weight: 600;
                    letter-spacing: -1.5px;
                    line-height: 1;
                    color: var(--text);
                }
                .pf-fact-label { font-size: 14px; color: var(--text-muted); line-height: 1.45; }
                .pf-cta {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    height: 100%;
                    padding: 24px 26px;
                    border-radius: 20px;
                    background: var(--accent);
                    color: var(--text-on-accent);
                }
                /* On mint the sheet's dark primary button stays dark on
                   hover too: its usual mint hover would vanish here. */
                .pf-cta .btn-primary:hover { color: var(--bg); }
                .pf-cta .btn-primary:hover .btn-face { background: var(--text); }
                .pf-cta-title { font-size: 20px; font-weight: 600; letter-spacing: -0.3px; line-height: 1.25; }
                .pf-cta-sub { margin-top: 6px; font-size: 14px; opacity: 0.75; }
                @media (max-width: 1024px) {
                    .pf-facts { grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 48px; }
                    .pf-facts > :last-child { grid-column: 1 / -1; }
                }
                @media (max-width: 560px) {
                    .pf-facts { grid-template-columns: 1fr 1fr; }
                    .pf-fact { padding: 20px; }
                    .pf-fact-num { font-size: 36px; }
                    .pf-cta { flex-direction: column; align-items: flex-start; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .pf-info-text, .pf-info-actions { animation: none; }
                }
            `}</style>

            <Container>
                <SectionTitle
                    index="03"
                    eyebrow="Портфоліо"
                    title="Обрані роботи"
                    accentWord="роботи"
                    subtitle="Кожен проєкт — від дизайну до запуску. Наведіть, щоб роздивитись."
                />

                <div className="pf-grid">
                    {HERO_BROWSER_PROJECTS.map((p, i) => {
                        const live = LIVE.has(p.slug);
                        return (
                            <Reveal key={p.slug} delay={i * 0.1} y={44}>
                                <div
                                    className={`pf-card card card-clip${live ? " card-hover" : ""}`}
                                    data-live={live}
                                    onClick={() => live && router.push(p.href)}
                                    {...(live
                                        ? {
                                              role: "link",
                                              tabIndex: 0,
                                              onKeyDown: (e: React.KeyboardEvent) => {
                                                  if (e.key === "Enter") router.push(p.href);
                                              },
                                          }
                                        : {})}
                                    style={{
                                        cursor: live ? "pointer" : "default",
                                        height: "100%",
                                    }}
                                >
                                    {/* image */}
                                    <div
                                        style={{
                                            position: "relative",
                                            aspectRatio: "16 / 10",
                                            overflow: "hidden",
                                            borderBottom: "1px solid var(--border)",
                                        }}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            className="pf-img"
                                            src={screenOf(p.slug)}
                                            alt={p.title}
                                            loading="lazy"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                objectPosition: "top",
                                                display: "block",
                                                transition:
                                                    "transform 0.7s var(--ease-out)",
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                background: `linear-gradient(180deg, transparent 40%, rgba(7,12,11,0.6))`,
                                            }}
                                        />
                                        {/* domain chip */}
                                        <span className="pf-domain">{p.domain}</span>
                                        {!live && <span className="pf-soon">Скоро</span>}
                                    </div>

                                    {/* body */}
                                    <div style={{ padding: 26 }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "flex-start",
                                                gap: 12,
                                                marginBottom: 10,
                                            }}
                                        >
                                            <h3
                                                style={{
                                                    fontSize: 20,
                                                    fontWeight: 600,
                                                    color: "var(--text)",
                                                    letterSpacing: "-0.3px",
                                                }}
                                            >
                                                {p.title}
                                            </h3>
                                            {live && (
                                                <span className="pf-arrow">
                                                    {/* drawn, not typed: the ↗
                                                        character falls back to a
                                                        colour emoji on some systems */}
                                                    <svg
                                                        aria-hidden
                                                        width="15"
                                                        height="15"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M7 17 17 7M8 7h9v9" />
                                                    </svg>
                                                </span>
                                            )}
                                        </div>
                                        <p
                                            style={{
                                                fontSize: 14.5,
                                                color: "var(--text-muted)",
                                                lineHeight: 1.6,
                                                marginBottom: 18,
                                            }}
                                        >
                                            {p.description}
                                        </p>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 8,
                                            }}
                                        >
                                            {p.tags.map((t) => (
                                                <span key={t} className="tag">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>

                <div className="pf-ring-slot" ref={ringSlot}>
                    {ringMounted && <PortfolioRing live={LIVE} />}
                </div>

                <div className="pf-facts">
                    {FACTS.map((f, i) => (
                        <Reveal key={f.label} delay={i * 0.08}>
                            <div className="card pf-fact">
                                <span className="pf-fact-num">
                                    <Counter value={f.value} prefix={f.value < 10 ? "0" : ""} />
                                </span>
                                <span className="pf-fact-label">{f.label}</span>
                            </div>
                        </Reveal>
                    ))}
                    <Reveal delay={FACTS.length * 0.08}>
                        <div className="pf-cta">
                            <div>
                                <p className="pf-cta-title">Ваш проєкт може бути наступним</p>
                                <p className="pf-cta-sub">Розкажіть про задачу — відповім протягом дня.</p>
                            </div>
                            <MagneticButton onClick={() => scrollTo("#contact")}>
                                Обговорити
                            </MagneticButton>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}