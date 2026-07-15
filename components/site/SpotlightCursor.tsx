"use client";

import { useEffect, useRef } from "react";

/**
 * A soft neon glow that lerps toward the pointer — cinematic "flashlight".
 * Disabled on touch / coarse pointers and for reduced-motion users.
 */
export default function SpotlightCursor() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const el = ref.current;
        if (!el) return;

        let tx = window.innerWidth / 2;
        let ty = window.innerHeight / 2;
        let x = tx;
        let y = ty;
        let raf = 0;

        const onMove = (e: MouseEvent) => {
            tx = e.clientX;
            ty = e.clientY;
        };

        const loop = () => {
            x += (tx - x) * 0.12;
            y += (ty - y) * 0.12;
            el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
            raf = requestAnimationFrame(loop);
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        raf = requestAnimationFrame(loop);
        el.style.opacity = "1";

        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div
            ref={ref}
            aria-hidden
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "460px",
                height: "460px",
                borderRadius: "50%",
                background:
                    "radial-gradient(circle, rgba(139,92,246,0.10) 0%, rgba(34,211,238,0.05) 35%, transparent 70%)",
                pointerEvents: "none",
                zIndex: 1,
                opacity: 0,
                transition: "opacity 0.6s ease",
                willChange: "transform",
            }}
        />
    );
}