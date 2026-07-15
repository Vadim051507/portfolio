"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

const variants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

/** Generic scroll-reveal wrapper with optional stagger delay. */
export default function Reveal({
    children,
    delay = 0,
    y = 30,
    as = "div",
    style,
    className,
}: {
    children: ReactNode;
    delay?: number;
    y?: number;
    as?: "div" | "span" | "li";
    style?: React.CSSProperties;
    className?: string;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
    const MotionTag = motion[as] as typeof motion.div;

    return (
        <MotionTag
            ref={ref}
            className={className}
            style={style}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0, y, filter: "blur(8px)" },
                visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
                },
            }}
        >
            {children}
        </MotionTag>
    );
}

export { variants as revealVariants };