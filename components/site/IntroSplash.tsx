"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TEXT = "KINDRATYAK.DEV";
const STORAGE_KEY = "kd-intro-seen";

/**
 * First-visit gate: solid black screen with the wordmark fading up
 * letter-by-letter, then a soft fade into the real page. Rendered
 * server-side so the black cover is already in the initial HTML —
 * no flash of the site underneath before hydration.
 *
 * Runs once ever per browser (localStorage flag). The blocking script in
 * app/layout.tsx's <head> + `.intro-seen` in globals.css hide this before
 * first paint on every later visit, so reloads and crawlers never pay for
 * it. Append `?intro=1` to the URL to force a replay while designing.
 */
export default function IntroSplash() {
    const [mounted, setMounted] = useState(false);
    const [exiting, setExiting] = useState(false);
    const [gone, setGone] = useState(false);
    const [skip, setSkip] = useState(false);

    useEffect(() => {
        const force = new URLSearchParams(window.location.search).has(
            "intro"
        );
        let seen = false;
        try {
            seen = !!localStorage.getItem(STORAGE_KEY);
        } catch {
            /* private mode etc — treat as unseen */
        }
        if (seen && !force) {
            setSkip(true);
            return;
        }
        try {
            localStorage.setItem(STORAGE_KEY, "1");
        } catch {
            /* ignore */
        }

        const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        document.documentElement.style.overflow = "hidden";
        setMounted(true);

        const holdMs = reduced ? 250 : 1900;
        const exitMs = reduced ? 250 : 700;
        const exitTimer = setTimeout(() => setExiting(true), holdMs);
        const removeTimer = setTimeout(() => {
            setGone(true);
            document.documentElement.style.overflow = "";
        }, holdMs + exitMs);

        return () => {
            clearTimeout(exitTimer);
            clearTimeout(removeTimer);
            document.documentElement.style.overflow = "";
        };
    }, []);

    if (skip || gone) return null;

    return (
        <div
            className="intro-splash"
            aria-hidden
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 10000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#05060C",
                opacity: exiting ? 0 : 1,
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1)",
                pointerEvents: exiting ? "none" : "auto",
            }}
        >
            <div style={{ display: "flex" }}>
                {TEXT.split("").map((ch, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                        animate={
                            mounted
                                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                                : {}
                        }
                        transition={{
                            duration: 0.55,
                            delay: 0.1 + i * 0.045,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(26px, 5.5vw, 52px)",
                            fontWeight: 600,
                            letterSpacing: "0.06em",
                            display: "inline-block",
                            whiteSpace: "pre",
                            background:
                                "linear-gradient(115deg, #A855F7, #6366F1, #22D3EE)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            color: "transparent",
                        }}
                    >
                        {ch}
                    </motion.span>
                ))}
            </div>
        </div>
    );
}
