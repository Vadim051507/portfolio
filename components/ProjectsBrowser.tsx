"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/**
 * ProjectsBrowser — інтерактивний браузер-mockup з ротацією проєктів.
 *
 * Зміни v2:
 * - Підпис під браузером: назва проєкту + теги стеку, плавна зміна через AnimatePresence
 * - Aurora-friendly: акцент-glow підсилено для кращої взаємодії з фоном Hero
 */

type Project = {
    slug: string;
    domain: string;
    title: string;
    /** Короткий опис для підпису під браузером */
    description?: string;
    /** Теги стеку/технологій */
    tags?: readonly string[];
    image: string;
    accent?: string;
    href: string;
};

type Props = {
    projects: Project[];
    intervalMs?: number;
    showProgress?: boolean;
    appearDelay?: number;
};

const DEFAULT_INTERVAL = 4500;

export default function ProjectsBrowser({
                                            projects,
                                            intervalMs = DEFAULT_INTERVAL,
                                            showProgress = true,
                                            appearDelay = 0,
                                        }: Props) {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const progressRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const startTsRef = useRef<number>(0);
    const elapsedRef = useRef<number>(0);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const apply = () => setPrefersReducedMotion(mq.matches);
        apply();
        mq.addEventListener("change", apply);
        return () => mq.removeEventListener("change", apply);
    }, []);

    useEffect(() => {
        if (paused || prefersReducedMotion) return;

        let cancelled = false;
        startTsRef.current = performance.now() - elapsedRef.current;

        const tick = (now: number) => {
            if (cancelled) return;
            const elapsed = now - startTsRef.current;
            elapsedRef.current = elapsed;

            if (progressRef.current) {
                const pct = Math.min(100, (elapsed / intervalMs) * 100);
                progressRef.current.style.transform = `scaleX(${pct / 100})`;
            }

            if (elapsed >= intervalMs) {
                elapsedRef.current = 0;
                setActive((i) => (i + 1) % projects.length);
                startTsRef.current = now;
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => {
            cancelled = true;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [paused, prefersReducedMotion, intervalMs, projects.length]);

    const goTo = useCallback((idx: number) => {
        elapsedRef.current = 0;
        if (progressRef.current) progressRef.current.style.transform = "scaleX(0)";
        setActive(idx);
    }, []);

    const current = projects[active];

    return (
        <motion.div
            className="pb-wrap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: appearDelay, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            aria-label="Інтерактивна демонстрація проєктів"
        >
            <div
                className="pb-float"
                style={{ animation: prefersReducedMotion ? "none" : undefined }}
            >
                {/* Акцентне світіння під браузером */}
                <div
                    className="pb-accent-glow"
                    style={{ background: current.accent ?? "rgba(107,63,240,0.35)" }}
                    aria-hidden
                />

                <Link
                    href={current.href}
                    className="pb-browser"
                    aria-label={`Відкрити кейс: ${current.title}`}
                >
                    {/* Chrome */}
                    <div className="pb-chrome">
                        <div className="pb-dots">
                            <span className="pb-dot" style={{ background: "#ED6A5E" }} />
                            <span className="pb-dot" style={{ background: "#F4BF4F" }} />
                            <span className="pb-dot" style={{ background: "#61C554" }} />
                        </div>
                        <div className="pb-url">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <path
                                    d="M17 10V7a5 5 0 0 0-10 0v3M5 10h14v11H5z"
                                    stroke="#1D9E75"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={current.domain}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {current.domain}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                        <div className="pb-actions" aria-hidden>
                            <span /><span /><span />
                        </div>
                    </div>

                    {/* Екран — всі слайди в DOM, керування через opacity */}
                    <div className="pb-screen">
                        {projects.map((p, i) => (
                            <div
                                key={p.slug}
                                className={`pb-slide ${i === active ? "is-active" : ""}`}
                                aria-hidden={i !== active}
                            >
                                <Image
                                    src={p.image}
                                    alt={p.title}
                                    fill
                                    sizes="(max-width: 860px) 90vw, 580px"
                                    style={{ objectFit: "cover", objectPosition: "top center" }}
                                    priority
                                    quality={82}
                                />
                            </div>
                        ))}

                        {showProgress && !prefersReducedMotion && (
                            <div className="pb-progress-track" aria-hidden>
                                <div ref={progressRef} className="pb-progress-bar" />
                            </div>
                        )}
                    </div>
                </Link>

                {/* Індикатори */}
                <div className="pb-indicators" role="tablist" aria-label="Перемикач проєктів">
                    {projects.map((p, i) => (
                        <button
                            key={p.slug}
                            role="tab"
                            aria-selected={i === active}
                            aria-label={p.title}
                            className={`pb-ind ${i === active ? "is-active" : ""}`}
                            onClick={() => goTo(i)}
                        />
                    ))}
                </div>

                {/* ── Підпис під браузером ── */}
                <div className="pb-caption-wrap" aria-live="polite">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.slug}
                            className="pb-caption"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="pb-caption-title">{current.title}</span>
                            {current.tags && current.tags.length > 0 && (
                                <span className="pb-caption-tags">
                                    {current.tags.map((tag, i) => (
                                        <span key={tag} className="pb-caption-tag">
                                            {tag}
                                            {i < current.tags!.length - 1 && (
                                                <span className="pb-caption-dot">·</span>
                                            )}
                                        </span>
                                    ))}
                                </span>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <style jsx>{`
                .pb-wrap {
                    position: relative;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .pb-float {
                    position: relative;
                    width: 100%;
                    max-width: 580px;
                    transform: perspective(1600px) rotateY(-14deg) rotateX(6deg);
                    transform-style: preserve-3d;
                    transform-origin: 50% 50%;
                    animation: pb-float 7s ease-in-out infinite;
                    will-change: transform;
                }

                @keyframes pb-float {
                    0%, 100% { transform: perspective(1600px) rotateY(-14deg) rotateX(6deg) translateY(0); }
                    50%      { transform: perspective(1600px) rotateY(-14deg) rotateX(6deg) translateY(-12px); }
                }

                .pb-accent-glow {
                    position: absolute;
                    inset: 20px -20px -30px -20px;
                    border-radius: 50%;
                    filter: blur(70px);
                    opacity: 0.55;
                    z-index: 0;
                    transition: background 0.8s ease;
                    pointer-events: none;
                }

                .pb-browser {
                    position: relative;
                    z-index: 1;
                    display: block;
                    background: #ffffff;
                    border-radius: 14px;
                    overflow: hidden;
                    border: 0.5px solid rgba(0, 0, 0, 0.08);
                    box-shadow:
                            0 50px 100px -20px rgba(40, 30, 100, 0.45),
                            0 30px 60px -30px rgba(20, 20, 50, 0.35),
                            0 18px 36px -18px rgba(40, 40, 80, 0.28),
                            0 2px 4px rgba(0, 0, 0, 0.06);
                    text-decoration: none;
                    color: inherit;
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                    box-shadow 0.4s ease;
                }

                .pb-browser:hover {
                    transform: translateY(-3px);
                    box-shadow:
                            0 60px 120px -20px rgba(40, 30, 100, 0.55),
                            0 35px 75px -25px rgba(20, 20, 50, 0.42),
                            0 25px 55px -25px rgba(20, 20, 50, 0.32),
                            0 2px 4px rgba(0, 0, 0, 0.06);
                }

                .pb-browser:focus-visible {
                    outline: 2px solid #6B3FF0;
                    outline-offset: 4px;
                }

                .pb-chrome {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 11px 14px;
                    background: #F4F2EE;
                    border-bottom: 0.5px solid rgba(0, 0, 0, 0.06);
                }

                .pb-dots { display: flex; gap: 6px; }

                .pb-dot {
                    width: 11px; height: 11px;
                    border-radius: 50%;
                    display: inline-block;
                }

                .pb-url {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: #ffffff;
                    border: 0.5px solid rgba(0, 0, 0, 0.08);
                    border-radius: 999px;
                    padding: 5px 14px;
                    font-family: "SFMono-Regular", Menlo, Consolas, monospace;
                    font-size: 12px;
                    color: rgba(15, 14, 26, 0.6);
                    min-width: 0;
                }

                .pb-url span {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .pb-actions { display: flex; gap: 4px; }
                .pb-actions span {
                    width: 4px; height: 4px;
                    border-radius: 50%;
                    background: rgba(0, 0, 0, 0.25);
                }

                .pb-screen {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 16 / 10;
                    background: #F2F1F6;
                    overflow: hidden;
                }

                .pb-slide {
                    position: absolute;
                    inset: 0;
                    opacity: 0;
                    transform: scale(1.02);
                    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
                    pointer-events: none;
                }

                .pb-slide.is-active {
                    opacity: 1;
                    transform: scale(1);
                    pointer-events: auto;
                }

                .pb-progress-track {
                    position: absolute;
                    left: 0; right: 0; bottom: 0;
                    height: 2px;
                    background: rgba(0, 0, 0, 0.06);
                    z-index: 2;
                    pointer-events: none;
                }

                .pb-progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, #6B3FF0, #0066FF);
                    transform-origin: left center;
                    transform: scaleX(0);
                    will-change: transform;
                }

                .pb-indicators {
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                    margin-top: 18px;
                    position: relative;
                    z-index: 1;
                }

                .pb-ind {
                    width: 8px; height: 8px;
                    padding: 0;
                    border-radius: 50%;
                    border: 0;
                    background: rgba(15, 14, 26, 0.2);
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .pb-ind:hover { background: rgba(15, 14, 26, 0.4); }

                .pb-ind.is-active {
                    width: 28px;
                    border-radius: 4px;
                    background: linear-gradient(90deg, #6B3FF0, #0066FF);
                }

                /* ── Caption ── */
                .pb-caption-wrap {
                    position: relative;
                    z-index: 1;
                    height: 44px; /* фіксована висота — щоб layout не стрибав при зміні */
                    margin-top: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .pb-caption {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    text-align: center;
                }

                .pb-caption-title {
                    font-size: 13px;
                    font-weight: 600;
                    color: rgba(15, 14, 26, 0.75);
                    letter-spacing: -0.2px;
                    line-height: 1;
                }

                .pb-caption-tags {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .pb-caption-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 11px;
                    color: rgba(15, 14, 26, 0.38);
                    font-family: "SFMono-Regular", Menlo, Consolas, monospace;
                    letter-spacing: 0.1px;
                }

                .pb-caption-dot {
                    color: rgba(15, 14, 26, 0.22);
                    font-size: 10px;
                }

                /* Адаптив */
                @media (max-width: 860px) {
                    .pb-float {
                        transform: none;
                        animation: none;
                        max-width: 100%;
                    }
                    .pb-browser {
                        box-shadow:
                                0 30px 60px -20px rgba(40, 30, 100, 0.3),
                                0 15px 30px -15px rgba(20, 20, 50, 0.2);
                    }
                    .pb-accent-glow {
                        inset: 30px 0 -20px 0;
                        opacity: 0.4;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .pb-float { animation: none; }
                }
            `}</style>
        </motion.div>
    );
}