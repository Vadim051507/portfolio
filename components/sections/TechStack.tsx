"use client";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { TECH_STACK } from "@/lib/constants";

// Second row of adjacent tooling for a fuller marquee.
const ROW_B = ["Framer Motion", "Three.js", "Node.js", "Docker", "Figma", "Stripe", "REST API", "Git"];

function Row({
    items,
    reverse,
    duration,
}: {
    items: readonly string[];
    reverse?: boolean;
    duration: number;
}) {
    const doubled = [...items, ...items];
    return (
        <div style={{ overflow: "hidden", width: "100%" }}>
            <div
                data-marquee
                style={{
                    display: "flex",
                    gap: 16,
                    width: "max-content",
                    animation: `marquee ${duration}s linear infinite`,
                    animationDirection: reverse ? "reverse" : "normal",
                }}
            >
                {doubled.map((tech, i) => (
                    <span
                        key={`${tech}-${i}`}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            fontFamily: "var(--font-display)",
                            fontSize: 15,
                            fontWeight: 500,
                            color: "var(--text-2)",
                            whiteSpace: "nowrap",
                            padding: "13px 22px",
                            borderRadius: 12,
                            background: "var(--surface)",
                            border: "1px solid var(--border)",
                        }}
                    >
                        <span
                            style={{
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                background:
                                    "linear-gradient(135deg,#A855F7,#22D3EE)",
                            }}
                        />
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function TechStack() {
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
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    maskImage:
                        "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                    WebkitMaskImage:
                        "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                }}
            >
                <Row items={TECH_STACK} duration={34} />
                <Row items={ROW_B} reverse duration={40} />
            </div>
        </section>
    );
}