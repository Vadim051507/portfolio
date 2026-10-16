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
            {/* giant outlined wordmark */}
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
                    color: "transparent",
                    WebkitTextStroke: "1px var(--border)",
                    pointerEvents: "none",
                    userSelect: "none",
                }}
            >
                {SITE.brandName}
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
                                    className="logo-mark"
                                    style={{
                                        width: 34,
                                        height: 34,
                                        borderRadius: 10,
                                    }}
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        role="img"
                                        aria-label={SITE.brandName}
                                    >
                                        <path d="M3 2h4v6H3V2zm6 0h4v10H9V2zM3 10h4v4H3v-4z" />
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
                                    {SITE.brandName}
                                </span>
                            </div>
                            <p
                                style={{
                                    fontSize: 14,
                                    color: "var(--text-muted)",
                                    lineHeight: 1.7,
                                }}
                            >
                                Сайти для локального бізнесу. Швидкі, з налаштованим
                                пошуком, із ціною до початку роботи.
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
                                    { label: "LinkedIn", href: SITE.linkedin, ext: true },
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
                        <span style={{ fontSize: 13.5, color: "var(--text-muted)" }}>
                            © {year} {SITE.brandName}. Зроблено з{" "}
                            <svg
                                role="img"
                                aria-label="любов'ю"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="var(--accent)"
                                style={{
                                    display: "inline-block",
                                    verticalAlign: "-1px",
                                }}
                            >
                                <path d="M12 21 3.2 12.4a5.4 5.4 0 0 1 7.6-7.6L12 6l1.2-1.2a5.4 5.4 0 0 1 7.6 7.6z" />
                            </svg>{" "}
                            в Україні.
                        </span>
                        <button
                            type="button"
                            onClick={scrollTop}
                            className="meta-label"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                background: "transparent",
                                border: "1px solid var(--border)",
                                borderRadius: 100,
                                padding: "9px 16px",
                                cursor: "pointer",
                                transition: "border-color 0.2s, color 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor =
                                    "var(--border-strong)";
                                e.currentTarget.style.color = "var(--accent)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "var(--border)";
                                e.currentTarget.style.color = "var(--text-muted)";
                            }}
                        >
                            Наверх
                            <svg
                                aria-hidden
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 19V5M6 11l6-6 6 6" />
                            </svg>
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

    return (
        <div>
            <div className="meta-label" style={{ marginBottom: 16 }}>
                {title}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {links.map((l) => (
                    <a
                        key={l.label}
                        href={l.href}
                        {...(l.ext
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {
                                  // in-page anchors go through Lenis, like
                                  // every other scroll on the site
                                  onClick: (e: React.MouseEvent) => {
                                      e.preventDefault();
                                      scrollTo(l.href);
                                  },
                              })}
                        style={{
                            fontSize: 14,
                            color: "var(--text-muted)",
                            textDecoration: "none",
                            cursor: "pointer",
                            transition: "color 0.2s",
                            width: "fit-content",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.color = "var(--accent)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "var(--text-muted)")
                        }
                    >
                        {l.label}
                    </a>
                ))}
            </div>
        </div>
    );
}