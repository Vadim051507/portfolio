"use client";

import { useEffect, useRef, useState } from "react";
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

/**
 * First-visit-per-session splash: logo pops in centered, shrinks into a
 * left-aligned mark, "Kindratyak.dev" types out beside it, then the whole
 * thing fades to reveal the site. Runs once per sessionStorage flag; the
 * blocking script in app/layout.tsx's <head> + `.intro-seen` in
 * globals.css hide this before first paint on repeat visits within the
 * same session. Append `?intro=1` to force a replay while designing.
 */
export default function IntroAnimation() {
    const [shouldRender, setShouldRender] = useState(false);
    const [shrink, setShrink] = useState(false);
    const [typedCount, setTypedCount] = useState(0);
    const [typing, setTyping] = useState(false);
    const [exiting, setExiting] = useState(false);
    const [gone, setGone] = useState(false);
    const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

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

        setShouldRender(true);
        document.body.style.overflow = "hidden";

        const after = (fn: () => void, ms: number) => {
            timers.current.push(setTimeout(fn, ms));
        };

        after(() => setShrink(true), TYPE_START_MS);

        after(() => {
            setTyping(true);
            let i = 0;
            const interval = setInterval(() => {
                i += 1;
                setTypedCount(i);
                if (i >= TEXT.length) {
                    clearInterval(interval);
                    setTyping(false);
                }
            }, CHAR_DELAY);
            timers.current.push(interval);
        }, TYPE_START_MS);

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

    if (gone || !shouldRender) return null;

    const typedText = TEXT.slice(0, typedCount);
    const groupActive = typing || typedCount > 0;

    return (
        <motion.div
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
            <div className="kd-intro-group" data-active={groupActive}>
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
                {groupActive && (
                    <span className="kd-intro-text">
                        {typedText}
                        <span className="kd-intro-caret" data-blink={typing} />
                    </span>
                )}
            </div>
        </motion.div>
    );
}
