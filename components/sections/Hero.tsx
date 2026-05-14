"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Container from "@/components/ui/Container";
import { HERO_BROWSER_PROJECTS } from "@/lib/constants";

const ProjectsBrowser = dynamic(() => import("@/components/ProjectsBrowser"), { ssr: false });
const ParticleTrail   = dynamic(() => import("@/components/ParticleTrail"),    { ssr: false });

const GUARANTEES = [
    {
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
        ),
        gradient: "linear-gradient(135deg, rgba(107,63,240,0.12) 0%, rgba(0,102,255,0.08) 100%)",
        borderGradient: "linear-gradient(135deg, rgba(107,63,240,0.35), rgba(0,102,255,0.20))",
        iconBg: "linear-gradient(135deg, #6B3FF0, #4F46E5)",
        text: "Без передоплати — платите лише після того, як побачите результат",
    },
    {
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
        ),
        gradient: "linear-gradient(135deg, rgba(0,102,255,0.10) 0%, rgba(107,63,240,0.08) 100%)",
        borderGradient: "linear-gradient(135deg, rgba(0,102,255,0.30), rgba(107,63,240,0.20))",
        iconBg: "linear-gradient(135deg, #0066FF, #6B3FF0)",
        text: "На зв'язку щодня — ви завжди знаєте на якому етапі ваш сайт",
    },
    {
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
            </svg>
        ),
        gradient: "linear-gradient(135deg, rgba(107,63,240,0.10) 0%, rgba(0,180,180,0.07) 100%)",
        borderGradient: "linear-gradient(135deg, rgba(107,63,240,0.30), rgba(0,180,180,0.20))",
        iconBg: "linear-gradient(135deg, #4F46E5, #0066FF)",
        text: "Підтримка після запуску — не залишу наодинці з готовим сайтом",
    },
];


