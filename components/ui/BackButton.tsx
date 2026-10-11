"use client";

export default function BackButton() {
    return (
        <button
            onClick={() => window.history.back()}
            className="mono-label back-link"
            style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                marginBottom: "40px",
                display: "block",
                padding: 0,
            }}
        >
            {"← Назад до портфоліо"}
        </button>
    );
}