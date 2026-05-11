"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { FAQ } from "@/lib/constants";

function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            style={{
                borderBottom: "0.5px solid rgba(255,255,255,0.08)",
            }}
        >
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: "16px",
                    fontFamily: "inherit",
                }}
            >
        <span style={{ fontSize: "15px", fontWeight: 500, color: "#ffffff" }}>
          {question}
        </span>
                <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        fontSize: "22px",
                        color: "rgba(107,63,240,0.9)",
                        flexShrink: 0,
                        lineHeight: 1,
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
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                    >
                        <p
                            style={{
                                fontSize: "14px",
                                color: "rgba(255,255,255,0.5)",
                                lineHeight: 1.8,
                                paddingBottom: "20px",
                            }}
                        >
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQSection() {
    return (
        <section id="faq" style={{ padding: "120px 0", position: "relative" }}>
            <Container>
                <SectionTitle title="Часті питання" />
                <div style={{ maxWidth: "720px" }}>
                    {FAQ.map((item) => (
                        <FAQItem key={item.question} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </Container>
        </section>
    );
}