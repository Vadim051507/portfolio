"use client";

export default function BackButton() {
    return (
        <button
            onClick={() => window.history.back()}
            style={{
                fontSize: "14px",
                color: "#666666",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                marginBottom: "40px",
                display: "block",
                padding: 0,
            }}
        >
            {"← Назад до портфоліо"}
        </button>
    );
}