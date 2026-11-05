"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Kinetic heading: each word rises out of an overflow mask on scroll-in.
 * Pass an array of {text, accent} segments. Accent segments get the
 * .accent-word class: mint text on dark; on a light surface a mint marker
 * that is drawn in from the left once the heading is in view (CSS, driven
 * by data-inview below — see globals.css).
 */

// The marker takes 700ms for the whole accent segment, however many words
// it has, and starts when the words have mostly risen into place.
const MARKER_MS = 700;
const MARKER_DELAY_MS = 350;
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

    // The words are split into animated spans, so the heading's accessible
    // name is given in one piece; the spans themselves are aria-hidden.
    const label = segments
        .map((s) => s.text.replace(/<br>/g, " "))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

    return (
        <h2
            ref={ref}
            className={className}
            data-inview={inView}
            aria-label={label}
            style={{ ...style }}
        >
            {segments.map((seg, si) => {
                const wordArr = seg.text.split(" ");
                return wordArr.map((word, wi) => {
                    if (word === "<br>") return <br key={`br-${si}-${wi}`} />;
                    const globalIndex =
                        segments
                            .slice(0, si)
                            .reduce((a, s) => a + s.text.split(" ").length, 0) + wi;
                    const first = wi === 0;
                    const last = wi === wordArr.length - 1;
                    // Inside an accent segment the word gap belongs to the
                    // word itself, so the marker runs unbroken across it.
                    const joined = seg.accent && !last;
                    return (
                        <span
                            key={`${si}-${wi}`}
                            aria-hidden="true"
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
                                    paddingRight: joined ? 0 : "0.26em",
                                }}
                                initial={{ y: "110%", opacity: 0 }}
                                animate={inView ? { y: "0%", opacity: 1 } : {}}
                                transition={{
                                    duration: 0.85,
                                    delay: delay + globalIndex * 0.05,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                {seg.accent ? (
                                    <span
                                        className="accent-word"
                                        data-first={first ? "" : undefined}
                                        data-last={last ? "" : undefined}
                                        style={
                                            {
                                                paddingRight: joined
                                                    ? "0.26em"
                                                    : undefined,
                                                "--mk-dur": `${MARKER_MS / wordArr.length}ms`,
                                                "--mk-delay": `${
                                                    MARKER_DELAY_MS +
                                                    (delay + (globalIndex - wi) * 0.05) * 1000 +
                                                    (wi * MARKER_MS) / wordArr.length
                                                }ms`,
                                                "--mk-ease": last
                                                    ? "ease-out"
                                                    : "linear",
                                            } as React.CSSProperties
                                        }
                                    >
                                        {word}
                                    </span>
                                ) : (
                                    word
                                )}
                            </motion.span>
                            {/* a real space for the HTML text (crawlers,
                                copy-paste); a trailing space inside an
                                inline-block takes no room */}
                            {" "}
                        </span>
                    );
                });
            })}
        </h2>
    );
}
