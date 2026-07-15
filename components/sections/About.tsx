"use client";

import Container from "@/components/ui/Container";
import Reveal from "@/components/site/Reveal";
import AnimatedHeading from "@/components/site/AnimatedHeading";
import Icon from "@/components/site/Icons";

const PRINCIPLES = [
    {
        icon: "zap",
        glow: "rgba(168,85,247,0.45)",
        title: "Швидкість",
        text: "Оптимізований код і сучасний стек — сайти вантажаться за секунду.",
    },
    {
        icon: "target",
        glow: "rgba(99,102,241,0.45)",
        title: "Результат",
        text: "Дизайн заточений під заявки та продажі, а не просто «красиво».",
    },
    {
        icon: "sliders",
        glow: "rgba(59,130,246,0.45)",
        title: "Адмінка",
        text: "Ви самі керуєте контентом — тексти, фото, ціни без розробника.",
    },
    {
        icon: "support",
        glow: "rgba(34,211,238,0.45)",
        title: "Підтримка",
        text: "Не зникаю після здачі — лишаюсь на зв'язку і допомагаю далі.",
    },
];

export default function About() {
    return (
        <section id="about" style={{ padding: "120px 0", position: "relative" }}>
            <Container>
                <div
                    style={{
                        maxWidth: 820,
                        marginBottom: 64,
                    }}
                >
                    <Reveal style={{ marginBottom: 22 }}>
                        <span className="eyebrow">Про мене</span>
                    </Reveal>
                    <AnimatedHeading
                        segments={[
                            { text: "Роблю сайти, які" },
                            { text: "працюють на бізнес,", gradient: true },
                            { text: "а не просто існують" },
                        ]}
                        style={{
                            fontSize: "clamp(28px, 4.4vw, 50px)",
                            fontWeight: 700,
                            letterSpacing: "-1.5px",
                            lineHeight: 1.1,
                            color: "var(--text)",
                        }}
                    />
                    <Reveal delay={0.15} style={{ marginTop: 24 }}>
                        <p
                            style={{
                                fontSize: 18,
                                color: "var(--text-2)",
                                lineHeight: 1.75,
                                maxWidth: 640,
                            }}
                        >
                            Fullstack-розробник з фокусом на малий бізнес. Беру проєкт
                            від першої ідеї до запуску: дизайн, розробка, адмінка й
                            підтримка. Ви отримуєте не набір сторінок, а інструмент,
                            який приносить клієнтів.
                        </p>
                    </Reveal>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                        gap: 16,
                    }}
                >
                    {PRINCIPLES.map((p, i) => (
                        <Reveal key={p.title} delay={i * 0.08} y={36}>
                            <div
                                className="glass"
                                style={{
                                    padding: 26,
                                    height: "100%",
                                    transition: "transform 0.4s var(--ease-out), border-color 0.4s",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-5px)";
                                    e.currentTarget.style.borderColor = "var(--border-strong)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.borderColor = "var(--border)";
                                }}
                            >
                                <div
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 13,
                                        display: "grid",
                                        placeItems: "center",
                                        marginBottom: 18,
                                        color: "#fff",
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid var(--border)",
                                        boxShadow: `0 0 26px ${p.glow}`,
                                    }}
                                >
                                    <Icon name={p.icon} size={22} />
                                </div>
                                <h3
                                    style={{
                                        fontSize: 17,
                                        fontWeight: 600,
                                        color: "var(--text)",
                                        marginBottom: 8,
                                    }}
                                >
                                    {p.title}
                                </h3>
                                <p
                                    style={{
                                        fontSize: 14,
                                        color: "var(--text-2)",
                                        lineHeight: 1.65,
                                    }}
                                >
                                    {p.text}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}