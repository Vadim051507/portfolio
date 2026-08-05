"use client";

import Container from "@/components/ui/Container";
import { SITE } from "@/lib/constants";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";

export default function Footer() {
    const year = new Date().getFullYear();
    const { scrollTo } = useSmoothScroll();

    const scrollTop = () => scrollTo(0);

    return (
        <footer
            style={{
                position: "relative",
                paddingTop: 80,
                paddingBottom: 40,
                borderTop: "1px solid var(--border)",
                overflow: "hidden",
            }}
        >
            {/* giant faded wordmark */}
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    bottom: -18,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "clamp(70px, 18vw, 240px)",
                    letterSpacing: "-6px",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                    background:
                        "linear-gradient(180deg, rgba(139,92,246,0.10), transparent)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                    pointerEvents: "none",
                    userSelect: "none",
                }}
            >
                {SITE.name}
            </div>

            <Container>
                <div style={{ position: "relative", zIndex: 1 }}>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            gap: 32,
                            marginBottom: 60,
                        }}
                    >
                        <div style={{ maxWidth: 320 }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    marginBottom: 16,
                                }}
                            >
                                <span
                                    style={{
                                        width: 34,
                                        height: 34,
                                        borderRadius: 10,
                                        background:
                                            "linear-gradient(135deg,#8B5CF6,#22D3EE)",
                                        display: "grid",
                                        placeItems: "center",
                                        boxShadow: "0 4px 16px rgba(139,92,246,0.5)",
                                    }}
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="white"
                                    >
                                        <path
                                            d="M3 2h4v6H3V2zm6 0h4v10H9V2zM3 10h4v4H3v-4z"
                                            opacity="0.95"
                                        />
                                    </svg>
                                </span>
                                <span
                                    style={{
                                        fontFamily: "var(--font-display)",
                                        fontWeight: 700,
                                        fontSize: 17,
                                        color: "var(--text)",
                                        letterSpacing: "-0.3px",
                                    }}
                                >
                                    {SITE.name}
                                </span>
                            </div>
                            <p
                                style={{
                                    fontSize: 14,
                                    color: "var(--text-2)",
                                    lineHeight: 1.7,
                                }}
                            >
                                Сайти для малого бізнесу в Україні. Швидко, надійно,
                                з підтримкою після запуску.
                            </p>
                        </div>

                        <div style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
                            <FooterCol
                                title="Навігація"
                                links={[
                                    { label: "Послуги", href: "#services" },
                                    { label: "Портфоліо", href: "#portfolio" },
                                    { label: "Процес", href: "#process" },
                                    { label: "Контакти", href: "#contact" },
                                ]}
                            />
                            <FooterCol
                                title="Соцмережі"
                                links={[
                                    { label: "Telegram", href: SITE.telegram, ext: true },
                                    { label: "GitHub", href: SITE.github, ext: true },
                                    {
                                        label: "Instagram",
                                        href: SITE.instagram,
                                        ext: true,
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 16,
                            paddingTop: 28,
                            borderTop: "1px solid var(--border)",
                        }}
                    >
                        <span style={{ fontSize: 13.5, color: "var(--text-3)" }}>
                            © {year} {SITE.name}. Зроблено з ❤️ в Україні.
                        </span>
                        <button
                            onClick={scrollTop}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                fontSize: 13,
                                color: "var(--text-2)",
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid var(--border)",
                                borderRadius: 100,
                                padding: "8px 16px",
                                cursor: "pointer",
                                fontFamily: "var(--font-display)",
                                transition: "border-color 0.2s, color 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor =
                                    "var(--border-strong)";
                                e.currentTarget.style.color = "var(--text)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "var(--border)";
                                e.currentTarget.style.color = "var(--text-2)";
                            }}
                        >
                            Наверх ↑
                        </button>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

function FooterCol({
    title,
    links,
}: {
    title: string;
    links: { label: string; href: string; ext?: boolean }[];
}) {
    const { scrollTo } = useSmoothScroll();
    const go = (href: string, ext?: boolean) => {
        if (ext) window.open(href, "_blank");
        else scrollTo(href);
    };
    return (
        <div>
            <div
                style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: "var(--text-3)",
                    marginBottom: 16,
                    fontFamily: "var(--font-display)",
                }}
            >
                {title}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {links.map((l) => (
                    <span
                        key={l.label}
                        onClick={() => go(l.href, l.ext)}
                        style={{
                            fontSize: 14,
                            color: "var(--text-2)",
                            cursor: "pointer",
                            transition: "color 0.2s",
                            width: "fit-content",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.color = "var(--violet-bright)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "var(--text-2)")
                        }
                    >
                        {l.label}
                    </span>
                ))}
            </div>
        </div>
    );
}