"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { PROJECTS } from "@/lib/constants";

export default function Portfolio() {
    const router = useRouter();

    return (
        <section id="portfolio" style={{ padding: "120px 0", backgroundColor: "#ffffff" }}>
            <Container>
                <SectionTitle title="Роботи" />
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "32px",
                    }}
                >
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
                                    border: "1px solid #EEEEEE",
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                    transition: "border-color 0.2s, transform 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.borderColor = "#0066FF";
                                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.borderColor = "#EEEEEE";
                                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                                }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        aspectRatio: "16/9",
                                        backgroundColor: "#F5F7FA",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "14px",
                                        color: "#666666",
                                    }}
                                >
                                    {project.title}
                                </div>

                                <div style={{ padding: "24px" }}>
                                    <h3
                                        style={{
                                            fontSize: "18px",
                                            fontWeight: 700,
                                            color: "#0A0A0A",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        {project.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: "14px",
                                            color: "#666666",
                                            marginBottom: "16px",
                                        }}
                                    >
                                        {project.description}
                                    </p>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: "8px",
                                            marginBottom: "20px",
                                        }}
                                    >
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                style={{
                                                    fontSize: "12px",
                                                    fontWeight: 500,
                                                    color: "#0066FF",
                                                    backgroundColor: "#EEF4FF",
                                                    padding: "4px 10px",
                                                    borderRadius: "4px",
                                                }}
                                            >
                        {tag}
                      </span>
                                        ))}
                                    </div>
                                    <span
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            color: "#0066FF",
                                        }}
                                    >
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