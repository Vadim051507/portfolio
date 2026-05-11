"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { PROCESS_STEPS } from "@/lib/constants";

export default function Process() {
    return (
        <section id="process" style={{ padding: "120px 0", backgroundColor: "#F5F7FA" }}>
            <Container>
                <SectionTitle title="Як проходить робота" />
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "32px",
                    }}
                >
                    {PROCESS_STEPS.map((step, i) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <div
                                style={{
                                    fontSize: "40px",
                                    fontWeight: 700,
                                    color: "#EEEEEE",
                                    lineHeight: 1,
                                    marginBottom: "16px",
                                    letterSpacing: "-1px",
                                }}
                            >
                                {step.number}
                            </div>
                            <h3
                                style={{
                                    fontSize: "18px",
                                    fontWeight: 700,
                                    color: "#0A0A0A",
                                    marginBottom: "8px",
                                }}
                            >
                                {step.title}
                            </h3>
                            <p
                                style={{
                                    fontSize: "15px",
                                    color: "#666666",
                                    lineHeight: 1.6,
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