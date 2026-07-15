"use client";

import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/site/Reveal";
import { HERO_BROWSER_PROJECTS } from "@/lib/constants";

// Which projects have a live detail page.
const LIVE = new Set(["tokarchuk-dental", "bavovnastore"]);

export default function Portfolio() {
    const router = useRouter();

    return (
        <section id="portfolio" style={{ padding: "130px 0", position: "relative" }}>
            <style>{`
                .pf-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
                    gap: 24px;
                }
                .pf-card:hover .pf-img { transform: scale(1.06); }
                .pf-card:hover .pf-arrow { transform: translate(4px,-4px); }
                @media (max-width: 720px) { .pf-grid { grid-template-columns: 1fr; } }
            `}</style>

            <Container>
                <SectionTitle
                    eyebrow="Портфоліо"
                    title="Обрані роботи"
                    gradientWord="роботи"
                    subtitle="Кожен проєкт — від дизайну до запуску. Наведіть, щоб роздивитись."
                />

                <div className="pf-grid">
                    {HERO_BROWSER_PROJECTS.map((p, i) => {
                        const live = LIVE.has(p.slug);
                        return (
                            <Reveal key={p.slug} delay={i * 0.1} y={44}>
                                <div
                                    className="pf-card glass"
                                    onClick={() => live && router.push(p.href)}
                                    style={{
                                        overflow: "hidden",
                                        cursor: live ? "pointer" : "default",
                                        transition:
                                            "transform 0.4s var(--ease-out), border-color 0.4s, box-shadow 0.4s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform =
                                            "translateY(-6px)";
                                        e.currentTarget.style.borderColor =
                                            "var(--border-strong)";
                                        e.currentTarget.style.boxShadow = `0 30px 80px rgba(0,0,0,0.5), 0 0 60px ${p.accent}`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform =
                                            "translateY(0)";
                                        e.currentTarget.style.borderColor =
                                            "var(--border)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                >
                                    {/* image */}
                                    <div
                                        style={{
                                            position: "relative",
                                            aspectRatio: "16 / 10",
                                            overflow: "hidden",
                                            borderBottom: "1px solid var(--border)",
                                        }}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            className="pf-img"
                                            src={p.image}
                                            alt={p.title}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                objectPosition: "top",
                                                display: "block",
                                                transition:
                                                    "transform 0.7s var(--ease-out)",
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                background: `linear-gradient(180deg, transparent 40%, rgba(5,6,12,0.55))`,
                                            }}
                                        />
                                        {/* domain chip */}
                                        <span
                                            style={{
                                                position: "absolute",
                                                top: 14,
                                                left: 14,
                                                fontSize: 11.5,
                                                color: "var(--text-2)",
                                                padding: "5px 11px",
                                                borderRadius: 100,
                                                background: "rgba(5,6,12,0.6)",
                                                border: "1px solid var(--border)",
                                                backdropFilter: "blur(8px)",
                                                fontFamily: "var(--font-body)",
                                            }}
                                        >
                                            {p.domain}
                                        </span>
                                        {!live && (
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    top: 14,
                                                    right: 14,
                                                    fontSize: 11,
                                                    fontWeight: 600,
                                                    color: "#fff",
                                                    padding: "5px 11px",
                                                    borderRadius: 100,
                                                    background:
                                                        "rgba(139,92,246,0.35)",
                                                    border: "1px solid rgba(139,92,246,0.5)",
                                                    backdropFilter: "blur(8px)",
                                                }}
                                            >
                                                Скоро
                                            </span>
                                        )}
                                    </div>

                                    {/* body */}
                                    <div style={{ padding: 26 }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "flex-start",
                                                gap: 12,
                                                marginBottom: 10,
                                            }}
                                        >
                                            <h3
                                                style={{
                                                    fontSize: 20,
                                                    fontWeight: 600,
                                                    color: "var(--text)",
                                                    letterSpacing: "-0.3px",
                                                }}
                                            >
                                                {p.title}
                                            </h3>
                                            {live && (
                                                <span
                                                    className="pf-arrow"
                                                    style={{
                                                        fontSize: 20,
                                                        color: "var(--violet-bright)",
                                                        transition:
                                                            "transform 0.3s var(--ease-out)",
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    ↗
                                                </span>
                                            )}
                                        </div>
                                        <p
                                            style={{
                                                fontSize: 14.5,
                                                color: "var(--text-2)",
                                                lineHeight: 1.6,
                                                marginBottom: 18,
                                            }}
                                        >
                                            {p.description}
                                        </p>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 8,
                                            }}
                                        >
                                            {p.tags.map((t) => (
                                                <span
                                                    key={t}
                                                    style={{
                                                        fontSize: 12,
                                                        color: "var(--text-2)",
                                                        padding: "4px 10px",
                                                        borderRadius: 7,
                                                        background:
                                                            "rgba(255,255,255,0.04)",
                                                        border: "1px solid var(--border)",
                                                    }}
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
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