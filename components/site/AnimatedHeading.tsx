"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

/**
 * Kinetic heading: each word rises out of an overflow mask on scroll-in.
 * Pass plain string lines; wrap accent words with the `accent` markup by
 * splitting into an array of {text, gradient} segments via `segments`.
 */
type Segment = { text: string; gradient?: boolean };

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
                                    ...(seg.gradient
                                        ? {
                                              background:
                                                  "linear-gradient(115deg, #A855F7, #6366F1, #22D3EE)",
                                              WebkitBackgroundClip: "text",
                                              backgroundClip: "text",
                                              WebkitTextFillColor: "transparent",
                                              color: "transparent",
                                          }
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

export function GradientWord({ children }: { children: ReactNode }) {
    return <span className="gradient-text">{children}</span>;
}