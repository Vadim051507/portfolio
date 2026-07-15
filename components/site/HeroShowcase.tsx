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

const PROJECTS = [...HERO_BROWSER_PROJECTS];
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
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    inset: "-12% -6%",
                    background:
                        "radial-gradient(circle at 50% 40%, rgba(139,92,246,0.35), rgba(34,211,238,0.14) 45%, transparent 70%)",
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
                    border: "1px solid rgba(255,255,255,0.14)",
                    background: "#0B0D18",
                    boxShadow:
                        "0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
            >
                {/* browser bar */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        padding: "13px 16px",
                        borderBottom: "1px solid rgba(255,255,255,0.07)",
                        background: "rgba(255,255,255,0.02)",
                    }}
                >
                    {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                        <span
                            key={c}
                            style={{
                                width: 11,
                                height: 11,
                                borderRadius: "50%",
                                background: c,
                                opacity: 0.9,
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
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            display: "flex",
                            alignItems: "center",
                            padding: "0 12px",
                            fontSize: 11,
                            color: "var(--text-3)",
                            fontFamily: "var(--font-body)",
                            overflow: "hidden",
                        }}
                    >
                        <span style={{ color: "#22D3EE", marginRight: 6 }}>🔒</span>
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
                                "linear-gradient(180deg, transparent 60%, rgba(5,6,12,0.35))",
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
                                    color: "#fff",
                                    textShadow: "0 2px 10px rgba(0,0,0,0.6)",
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
                                                ? "linear-gradient(90deg,#A855F7,#22D3EE)"
                                                : "rgba(255,255,255,0.35)",
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
