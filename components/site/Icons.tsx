import React from "react";

/**
 * Line-icon set matching the navbar style: 24px viewBox, stroke=currentColor,
 * strokeWidth 1.8, round caps/joins. Use <Icon name="cart" /> anywhere an emoji
 * used to be.
 */
const PATHS: Record<string, React.ReactNode> = {
    cart: (
        <>
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </>
    ),
    building: (
        <>
            <path d="M3 21h18" />
            <path d="M5 21V7l8-4v18" />
            <path d="M19 21V11l-6-4" />
            <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
        </>
    ),
    rocket: (
        <>
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </>
    ),
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    target: (
        <>
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </>
    ),
    sliders: (
        <>
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
        </>
    ),
    support: (
        <>
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
            <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
            <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
            <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
        </>
    ),
    telegram: (
        <path d="M21.2 4.3 2.5 11.2c-1.2.5-1.2 1.1-.2 1.4l4.7 1.5 1.8 5.4c.2.6.3.9.9.9.4 0 .6-.2.9-.4l2.7-2.6 5.6 4.1c1 .6 1.8.3 2-1L22 5.3c.4-1.5-.6-2.2-1.8-1z" />
    ),
    mail: (
        <>
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 6-10 7L2 6" />
        </>
    ),
    message: (
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    ),
    arrowUpRight: <path d="M7 17 17 7M7 7h10v10" />,
    check: <polyline points="20 6 9 17 4 12" />,
    clock: (
        <>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </>
    ),
    shield: (
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    ),
};

export default function Icon({
    name,
    size = 20,
    strokeWidth = 1.8,
    style,
}: {
    name: keyof typeof PATHS | string;
    size?: number;
    strokeWidth?: number;
    style?: React.CSSProperties;
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={style}
            aria-hidden
        >
            {PATHS[name] ?? PATHS.check}
        </svg>
    );
}
