"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Kinetic heading: each word rises out of an overflow mask on scroll-in.
 * Pass an array of {text, accent} segments; accent segments are painted in
 * --accent-text (mint on dark sections, deep teal on light ones).
 */
type Segment = { text: string; accent?: boolean };

export default function AnimatedHeading({
    segments,
    style,
    className,
    delay = 0,
}: {
    segments: Segment[];
    style?: React.CSSProperties;
    className?: string;
    delay?: number;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-12% 0px" });

    return (
        <h2 ref={ref} className={className} style={{ ...style }}>
            {segments.map((seg, si) => {
                const wordArr = seg.text.split(" ");
                return wordArr.map((word, wi) => {
                    if (word === "<br>") return <br key={`br-${si}-${wi}`} />;
                    const globalIndex =
                        segments
                            .slice(0, si)
                            .reduce((a, s) => a + s.text.split(" ").length, 0) + wi;
                    return (
                        <span
                            key={`${si}-${wi}`}
                            style={{
                                display: "inline-block",
                                overflow: "hidden",
                                verticalAlign: "top",
                                paddingBottom: "0.12em",
                                marginBottom: "-0.12em",
                            }}
                        >
                            <motion.span
                                style={{
                                    display: "inline-block",
                                    paddingRight: "0.26em",
                                    ...(seg.accent
                                        ? { color: "var(--accent-text)" }
                                        : {}),
                                }}
                                initial={{ y: "110%", opacity: 0 }}
                                animate={inView ? { y: "0%", opacity: 1 } : {}}
                                transition={{
                                    duration: 0.85,
                                    delay: delay + globalIndex * 0.05,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                {word}
                            </motion.span>
                        </span>
                    );
                });
            })}
        </h2>
    );
}
