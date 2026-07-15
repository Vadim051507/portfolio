"use client";

/**
 * Global cinematic backdrop:
 *  · deep radial vignette
 *  · slowly drifting neon aurora blobs
 *  · faint blueprint grid faded at edges
 * Everything is fixed, pointer-events:none, sits behind all content (z:-2).
 */
export default function AuroraBackground() {
    return (
        <div
            aria-hidden
            style={{
                position: "fixed",
                inset: 0,
                zIndex: -2,
                overflow: "hidden",
                pointerEvents: "none",
                background:
                    "radial-gradient(120% 120% at 50% -10%, #0B0D1C 0%, #05060C 55%, #04040A 100%)",
            }}
        >
            {/* Aurora blobs */}
            <div
                className="aurora-blob"
                style={{
                    position: "absolute",
                    top: "-18%",
                    left: "-8%",
                    width: "62vw",
                    height: "62vw",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(139,92,246,0.30) 0%, transparent 62%)",
                    filter: "blur(40px)",
                    animation: "aurora-drift 26s ease-in-out infinite",
                }}
            />
            <div
                className="aurora-blob"
                style={{
                    position: "absolute",
                    top: "8%",
                    right: "-14%",
                    width: "52vw",
                    height: "52vw",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(34,211,238,0.20) 0%, transparent 62%)",
                    filter: "blur(46px)",
                    animation: "aurora-drift 32s ease-in-out infinite reverse",
                }}
            />
            <div
                className="aurora-blob"
                style={{
                    position: "absolute",
                    bottom: "-24%",
                    left: "28%",
                    width: "58vw",
                    height: "58vw",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 60%)",
                    filter: "blur(50px)",
                    animation: "aurora-drift 38s ease-in-out infinite",
                }}
            />

            {/* Blueprint grid */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
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