"use client";

import { useRef } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";

/**
 * Floating browser mock that tilts toward the pointer (3D parallax),
 * with orbiting glass chips. Uses the primary project screenshot.
 */
export default function HeroShowcase() {
    const wrap = useRef<HTMLDivElement>(null);

    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
        stiffness: 120,
        damping: 18,
    });
    const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), {
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
    };

    return (
        <div
            ref={wrap}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ perspective: "1200px", position: "relative", width: "100%" }}
        >
            {/* glow halo behind */}
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
                            maxWidth: 320,
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
                        }}
                    >
                        <span style={{ color: "#22D3EE", marginRight: 4 }}>🔒</span>
                        tokarchuk-dental.com.ua
                    </div>
                </div>

                {/* screenshot */}
                <div style={{ position: "relative", aspectRatio: "16 / 10.5" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/projects/tokarchuk-dental.png"
                        alt="Tokarchuk Dental — сайт стоматологічної клініки"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "top",
                            display: "block",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(180deg, transparent 60%, rgba(5,6,12,0.35))",
                        }}
                    />
                </div>
            </motion.div>

            {/* floating chip — top left */}
            <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: "absolute",
                    top: "8%",
                    left: "-7%",
                    zIndex: 2,
                    padding: "12px 16px",
                    borderRadius: 14,
                    background: "rgba(11,13,24,0.72)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                <span
                    style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        display: "grid",
                        placeItems: "center",
                        background: "linear-gradient(135deg,#A855F7,#22D3EE)",
                        fontSize: 16,
                    }}
                >
                    ⚡
                </span>
                <div style={{ lineHeight: 1.25 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>
                        0.9s
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-3)" }}>
                        швидкість
                    </div>
                </div>
            </motion.div>

            {/* floating chip — bottom right */}
            <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.6,
                }}
                style={{
                    position: "absolute",
                    bottom: "6%",
                    right: "-6%",
                    zIndex: 2,
                    padding: "12px 16px",
                    borderRadius: 14,
                    background: "rgba(11,13,24,0.72)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                <span
                    style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        display: "grid",
                        placeItems: "center",
                        background: "linear-gradient(135deg,#6366F1,#A855F7)",
                        fontSize: 16,
                    }}
                >
                    📈
                </span>
                <div style={{ lineHeight: 1.25 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>
                        +48%
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-3)" }}>
                        конверсія
                    </div>
                </div>
            </motion.div>
        </div>
    );
}