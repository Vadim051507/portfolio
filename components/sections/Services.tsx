"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { SERVICES } from "@/lib/constants";

export default function Services() {
    return (
        <section id="services" style={{ padding: "120px 0", position: "relative" }}>
            <Container>
                <SectionTitle title="Що я роблю" />
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "16px",
                    }}
                >
                    {SERVICES.map((service, i) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "0.5px solid rgba(255,255,255,0.08)",
                                borderRadius: "16px",
                                padding: "32px",
                                transition: "border-color 0.2s, background 0.2s",
                                cursor: "default",
                            }}
                            whileHover={{
                                y: -4,
                                transition: { duration: 0.2 },
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(107,63,240,0.4)";
                                (e.currentTarget as HTMLDivElement).style.background = "rgba(107,63,240,0.06)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
                            }}
                        >
                            <div
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "10px",
                                    background: "rgba(107,63,240,0.2)",
                                    marginBottom: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "20px",
                                }}
                            >
                                {i === 0 ? "🛒" : i === 1 ? "🏢" : "🚀"}
                            </div>
                            <h3
                                style={{
                                    fontSize: "18px",
                                    fontWeight: 600,
                                    color: "#ffffff",
                                    marginBottom: "10px",
                                }}
                            >
                                {service.title}
                            </h3>
                            <p
                                style={{
                                    fontSize: "14px",
                                    color: "rgba(255,255,255,0.5)",
                                    lineHeight: 1.7,
                                    marginBottom: "20px",
                                }}
                            >
                                {service.description}
                            </p>
                            <span
                                style={{
                                    fontSize: "13px",
                                    fontWeight: 500,
                                    color: "rgba(107,63,240,0.9)",
                                }}
                            >
                {service.price}
              </span>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}