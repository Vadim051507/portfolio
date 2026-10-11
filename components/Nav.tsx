"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
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

// Scroll thresholds for the two sizes. Two of them, so the bar does not
// flicker when the page rests right at the edge.
const COMPACT_AFTER = 32;
const EXPAND_BEFORE = 12;
// Same idea for the dark/light glass switch, in px around the bar's centre.
const SURFACE_SLACK = 4;

export default function Nav() {
    const [mobileOpen, setMobileOpen] = useState(false);
    // The large bar exists only on the landing; case pages are compact from
    // the start. (CSS further limits it to 1024px and up.)
    const isHome = usePathname() === "/";
    const [scrolled, setScrolled] = useState(!isHome);
    const [surface, setSurface] = useState<"dark" | "light">("dark");
    // Until the first measurement has landed the bar is hidden and its size
    // transitions are off, so a reload in the middle of the page neither
    // flashes the large bar nor animates it shrinking.
    const [ready, setReady] = useState(false);
    const barRef = useRef<HTMLElement>(null);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    useLayoutEffect(() => {
        let isScrolled = !isHome || window.scrollY > COMPACT_AFTER;
        let isLight = false;

        const measure = () => {
            const y = window.scrollY;
            if (!isHome) isScrolled = true;
            else if (!isScrolled && y > COMPACT_AFTER) isScrolled = true;
            else if (isScrolled && y < EXPAND_BEFORE) isScrolled = false;
            setScrolled(isScrolled);

            // Light glass while a light surface (the sheet, the Contact
            // card) lies under the bar's centre line.
            const bar = barRef.current;
            if (!bar) return;
            const r = bar.getBoundingClientRect();
            const cy = r.top + r.height / 2;
            const slack = isLight ? -SURFACE_SLACK : SURFACE_SLACK;
            let over = false;
            document.querySelectorAll('[data-theme="light"]').forEach((el) => {
                const b = el.getBoundingClientRect();
                if (b.top <= cy - slack && b.bottom >= cy + slack) over = true;
            });
            isLight = over;
            setSurface(over ? "light" : "dark");
        };

        measure();
        const readyId = requestAnimationFrame(() => setReady(true));

        let frame = 0;
        const onScroll = () => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                measure();
            });
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            cancelAnimationFrame(readyId);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [isHome]);

    return (
        <>
            <style>{`
                /* ── Liquid glass bar ──
                   Compact size (after scroll, mobile, case pages) is the
                   base; the large Hero size is the override further down. */
                .nav-shell {
                    position: fixed;
                    top: 16px;
                    left: 0;
                    width: 100vw;
                    max-width: 100vw;
                    z-index: 100;
                    display: flex;
                    justify-content: center;
                    padding: 0 20px;
                    pointer-events: none;
                    box-sizing: border-box;
                }
                .nav-bar {
                    --nav-ease: cubic-bezier(0.22, 1, 0.36, 1);
                    --nav-tint: rgba(255, 255, 255, 0.1);
                    --nav-rule: rgba(255, 255, 255, 0.2);
                    position: relative;
                    pointer-events: auto;
                    display: flex;
                    align-items: center;
                    padding: 8px 14px;
                    max-width: 900px;
                    width: 100%;
                    min-width: 0;
                    overflow: hidden;
                    border-radius: 100px;
                    /* white sheen over an ink tint: the tint keeps the labels
                       readable above the hero particles */
                    background-color: rgba(7, 12, 11, 0.5);
                    background-image: linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 45%, rgba(33,241,168,0.06) 100%);
                    -webkit-backdrop-filter: blur(20px) saturate(1.8) brightness(1.08);
                    backdrop-filter: blur(20px) saturate(1.8) brightness(1.08);
                    border: 1px solid rgba(255, 255, 255, 0.14);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.38),
                        inset 0 -1px 0 rgba(255,255,255,0.06),
                        inset 0 0 22px rgba(255,255,255,0.05),
                        0 12px 32px rgba(0,0,0,0.38);
                    transition: opacity 0.3s ease, background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
                }
                /* Hidden until the first measurement: the server cannot know
                   the scroll position, so without this a reload in the
                   middle of the page would flash the large bar. */
                .nav-shell[data-ready="false"] > .nav-bar { opacity: 0; }
                /* bright rim, strongest in two opposite corners */
                .nav-bar::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    z-index: 1;
                    border-radius: inherit;
                    padding: 1px;
                    background: linear-gradient(120deg, rgba(255,255,255,0.55), rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.25));
                    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    pointer-events: none;
                }
                /* light glass: a second layer faded in, because a gradient
                   background cannot be transitioned itself */
                .nav-bar::after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    border-radius: inherit;
                    background: linear-gradient(135deg, rgba(255,255,255,0.86), rgba(255,255,255,0.72));
                    opacity: 0;
                    transition: opacity 0.25s ease;
                    pointer-events: none;
                }
                .nav-bar > * { position: relative; z-index: 2; }

                /* Over the light sheet or the Contact card. The tokens are
                   re-pointed here, so every label inside follows. */
                .nav-bar[data-surface="light"] {
                    --text: #07110E;
                    /* a shade deeper than the sheet's muted text: the glass
                       also passes over dark screenshots */
                    --text-muted: #3A4F49;
                    --nav-tint: rgba(7, 17, 14, 0.07);
                    --nav-rule: rgba(7, 17, 14, 0.18);
                    background-color: transparent;
                    -webkit-backdrop-filter: blur(20px) saturate(1.6);
                    backdrop-filter: blur(20px) saturate(1.6);
                    border-color: rgba(7, 17, 14, 0.10);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.9),
                        0 10px 30px rgba(7,17,14,0.12);
                }
                .nav-bar[data-surface="light"]::after { opacity: 1; }

                .nav-brand { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
                .nav-logo { width: 32px; height: 32px; border-radius: 9px; }
                .nav-logo svg { width: 15px; height: 15px; }
                .nav-name {
                    color: var(--text);
                    font-weight: 700;
                    font-size: 13px;
                    letter-spacing: -0.3px;
                    line-height: 1.2;
                    transition: color 0.25s;
                }
                .nav-role { color: var(--text-muted); font-size: 10px; line-height: 1.2; transition: color 0.25s; }
                .nav-divider {
                    width: 1px;
                    height: 20px;
                    background: var(--nav-rule);
                    margin: 0 16px;
                    flex-shrink: 0;
                }
                .nav-divider-sm { height: 16px; margin: 0 8px; }
                .nav-links-desktop { display: flex; align-items: center; gap: 2px; flex: 1; }
                .nav-right { display: flex; align-items: center; gap: 2px; margin-left: auto; }
                .nav-socials-desktop { display: flex; align-items: center; gap: 1px; }
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
                .nav-link:hover { color: var(--text); background: var(--nav-tint); }
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
                .nav-social:hover { color: var(--accent); background: var(--nav-tint); }
                .nav-bar[data-surface="light"] .nav-social:hover { color: var(--text); }
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
                    transition: color 0.2s, border-color 0.2s, background 0.2s;
                }
                .nav-lang:hover { color: var(--text); }
                /* active language: a chip of slightly lighter glass */
                .nav-lang[aria-pressed="true"] {
                    color: var(--accent);
                    background: rgba(255, 255, 255, 0.12);
                    border-color: rgba(255, 255, 255, 0.2);
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.28);
                }
                .nav-bar[data-surface="light"] .nav-lang[aria-pressed="true"] {
                    color: var(--text);
                    background: rgba(33, 241, 168, 0.3);
                    border-color: rgba(0, 105, 92, 0.25);
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
                }
                .nav-hamburger { display: none; width: 34px; height: 34px; }
                .nav-bar[data-surface="light"] .nav-hamburger {
                    color: var(--text);
                    background: rgba(255, 255, 255, 0.55);
                    border-color: rgba(7, 17, 14, 0.14);
                }
                .nav-bar[data-surface="light"] :focus-visible { outline-color: #00695C; }

                /* ── Hero size: top of the landing, desktop only ── */
                @media (min-width: 1024px) {
                    .nav-shell[data-scrolled="false"] { top: 24px; }
                    [data-scrolled="false"] > .nav-bar {
                        max-width: min(1240px, calc(100vw - 48px));
                        padding: 13px 28px;
                    }
                    [data-scrolled="false"] .nav-brand { gap: 14px; }
                    [data-scrolled="false"] .nav-logo { width: 44px; height: 44px; border-radius: 12px; }
                    [data-scrolled="false"] .nav-logo svg { width: 20px; height: 20px; }
                    [data-scrolled="false"] .nav-name { font-size: 15px; }
                    [data-scrolled="false"] .nav-role { font-size: 11.5px; }
                    [data-scrolled="false"] .nav-divider { margin: 0 24px; }
                    [data-scrolled="false"] .nav-divider-sm { margin: 0 14px; }
                    [data-scrolled="false"] .nav-links-desktop { gap: 8px; }
                    [data-scrolled="false"] .nav-link { font-size: 14.5px; padding: 8px 16px; }
                    [data-scrolled="false"] .nav-socials-desktop { gap: 6px; }
                    [data-scrolled="false"] .nav-social { width: 36px; height: 36px; }
                    [data-scrolled="false"] .nav-lang { font-size: 12.5px; padding: 5px 10px; }

                    /* backdrop-filter is deliberately not in any of these lists */
                    .nav-shell[data-ready="true"] { transition: top 0.48s cubic-bezier(0.22, 1, 0.36, 1); }
                    [data-ready="true"] > .nav-bar {
                        transition:
                            max-width 0.48s var(--nav-ease),
                            padding 0.48s var(--nav-ease),
                            opacity 0.3s ease,
                            background-color 0.25s ease,
                            border-color 0.25s ease,
                            box-shadow 0.25s ease;
                    }
                    [data-ready="true"] .nav-brand,
                    [data-ready="true"] .nav-links-desktop,
                    [data-ready="true"] .nav-socials-desktop { transition: gap 0.48s var(--nav-ease); }
                    [data-ready="true"] .nav-logo,
                    [data-ready="true"] .nav-logo svg {
                        transition: width 0.48s var(--nav-ease), height 0.48s var(--nav-ease), border-radius 0.48s var(--nav-ease);
                    }
                    [data-ready="true"] .nav-name,
                    [data-ready="true"] .nav-role { transition: font-size 0.48s var(--nav-ease), color 0.25s; }
                    [data-ready="true"] .nav-divider { transition: margin 0.48s var(--nav-ease); }
                    [data-ready="true"] .nav-link {
                        transition: font-size 0.48s var(--nav-ease), padding 0.48s var(--nav-ease), color 0.2s, background 0.2s;
                    }
                    [data-ready="true"] .nav-social {
                        transition: width 0.48s var(--nav-ease), height 0.48s var(--nav-ease), color 0.2s, background 0.2s;
                    }
                    [data-ready="true"] .nav-lang {
                        transition: font-size 0.48s var(--nav-ease), padding 0.48s var(--nav-ease), color 0.2s, border-color 0.2s, background 0.2s;
                    }
                }

                @media (max-width: 768px) {
                    .nav-links-desktop { display: none !important; }
                    .nav-socials-desktop { display: none !important; }
                    .nav-lang-desktop { display: none !important; }
                    .nav-hamburger { display: flex; }
                }

                /* No glass without backdrop-filter: go opaque instead. */
                @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
                    .nav-bar,
                    .nav-bar[data-surface="light"] { background-color: rgba(7, 12, 11, 0.92); }
                    .nav-bar::after { background: rgba(255, 255, 255, 0.94); }
                }

                /* Both the size and the glass switch instantly. */
                @media (prefers-reduced-motion: reduce) {
                    .nav-shell,
                    .nav-shell * { transition-duration: 0s !important; }
                }
            `}</style>
            <noscript>
                <style>{`.nav-shell > .nav-bar { opacity: 1 !important; }`}</style>
            </noscript>

            <header className="nav-shell" data-scrolled={scrolled} data-ready={ready}>
                <nav ref={barRef} className="nav-bar" data-surface={surface}>

                    {/* Logo */}
                    <div className="nav-brand">
                        <div className="logo-mark nav-logo">
                            <svg viewBox="0 0 16 16" fill="currentColor">
                                <path d="M3 2h4v6H3V2zm6 0h4v10H9V2zM3 10h4v4H3v-4z"/>
                            </svg>
                        </div>
                        <div>
                            <div className="nav-name">YOUR NAME</div>
                            <div className="nav-role">Fullstack Dev</div>
                        </div>
                    </div>

                    <div className="nav-divider" />

                    {/* Nav links */}
                    <div className="nav-links-desktop">
                        {NAV_LINKS.map((link) => (
                            <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
                        ))}
                    </div>

                    {/* Right */}
                    <div className="nav-right">
                        <div className="nav-socials-desktop">
                            {SOCIAL.map((s) => (
                                <SocialIcon key={s.label} href={s.href} label={s.label}>{s.icon}</SocialIcon>
                            ))}
                        </div>
                        <div className="nav-divider nav-divider-sm nav-socials-desktop" />
                        <div className="nav-lang-desktop">
                            <LangSwitcher />
                        </div>
                        <button
                            className="nav-hamburger glass-chip"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Відкрити меню"
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
