"use client";

import { useEffect, useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { HERO_BROWSER_PROJECTS } from "@/lib/constants";

// Hero shows only launched work; the full list stays in the Portfolio.
const LIVE_SLUGS: readonly string[] = ["tokarchuk-dental", "bavovnastore"];
const PROJECTS = HERO_BROWSER_PROJECTS.filter((p) => LIVE_SLUGS.includes(p.slug));
const INTERVAL = 3600;

/**
 * Auto-rotating browser carousel that tilts toward the pointer (3D parallax).
 * Cross-fades through the project screenshots and syncs the address-bar domain.
 */
export default function HeroShowcase() {
    const wrap = useRef<HTMLDivElement>(null);
    const [i, setI] = useState(0);
    const [paused, setPaused] = useState(false);

    // advance the carousel
    useEffect(() => {
        if (paused) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const id = setInterval(
            () => setI((p) => (p + 1) % PROJECTS.length),
            INTERVAL
        );
        return () => clearInterval(id);
    }, [paused]);

    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rx = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), {
        stiffness: 120,
        damping: 18,
    });
    const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), {
        stiffness: 120,
        damping: 18,
    });

    const onMove = (e: React.MouseEvent) => {
        if (window.matchMedia("(pointer: coarse)").matches) return;
        const r = wrap.current!.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => {
        mx.set(0);
        my.set(0);
        setPaused(false);
    };

    const active = PROJECTS[i];

    return (
        <div
            ref={wrap}
            onMouseMove={onMove}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={onLeave}
            style={{ perspective: "1200px", position: "relative", width: "100%" }}
        >
            {/* The hero's one glow: a soft mint wash behind the mock. */}
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    inset: "-12% -6%",
                    background:
                        "radial-gradient(circle at 50% 40%, rgba(33,241,168,0.16), rgba(0,121,107,0.10) 45%, transparent 70%)",
                    filter: "blur(30px)",
                    zIndex: 0,
                }}
            />

            <motion.div
                style={{
                    rotateX: rx,
                    rotateY: ry,
                    transformStyle: "preserve-3d",
                    position: "relative",
                    zIndex: 1,
                    borderRadius: "18px",
                    overflow: "hidden",
                    border: "1px solid var(--border-strong)",
                    background: "var(--surface)",
                    boxShadow: "0 40px 120px rgba(4,18,13,0.7)",
                }}
            >
                {/* browser bar */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        padding: "13px 16px",
                        borderBottom: "1px solid var(--border)",
                        background: "var(--surface-2)",
                    }}
                >
                    {[0, 1, 2].map((k) => (
                        <span
                            key={k}
                            style={{
                                width: 9,
                                height: 9,
                                borderRadius: "50%",
                                background: "var(--border-strong)",
                            }}
                        />
                    ))}
                    <div
                        style={{
                            marginLeft: 14,
                            flex: 1,
                            maxWidth: 340,
                            height: 24,
                            borderRadius: 7,
                            background: "var(--bg)",
                            border: "1px solid var(--border)",
                            display: "flex",
                            alignItems: "center",
                            padding: "0 10px",
                            fontSize: 11,
                            color: "var(--text-muted)",
                            fontFamily: "var(--font-mono)",
                            overflow: "hidden",
                        }}
                    >
                        <svg
                            aria-hidden
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--accent)"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            style={{ marginRight: 7, flexShrink: 0 }}
                        >
                            <rect x="4" y="11" width="16" height="10" rx="2" />
                            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                        </svg>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={active.domain}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.3 }}
                                style={{ whiteSpace: "nowrap" }}
                            >
                                {active.domain}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>

                {/* screenshot cross-fade */}
                <div style={{ position: "relative", aspectRatio: "16 / 10.5" }}>
                    <AnimatePresence>
                        <motion.img
                            key={active.image}
                            src={active.image}
                            alt={active.title}
                            initial={{ opacity: 0, scale: 1.04 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "top",
                                display: "block",
                            }}
                        />
                    </AnimatePresence>
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(180deg, transparent 55%, rgba(7,12,11,0.6))",
                            pointerEvents: "none",
                        }}
                    />

                    {/* caption + dots */}
                    <div
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            padding: "16px 18px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            gap: 12,
                        }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={active.title}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.35 }}
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: 15,
                                    fontWeight: 600,
                                    color: "var(--text)",
                                    textShadow: "0 2px 10px rgba(4,18,13,0.8)",
                                }}
                            >
                                {active.title}
                            </motion.span>
                        </AnimatePresence>

                        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                            {PROJECTS.map((_, k) => (
                                <button
                                    key={k}
                                    onClick={() => setI(k)}
                                    aria-label={`Проєкт ${k + 1}`}
                                    style={{
                                        width: k === i ? 22 : 7,
                                        height: 7,
                                        borderRadius: 100,
                                        border: "none",
                                        cursor: "pointer",
                                        padding: 0,
                                        background:
                                            k === i
                                                ? "var(--accent)"
                                                : "rgba(244,255,251,0.4)",
                                        transition: "width 0.35s var(--ease-out)",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
