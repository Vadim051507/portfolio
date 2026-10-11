"use client";

import { useRef, ReactNode } from "react";

/**
 * Button that leans toward the cursor (magnetic pull) and snaps back on leave.
 * Falls back to a plain button for reduced-motion / coarse pointers.
 */
export default function MagneticButton({
    children,
    onClick,
    variant = "primary",
    strength = 0.35,
    ...rest
}: {
    children: ReactNode;
    onClick?: () => void;
    variant?: "primary" | "ghost";
    strength?: number;
    [key: string]: unknown;
}) {
    const ref = useRef<HTMLButtonElement>(null);

    const onMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia("(pointer: coarse)").matches) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const reset = () => {
        const el = ref.current;
        if (el) el.style.transform = "translate(0,0)";
    };

    // Shape and colour live in globals.css (.btn / .btn-face). The magnetic
    // pull moves the <button>; the hover shift moves the inner face, so the
    // two transforms never fight over one element.
    return (
        <button
            ref={ref}
            onClick={onClick}
            onMouseMove={onMove}
            onMouseLeave={reset}
            className={`btn ${variant === "primary" ? "btn-primary" : "btn-ghost"}`}
            {...rest}
        >
            <span className="btn-face">{children}</span>
        </button>
    );
}
