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
                    index="03"
                    eyebrow="Портфоліо"
                    title="Обрані роботи"
                    accentWord="роботи"
                    subtitle="Кожен проєкт — від дизайну до запуску. Наведіть, щоб роздивитись."
                />

                <div className="pf-grid">
                    {HERO_BROWSER_PROJECTS.map((p, i) => {
                        const live = LIVE.has(p.slug);
                        return (
                            <Reveal key={p.slug} delay={i * 0.1} y={44}>
                                <div
                                    className="pf-card card card-clip card-hover"
                                    onClick={() => live && router.push(p.href)}
                                    style={{ cursor: live ? "pointer" : "default" }}
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
                                                background: `linear-gradient(180deg, transparent 40%, rgba(7,12,11,0.6))`,
                                            }}
                                        />
                                        {/* domain chip */}
                                        <span
                                            style={{
                                                position: "absolute",
                                                top: 14,
                                                left: 14,
                                                fontSize: 11,
                                                color: "var(--text)",
                                                padding: "5px 11px",
                                                borderRadius: 100,
                                                background: "var(--bg)",
                                                border: "1px solid var(--border-strong)",
                                                fontFamily: "var(--font-mono)",
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
                                                    fontFamily: "var(--font-mono)",
                                                    fontSize: 11,
                                                    fontWeight: 500,
                                                    letterSpacing: "0.1em",
                                                    textTransform: "uppercase",
                                                    color: "var(--accent)",
                                                    padding: "5px 11px",
                                                    borderRadius: 100,
                                                    background: "var(--bg)",
                                                    border: "1px solid var(--border-strong)",
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
                                                        display: "grid",
                                                        placeItems: "center",
                                                        marginTop: 3,
                                                        color: "var(--accent)",
                                                        transition:
                                                            "transform 0.3s var(--ease-out)",
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    {/* drawn, not typed: the ↗
                                                        character falls back to a
                                                        colour emoji on some systems */}
                                                    <svg
                                                        aria-hidden
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M7 17 17 7M8 7h9v9" />
                                                    </svg>
                                                </span>
                                            )}
                                        </div>
                                        <p
                                            style={{
                                                fontSize: 14.5,
                                                color: "var(--text-muted)",
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
                                                <span key={t} className="tag">
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