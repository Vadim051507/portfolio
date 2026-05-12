"use client";

import { useEffect } from "react";

type Link = { label: string; href: string };
type Social = { label: string; href: string; icon: React.ReactNode };

interface NavMobileProps {
    open: boolean;
    onClose: () => void;
    links: Link[];
    social: Social[];
}

export default function NavMobile({ open, onClose, links, social }: NavMobileProps) {
    // Close on Escape
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    const handleLinkClick = (href: string) => {
        onClose();
        setTimeout(() => {
            const el = document.querySelector(href);
            el?.scrollIntoView({ behavior: "smooth" });
        }, 300);
    };

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.6)",
                    zIndex: 198,
                    opacity: open ? 1 : 0,
                    pointerEvents: open ? "auto" : "none",
                    transition: "opacity 0.35s ease",
                }}
            />

            {/* Full-screen panel */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 199,
                    background: "rgba(10, 8, 18, 0.97)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    display: "flex",
                    flexDirection: "column",
                    padding: "0 28px 40px",
                    transform: open ? "translateY(0)" : "translateY(-100%)",
                    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    overflowY: "auto",
                }}
            >
                {/* Top bar inside overlay */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "18px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.07)",
                        marginBottom: "8px",
                    }}
                >
                    {/* Logo mini */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{
                            width: "34px", height: "34px", borderRadius: "10px",
                            background: "linear-gradient(135deg, #6B3FF0, #0066FF)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                                <path d="M3 2h4v6H3V2zm6 0h4v10H9V2zM3 10h4v4H3v-4z" opacity="0.9"/>
                            </svg>
                        </div>
                        <div style={{ lineHeight: 1.2 }}>
                            <div style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>YOUR NAME</div>
                            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>Fullstack Dev</div>
                        </div>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        aria-label="Закрити меню"
                        style={{
                            background: "rgba(255,255,255,0.08)",
                            border: "none",
                            borderRadius: "50%",
                            width: "38px",
                            height: "38px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "rgba(255,255,255,0.7)",
                            transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                            <line x1="2" y1="2" x2="14" y2="14"/>
                            <line x1="14" y1="2" x2="2" y2="14"/>
                        </svg>
                    </button>
                </div>

                {/* Nav links */}
                <nav style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "4px", paddingBottom: "24px" }}>
                    {links.map((link, i) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                            style={{
                                color: "rgba(255,255,255,0.85)",
                                textDecoration: "none",
                                fontSize: "clamp(32px, 8vw, 48px)",
                                fontWeight: 700,
                                letterSpacing: "-1px",
                                padding: "10px 0",
                                display: "block",
                                borderBottom: "1px solid rgba(255,255,255,0.06)",
                                transition: "color 0.2s, padding-left 0.25s",
                                opacity: open ? 1 : 0,
                                transform: open ? "translateX(0)" : "translateX(-20px)",
                                transitionDelay: open ? `${i * 60}ms` : "0ms",
                                transitionProperty: "color, padding-left, opacity, transform",
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.color = "#a78bfa";
                                el.style.paddingLeft = "8px";
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.color = "rgba(255,255,255,0.85)";
                                el.style.paddingLeft = "0";
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Bottom: socials + lang */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "24px",
                        borderTop: "1px solid rgba(255,255,255,0.07)",
                        opacity: open ? 1 : 0,
                        transform: open ? "translateY(0)" : "translateY(10px)",
                        transition: "opacity 0.4s ease 0.35s, transform 0.4s ease 0.35s",
                    }}
                >
                    {/* Social icons */}
                    <div style={{ display: "flex", gap: "8px" }}>
                        {social.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                style={{
                                    color: "rgba(255,255,255,0.5)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "42px",
                                    height: "42px",
                                    borderRadius: "50%",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    transition: "color 0.2s, border-color 0.2s, background 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.color = "#fff";
                                    el.style.background = "rgba(107,63,240,0.2)";
                                    el.style.borderColor = "rgba(107,63,240,0.5)";
                                }}
                                onMouseLeave={(e) => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.color = "rgba(255,255,255,0.5)";
                                    el.style.background = "transparent";
                                    el.style.borderColor = "rgba(255,255,255,0.1)";
                                }}
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>

                    {/* Lang switcher */}
                    <div style={{ display: "flex", gap: "4px" }}>
                        {(["EN", "UA"] as const).map((l) => (
                            <button
                                key={l}
                                style={{
                                    background: l === "UA" ? "rgba(167,139,250,0.15)" : "transparent",
                                    border: l === "UA" ? "1px solid rgba(167,139,250,0.4)" : "1px solid transparent",
                                    borderRadius: "100px",
                                    color: l === "UA" ? "#a78bfa" : "rgba(255,255,255,0.4)",
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    padding: "6px 14px",
                                    letterSpacing: "0.5px",
                                    transition: "all 0.2s",
                                }}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}