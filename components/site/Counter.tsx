"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/** Counts from 0 → value once it scrolls into view. */
export default function Counter({
    value,
    suffix = "",
    prefix = "",
    duration = 1600,
}: {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-20% 0px" });
    const [n, setN] = useState(0);

    useEffect(() => {
        if (!inView) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setN(value);
            return;
        }
        let raf = 0;
        const start = performance.now();
        const tick = (t: number) => {
            const p = Math.min((t - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(eased * value));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, value, duration]);

    return (
        <span ref={ref}>
            {prefix}
            {n}
            {suffix}
        </span>
    );
}