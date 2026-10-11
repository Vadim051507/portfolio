"use client";

import { useEffect } from "react";
import { useSmoothScroll } from "./SmoothScrollProvider";

type Link = { label: string; href: string };
type Social = { label: string; href: string; icon: React.ReactNode };

interface NavMobileProps {
    open: boolean;
    onClose: () => void;
    links: Link[];
    social: Social[];
}

export default function NavMobile({ open, onClose, links, social }: NavMobileProps) {
    const { scrollTo } = useSmoothScroll();

    // Close on Escape
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    const handleLinkClick = (href: string) => {
        onClose();
        setTimeout(() => scrollTo(href), 300);
    };

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(4, 18, 13, 0.7)",
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
                    background: "rgba(7, 12, 11, 0.97)",
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
                        borderBottom: "1px solid var(--border)",
                        marginBottom: "8px",
                    }}
                >
                    {/* Logo mini */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div className="logo-mark" style={{ width: "34px", height: "34px", borderRadius: "10px" }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M3 2h4v6H3V2zm6 0h4v10H9V2zM3 10h4v4H3v-4z"/>
                            </svg>
                        </div>
                        <div style={{ lineHeight: 1.2 }}>
                            <div style={{ color: "var(--text)", fontWeight: 700, fontSize: "14px" }}>YOUR NAME</div>
                            <div style={{ color: "var(--text-muted)", fontSize: "11px" }}>Fullstack Dev</div>
                        </div>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        aria-label="Закрити меню"
                        style={{
                            background: "transparent",
                            border: "1px solid var(--border-strong)",
                            borderRadius: "50%",
                            width: "38px",
                            height: "38px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--accent)",
                            transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
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
                                color: "var(--text)",
                                textDecoration: "none",
                                fontSize: "clamp(32px, 8vw, 48px)",
                                fontWeight: 700,
                                letterSpacing: "-1px",
                                padding: "10px 0",
                                display: "block",
                                borderBottom: "1px solid var(--border)",
                                transition: "color 0.2s, padding-left 0.25s",
                                opacity: open ? 1 : 0,
                                transform: open ? "translateX(0)" : "translateX(-20px)",
                                transitionDelay: open ? `${i * 60}ms` : "0ms",
                                transitionProperty: "color, padding-left, opacity, transform",
                            }}
                            onMouseEnter={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.color = "var(--accent)";
                                el.style.paddingLeft = "8px";
                            }}
                            onMouseLeave={(e) => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.color = "var(--text)";
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
                        borderTop: "1px solid var(--border)",
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
                                    color: "var(--text-muted)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "42px",
                                    height: "42px",
                                    borderRadius: "50%",
                                    border: "1px solid var(--border)",
                                    transition: "color 0.2s, border-color 0.2s, background 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.color = "var(--accent)";
                                    el.style.background = "var(--surface-2)";
                                    el.style.borderColor = "var(--border-strong)";
                                }}
                                onMouseLeave={(e) => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.color = "var(--text-muted)";
                                    el.style.background = "transparent";
                                    el.style.borderColor = "var(--border)";
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
                                    background: "transparent",
                                    border: l === "UA" ? "1px solid var(--border-strong)" : "1px solid transparent",
                                    borderRadius: "100px",
                                    color: l === "UA" ? "var(--accent)" : "var(--text-muted)",
                                    cursor: "pointer",
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    padding: "6px 14px",
                                    letterSpacing: "0.08em",
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