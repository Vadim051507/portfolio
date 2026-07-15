"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { PROCESS_STEPS } from "@/lib/constants";

export default function Process() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 65%", "end 55%"],
    });
    const fill = useSpring(scrollYProgress, {
        stiffness: 90,
        damping: 26,
        restDelta: 0.001,
    });

    return (
        <section id="process" style={{ padding: "130px 0", position: "relative" }}>
            <Container>
                <SectionTitle
                    eyebrow="Процес"
                    title="Як проходить робота"
                    gradientWord="робота"
                    subtitle="Прозоро на кожному кроці. Ви завжди знаєте, що відбувається із сайтом."
                />

                <div
                    ref={ref}
                    style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}
                >
                    {/* rail track */}
                    <div
                        style={{
                            position: "absolute",
                            left: 27,
                            top: 10,
                            bottom: 10,
                            width: 2,
                            background: "var(--border)",
                        }}
                    />
                    {/* rail fill */}
                    <motion.div
                        style={{
                            position: "absolute",
                            left: 27,
                            top: 10,
                            bottom: 10,
                            width: 2,
                            transformOrigin: "top",
                            scaleY: fill,
                            background:
                                "linear-gradient(180deg, #A855F7, #6366F1, #22D3EE)",
                            boxShadow: "0 0 14px rgba(139,92,246,0.7)",
                        }}
                    />

                    {PROCESS_STEPS.map((step, i) => (
                        <Step
                            key={step.number}
                            step={step}
                            index={i}
                            total={PROCESS_STEPS.length}
                            progress={fill}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}

function Step({
    step,
    index,
    total,
    progress,
}: {
    step: (typeof PROCESS_STEPS)[number];
    index: number;
    total: number;
    progress: ReturnType<typeof useSpring>;
}) {
    const threshold = index / (total - 1 || 1);
    // dot lights up once the fill passes this step
    const dotBg = useTransform(progress, (v) =>
        v >= threshold - 0.02 ? "#8B5CF6" : "#0B0D18"
    );
    const dotShadow = useTransform(progress, (v) =>
        v >= threshold - 0.02
            ? "0 0 22px rgba(139,92,246,0.9)"
            : "0 0 0 rgba(0,0,0,0)"
    );

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: "relative",
                display: "flex",
                gap: 28,
                paddingBottom: index === total - 1 ? 0 : 56,
            }}
        >
            {/* node */}
            <motion.div
                style={{
                    position: "relative",
                    zIndex: 1,
                    width: 56,
                    height: 56,
                    flexShrink: 0,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#fff",
                    background: dotBg,
                    border: "1px solid var(--border-strong)",
                    boxShadow: dotShadow,
                }}
            >
                {step.number}
            </motion.div>

            {/* content */}
            <div
                className="glass"
                style={{ flex: 1, padding: "22px 26px", marginTop: 2 }}
            >
                <h3
                    style={{
                        fontSize: 19,
                        fontWeight: 600,
                        color: "var(--text)",
                        marginBottom: 8,
                        letterSpacing: "-0.3px",
                    }}
                >
                    {step.title}
                </h3>
                <p
                    style={{
                        fontSize: 14.5,
                        color: "var(--text-2)",
                        lineHeight: 1.7,
                    }}
                >
                    {step.description}
                </p>
            </div>
        </motion.div>
    );
}