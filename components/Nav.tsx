"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/constants";

const NAV_LINKS = [
    { label: "Послуги", href: "#services" },
    { label: "Роботи", href: "#portfolio" },
    { label: "Процес", href: "#process" },
    { label: "FAQ", href: "#faq" },
];

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [lang, setLang] = useState<"UA" | "EN">("UA");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 860);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (href: string) => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    if (isMobile) return null;

    return (
        <header style={{
            position: "fixed", top: "16px", left: 0, right: 0,
            zIndex: 100, display: "flex", justifyContent: "center",
            padding: "0 24px", pointerEvents: "none",
        }}>
            <div style={{
                width: "100%", maxWidth: "900px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                backgroundColor: scrolled ? "rgba(8,6,18,0.95)" : "rgba(8,6,18,0.78)",
                backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                border: "0.5px solid rgba(255,255,255,0.12)",
                borderRadius: "100px", padding: "8px 8px 8px 24px",
                pointerEvents: "all", transition: "background-color 0.3s",
                boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 0.5px 0 rgba(255,255,255,0.08)",
            }}>
                <button onClick={() => scrollTo("#hero")} style={{
                    fontWeight: 700, fontSize: "17px", color: "#fff",
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: "inherit", whiteSpace: "nowrap",
                    letterSpacing: "-0.3px", flexShrink: 0, padding: 0,
                }}>
                    {SITE.name}
                </button>

                <nav style={{ display: "flex", gap: "2px", alignItems: "center" }}>
                    {NAV_LINKS.map((l) => (
                        <button key={l.href} onClick={() => scrollTo(l.href)} style={{
                            fontSize: "14px", color: "rgba(255,255,255,0.55)",
                            background: "none", border: "none", cursor: "pointer",
                            fontFamily: "inherit", padding: "7px 13px",
                            borderRadius: "100px", transition: "color 0.2s, background 0.2s",
                            whiteSpace: "nowrap",
                        }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.background = "none"; }}
                        >{l.label}</button>
                    ))}
                </nav>

                <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                    <button onClick={() => window.open(SITE.telegram, "_blank")} title="Telegram" style={{
                        width: "32px", height: "32px", borderRadius: "50%",
                        background: "rgba(255,255,255,0.07)", border: "0.5px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.6)", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "14px", transition: "background 0.2s", fontFamily: "inherit",
                    }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,136,204,0.2)"; e.currentTarget.style.color = "#fff"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
                    >✈️</button>

                    <button onClick={() => window.open("https://instagram.com/YOUR_INSTA", "_blank")} title="Instagram" style={{
                        width: "32px", height: "32px", borderRadius: "50%",
                        background: "rgba(255,255,255,0.07)", border: "0.5px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.6)", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "14px", transition: "background 0.2s", fontFamily: "inherit",
                    }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(225,48,108,0.2)"; e.currentTarget.style.color = "#fff"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
                    >📷</button>

                    <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.1)", margin: "0 2px" }} />

                    <div style={{ display: "flex", background: "rgba(255,255,255,0.06)", borderRadius: "100px", padding: "3px", gap: "1px" }}>
                        {(["UA", "EN"] as const).map((l) => (
                            <button key={l} onClick={() => setLang(l)} style={{
                                fontSize: "11px", fontWeight: 600,
                                color: lang === l ? "#fff" : "rgba(255,255,255,0.4)",
                                background: lang === l ? "rgba(107,63,240,0.5)" : "none",
                                border: "none", cursor: "pointer", fontFamily: "inherit",
                                padding: "4px 9px", borderRadius: "100px",
                                transition: "all 0.2s", letterSpacing: "0.05em",
                            }}>{l}</button>
                        ))}
                    </div>

                    <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.1)", margin: "0 2px" }} />

                    <button onClick={() => scrollTo("#contact")} style={{
                        fontSize: "13px", fontWeight: 600, color: "#fff",
                        background: "linear-gradient(135deg, #6B3FF0, #0066FF)",
                        border: "none", padding: "8px 18px", borderRadius: "100px",
                        cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.2s",
                        whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(107,63,240,0.35)",
                    }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >{"Зв'язатись"}</button>
                </div>
            </div>
        </header>
    );
}