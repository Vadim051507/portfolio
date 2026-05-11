"use client";

import { useEffect, useRef } from "react";

export default function Background() {
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (!glowRef.current) return;
            glowRef.current.style.left = e.clientX + "px";
            glowRef.current.style.top = e.clientY + "px";
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    const shapes = [
        { w: 60, h: 60, top: "10%", right: "15%", dur: 6, delay: 0, br: "8px" },
        { w: 40, h: 40, top: "25%", right: "28%", dur: 8, delay: 1, br: "50%" },
        { w: 80, h: 80, top: "8%", right: "40%", dur: 7, delay: 2, br: "12px" },
        { w: 30, h: 30, top: "40%", right: "10%", dur: 5, delay: 0.5, br: "50%" },
        { w: 50, h: 50, top: "55%", right: "35%", dur: 9, delay: 1.5, br: "6px" },
        { w: 70, h: 70, top: "20%", right: "55%", dur: 7, delay: 3, br: "50%" },
        { w: 35, h: 35, top: "65%", right: "20%", dur: 6, delay: 2, br: "4px" },
        { w: 55, h: 55, top: "75%", right: "45%", dur: 8, delay: 0.8, br: "50%" },
    ];

    return (
        <>
            {/* Static glows */}
            <div style={{
                position: "absolute", width: "700px", height: "700px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(107,63,240,0.3) 0%, transparent 65%)",
                top: "-200px", left: "-150px", pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0,100,255,0.2) 0%, transparent 65%)",
                top: "100px", right: "-100px", pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", width: "400px", height: "400px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(120,40,200,0.15) 0%, transparent 65%)",
                bottom: "-100px", left: "30%", pointerEvents: "none",
            }} />

            {/* Dot grid */}
            <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                pointerEvents: "none",
                maskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 100%)",
            }} />

            {/* Floating shapes */}
            {shapes.map((s, i) => (
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        width: s.w, height: s.h,
                        top: s.top, right: s.right,
                        borderRadius: s.br,
                        border: "1px solid rgba(107,63,240,0.25)",
                        background: "rgba(107,63,240,0.04)",
                        pointerEvents: "none",
                        animation: `float${i % 3} ${s.dur}s ease-in-out ${s.delay}s infinite`,
                    }}
                />
            ))}

            {/* Cursor glow */}
            <div
                ref={glowRef}
                style={{
                    position: "fixed", width: "500px", height: "500px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(107,63,240,0.07) 0%, transparent 70%)",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none", zIndex: 0,
                    transition: "left 0.15s ease, top 0.15s ease",
                }}
            />

            <style>{`
        @keyframes float0 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, -15px) rotate(180deg); }
        }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(45deg); }
          50% { transform: translate(-8px, 12px) rotate(225deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(20deg); }
          50% { transform: translate(12px, 8px) rotate(200deg); }
        }
      `}</style>
        </>
    );

}
