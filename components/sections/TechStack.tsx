"use client";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { TECH_LOGOS } from "@/components/site/TechLogos";

export default function TechStack() {
    const doubled = [...TECH_LOGOS, ...TECH_LOGOS];

    return (
        <section id="tech" style={{ padding: "90px 0", position: "relative" }}>
            <Container>
                <SectionTitle
                    eyebrow="Стек"
                    title="Технології"
                    gradientWord="Технології"
                    subtitle="Сучасний стек, який працює швидко і легко масштабується."
                />
            </Container>

            <div
                style={{
                    overflow: "hidden",
                    maskImage:
                        "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                    WebkitMaskImage:
                        "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                }}
            >
                <div
                    data-marquee
                    style={{
                        display: "flex",
                        gap: 16,
                        width: "max-content",
                        animation: "marquee 38s linear infinite",
                    }}
                >
                    {doubled.map((t, i) => (
                        <div
                            key={`${t.name}-${i}`}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 12,
                                whiteSpace: "nowrap",
                                padding: "14px 24px",
                                borderRadius: 14,
                                background: "#0b0d17",
                                border: "1px solid var(--border)",
                            }}
                        >
                            <span
                                style={{
                                    display: "grid",
                                    placeItems: "center",
                                    width: 26,
                                    height: 26,
                                    flexShrink: 0,
                                }}
                            >
                                {t.node}
                            </span>
                            <span
                                style={{
                                    fontFamily: "var(--font-display)",
                                    fontSize: 16,
                                    fontWeight: 500,
                                    color: "var(--text)",
                                }}
                            >
                                {t.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}