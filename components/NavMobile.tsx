"use client";

import { useState } from "react";
import { SITE } from "@/lib/constants";

const NAV_LINKS = [
    { label: "Послуги", href: "#services" },
    { label: "Роботи", href: "#portfolio" },
    { label: "Процес", href: "#process" },
    { label: "FAQ", href: "#faq" },
];

export default function NavMobile() {
    const [menuOpen, setMenuOpen] = useState(false);

    const scrollTo = (href: string) => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
    };

    return (
        <>
            <style>{`@media (min-width: 861px) { .nav-mobile-root { display: none !important; } }`}</style>
            <div className="nav-mobile-root" style={{
                position: "fixed", top: "16px",
                left: "16px", right: "16px",
                zIndex: 100,
                boxSizing: "border-box",
            }}>
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: "rgba(8,6,18,0.88)",
                    backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                    border: "0.5px solid rgba(255,255,255,0.12)",
                    borderRadius: "100px",
                    padding: "7px 7px 7px 18px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                    overflow: "hidden",
                    minWidth: 0,
                }}>
                    {/* Logo */}
                    <button onClick={() => scrollTo("#hero")} style={{
                        fontWeight: 700, fontSize: "15px", color: "#fff",
                        background: "none", border: "none", cursor: "pointer",
                        fontFamily: "inherit", padding: 0,
                        whiteSpace: "nowrap", flexShrink: 1, minWidth: 0,
                        overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                        {SITE.name}
                    </button>

                    {/* Right side */}
                    <div style={{
                        display: "flex", alignItems: "center", gap: "6px",
                        flexShrink: 0, marginLeft: "8px",
                    }}>
                        <button onClick={() => scrollTo("#contact")} style={{
                            fontSize: "13px", fontWeight: 600, color: "#fff",
                            background: "linear-gradient(135deg, #6B3FF0, #0066FF)",
                            border: "none", padding: "7px 14px", borderRadius: "100px",
                            cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
                        }}>{"Зв'язатись"}</button>

                        <button onClick={() => setMenuOpen((v) => !v)} aria-label="Меню" style={{
                            width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0,
                            background: "rgba(255,255,255,0.07)", border: "0.5px solid rgba(255,255,255,0.1)",
                            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            {menuOpen ? (
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M1 1L13 13M13 1L1 13" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                                </svg>
                            ) : (
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M1 3H13M1 7H13M1 11H13" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Dropdown */}
                {menuOpen && (
                    <div style={{
                        marginTop: "8px",
                        background: "rgba(8,6,18,0.97)",
                        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                        border: "0.5px solid rgba(255,255,255,0.12)",
                        borderRadius: "20px", padding: "8px",
                        boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
                    }}>
                        {NAV_LINKS.map((l) => (
                            <button key={l.href} onClick={() => scrollTo(l.href)} style={{
                                width: "100%", fontSize: "15px", color: "rgba(255,255,255,0.75)",
                                background: "none", border: "none", cursor: "pointer",
                                fontFamily: "inherit", padding: "13px 16px",
                                borderRadius: "12px", textAlign: "left", display: "block",
                                transition: "background 0.2s, color 0.2s",
                                boxSizing: "border-box",
                            }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#fff"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
                            >{l.label}</button>
                        ))}

                        <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "4px 0" }} />

                        <div style={{ display: "flex", gap: "8px", padding: "8px 8px 4px" }}>
                            <button onClick={() => window.open(SITE.telegram, "_blank")} style={{
                                flex: 1, padding: "10px 8px", borderRadius: "12px",
                                background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)",
                                color: "rgba(255,255,255,0.7)", cursor: "pointer",
                                fontFamily: "inherit", fontSize: "13px",
                            }}>✈️ Telegram</button>
                            <button onClick={() => window.open("https://instagram.com/YOUR_INSTA", "_blank")} style={{
                                flex: 1, padding: "10px 8px", borderRadius: "12px",
                                background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)",
                                color: "rgba(255,255,255,0.7)", cursor: "pointer",
                                fontFamily: "inherit", fontSize: "13px",
                            }}>📷 Instagram</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}