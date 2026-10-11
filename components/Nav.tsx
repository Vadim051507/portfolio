"use client";

import { useState, useEffect } from "react";
import NavMobile from "./NavMobile";
import { useSmoothScroll } from "./SmoothScrollProvider";

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
                .nav-bar {
                    background: rgba(7, 12, 11, 0.72);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid var(--border);
                    border-radius: 100px;
                    position: relative;
                    pointer-events: auto;
                    display: flex;
                    align-items: center;
                    padding: 8px 14px;
                    max-width: 900px;
                    width: 100%;
                    min-width: 0;
                    overflow: hidden;
                    transition: background 0.3s ease, border-color 0.3s ease;
                }
                .nav-bar.scrolled {
                    background: rgba(7, 12, 11, 0.92);
                    border-color: var(--border-strong);
                }
                .nav-divider {
                    width: 1px;
                    height: 20px;
                    background: var(--border-strong);
                    margin: 0 16px;
                    flex-shrink: 0;
                }
                .nav-link {
                    color: var(--text-muted);
                    text-decoration: none;
                    font-size: 13.5px;
                    font-weight: 500;
                    padding: 6px 13px;
                    border-radius: 100px;
                    white-space: nowrap;
                    transition: color 0.2s, background 0.2s;
                }
                .nav-link:hover { color: var(--text); background: var(--surface-2); }
                .nav-social {
                    color: var(--text-muted);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    transition: color 0.2s, background 0.2s;
                }
                .nav-social:hover { color: var(--accent); background: var(--surface-2); }
                .nav-lang {
                    background: transparent;
                    border: 1px solid transparent;
                    cursor: pointer;
                    font-family: var(--font-mono);
                    font-size: 11.5px;
                    font-weight: 500;
                    letter-spacing: 0.08em;
                    padding: 4px 8px;
                    border-radius: 100px;
                    color: var(--text-muted);
                    transition: color 0.2s, border-color 0.2s;
                }
                .nav-lang:hover { color: var(--text); }
                .nav-lang[aria-pressed="true"] {
                    color: var(--accent);
                    border-color: var(--border-strong);
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
                <nav className={`nav-bar${scrolled ? " scrolled" : ""}`}>

                    {/* Logo */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                        <div className="logo-mark" style={{ width: "32px", height: "32px", borderRadius: "9px" }}>
                            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M3 2h4v6H3V2zm6 0h4v10H9V2zM3 10h4v4H3v-4z"/>
                            </svg>
                        </div>
                        <div style={{ lineHeight: 1.2 }}>
                            <div style={{ color: "var(--text)", fontWeight: 700, fontSize: "13px", letterSpacing: "-0.3px" }}>
                                YOUR NAME
                            </div>
                            <div style={{ color: "var(--text-muted)", fontSize: "10px" }}>
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
                        <div style={{ width: "1px", height: "16px", background: "var(--border-strong)", margin: "0 8px" }} className="nav-socials-desktop" />
                        <div className="nav-lang-desktop">
                            <LangSwitcher />
                        </div>
                        <button
                            className="nav-hamburger"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Відкрити меню"
                            style={{
                                display: "none",
                                background: "transparent",
                                border: "1px solid var(--border-strong)",
                                borderRadius: "50%",
                                color: "var(--accent)",
                                width: "34px", height: "34px", cursor: "pointer",
                                alignItems: "center", justifyContent: "center", flexShrink: 0,
                            }}
                        >
                            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                                <rect x="2" y="4.5" width="12" height="1.5" rx="0.75" fill="currentColor"/>
                                <rect x="2" y="7.25" width="12" height="1.5" rx="0.75" fill="currentColor"/>
                                <rect x="2" y="10" width="12" height="1.5" rx="0.75" fill="currentColor"/>
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
    const { scrollTo } = useSmoothScroll();
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        scrollTo(href);
    };
    return (
        <a href={href} onClick={handleClick} className="nav-link">
            {children}
        </a>
    );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
    return (
        <a
            href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            className="nav-social"
        >
            {children}
        </a>
    );
}

function LangSwitcher() {
    const [lang, setLang] = useState<"UA" | "EN">("UA");
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            {(["EN", "UA"] as const).map((l) => (
                <button
                    key={l}
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    className="nav-lang"
                >
                    {l}
                </button>
            ))}
        </div>
    );
}
