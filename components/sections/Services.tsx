"use client";

import { motion, Variants } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { SERVICES } from "@/lib/constants";

const sectionVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
        y: 48,
        filter: "blur(12px)",
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
    },
};

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.92,
        y: 32,
        filter: "blur(6px)",
    },
    visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.65,
            delay: i * 0.08,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
    }),
};

export default function Services() {
    return (
        <motion.section
            id="services"
            style={{ padding: "120px 0", position: "relative" }}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
        >
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
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            style={{
                                background: "#FFFFFF",
                                border: "0.5px solid rgba(15,14,26,0.08)",
                                borderRadius: "16px",
                                padding: "32px",
                                boxShadow: "0 1px 3px rgba(15,14,26,0.04)",
                                transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                                cursor: "default",
                            }}
                            whileHover={{
                                y: -4,
                                transition: { duration: 0.2 },
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(107,63,240,0.4)";
                                (e.currentTarget as HTMLDivElement).style.background = "rgba(107,63,240,0.04)";
                                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(107,63,240,0.14)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(15,14,26,0.08)";
                                (e.currentTarget as HTMLDivElement).style.background = "#FFFFFF";
                                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 3px rgba(15,14,26,0.04)";
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
                                    color: "#0F0E1A",
                                    marginBottom: "10px",
                                }}
                            >
                                {service.title}
                            </h3>
                            <p
                                style={{
                                    fontSize: "14px",
                                    color: "rgba(15,14,26,0.55)",
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
        </motion.section>
    );
}