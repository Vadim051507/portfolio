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
                className="card card-clip"
                style={{
                    borderColor: open ? "var(--border-strong)" : "var(--border)",
                }}
            >
                <button
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
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
                        borderRadius: "inherit",
                        outlineOffset: -4,
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
                            borderRadius: "50%",
                            border: "1px solid var(--border-strong)",
                            background: open ? "var(--accent)" : "transparent",
                            color: open
                                ? "var(--text-on-accent)"
                                : "var(--accent-text)",
                            fontSize: 20,
                            lineHeight: 1,
                            transition: "background 0.3s, color 0.3s",
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
                                    color: "var(--text-muted)",
                                    lineHeight: 1.8,
                                    padding: "0 26px 24px 61px",
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
                    accentWord="питання"
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
                        <div className="card" style={{ padding: 30 }}>
                            <div style={{ position: "relative" }}>
                                <div
                                    className="tile"
                                    style={{
                                        width: 52,
                                        height: 52,
                                        borderRadius: 18,
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
                                        color: "var(--text-muted)",
                                        lineHeight: 1.7,
                                        marginBottom: 22,
                                    }}
                                >
                                    Напишіть мені напряму: відповім протягом дня і
                                    безкоштовно проконсультую щодо вашого проєкту.
                                </p>

                                <a
                                    href={SITE.telegram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                    style={{ display: "flex" }}
                                >
                                    <span
                                        className="btn-face"
                                        style={{ padding: "14px 20px" }}
                                    >
                                        <Icon name="telegram" size={18} />
                                        Написати в Telegram
                                    </span>
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
                                                    color: "var(--accent-text)",
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
                                                    color: "var(--text-muted)",
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