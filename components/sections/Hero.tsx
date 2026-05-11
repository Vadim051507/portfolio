"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Hero() {
    return (
        <section
            id="hero"
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#ffffff",
                paddingTop: "64px",
            }}
        >
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{ maxWidth: "720px" }}
                >
          <span
              style={{
                  display: "inline-block",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#0066FF",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "20px",
              }}
          >
            Fullstack розробник · Україна
          </span>

                    <h1
                        style={{
                            fontSize: "clamp(40px, 6vw, 64px)",
                            fontWeight: 700,
                            color: "#0A0A0A",
                            letterSpacing: "-1px",
                            lineHeight: 1.1,
                            marginBottom: "24px",
                        }}
                    >
                        Сайти для малого{" "}
                        <span style={{ color: "#0066FF" }}>бізнесу</span>{" "}
                        в Україні
                    </h1>

                    <p
                        style={{
                            fontSize: "clamp(16px, 2vw, 20px)",
                            color: "#666666",
                            lineHeight: 1.6,
                            marginBottom: "40px",
                            maxWidth: "560px",
                        }}
                    >
                        Інтернет-магазини, корпоративні сайти та лендінги.
                        Швидко, надійно, з підтримкою після запуску.
                    </p>

                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                        <button
                            onClick={() => scrollTo("#contact")}
                            style={{
                                padding: "14px 32px",
                                backgroundColor: "#0066FF",
                                color: "#ffffff",
                                fontWeight: 600,
                                fontSize: "16px",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                                fontFamily: "inherit",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = "#0052CC")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "#0066FF")
                            }
                        >
                            Обговорити проєкт
                        </button>
                        <button
                            onClick={() => scrollTo("#portfolio")}
                            style={{
                                padding: "14px 32px",
                                backgroundColor: "transparent",
                                color: "#0A0A0A",
                                fontWeight: 600,
                                fontSize: "16px",
                                borderRadius: "8px",
                                border: "1.5px solid #EEEEEE",
                                cursor: "pointer",
                                fontFamily: "inherit",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.borderColor = "#0A0A0A")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.borderColor = "#EEEEEE")
                            }
                        >
                            Подивитись роботи
                        </button>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}