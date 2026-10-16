"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Container from "@/components/ui/Container";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import { SITE } from "@/lib/constants";

const HeroShowcase = dynamic(() => import("@/components/site/HeroShowcase"), {
    ssr: false,
});
const ParticleTrail = dynamic(() => import("@/components/ParticleTrail"), {
    ssr: false,
});

export default function Hero() {
    const { scrollTo } = useSmoothScroll();

    return (
        <section
            id="hero"
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                paddingTop: "140px",
                paddingBottom: "90px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <style>{`
                .hero-grid {
                    display: grid;
                    grid-template-columns: 1.05fr 0.95fr;
                    gap: 56px;
                    align-items: center;
                }
                .hero-grid > * { min-width: 0; }
                @media (max-width: 900px) {
                    .hero-grid { grid-template-columns: 1fr; gap: 64px; }
                    .hero-visual { order: -1; }
                }

                /* Headline: three fixed lines on wide screens; on narrow ones
                   the lines flow inline and the nowrap groups keep the
                   short words from ending up alone on a line. */
                .hero-title {
                    font-family: var(--font-display);
                    font-size: clamp(36px, 5.4vw, 72px);
                    font-weight: 700;
                    line-height: 1.05;
                    letter-spacing: -0.02em;
                    margin-bottom: 26px;
                    color: var(--text);
                }
                .hero-line { display: block; }
                .hero-keep { white-space: nowrap; }
                @media (max-width: 560px) {
                    .hero-line { display: inline; }
                    .hero-title { text-wrap: balance; }
                }

                /* Load-in: opacity + transform only, set in CSS so the H1
                   is in the server HTML and paints without waiting for JS. */
                @keyframes hero-in {
                    from { opacity: 0; transform: translateY(14px); }
                    to { opacity: 1; transform: none; }
                }
                .hero-in {
                    animation: hero-in 450ms cubic-bezier(0.16, 1, 0.3, 1) both;
                }
                .hero-in-2 { animation-delay: 100ms; }
                .hero-in-3 { animation-delay: 200ms; }
                @media (prefers-reduced-motion: reduce) {
                    .hero-in { animation: none; }
                }

                /* Hero CTAs: no pull toward the cursor and no face shift,
                   only a colour / glow change on hover. */
                .hero-cta .btn {
                    will-change: auto;
                    transition: filter 0.2s;
                }
                .hero-cta .btn-face {
                    transition: background-color 0.2s, border-color 0.2s;
                }
                .hero-cta .btn:hover .btn-face,
                .hero-cta .btn:active .btn-face { transform: none; }
            `}</style>

            {/* Original hero S-curve trail (scoped to the hero) */}
            <ParticleTrail />

            <Container>
                <div className="hero-grid" style={{ position: "relative", zIndex: 2 }}>
                    {/* ── Text column ── */}
                    <div>
                        <h1 className="hero-title hero-in">
                            <span className="hero-line">
                                Сайти, <span className="hero-keep">через які</span>{" "}
                            </span>
                            <span className="hero-line">
                                вас <span className="gradient-text">знаходять</span>{" "}
                            </span>
                            <span className="hero-line">
                                <span className="gradient-text hero-keep">у Google</span>
                            </span>
                        </h1>

                        <p
                            className="hero-in hero-in-2"
                            style={{
                                fontSize: 18,
                                color: "var(--text-muted)",
                                lineHeight: 1.7,
                                maxWidth: 490,
                                marginBottom: 36,
                            }}
                        >
                            Для клінік, майстерень і локальних послуг. Швидкі, з
                            налаштованим пошуком, із ціною до початку роботи.
                        </p>

                        <div
                            className="hero-cta hero-in hero-in-3"
                            style={{
                                display: "flex",
                                gap: 16,
                                flexWrap: "wrap",
                                alignItems: "center",
                            }}
                        >
                            <a
                                href={SITE.telegram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                <span className="btn-face">
                                    Обговорити проєкт
                                </span>
                            </a>
                            <a
                                href="#portfolio"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollTo("#portfolio");
                                }}
                                className="btn btn-ghost"
                            >
                                <span className="btn-face">Подивитись роботи</span>
                            </a>
                        </div>
                    </div>

                    {/* ── Visual column ── */}
                    <motion.div
                        className="hero-visual"
                        initial={{ opacity: 0, scale: 0.94, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <HeroShowcase />
                    </motion.div>
                </div>
            </Container>

            {/* scroll hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                style={{
                    position: "absolute",
                    bottom: 28,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                }}
                className="meta-label"
            >
                Гортайте
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    style={{
                        width: 22,
                        height: 34,
                        borderRadius: 12,
                        border: "1px solid var(--border-strong)",
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: 6,
                    }}
                >
                    <span
                        style={{
                            width: 3,
                            height: 7,
                            borderRadius: 3,
                            background: "var(--accent)",
                        }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}