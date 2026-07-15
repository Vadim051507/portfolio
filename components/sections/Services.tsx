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
        glow: "rgba(168,85,247,0.5)",
        tags: ["Каталог", "Кошик", "Оплата", "Нова Пошта"],
    },
    {
        icon: "building",
        glow: "rgba(99,102,241,0.5)",
        tags: ["Багатосторінковий", "CMS", "SEO"],
    },
    {
        icon: "rocket",
        glow: "rgba(34,211,238,0.5)",
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
                    eyebrow="Послуги"
                    title="Що я роблю"
                    gradientWord="роблю"
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
                                    className="glass spot"
                                    onMouseMove={spotlight}
                                    style={{
                                        padding: 32,
                                        height: "100%",
                                        transition:
                                            "transform 0.4s var(--ease-out), border-color 0.4s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform =
                                            "translateY(-6px)";
                                        e.currentTarget.style.borderColor =
                                            "var(--border-strong)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform =
                                            "translateY(0)";
                                        e.currentTarget.style.borderColor =
                                            "var(--border)";
                                    }}
                                >
                                    {/* index */}
                                    <div
                                        style={{
                                            fontFamily: "var(--font-display)",
                                            fontSize: 13,
                                            fontWeight: 600,
                                            color: "var(--text-3)",
                                            letterSpacing: 2,
                                            marginBottom: 22,
                                        }}
                                    >
                                        0{i + 1}
                                    </div>

                                    <div
                                        style={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: 16,
                                            display: "grid",
                                            placeItems: "center",
                                            marginBottom: 22,
                                            background: "rgba(255,255,255,0.04)",
                                            border: "1px solid var(--border)",
                                            boxShadow: `0 0 30px ${m.glow}`,
                                            color: "#fff",
                                        }}
                                    >
                                        <Icon name={m.icon} size={24} />
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
                                            color: "var(--text-2)",
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
                                            <span
                                                key={t}
                                                style={{
                                                    fontSize: 12,
                                                    color: "var(--text-2)",
                                                    padding: "5px 11px",
                                                    borderRadius: 8,
                                                    background:
                                                        "rgba(255,255,255,0.04)",
                                                    border: "1px solid var(--border)",
                                                }}
                                            >
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
                                        <span
                                            style={{
                                                fontSize: 12,
                                                color: "var(--text-3)",
                                            }}
                                        >
                                            вартість
                                        </span>
                                        <span
                                            className="gradient-text"
                                            style={{
                                                fontFamily: "var(--font-display)",
                                                fontSize: 18,
                                                fontWeight: 700,
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