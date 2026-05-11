"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/constants";

const NAV_LINKS = [
    { label: "Послуги", href: "#services" },
    { label: "Роботи", href: "#portfolio" },
    { label: "Процес", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Контакти", href: "#contact" },
];

const linkStyle = {
    fontSize: "15px",
    color: "#666666",
    textDecoration: "none",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    padding: 0,
};

const ctaStyle = {
    fontSize: "15px",
    fontWeight: 600,
    color: "#ffffff",
    backgroundColor: "#0066FF",
    padding: "8px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
};

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (href: string) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
                backdropFilter: scrolled ? "blur(8px)" : "none",
                borderBottom: scrolled ? "1px solid #EEEEEE" : "1px solid transparent",
                transition: "all 0.3s ease",
            }}
        >
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 24px",
                    height: "64px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <button onClick={() => scrollTo("#hero")} style={{ ...linkStyle, fontWeight: 700, fontSize: "18px", color: "#0A0A0A" }}>
                    {SITE.name}
                </button>

                <nav style={{ display: "flex", gap: "32px", alignItems: "center" }}>
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.href}
                            onClick={() => scrollTo(link.href)}
                            style={linkStyle}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#0A0A0A")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
                        >
                            {link.label}
                        </button>
                    ))}
                    <button
                        onClick={() => scrollTo("#contact")}
                        style={ctaStyle}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0052CC")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0066FF")}
                    >
                        {"Зв'язатись"}
                    </button>
                </nav>
            </div>
        </header>
    );
}