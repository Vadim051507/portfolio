"use client";

import { useState, useEffect } from "react";
import NavMobile from "./NavMobile";

const NAV_LINKS = [
    { label: "Головна",    href: "#hero" },
    { label: "Про мене",  href: "#about" },
    { label: "Послуги",   href: "#services" },
    { label: "Портфоліо", href: "#portfolio" },
    { label: "Контакти",  href: "#contact" },
];

const SOCIAL = [
    {
        label: "Instagram",
        href: "https://instagram.com/YOUR_INSTA",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
        ),
    },
    {
        label: "Telegram",
        href: "https://t.me/YOUR_NICK",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.2 4.3 2.5 11.2c-1.2.5-1.2 1.1-.2 1.4l4.7 1.5 1.8 5.4c.2.6.3.9.9.9.4 0 .6-.2.9-.4l2.7-2.6 5.6 4.1c1 .6 1.8.3 2-1L22 5.3c.4-1.5-.6-2.2-1.8-1z"/>
            </svg>
        ),
    },
    {
        label: "GitHub",
        href: "https://github.com/YOUR",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
        ),
    },
];

export default function Nav() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <style>{`
                .nav-pill {
                    background: rgba(12, 10, 22, 0.72);
                    backdrop-filter: blur(24px) saturate(160%);
                    -webkit-backdrop-filter: blur(24px) saturate(160%);
                    border-radius: 100px;
                    border: 1px solid rgba(255,255,255,0.08);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.06),
                        0 4px 24px rgba(0,0,0,0.25),
                        0 1px 4px rgba(0,0,0,0.15);
                    position: relative;
                    pointer-events: auto;
                    display: flex;
                    align-items: center;
                    padding: 8px 14px;
                    max-width: 900px;
                    width: 100%;
                    min-width: 0;
                    overflow: hidden;
                    transition: background 0.3s ease, box-shadow 0.3s ease;
                }
                .nav-pill.scrolled {
                    background: rgba(12, 10, 22, 0.88);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.07),
                        0 8px 40px rgba(0,0,0,0.35),
                        0 2px 8px rgba(0,0,0,0.2);
                }
                .nav-divider {
                    width: 1px;
                    height: 20px;
                    background: rgba(255,255,255,0.10);
                    margin: 0 16px;
                    flex-shrink: 0;
                }
                @media (max-width: 768px) {
                    .nav-links-desktop { display: none !important; }
                    .nav-socials-desktop { display: none !important; }
                    .nav-lang-desktop { display: none !important; }
                    .nav-hamburger { display: flex !important; }
                }
            `}</style>

            <header style={{
                position: "fixed", top: 0, left: 0,
                width: "100vw", maxWidth: "100vw",
                zIndex: 100, display: "flex", justifyContent: "center",
                padding: "16px 20px", pointerEvents: "none", boxSizing: "border-box",
            }}>
                <nav className={`nav-pill${scrolled ? " scrolled" : ""}`}>

                    {/* Logo */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                        <div style={{
                            width: "32px", height: "32px", borderRadius: "9px",
                            background: "linear-gradient(135deg, #6B3FF0, #0066FF)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            boxShadow: "0 2px 8px rgba(107,63,240,0.4)", flexShrink: 0,
                        }}>
                            <svg width="15" height="15" viewBox="0 0 16 16" fill="white">
                                <path d="M3 2h4v6H3V2zm6 0h4v10H9V2zM3 10h4v4H3v-4z" opacity="0.9"/>
                            </svg>
                        </div>
                        <div style={{ lineHeight: 1.2 }}>
                            <div style={{ color: "#fff", fontWeight: 700, fontSize: "13px", letterSpacing: "-0.3px" }}>
                                YOUR NAME
                            </div>
                            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px" }}>
                                Fullstack Dev
                            </div>
                        </div>
                    </div>

                    <div className="nav-divider" />

                    {/* Nav links */}
                    <div className="nav-links-desktop" style={{ display: "flex", alignItems: "center", gap: "2px", flex: 1 }}>
                        {NAV_LINKS.map((link) => (
                            <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
                        ))}
                    </div>

                    {/* Right */}
                    <div style={{ display: "flex", alignItems: "center", gap: "2px", marginLeft: "auto" }}>
                        <div className="nav-socials-desktop" style={{ display: "flex", alignItems: "center", gap: "1px" }}>
                            {SOCIAL.map((s) => (
                                <SocialIcon key={s.label} href={s.href} label={s.label}>{s.icon}</SocialIcon>
                            ))}
                        </div>
                        <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.10)", margin: "0 8px" }} className="nav-socials-desktop" />
                        <div className="nav-lang-desktop">
                            <LangSwitcher />
                        </div>
                        <button
                            className="nav-hamburger"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Відкрити меню"
                            style={{
                                display: "none",
                                background: "linear-gradient(135deg, #6B3FF0, #0066FF)",
                                border: "none", borderRadius: "50%",
                                width: "34px", height: "34px", cursor: "pointer",
                                alignItems: "center", justifyContent: "center", flexShrink: 0,
                                boxShadow: "0 2px 8px rgba(107,63,240,0.4)",
                            }}
                        >
                            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                                <rect x="2" y="4.5" width="12" height="1.5" rx="0.75" fill="white"/>
                                <rect x="2" y="7.25" width="12" height="1.5" rx="0.75" fill="white"/>
                                <rect x="2" y="10" width="12" height="1.5" rx="0.75" fill="white"/>
                            </svg>
                        </button>
                    </div>
                </nav>
            </header>

            <NavMobile open={mobileOpen} onClose={() => setMobileOpen(false)} links={NAV_LINKS} social={SOCIAL} />
        </>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <a
            href={href} onClick={handleClick}
            style={{
                color: "rgba(255,255,255,0.6)", textDecoration: "none",
                fontSize: "13.5px", fontWeight: 500, padding: "6px 13px",
                borderRadius: "100px", transition: "color 0.2s, background 0.2s", whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#fff";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
        >
            {children}
        </a>
    );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
    return (
        <a
            href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            style={{
                color: "rgba(255,255,255,0.45)", display: "flex",
                alignItems: "center", justifyContent: "center",
                width: "32px", height: "32px", borderRadius: "50%",
                transition: "color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#fff";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
        >
            {children}
        </a>
    );
}

function LangSwitcher() {
    const [lang, setLang] = useState<"UA" | "EN">("UA");
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "1px" }}>
            {(["EN", "UA"] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)} style={{
                    background: lang === l ? "rgba(107,63,240,0.25)" : "transparent",
                    border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600,
                    padding: "4px 8px", borderRadius: "100px",
                    color: lang === l ? "#a78bfa" : "rgba(255,255,255,0.35)",
                    transition: "color 0.2s, background 0.2s", letterSpacing: "0.4px",
                }}>
                    {l}
                </button>
            ))}
        </div>
    );
}