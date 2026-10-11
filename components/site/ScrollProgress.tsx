"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin mint rail at the very top that fills as you scroll the page. */
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            aria-hidden
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                transformOrigin: "0% 50%",
                scaleX,
                background: "var(--accent)",
                zIndex: 9999,
            }}
        />
    );
}