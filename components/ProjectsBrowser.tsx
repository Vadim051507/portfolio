"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/**
 * ProjectsBrowser — інтерактивний браузер-mockup з ротацією проєктів.
 * Використовується в Hero як основний візуал правої колонки (заміна або
 * доповнення до SphereCanvas).
 *
 * Особливості:
 * - 3D-перспектива з плавною float-анімацією
 * - Автоматична ротація проєктів кожні 4.5с (пауза при hover)
 * - Динамічне оновлення URL у адресному рядку
 * - Точкові індикатори + клік на них для ручного перемикання
 * - Прогрес-бар автоплею знизу
 * - Reduced-motion support
 * - Lazy-loading зображень через next/image
 * - Клік на браузер → перехід на сторінку кейсу
 */

type Project = {
    /** Внутрішній slug, узгоджується з PROJECTS у lib/constants.ts */
    slug: string;
    /** Назва проєкту (показується в адресному рядку як домен) */
    domain: string;
    /** Заголовок під браузером при наведенні */
    title: string;
    /** Шлях до скріншоту в /public (наприклад "/projects/tokarchuk-dental.png") */
    image: string;
    /** Опційний акцентний колір рамки (для тонкого світіння під браузером) */
    accent?: string;
    /** Куди веде клік — як правило, /projects/{slug} */
    href: string;
};

type Props = {
    projects: Project[];
    /** Інтервал автоплею в мілісекундах. За замовч. 4500. */
    intervalMs?: number;
    /** Чи показувати прогрес-бар автоплею. За замовч. true. */
    showProgress?: boolean;
    /** Затримка появи компонента, мс. Для координації зі stagger у Hero. */
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

    // Враховуємо системну налаштування reduced motion
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const apply = () => setPrefersReducedMotion(mq.matches);
        apply();
        mq.addEventListener("change", apply);
        return () => mq.removeEventListener("change", apply);
    }, []);

    // Прогрес автоплею через requestAnimationFrame.
    // Не setInterval, щоб не накопичувався drift і щоб коректно паузити.
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

    // Скидаємо прогрес при ручному перемиканні
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
                style={{
                    // Float-анімація вимикається при reduced-motion
                    animation: prefersReducedMotion ? "none" : undefined,
                }}
            >
                {/* М'яке акцентне світіння під браузером, змінюється з проєктом */}
                <div
                    className="pb-accent-glow"
                    style={{
                        background: current.accent ?? "rgba(107,63,240,0.35)",
                    }}
                    aria-hidden
                />

                <Link
                    href={current.href}
                    className="pb-browser"
                    aria-label={`Відкрити кейс: ${current.title}`}
                >
                    {/* Chrome браузера */}
                    <div className="pb-chrome">
                        <div className="pb-dots">
                            <span className="pb-dot" style={{ background: "#ED6A5E" }} />
                            <span className="pb-dot" style={{ background: "#F4BF4F" }} />
                            <span className="pb-dot" style={{ background: "#61C554" }} />
                        </div>
                        <div className="pb-url">
                            <svg
                                width="11"
                                height="11"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden
                            >
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
                            <span />
                            <span />
                            <span />
                        </div>
                    </div>

                    {/* Екран браузера — всі слайди в DOM одночасно.
              Вмикаємо/гасимо через opacity замість unmount, щоб:
              1) браузер не перерендерював <img> при кожній зміні (плавніше)
              2) всі картинки могли завантажитись паралельно при першому візиті
              3) повернення на попередній слайд миттєве (з кешу) */}
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
                                    /* priority для всіх — браузер у Hero, видно одразу.
                                       Без цього Next.js lazy-load чекає intersection, а вони ВЖЕ у viewport. */
                                    priority
                                    /* Quality 80 — компроміс між якістю і вагою.
                                       За замовч. Next.js робить 75, для скріншотів сайтів цього мало,
                                       текст починає мутніти. 80-85 = солодке місце. */
                                    quality={82}
                                />
                            </div>
                        ))}

                        {/* Прогрес-бар автоплею */}
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
            </div>

            <style jsx>{`
                .pb-wrap {
                    position: relative;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                /* Перспектива застосована ПРЯМО до transform — не залежить від батька.
                   Це критично: коли .pb-wrap огорнутий у motion.div з opacity/scale,
                   Framer Motion створює композитний шар, який може зруйнувати
                   ланцюг perspective→child. Self-contained perspective() цьому стійка. */
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
                    /* Багатошарова тінь з реальним вертикальним зміщенням —
                       дає відчуття "браузер парить над поверхнею". Тіні зміщені вниз
                       і трохи вправо, відповідаючи нахилу rotateY(-14deg). */
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

                .pb-dots {
                    display: flex;
                    gap: 6px;
                }

                .pb-dot {
                    width: 11px;
                    height: 11px;
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

                .pb-actions {
                    display: flex;
                    gap: 4px;
                }

                .pb-actions span {
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: rgba(0, 0, 0, 0.25);
                }

                .pb-screen {
                    position: relative;
                    width: 100%;
                    /* Співвідношення сторін як у середньому ноутбуці */
                    aspect-ratio: 16 / 10;
                    background: #F2F1F6;
                    overflow: hidden;
                }

                .pb-slide {
                    position: absolute;
                    inset: 0;
                    opacity: 0;
                    /* Легке масштабування неактивних слайдів — м'який Ken Burns при появі */
                    transform: scale(1.02);
                    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
                    pointer-events: none;
                    /* Завантажуються паралельно, але неактивні не показуються */
                }

                .pb-slide.is-active {
                    opacity: 1;
                    transform: scale(1);
                    pointer-events: auto;
                }

                .pb-progress-track {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
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
                    margin-top: 22px;
                    position: relative;
                    z-index: 1;
                }

                .pb-ind {
                    width: 8px;
                    height: 8px;
                    padding: 0;
                    border-radius: 50%;
                    border: 0;
                    background: rgba(15, 14, 26, 0.2);
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .pb-ind:hover {
                    background: rgba(15, 14, 26, 0.4);
                }

                .pb-ind.is-active {
                    width: 28px;
                    border-radius: 4px;
                    background: linear-gradient(90deg, #6B3FF0, #0066FF);
                }

                /* Адаптив: на вузьких екранах прибираємо перспективу — на тачі вона
                   виглядає неприродно і ускладнює тап. Перевизначаємо keyframes теж,
                   щоб анімація не повертала transform назад. */
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