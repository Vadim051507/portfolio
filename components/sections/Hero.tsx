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
            }}
        >
            <style>{`
        .cursor-glow {
          position: fixed;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(107,63,240,0.07) 0%, transparent 70%);
          left: var(--glow-x, 50%);
          top: var(--glow-y, 50%);
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 0;
          will-change: left, top;
        }
      `}</style>

            <div className="cursor-glow" />

            {/* Glow 1 */}
            <div style={{
                position: "absolute", width: "700px", height: "700px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(107,63,240,0.25) 0%, transparent 65%)",
                top: "-200px", left: "-150px", pointerEvents: "none",
            }} />

            {/* Glow 2 */}
            <div style={{
                position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0,100,255,0.15) 0%, transparent 65%)",
                top: "100px", right: "-100px", pointerEvents: "none",
            }} />

            {/* Dot grid */}
            <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                pointerEvents: "none",
                maskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 100%)",
            }} />

            <Container>
                <div style={{
                    position: "relative", zIndex: 1,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "40px",
                    alignItems: "center",
                }}>
                    {/* Left — text */}
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            background: "rgba(107,63,240,0.15)",
                            border: "0.5px solid rgba(107,63,240,0.4)",
                            borderRadius: "100px", padding: "5px 14px", marginBottom: "32px",
                        }}>
              <span style={{
                  width: "7px", height: "7px", borderRadius: "50%",
                  backgroundColor: "#22C55E", display: "inline-block",
              }} />
                            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>
                Доступний для нових проєктів
              </span>
                        </div>

                        <h1 style={{
                            fontSize: "clamp(40px, 5vw, 68px)",
                            fontWeight: 700, color: "#ffffff",
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
                            fontSize: "17px", color: "rgba(255,255,255,0.5)",
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
                                    background: "rgba(255,255,255,0.05)",
                                    color: "rgba(255,255,255,0.8)", fontWeight: 600, fontSize: "16px",
                                    borderRadius: "8px", border: "0.5px solid rgba(255,255,255,0.12)",
                                    cursor: "pointer", fontFamily: "inherit", transition: "background 0.2s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                            >
                                Подивитись роботи
                            </button>
                        </div>
                    </motion.div>

                    {/* Right — sphere */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        style={{
                            position: "relative",
                            height: "500px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <SphereCanvas />
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}