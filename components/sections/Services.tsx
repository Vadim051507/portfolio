"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { SERVICES } from "@/lib/constants";

export default function Services() {
    return (
        <section id="services" style={{ padding: "120px 0", backgroundColor: "#F5F7FA" }}>
            <Container>
                <SectionTitle title="Що я роблю" />
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "24px",
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
                                backgroundColor: "#ffffff",
                                borderRadius: "10px",
                                padding: "32px",
                                border: "1px solid #EEEEEE",
                            }}
                            whileHover={{ y: -4 }}
                        >
                            <h3
                                style={{
                                    fontSize: "20px",
                                    fontWeight: 700,
                                    color: "#0A0A0A",
                                    marginBottom: "12px",
                                }}
                            >
                                {service.title}
                            </h3>
                            <p
                                style={{
                                    fontSize: "15px",
                                    color: "#666666",
                                    lineHeight: 1.6,
                                    marginBottom: "20px",
                                }}
                            >
                                {service.description}
                            </p>
                            <span
                                style={{
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    color: "#0066FF",
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