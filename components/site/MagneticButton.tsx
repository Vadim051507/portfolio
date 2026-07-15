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

    const base: React.CSSProperties = {
        position: "relative",
        padding: "16px 34px",
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: "15px",
        letterSpacing: "0.2px",
        borderRadius: "100px",
        cursor: "pointer",
        border: "none",
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s",
        willChange: "transform",
    };

    const styles: React.CSSProperties =
        variant === "primary"
            ? {
                  ...base,
                  color: "#fff",
                  background: "linear-gradient(115deg, #A855F7, #6366F1 55%, #22D3EE)",
                  boxShadow:
                      "0 8px 30px rgba(139,92,246,0.45), inset 0 1px 0 rgba(255,255,255,0.25)",
              }
            : {
                  ...base,
                  color: "var(--text)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--border-strong)",
                  backdropFilter: "blur(8px)",
              };

    return (
        <button
            ref={ref}
            onClick={onClick}
            onMouseMove={onMove}
            onMouseLeave={reset}
            style={styles}
            {...rest}
        >
            {children}
        </button>
    );
}