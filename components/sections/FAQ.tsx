"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/site/Reveal";
import Icon from "@/components/site/Icons";
import { FAQ, SITE } from "@/lib/constants";

function FAQItem({
    question,
    answer,
    index,
}: {
    question: string;
    answer: string;
    index: number;
}) {
    const [open, setOpen] = useState(false);

    return (
        <Reveal delay={index * 0.05} y={20}>
            <div
                className="glass"
                style={{
                    borderColor: open ? "var(--border-strong)" : "var(--border)",
                    transition: "border-color 0.3s",
                    overflow: "hidden",
                }}
            >
                <button
                    onClick={() => setOpen(!open)}
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "22px 26px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        gap: 16,
                        fontFamily: "inherit",
                    }}
                >
                    <span
                        style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "var(--text)",
                            fontFamily: "var(--font-display)",
                        }}
                    >
                        {question}
                    </span>
                    <motion.span
                        animate={{ rotate: open ? 135 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            width: 30,
                            height: 30,
                            flexShrink: 0,
                            display: "grid",
                            placeItems: "center",
                            borderRadius: 9,
                            background: open
                                ? "linear-gradient(135deg,#A855F7,#22D3EE)"
                                : "rgba(255,255,255,0.05)",
                            color: open ? "#fff" : "var(--violet-bright)",
                            fontSize: 20,
                            lineHeight: 1,
                            transition: "background 0.3s",
                        }}
                    >
                        +
                    </motion.span>
                </button>

                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            style={{ overflow: "hidden" }}
                        >
                            <p
                                style={{
                                    fontSize: 14.5,
                                    color: "var(--text-2)",
                                    lineHeight: 1.8,
                                    padding: "0 26px 24px",
                                }}
                            >
                                {answer}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Reveal>
    );
}

export default function FAQSection() {
    return (
        <section id="faq" style={{ padding: "130px 0", position: "relative" }}>
            <style>{`
                .faq-grid {
                    display: grid;
                    grid-template-columns: 1fr 360px;
                    gap: 48px;
                    align-items: start;
                }
                .faq-aside { position: sticky; top: 110px; }
                @media (max-width: 900px) {
                    .faq-grid { grid-template-columns: 1fr; gap: 32px; }
                    .faq-aside { position: static; }
                }
            `}</style>
            <Container>
                <SectionTitle
                    eyebrow="FAQ"
                    title="Часті питання"
                    gradientWord="питання"
                />

                <div className="faq-grid">
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 12,
                        }}
                    >
                        {FAQ.map((item, i) => (
                            <FAQItem
                                key={item.question}
                                question={item.question}
                                answer={item.answer}
                                index={i}
                            />
                        ))}
                    </div>

                    {/* Side card — fills the empty space with a CTA */}
                    <Reveal delay={0.1} className="faq-aside">
                        <div
                            className="glass"
                            style={{
                                padding: 30,
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                aria-hidden
                                style={{
                                    position: "absolute",
                                    top: "-40%",
                                    right: "-20%",
                                    width: 260,
                                    height: 260,
                                    borderRadius: "50%",
                                    background:
                                        "radial-gradient(circle, rgba(139,92,246,0.3), transparent 65%)",
                                    filter: "blur(24px)",
                                    pointerEvents: "none",
                                }}
                            />
                            <div style={{ position: "relative" }}>
                                <div
                                    style={{
                                        width: 52,
                                        height: 52,
                                        borderRadius: 14,
                                        display: "grid",
                                        placeItems: "center",
                                        color: "#fff",
                                        background:
                                            "linear-gradient(135deg,#8B5CF6,#22D3EE)",
                                        boxShadow:
                                            "0 6px 22px rgba(139,92,246,0.45)",
                                        marginBottom: 20,
                                    }}
                                >
                                    <Icon name="message" size={24} />
                                </div>
                                <h3
                                    style={{
                                        fontSize: 21,
                                        fontWeight: 700,
                                        color: "var(--text)",
                                        letterSpacing: "-0.3px",
                                        marginBottom: 10,
                                    }}
                                >
                                    Не знайшли відповідь?
                                </h3>
                                <p
                                    style={{
                                        fontSize: 14.5,
                                        color: "var(--text-2)",
                                        lineHeight: 1.7,
                                        marginBottom: 22,
                                    }}
                                >
                                    Напишіть мені напряму — відповім протягом дня і
                                    безкоштовно проконсультую щодо вашого проєкту.
                                </p>

                                <a
                                    href={SITE.telegram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 10,
                                        width: "100%",
                                        justifyContent: "center",
                                        padding: "14px 20px",
                                        borderRadius: 12,
                                        textDecoration: "none",
                                        color: "#fff",
                                        fontFamily: "var(--font-display)",
                                        fontWeight: 600,
                                        fontSize: 15,
                                        background:
                                            "linear-gradient(115deg,#A855F7,#6366F1 55%,#22D3EE)",
                                        boxShadow:
                                            "0 8px 26px rgba(139,92,246,0.4)",
                                    }}
                                >
                                    <Icon name="telegram" size={18} />
                                    Написати в Telegram
                                </a>

                                <div
                                    style={{
                                        marginTop: 24,
                                        paddingTop: 22,
                                        borderTop: "1px solid var(--border)",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 14,
                                    }}
                                >
                                    {[
                                        { icon: "clock", t: "Відповідь протягом дня" },
                                        { icon: "shield", t: "Без передоплати" },
                                        { icon: "check", t: "Безкоштовна консультація" },
                                    ].map((r) => (
                                        <div
                                            key={r.t}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 12,
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color: "var(--cyan)",
                                                    display: "grid",
                                                    placeItems: "center",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <Icon name={r.icon} size={18} />
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: 14,
                                                    color: "var(--text-2)",
                                                }}
                                            >
                                                {r.t}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}