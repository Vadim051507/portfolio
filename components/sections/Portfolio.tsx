"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { PROJECTS } from "@/lib/constants";

export default function Portfolio() {
    const router = useRouter();

    return (
        <section id="portfolio" style={{ padding: "120px 0", position: "relative" }}>
            <style>{`
                .portfolio-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 16px;
                }
                @media (max-width: 700px) {
                    .portfolio-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
            <Container>
                <SectionTitle title="Роботи" />
                <div className="portfolio-grid">
                    {PROJECTS.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            onClick={() => router.push(project.href)}
                            style={{ cursor: "pointer" }}
                        >
                            <div
                                style={{
                                    background: "#FFFFFF",
                                    border: "0.5px solid rgba(15,14,26,0.08)",
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    boxShadow: "0 1px 3px rgba(15,14,26,0.04)",
                                    transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(107,63,240,0.4)";
                                    (e.currentTarget as HTMLDivElement).style.background = "rgba(107,63,240,0.03)";
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
                                        width: "100%",
                                        aspectRatio: "16/9",
                                        background: "rgba(107,63,240,0.08)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "13px",
                                        color: "rgba(15,14,26,0.35)",
                                        borderBottom: "0.5px solid rgba(15,14,26,0.06)",
                                    }}
                                >
                                    {project.title}
                                </div>

                                <div style={{ padding: "24px" }}>
                                    <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#0F0E1A", marginBottom: "8px" }}>
                                        {project.title}
                                    </h3>
                                    <p style={{ fontSize: "14px", color: "rgba(15,14,26,0.55)", marginBottom: "16px" }}>
                                        {project.description}
                                    </p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                style={{
                                                    fontSize: "12px",
                                                    fontWeight: 500,
                                                    color: "rgba(107,63,240,0.9)",
                                                    background: "rgba(107,63,240,0.1)",
                                                    border: "0.5px solid rgba(107,63,240,0.2)",
                                                    padding: "4px 10px",
                                                    borderRadius: "6px",
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(107,63,240,0.9)" }}>
                                        {"Детальніше →"}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}