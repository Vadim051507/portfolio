"use client";

import Container from "@/components/ui/Container";
import { SITE } from "@/lib/constants";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            style={{
                padding: "32px 0",
                borderTop: "0.5px solid rgba(255,255,255,0.08)",
            }}
        >
            <Container>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "16px",
                    }}
                >
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.3)" }}>
            {"© "}{year}{" "}{SITE.name}
          </span>
                    <div style={{ display: "flex", gap: "24px" }}>
            <span
                onClick={() => window.open(SITE.github, "_blank")}
                style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.3)",
                    cursor: "pointer",
                    transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
            >
              GitHub
            </span>
                        <span
                            onClick={() => window.open(SITE.telegram, "_blank")}
                            style={{
                                fontSize: "14px",
                                color: "rgba(255,255,255,0.3)",
                                cursor: "pointer",
                                transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
                        >
              Telegram
            </span>
                    </div>
                </div>
            </Container>
        </footer>
    );
}