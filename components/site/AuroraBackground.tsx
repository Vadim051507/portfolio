"use client";

/**
 * Global backdrop:
 *  · flat green-black canvas
 *  · a static, low-opacity teal aurora (--gradient-aurora) — felt, not seen
 *  · faint 64px blueprint grid, faded toward the edges
 * Fixed, pointer-events:none, sits behind all content.
 */
export default function AuroraBackground() {
    return (
        <div
            aria-hidden
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
                overflow: "hidden",
                pointerEvents: "none",
                background: "var(--bg)",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "var(--gradient-aurora)",
                    opacity: 0.4,
                }}
            />

            {/* Blueprint grid */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "linear-gradient(rgba(244,255,251,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(244,255,251,0.04) 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                    maskImage:
                        "radial-gradient(ellipse 90% 70% at 50% 30%, black 20%, transparent 80%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 90% 70% at 50% 30%, black 20%, transparent 80%)",
                }}
            />
        </div>
    );
}
