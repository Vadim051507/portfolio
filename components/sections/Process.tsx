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
                                background: "#FFFFFF",
                                border: "0.5px solid rgba(15,14,26,0.07)",
                                borderRadius: "16px",
                                padding: "32px",
                                position: "relative",
                                overflow: "hidden",
                                boxShadow: "0 1px 3px rgba(15,14,26,0.04)",
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
                                    color: "rgba(107,63,240,0.10)",
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
                                    background: "linear-gradient(135deg, #6B3FF0, #4F46E5)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "13px",
                                    fontWeight: 700,
                                    color: "#ffffff",
                                    marginBottom: "20px",
                                    boxShadow: "0 2px 8px rgba(107,63,240,0.30)",
                                }}
                            >
                                {step.number}
                            </div>

                            <h3
                                style={{
                                    fontSize: "17px",
                                    fontWeight: 600,
                                    color: "#0F0E1A",
                                    marginBottom: "10px",
                                }}
                            >
                                {step.title}
                            </h3>
                            <p
                                style={{
                                    fontSize: "14px",
                                    color: "rgba(15,14,26,0.55)",
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