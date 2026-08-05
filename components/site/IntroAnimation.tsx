"use client";

import { memo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import logoSrc from "@/app/logo/logo(1).svg";

const TEXT = "Kindratyak.dev";
const STORAGE_KEY = "intro-shown";

/* Timeline (ms) — see task spec for the 4-phase breakdown:
   0-600      phase 1: logo fades + scales in, centered
   600-900    phase 2 pause: hold, letting the eye register the mark
   900-1450   phase 2 transition: logo shrinks + group re-centers
   900-~1390  phase 3 (overlaps): "Kindratyak.dev" types out next to the logo
   ~1790-2190 phase 4: whole intro fades out, revealing the site          */
const PHASE1_DURATION = 0.6;
const PAUSE_DURATION = 0.3;
const PHASE2_DURATION = 0.55;
const CHAR_DELAY = 35;
const EXIT_DELAY = 400;
const EXIT_DURATION = 0.4;

const TYPE_START_MS = (PHASE1_DURATION + PAUSE_DURATION) * 1000;
const TYPE_DURATION_MS = TEXT.length * CHAR_DELAY;
const EXIT_START_MS = TYPE_START_MS + TYPE_DURATION_MS + EXIT_DELAY;

// Logo displays at ~150px/125px during phase 1, then shrinks to its
// natural 52px/44px box — expressed as a transform scale so nothing but
// opacity/transform ever animates (no layout shift).
const BIG_SCALE = 2.85;

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
 * `start` is a one-way trigger: flips false→true once, at TYPE_START_MS.
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

/**
 * First-visit-per-session splash: logo pops in centered, shrinks into a
 * left-aligned mark, "Kindratyak.dev" types out beside it, then the whole
 * thing fades to reveal the site.
 *
 * Renders unconditionally (gated only by `gone`, which starts false) so the
 * overlay is part of the server-rendered HTML and the very first paint —
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
    const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);
    const overlayRef = useRef<HTMLDivElement>(null);

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

        after(() => setShrink(true), TYPE_START_MS);
        after(() => setExiting(true), EXIT_START_MS);
        after(() => {
            setGone(true);
            document.body.style.overflow = "";
            markShown();
        }, EXIT_START_MS + EXIT_DURATION * 1000);

        return () => {
            timers.current.forEach((t) => clearTimeout(t));
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
                    src={logoSrc.src}
                    alt="Kindratyak.dev"
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
        </motion.div>
    );
}