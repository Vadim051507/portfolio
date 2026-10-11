"use client";

import type React from "react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/site/Reveal";
import Icon from "@/components/site/Icons";
import { SERVICES } from "@/lib/constants";

const META = [
    {
        icon: "cart",
        tags: ["Каталог", "Кошик", "Оплата", "Нова Пошта"],
    },
    {
        icon: "building",
        tags: ["Багатосторінковий", "CMS", "SEO"],
    },
    {
        icon: "rocket",
        tags: ["Швидкий старт", "Аналітика", "A/B"],
    },
];

function spotlight(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function Services() {
    return (
        <section id="services" style={{ padding: "130px 0", position: "relative" }}>
            <Container>
                <SectionTitle
                    index="02"
                    eyebrow="Послуги"
                    title="Що я роблю"
                    accentWord="роблю"
                    subtitle="Повний цикл — від першого дзвінка до запущеного сайту з адмінкою."
                />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: 20,
                    }}
                >
                    {SERVICES.map((service, i) => {
                        const m = META[i] ?? META[0];
                        return (
                            <Reveal key={service.id} delay={i * 0.1} y={40}>
                                <div
                                    className="card card-hover spot"
                                    onMouseMove={spotlight}
                                    style={{ padding: 32, height: "100%" }}
                                >
                                    {/* index + icon share one row, split by a rule */}
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            paddingBottom: 22,
                                            marginBottom: 24,
                                            borderBottom: "1px solid var(--border)",
                                        }}
                                    >
                                        <span
                                            className="mono-label"
                                            style={{ fontSize: 13 }}
                                        >
                                            0{i + 1}
                                        </span>
                                        <div
                                            className="tile"
                                            style={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: 14,
                                            }}
                                        >
                                            <Icon name={m.icon} size={22} />
                                        </div>
                                    </div>

                                    <h3
                                        style={{
                                            fontSize: 21,
                                            fontWeight: 600,
                                            color: "var(--text)",
                                            marginBottom: 12,
                                            letterSpacing: "-0.3px",
                                        }}
                                    >
                                        {service.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: 14.5,
                                            color: "var(--text-muted)",
                                            lineHeight: 1.7,
                                            marginBottom: 22,
                                        }}
                                    >
                                        {service.description}
                                    </p>

                                    <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 8,
                                            marginBottom: 26,
                                        }}
                                    >
                                        {m.tags.map((t) => (
                                            <span key={t} className="tag">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "baseline",
                                            gap: 8,
                                            paddingTop: 20,
                                            borderTop: "1px solid var(--border)",
                                        }}
                                    >
                                        <span className="mono-label">вартість</span>
                                        <span
                                            style={{
                                                fontFamily: "var(--font-display)",
                                                fontSize: 18,
                                                fontWeight: 700,
                                                color: "var(--text)",
                                                textDecoration: "underline",
                                                textDecorationColor: "var(--accent)",
                                                textDecorationThickness: 3,
                                                textUnderlineOffset: 6,
                                            }}
                                        >
                                            {service.price}
                                        </span>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}