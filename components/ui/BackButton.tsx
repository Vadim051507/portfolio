"use client";

export default function BackButton() {
    return (
        <button
            onClick={() => window.history.back()}
            className="meta-label back-link"
            style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                marginBottom: "40px",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: 0,
            }}
        >
            <svg
                aria-hidden
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            Назад до портфоліо
        </button>
    );
}