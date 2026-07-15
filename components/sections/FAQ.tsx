"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/site/Reveal";
import { FAQ } from "@/lib/constants";

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
            <Container>
                <SectionTitle
                    eyebrow="FAQ"
                    title="Часті питання"
                    gradientWord="питання"
                />
                <div
                    style={{
                        maxWidth: 760,
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
            </Container>
        </section>
    );
}