export default function Hero() {
    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            document.documentElement.style.setProperty("--glow-x", e.clientX + "px");
            document.documentElement.style.setProperty("--glow-y", e.clientY + "px");
        };
        window.addEventListener("mousemove", onMove, { passive: true });
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    const scrollTo = (href: string) => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="hero"
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                paddingTop: "120px",
                paddingBottom: "80px",
                position: "relative",
                background: "#F2F1F6",
                overflow: "hidden",
            }}
        >
            <style>{`
                .cursor-glow {
                    position: fixed;
                    width: 500px; height: 500px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(107,63,240,0.04) 0%, transparent 70%);
                    left: var(--glow-x, 50%);
                    top: var(--glow-y, 50%);
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    z-index: 0;
                    will-change: left, top;
                }
                .hero-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                    align-items: center;
                }
                .hero-visual {
                    position: relative;
                    width: 100%;
                }
                .hero-text {
                    position: relative;
                    z-index: 1;
                }
                .hero-guarantees {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-bottom: 40px;
                }
                .guarantee-wrap {
                    position: relative;
                    border-radius: 100px;
                    padding: 1px;
                }
                .guarantee-wrap::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: 100px;
                    padding: 1px;
                    background: var(--g-border);
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    transition: opacity 0.25s;
                    opacity: 0.7;
                }
                .guarantee-wrap:hover::before { opacity: 1; }
                .guarantee-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 11px 20px;
                    background: var(--g-bg);
                    border-radius: 100px;
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    transition: filter 0.25s;
                }
                .guarantee-wrap:hover .guarantee-item { filter: brightness(1.04); }
                .guarantee-icon {
                    width: 34px; height: 34px;
                    border-radius: 10px;
                    display: flex; align-items: center; justify-content: center;
                    flex-shrink: 0;
                    color: #fff;
                    box-shadow: 0 2px 8px rgba(107,63,240,0.30);
                }
                .guarantee-text {
                    font-size: 14px;
                    color: rgba(15,14,26,0.62);
                    line-height: 1.5;
                }
                .guarantee-text strong {
                    color: #0F0E1A;
                    font-weight: 650;
                }
                .btn-primary {
                    position: relative;
                    padding: 15px 36px;
                    background: linear-gradient(135deg, #7B3FF2, #0055FF);
                    color: #fff;
                    font-weight: 700;
                    font-size: 16px;
                    border-radius: 100px;
                    border: none;
                    cursor: pointer;
                    font-family: inherit;
                    letter-spacing: -0.2px;
                    transition: transform 0.18s, box-shadow 0.18s;
                    box-shadow:
                        0 0 0 0 rgba(123,63,242,0),
                        0 8px 32px rgba(107,63,240,0.45),
                        0 2px 8px rgba(0,85,255,0.30);
                }
                .btn-primary::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: 100px;
                    background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%);
                    pointer-events: none;
                }
                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow:
                        0 0 40px rgba(123,63,242,0.35),
                        0 12px 48px rgba(107,63,240,0.55),
                        0 4px 12px rgba(0,85,255,0.35);
                }
                .btn-primary:active { transform: translateY(0); }
                .btn-secondary {
                    position: relative;
                    padding: 15px 36px;
                    background: transparent;
                    color: #6B3FF0;
                    font-weight: 700;
                    font-size: 16px;
                    border-radius: 100px;
                    border: none;
                    cursor: pointer;
                    font-family: inherit;
                    letter-spacing: -0.2px;
                    background-image: linear-gradient(#F2F1F6, #F2F1F6),
                                      linear-gradient(135deg, #7B3FF2, #0055FF);
                    background-origin: border-box;
                    background-clip: padding-box, border-box;
                    border: 1.5px solid transparent;
                    transition: transform 0.18s, box-shadow 0.18s, color 0.18s;
                    box-shadow: 0 4px 16px rgba(107,63,240,0.12);
                }
                .btn-secondary:hover {
                    transform: translateY(-2px);
                    color: #5B2FD0;
                    box-shadow: 0 8px 28px rgba(107,63,240,0.22);
                }
                .btn-secondary:active { transform: translateY(0); }

                @media (max-width: 860px) {
                    .hero-grid {
                        grid-template-columns: 1fr;
                        gap: 50px;
                    }
                    .hero-visual { order: -1; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .hero-aurora { display: none; }
                }
            `}</style>

            {/* ── Particle trail (Three.js) ── */}
            <ParticleTrail />

            <div className="cursor-glow" />

            {/* Dot grid поверх аурори */}
            <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                pointerEvents: "none",
                zIndex: 0,
                maskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 100%)",
            }} />

            <Container>
                <div className="hero-grid" style={{ position: "relative", zIndex: 1 }}>

                    <motion.div
                        className="hero-text"
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        style={{ order: -1 }}
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            style={{
                                display: "inline-flex", alignItems: "center", gap: "8px",
                                background: "rgba(107,63,240,0.08)",
                                border: "0.5px solid rgba(107,63,240,0.25)",
                                borderRadius: "100px", padding: "5px 14px", marginBottom: "28px",
                            }}
                        >
                            <span style={{
                                width: "7px", height: "7px", borderRadius: "50%",
                                backgroundColor: "#22C55E", display: "inline-block",
                                boxShadow: "0 0 0 3px rgba(34,197,94,0.2)",
                            }} />
                            <span style={{ fontSize: "13px", color: "rgba(40,30,80,0.8)" }}>
                                Доступний для нових проєктів
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <h1 style={{
                            fontSize: "clamp(36px, 5vw, 68px)",
                            fontWeight: 700, color: "#0F0E1A",
                            letterSpacing: "-2.5px", lineHeight: 1.04, marginBottom: "20px",
                        }}>
                            Сайти які{" "}
                            <span style={{
                                background: "linear-gradient(90deg, #6B3FF0, #0066FF)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}>
                                продають
                            </span>
                            <br />
                            Ваш бізнес
                        </h1>

                        {/* Description */}
                        <p style={{
                            fontSize: "17px", color: "rgba(15,14,26,0.5)",
                            lineHeight: 1.7, marginBottom: "28px", maxWidth: "460px",
                        }}>
                            Інтернет-магазини, корпоративні сайти та лендінги
                            для малого бізнесу в Україні. З адмінкою та підтримкою після запуску.
                        </p>

                        {/* Guarantees */}
                        <motion.div
                            className="hero-guarantees"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
                        >
                            {GUARANTEES.map((g, i) => {
                                const dashIdx = g.text.indexOf(" — ");
                                const bold = g.text.slice(0, dashIdx);
                                const rest = g.text.slice(dashIdx);
                                return (
                                    <div
                                        key={i}
                                        className="guarantee-wrap"
                                        style={{ "--g-border": g.borderGradient, "--g-bg": g.gradient } as React.CSSProperties}
                                    >
                                        <div className="guarantee-item">
                                            <div className="guarantee-icon" style={{ background: g.iconBg }}>
                                                {g.icon}
                                            </div>
                                            <span className="guarantee-text">
                                                <strong>{bold}</strong>{rest}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>

                        {/* CTA */}
                        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
                            <button className="btn-primary" onClick={() => scrollTo("#contact")}>
                                Обговорити проєкт
                            </button>
                            <button className="btn-secondary" onClick={() => scrollTo("#portfolio")}>
                                Подивитись роботи
                            </button>
                        </div>
                    </motion.div>

                    {/* Browser mockup — НЕ використовуємо scale у motion.div */}
                    <motion.div
                        className="hero-visual"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                    >

                        <ProjectsBrowser projects={[...HERO_BROWSER_PROJECTS]} />
                    </motion.div>

                </div>
            </Container>
        </section>
    );
}