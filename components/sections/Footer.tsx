"use client";

import Container from "@/components/ui/Container";
import { SITE } from "@/lib/constants";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            style={{
                padding: "32px 0",
                borderTop: "1px solid #EEEEEE",
                backgroundColor: "#ffffff",
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
          <span style={{ fontSize: "14px", color: "#666666" }}>
            {"© "}{year}{" "}{SITE.name}
          </span>
                    <div style={{ display: "flex", gap: "24px" }}>
            <span
                onClick={() => window.open(SITE.github, "_blank")}
                style={{
                    fontSize: "14px",
                    color: "#666666",
                    cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0A0A0A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
            >
              GitHub
            </span>
                        <span
                            onClick={() => window.open(SITE.telegram, "_blank")}
                            style={{
                                fontSize: "14px",
                                color: "#666666",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#0A0A0A")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
                        >
              Telegram
            </span>
                    </div>
                </div>
            </Container>
        </footer>
    );
}