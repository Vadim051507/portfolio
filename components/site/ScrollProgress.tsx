"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin neon rail at the very top that fills as you scroll the page. */
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
                height: "2.5px",
                transformOrigin: "0% 50%",
                scaleX,
                background: "linear-gradient(90deg, #A855F7, #6366F1, #22D3EE)",
                boxShadow: "0 0 12px rgba(139,92,246,0.7)",
                zIndex: 9999,
            }}
        />
    );
}