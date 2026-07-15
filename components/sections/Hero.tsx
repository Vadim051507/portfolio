"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Container from "@/components/ui/Container";
import MagneticButton from "@/components/site/MagneticButton";
import Counter from "@/components/site/Counter";

const HeroShowcase = dynamic(() => import("@/components/site/HeroShowcase"), {
    ssr: false,
});
const ParticleTrail = dynamic(() => import("@/components/ParticleTrail"), {
    ssr: false,
});

const HEADLINE: { w: string; grad?: boolean; br?: boolean }[] = [
    { w: "Сайти" },
    { w: "які" },
    { w: "продають", grad: true, br: true },
    { w: "ваш" },
    { w: "бізнес" },
];

const STATS = [
    { value: 0, suffix: "", label: "передоплата", accent: "#A855F7" },
    { value: 30, suffix: " днів", label: "підтримки безкоштовно", accent: "#6366F1" },
    { value: 100, suffix: "%", label: "проєктів з адмінкою", accent: "#22D3EE" },
];

export default function Hero() {
    const scrollTo = (href: string) =>
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

    return (
        <section
            id="hero"
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                paddingTop: "140px",
                paddingBottom: "90px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <style>{`
                .hero-grid {
                    display: grid;
                    grid-template-columns: 1.05fr 0.95fr;
                    gap: 56px;
                    align-items: center;
                }
                @media (max-width: 900px) {
                    .hero-grid { grid-template-columns: 1fr; gap: 64px; }
                    .hero-visual { order: -1; }
                    .hero-stats { justify-content: flex-start !important; }
                }
            `}</style>

            {/* Original hero S-curve trail (scoped to the hero) */}
            <ParticleTrail />

            <Container>
                <div className="hero-grid" style={{ position: "relative", zIndex: 2 }}>
                    {/* ── Text column ── */}
                    <div>
                        {/* Availability badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 9,
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid var(--border-strong)",
                                borderRadius: 100,
                                padding: "7px 16px",
                                marginBottom: 30,
                                backdropFilter: "blur(8px)",
                            }}
                        >
                            <span
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    background: "#22C55E",
                                    animation: "pulse-dot 2s infinite",
                                }}
                            />
                            <span style={{ fontSize: 13, color: "var(--text-2)" }}>
                                Доступний для нових проєктів
                            </span>
                        </motion.div>

                        {/* Kinetic headline */}
                        <h1
                            style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(42px, 6.4vw, 82px)",
                                fontWeight: 700,
                                lineHeight: 1.02,
                                letterSpacing: "-3px",
                                marginBottom: 26,
                                color: "var(--text)",
                            }}
                        >
                            {HEADLINE.map((word, i) => (
                                <React.Fragment key={i}>
                                    <span
                                        style={{
                                            display: "inline-block",
                                            overflow: "hidden",
                                            verticalAlign: "top",
                                            paddingBottom: "0.1em",
                                            marginBottom: "-0.1em",
                                        }}
                                    >
                                        <motion.span
                                            initial={{ y: "110%" }}
                                            animate={{ y: "0%" }}
                                            transition={{
                                                duration: 0.9,
                                                delay: 0.15 + i * 0.09,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            className={word.grad ? "gradient-text" : ""}
                                            style={{
                                                display: "inline-block",
                                                paddingRight: "0.22em",
                                            }}
                                        >
                                            {word.w}
                                        </motion.span>
                                    </span>
                                    {word.br && <br />}
                                </React.Fragment>
                            ))}
                        </h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.6 }}
                            style={{
                                fontSize: 18,
                                color: "var(--text-2)",
                                lineHeight: 1.7,
                                maxWidth: 490,
                                marginBottom: 36,
                            }}
                        >
                            Інтернет-магазини, корпоративні сайти та лендінги для
                            малого бізнесу в Україні. З адмінкою та підтримкою після
                            запуску.
                        </motion.p>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.75 }}
                            style={{
                                display: "flex",
                                gap: 16,
                                flexWrap: "wrap",
                                alignItems: "center",
                            }}
                        >
                            <MagneticButton onClick={() => scrollTo("#contact")}>
                                Обговорити проєкт →
                            </MagneticButton>
                            <MagneticButton
                                variant="ghost"
                                onClick={() => scrollTo("#portfolio")}
                            >
                                Подивитись роботи
                            </MagneticButton>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            className="hero-stats"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            style={{
                                display: "flex",
                                gap: 40,
                                marginTop: 52,
                                flexWrap: "wrap",
                            }}
                        >
                            {STATS.map((s) => (
                                <div key={s.label}>
                                    <div
                                        style={{
                                            fontFamily: "var(--font-display)",
                                            fontSize: 34,
                                            fontWeight: 700,
                                            color: s.accent,
                                            lineHeight: 1,
                                            marginBottom: 6,
                                        }}
                                    >
                                        <Counter value={s.value} suffix={s.suffix} />
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 13,
                                            color: "var(--text-3)",
                                            maxWidth: 130,
                                        }}
                                    >
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── Visual column ── */}
                    <motion.div
                        className="hero-visual"
                        initial={{ opacity: 0, scale: 0.94, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <HeroShowcase />
                    </motion.div>
                </div>
            </Container>

            {/* scroll hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                style={{
                    position: "absolute",
                    bottom: 28,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    color: "var(--text-3)",
                    fontSize: 11,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    fontFamily: "var(--font-display)",
                }}
            >
                Гортайте
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    style={{
                        width: 22,
                        height: 34,
                        borderRadius: 12,
                        border: "1px solid var(--border-strong)",
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: 6,
                    }}
                >
                    <span
                        style={{
                            width: 3,
                            height: 7,
                            borderRadius: 3,
                            background: "var(--violet)",
                        }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}