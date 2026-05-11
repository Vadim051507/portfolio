"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { TECH_STACK } from "@/lib/constants";

export default function TechStack() {
    return (
        <section id="tech" style={{ padding: "80px 0", backgroundColor: "#ffffff" }}>
    <Container>
        <SectionTitle
            title="Технології"
    subtitle="Сучасний стек, який працює швидко і легко масштабується."
    />
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
    {TECH_STACK.map((tech, i) => (
        <motion.span
            key={tech}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: i * 0.06 }}
        style={{
        fontSize: "15px",
            fontWeight: 500,
            color: "#0A0A0A",
            backgroundColor: "#F5F7FA",
            border: "1px solid #EEEEEE",
            padding: "10px 20px",
            borderRadius: "8px",
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