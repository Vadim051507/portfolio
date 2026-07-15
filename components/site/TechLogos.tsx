import React from "react";

/**
 * Recognizable brand logos built from reliable SVG primitives (no external
 * assets). Rendered in each brand's colour so the marquee reads as real tech.
 */
export type TechLogo = { name: string; node: React.ReactNode };

const S = 26;
const box = (children: React.ReactNode) => (
    <svg width={S} height={S} viewBox="0 0 24 24" aria-hidden>
        {children}
    </svg>
);

export const TECH_LOGOS: TechLogo[] = [
    {
        name: "Next.js",
        node: box(
            <>
                <circle cx="12" cy="12" r="11" fill="#000" />
                <circle cx="12" cy="12" r="11" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                <path d="M8 16.5V7.5l8 9.5" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15.4 7.5v6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </>
        ),
    },
    {
        name: "React",
        node: box(
            <g fill="none" stroke="#61DAFB" strokeWidth="1">
                <circle cx="12" cy="12" r="2" fill="#61DAFB" stroke="none" />
                <ellipse cx="12" cy="12" rx="11" ry="4.2" />
                <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" />
            </g>
        ),
    },
    {
        name: "TypeScript",
        node: box(
            <>
                <rect width="24" height="24" rx="3" fill="#3178C6" />
                <text x="12" y="17" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily="var(--font-display), sans-serif">TS</text>
            </>
        ),
    },
    {
        name: "Tailwind CSS",
        node: box(
            <path
                fill="#38BDF8"
                d="M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.92 1.35C13.42 10.8 14.55 12 17 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.92-1.35C15.58 7.2 14.45 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.92 1.35C8.42 16.8 9.55 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.92-1.35C10.58 13.2 9.45 12 7 12z"
            />
        ),
    },
    {
        name: "Node.js",
        node: box(
            <>
                <path
                    d="M12 2 21 7v10l-9 5-9-5V7z"
                    fill="none"
                    stroke="#539E43"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                />
                <text x="12" y="15.5" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#539E43" fontFamily="var(--font-display), sans-serif">node</text>
            </>
        ),
    },
    {
        name: "Spring Boot",
        node: box(
            <>
                <circle cx="12" cy="12" r="10.5" fill="none" stroke="#6DB33F" strokeWidth="1.4" strokeDasharray="52 6" strokeLinecap="round" transform="rotate(-45 12 12)" />
                <path d="M8 15c3.5 2 7.5.5 9-4" fill="none" stroke="#6DB33F" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M17 7l.4 3-3-.2" fill="none" stroke="#6DB33F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </>
        ),
    },
    {
        name: "PostgreSQL",
        node: box(
            <g fill="none" stroke="#4A90C2" strokeWidth="1.4">
                <ellipse cx="12" cy="6" rx="7" ry="3" />
                <path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
                <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
            </g>
        ),
    },
    {
        name: "Vercel",
        node: box(<path d="M12 3 22 21H2z" fill="#fff" />),
    },
];
