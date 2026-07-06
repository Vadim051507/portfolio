"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { TECH_STACK } from "@/lib/constants";

export default function TechStack() {
    return (
        <section id="tech" style={{ padding: "80px 0", position: "relative" }}>
            <Container>
                <SectionTitle
                    title="Технології"
                    subtitle="Сучасний стек, який працює швидко і легко масштабується."
                />
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {TECH_STACK.map((tech, i) => (
                        <motion.span
                            key={tech}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.06 }}
                            style={{
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "rgba(15,14,26,0.65)",
                                background: "#FFFFFF",
                                border: "0.5px solid rgba(15,14,26,0.1)",
                                padding: "10px 20px",
                                borderRadius: "8px",
                                boxShadow: "0 1px 3px rgba(15,14,26,0.04)",
                                transition: "border-color 0.2s, color 0.2s",
                                cursor: "default",
                            }}
                            whileHover={{
                                borderColor: "rgba(107,63,240,0.5)",
                                color: "#0F0E1A",
                            }}
                        >
                            {tech}
                        </motion.span>
                    ))}
                </div>
            </Container>
        </section>
    );
}