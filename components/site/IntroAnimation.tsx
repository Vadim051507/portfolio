"use client";

import { memo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { COLORS } from "@/lib/colors";

// WebGL (ogl) — client only, in its own lazy chunk. The intro is short and
// its clock does not wait for the discharge, so the chunk and the silhouette
// are requested as soon as this module evaluates — but only when the intro
// is going to play: `intro-seen` is set before first paint by the blocking
// script in app/layout.tsx on repeat visits and under reduced motion.
//
// A plain import() kept in state, not next/dynamic: dynamic() resolves
// through Suspense, and React retried that boundary only after the rest of
// the page had hydrated — the canvas showed up ~450ms into the intro
// instead of ~50ms. The effect is the same (never rendered on the server).
const ELECTRIC_SRC = "/logo-electric.svg";
const loadElectric = () => import("@/components/react-bits/ElectricLogo");
type ElectricLogoComponent = Awaited<ReturnType<typeof loadElectric>>["default"];
if (
    typeof window !== "undefined" &&
    !document.documentElement.classList.contains("intro-seen")
) {
    void loadElectric();
    const img = new Image();
    img.crossOrigin = "anonymous"; // same mode ElectricLogo requests it in
    img.src = ELECTRIC_SRC;
}

const TEXT = "kutsev";
const STORAGE_KEY = "intro-shown";

/* Timeline (ms). Two variants share one choreography; they differ only in
   how long the big centred logo is held before it shrinks.

   Electric (WebGL2 available):
   0-600      logo fades + scales in, centred; the discharge ignites over
              ~650ms along the tile and its three bars
   ~650-1250  full arc
   1250-1500  discharge fades out (canvas opacity), then unmounts
   1500-2050  logo shrinks + group re-centres (discharge is already gone)
   1500-1710  "kutsev" types out next to the logo
   2390-2790  whole intro fades out, revealing the site

   Static fallback (no WebGL2, or ?intro=1 under reduced motion): the same
   without the discharge and with the original short hold — shrink at 900,
   fade 1790-2190.

   A click or Esc skips straight to the final fade.                       */
const PHASE1_DURATION = 0.6;
const PAUSE_DURATION = 0.3;
const PHASE2_DURATION = 0.55;
const CHAR_DELAY = 35;
const EXIT_DELAY = 400;
const EXIT_DURATION = 0.4;

const ELECTRIC_FADE_START_MS = 1250;
const ELECTRIC_FADE_DURATION = 0.25;

const STATIC_SHRINK_MS = (PHASE1_DURATION + PAUSE_DURATION) * 1000;
const ELECTRIC_SHRINK_MS = ELECTRIC_FADE_START_MS + ELECTRIC_FADE_DURATION * 1000;
const TYPE_DURATION_MS = TEXT.length * CHAR_DELAY;
const EXIT_AFTER_SHRINK_MS = TYPE_DURATION_MS + EXIT_DELAY;

// The logo's layout box is its final 52px/44px size; while centred it is
// shown 6.75x larger through a transform, so nothing but opacity/transform
// ever animates (no layout shift). 6.75 puts the mint tile at ~312px —
// exactly where ElectricLogo draws its outline: the canvas box is 480px
// (406px on phones, --kd-electric-box in globals.css) and scale 0.65 fits
// the tile into 0.65 of it. The tile is 320/360 of the SVG, hence
// 480 * 0.65 / (52 * 320 / 360) = 6.75. Change one, change the others.
const BIG_SCALE = 6.75;
const ELECTRIC_SCALE = 0.65;

// Bright core of the discharge: a light mint, between --white and --accent.
// Not a design token — it only exists inside the shader.
const SPARK_CORE = "#D7FFF0";

const EASE_IN = [0.16, 1, 0.3, 1] as const;
const EASE_MOVE = [0.65, 0, 0.35, 1] as const;

// Extra px added on top of the real, JS-measured visualViewport height —
// covers the gap between a resize/scroll event firing and the browser
// finishing its address-bar collapse/expand animation, so the overlay
// stays taller than the screen even mid-transition.
const VVH_BUFFER_PX = 400;

/**
 * Typewriter reveal, isolated in its own memoized component so its ~35ms
 * setInterval ticks (14 re-renders) never re-render the parent — and thus
 * never touch the logo/glow/overlay motion elements animating alongside it.
 * `start` is a one-way trigger: flips false→true once, when the logo shrinks.
 */
const TypewriterText = memo(function TypewriterText({
                                                        text,
                                                        charDelay,
                                                        start,
                                                    }: {
    text: string;
    charDelay: number;
    start: boolean;
}) {
    const [typedCount, setTypedCount] = useState(0);
    const [typing, setTyping] = useState(false);

    useEffect(() => {
        if (!start) return;
        setTyping(true);
        let i = 0;
        const interval = setInterval(() => {
            i += 1;
            setTypedCount(i);
            if (i >= text.length) {
                clearInterval(interval);
                setTyping(false);
            }
        }, charDelay);
        return () => clearInterval(interval);
    }, [start, text, charDelay]);

    if (typedCount === 0 && !typing) return null;

    return (
        <span className="kd-intro-text">
            {text.slice(0, typedCount)}
            <span className="kd-intro-caret" data-blink={typing} />
        </span>
    );
});

const hasWebGL2 = () => {
    try {
        const gl = document.createElement("canvas").getContext("webgl2");
        if (!gl) return false;
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        return true;
    } catch {
        return false;
    }
};

/**
 * First-visit-per-session splash: the logo pops in large and centred with
 * an electric discharge running along its outline (React Bits ElectricLogo),
 * the discharge dies down, the logo shrinks into a left-aligned mark,
 * "kutsev" types out beside it, then the whole thing fades to
 * reveal the site.
 *
 * The real logo is a plain <img> under the canvas — ElectricLogo only draws
 * the discharge, tracing public/logo-electric.svg. So the overlay with the
 * logo is in the server-rendered HTML and the very first paint, and the
 * intro never waits for WebGL: without it the same intro plays static.
 *
 * Renders unconditionally (gated only by `gone`, which starts false) —
 * no gap where the site underneath could flash through while waiting on a
 * post-mount effect. Runs once per sessionStorage flag; the blocking script
 * in app/layout.tsx's <head> + `.intro-seen` in globals.css hide it before
 * first paint on repeat visits within the same session (or reduced-motion).
 * Append `?intro=1` to force a replay while designing.
 */
export default function IntroAnimation() {
    const [shrink, setShrink] = useState(false);
    const [exiting, setExiting] = useState(false);
    const [gone, setGone] = useState(false);
    // "on" mounts the canvas, "fading" dims it, "off" unmounts it (which is
    // what destroys the WebGL context — see ElectricLogo's effect cleanup).
    const [electric, setElectric] = useState<"off" | "on" | "fading">("off");
    const [ElectricLogo, setElectricLogo] = useState<ElectricLogoComponent | null>(null);
    const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);
    const overlayRef = useRef<HTMLDivElement>(null);
    const skipRef = useRef<() => void>(() => {});

    // Primary defense against the iOS Safari toolbar gap: no CSS viewport
    // unit (vh/dvh/svh/lvh) is trusted here at all — during the address-bar
    // collapse/expand animation, all of them can be a frame out of sync
    // with the real on-screen size. Instead we read the actual pixel
    // height from the visualViewport API (which reports real geometry, not
    // a CSS-resolved unit) and push it onto --vvh with a buffer; the CSS
    // below uses it as `min-height`, with a fixed-px overscan as the
    // fallback for the first paint before this effect has run once.
    useEffect(() => {
        if (!("visualViewport" in window) || !window.visualViewport) return;
        const vv = window.visualViewport;
        const syncHeight = () => {
            overlayRef.current?.style.setProperty(
                "--vvh",
                `${Math.ceil(vv.height) + VVH_BUFFER_PX}px`
            );
        };
        syncHeight();
        vv.addEventListener("resize", syncHeight);
        vv.addEventListener("scroll", syncHeight);
        return () => {
            vv.removeEventListener("resize", syncHeight);
            vv.removeEventListener("scroll", syncHeight);
        };
    }, []);

    useEffect(() => {
        const forced = new URLSearchParams(window.location.search).has(
            "intro"
        );

        let seen = false;
        try {
            seen = !!sessionStorage.getItem(STORAGE_KEY);
        } catch {
            /* private mode etc — treat as unseen */
        }

        const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const markShown = () => {
            try {
                sessionStorage.setItem(STORAGE_KEY, "1");
            } catch {
                /* ignore */
            }
        };

        if ((seen || reduced) && !forced) {
            markShown();
            setGone(true);
            return;
        }

        document.body.style.overflow = "hidden";

        const after = (fn: () => void, ms: number) => {
            timers.current.push(setTimeout(fn, ms));
        };
        const clear = () => {
            timers.current.forEach((t) => clearTimeout(t));
            timers.current = [];
        };
        const finish = () => {
            setGone(true);
            document.body.style.overflow = "";
            markShown();
        };

        const withElectric = !reduced && hasWebGL2();
        const shrinkAt = withElectric ? ELECTRIC_SHRINK_MS : STATIC_SHRINK_MS;
        const exitAt = shrinkAt + EXIT_AFTER_SHRINK_MS;

        let alive = true;
        if (withElectric) {
            void loadElectric().then((m) => {
                if (alive) setElectricLogo(() => m.default);
            });
            setElectric("on");
            after(() => setElectric("fading"), ELECTRIC_FADE_START_MS);
        }
        after(() => {
            setElectric("off");
            setShrink(true);
        }, shrinkAt);
        after(() => setExiting(true), exitAt);
        after(finish, exitAt + EXIT_DURATION * 1000);

        // Click or Esc: drop whatever is left and go to the final fade.
        let skipped = false;
        const skip = () => {
            if (skipped) return;
            skipped = true;
            clear();
            setElectric("off");
            setExiting(true);
            after(finish, EXIT_DURATION * 1000);
        };
        skipRef.current = skip;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") skip();
        };
        window.addEventListener("keydown", onKey);

        return () => {
            alive = false;
            clear();
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, []);

    if (gone) return null;

    return (
        <motion.div
            ref={overlayRef}
            className="kd-intro-overlay"
            aria-hidden
            animate={{ opacity: exiting ? 0 : 1 }}
            transition={{ duration: EXIT_DURATION, ease: "easeInOut" }}
            style={{ pointerEvents: exiting ? "none" : "auto" }}
            onClick={() => skipRef.current()}
        >
            <motion.div
                className="kd-intro-glow"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: exiting ? 0 : 1,
                    scale: shrink ? 0.62 : 1,
                }}
                transition={
                    shrink
                        ? { duration: PHASE2_DURATION, ease: EASE_MOVE }
                        : { duration: PHASE1_DURATION, ease: EASE_IN }
                }
                style={{ x: "-50%", y: "-50%" }}
            />
            <div className="kd-intro-group">
                <motion.img
                    src="/logo.svg"
                    alt="kutsev"
                    className="kd-intro-logo"
                    initial={{ opacity: 0, scale: BIG_SCALE * 0.9 }}
                    animate={{ opacity: 1, scale: shrink ? 1 : BIG_SCALE }}
                    transition={
                        shrink
                            ? { duration: PHASE2_DURATION, ease: EASE_MOVE }
                            : { duration: PHASE1_DURATION, ease: EASE_IN }
                    }
                />
                <TypewriterText
                    text={TEXT}
                    charDelay={CHAR_DELAY}
                    start={shrink}
                />
            </div>
            {/* Discharge over the big centred logo. Scales in with the logo
                (same 0.9 → 1 and easing) so the outline stays on its edge. */}
            {electric !== "off" && ElectricLogo && (
                <motion.div
                    className="kd-intro-electric"
                    initial={{ opacity: 1, scale: 0.9 }}
                    animate={{ opacity: electric === "fading" ? 0 : 1, scale: 1 }}
                    transition={{
                        opacity: { duration: ELECTRIC_FADE_DURATION, ease: "easeOut" },
                        scale: { duration: PHASE1_DURATION, ease: EASE_IN },
                    }}
                    style={{ x: "-50%", y: "-50%" }}
                >
                    <ElectricLogo
                        src={ELECTRIC_SRC}
                        color={SPARK_CORE}
                        glowColor={COLORS.accent}
                        scale={ELECTRIC_SCALE}
                        strands={4}
                        bend={0.6}
                        crackle={1.5}
                        arcs={1}
                        speed={2.5}
                        interactive
                        glow={0.6}
                    />
                </motion.div>
            )}
        </motion.div>
    );
}
