"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { PROCESS_STEPS } from "@/lib/constants";

export default function Process() {
    return (
        <section id="process" style={{ padding: "120px 0", position: "relative" }}>
            <Container>
                <SectionTitle title="Як проходить робота" />
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "2px",
                    }}
                >
                    {PROCESS_STEPS.map((step, i) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "0.5px solid rgba(255,255,255,0.07)",
                                borderRadius: "16px",
                                padding: "32px",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            {/* Big number background */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: "12px",
                                    right: "16px",
                                    fontSize: "80px",
                                    fontWeight: 700,
                                    color: "rgba(107,63,240,0.08)",
                                    lineHeight: 1,
                                    letterSpacing: "-3px",
                                    userSelect: "none",
                                }}
                            >
                                {step.number}
                            </div>

                            <div
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "8px",
                                    background: "linear-gradient(135deg, rgba(107,63,240,0.3), rgba(0,100,255,0.3))",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "13px",
                                    fontWeight: 700,
                                    color: "rgba(255,255,255,0.8)",
                                    marginBottom: "20px",
                                }}
                            >
                                {step.number}
                            </div>

                            <h3
                                style={{
                                    fontSize: "17px",
                                    fontWeight: 600,
                                    color: "#ffffff",
                                    marginBottom: "10px",
                                }}
                            >
                                {step.title}
                            </h3>
                            <p
                                style={{
                                    fontSize: "14px",
                                    color: "rgba(255,255,255,0.5)",
                                    lineHeight: 1.7,
                                }}
                            >
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}