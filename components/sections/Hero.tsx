"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Container from "@/components/ui/Container";

const SphereCanvas = dynamic(() => import("@/components/SphereCanvas"), { ssr: false });

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
                overflow: "hidden",
                background: "#F2F1F6",
            }}
        >
            <style>{`
                .cursor-glow {
                    position: fixed;
                    width: 500px; height: 500px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(107,63,240,0.06) 0%, transparent 70%);
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
                .hero-sphere {
                    position: relative;
                    height: 560px;
                    overflow: hidden;
                }
                .hero-text {
                    position: relative;
                    z-index: 1;
                }
                @media (max-width: 900px) {
                    .hero-sphere {
                        height: 400px;
                    }
                }
                @media (max-width: 640px) {
                    .hero-grid {
                        grid-template-columns: 1fr;
                    }
                    .hero-sphere {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 100vw;
                        height: 100vw;
                        opacity: 0.2;
                        z-index: 0;
                        overflow: hidden;
                        pointer-events: none;
                    }
                }
            `}</style>

            <div className="cursor-glow" />

            <div style={{
                position: "absolute", width: "700px", height: "700px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(107,63,240,0.12) 0%, transparent 65%)",
                top: "-200px", left: "-150px", pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0,100,255,0.08) 0%, transparent 65%)",
                top: "100px", right: "-100px", pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "radial-gradient(rgba(0,0,0,0.07) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                pointerEvents: "none",
                maskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 100%)",
            }} />

            <Container>
                <div className="hero-grid" style={{ position: "relative", zIndex: 1 }}>

                    {/* Text */}
                    <motion.div
                        className="hero-text"
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        style={{ order: -1 }}
                    >
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            background: "rgba(107,63,240,0.08)",
                            border: "0.5px solid rgba(107,63,240,0.25)",
                            borderRadius: "100px", padding: "5px 14px", marginBottom: "32px",
                        }}>
                            <span style={{
                                width: "7px", height: "7px", borderRadius: "50%",
                                backgroundColor: "#22C55E", display: "inline-block",
                            }} />
                            <span style={{ fontSize: "13px", color: "rgba(40,30,80,0.8)" }}>
                                Доступний для нових проєктів
                            </span>
                        </div>

                        <h1 style={{
                            fontSize: "clamp(36px, 5vw, 68px)",
                            fontWeight: 700, color: "#0F0E1A",
                            letterSpacing: "-2.5px", lineHeight: 1.04, marginBottom: "24px",
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
                            ваш бізнес
                        </h1>

                        <p style={{
                            fontSize: "17px", color: "rgba(15,14,26,0.5)",
                            lineHeight: 1.7, marginBottom: "40px", maxWidth: "460px",
                        }}>
                            Інтернет-магазини, корпоративні сайти та лендінги
                            для малого бізнесу в Україні. З адмінкою та підтримкою після запуску.
                        </p>

                        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                            <button
                                onClick={() => scrollTo("#contact")}
                                style={{
                                    padding: "14px 32px",
                                    background: "linear-gradient(135deg, #6B3FF0, #0066FF)",
                                    color: "#ffffff", fontWeight: 600, fontSize: "16px",
                                    borderRadius: "8px", border: "none", cursor: "pointer",
                                    fontFamily: "inherit", transition: "opacity 0.2s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                            >
                                Обговорити проєкт
                            </button>
                            <button
                                onClick={() => scrollTo("#portfolio")}
                                style={{
                                    padding: "14px 32px",
                                    background: "rgba(0,0,0,0.04)",
                                    color: "rgba(15,14,26,0.8)", fontWeight: 600, fontSize: "16px",
                                    borderRadius: "8px", border: "0.5px solid rgba(0,0,0,0.12)",
                                    cursor: "pointer", fontFamily: "inherit", transition: "background 0.2s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.08)")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.04)")}
                            >
                                Подивитись роботи
                            </button>
                        </div>
                    </motion.div>

                    {/* Sphere */}
                    <motion.div
                        className="hero-sphere"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    >
                        <SphereCanvas />
                    </motion.div>

                </div>
            </Container>
        </section>
    );
}