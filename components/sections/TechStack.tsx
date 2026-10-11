"use client";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { TECH_LOGOS } from "@/components/site/TechLogos";

export default function TechStack() {
    const doubled = [...TECH_LOGOS, ...TECH_LOGOS];

    return (
        <section id="tech" style={{ padding: "90px 0", position: "relative" }}>
            <style>{`
                .tech-chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    white-space: nowrap;
                    padding: 14px 24px;
                    background: var(--surface);
                    border: 1px solid var(--border-soft);
                    border-radius: 100px;
                    color: var(--text-muted);
                    transition: color 0.25s, border-color 0.25s;
                }
                .tech-chip:hover { color: var(--accent); border-color: var(--border-strong); }
            `}</style>
            <Container>
                <SectionTitle
                    index="05"
                    eyebrow="Стек"
                    title="Технології"
                    accentWord="Технології"
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
                        <div key={`${t.name}-${i}`} className="tech-chip">
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