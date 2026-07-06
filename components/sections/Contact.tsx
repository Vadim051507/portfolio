"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { contactSchema, ContactFormData } from "@/lib/validation";
import { SITE } from "@/lib/constants";

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setStatus("loading");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                setStatus("success");
                reset();
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "12px 16px",
        fontSize: "14px",
        background: "#FFFFFF",
        border: "0.5px solid rgba(15,14,26,0.12)",
        borderRadius: "8px",
        outline: "none",
        color: "#0F0E1A",
        fontFamily: "inherit",
        transition: "border-color 0.2s",
    };

    const errorStyle = {
        fontSize: "12px",
        color: "#F87171",
        marginTop: "4px",
    };

    return (
        <section id="contact" style={{ padding: "120px 0", position: "relative" }}>
            <style>{`
                .contact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 64px;
                    align-items: start;
                }
                @media (max-width: 768px) {
                    .contact-grid {
                        grid-template-columns: 1fr;
                        gap: 40px;
                    }
                }
            `}</style>
            <Container>
                <SectionTitle
                    title="Зв'язатись"
                    subtitle="Розкажіть про проєкт — відповім протягом дня."
                />

                <div className="contact-grid">
                    {/* Form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                    >
                        <input
                            {...register("honeypot")}
                            type="text"
                            style={{ display: "none" }}
                            tabIndex={-1}
                            autoComplete="off"
                        />

                        <div>
                            <input
                                {...register("name")}
                                type="text"
                                placeholder="Ваше ім'я"
                                style={inputStyle}
                                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(107,63,240,0.6)")}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(15,14,26,0.12)")}
                            />
                            {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
                        </div>

                        <div>
                            <input
                                {...register("contact")}
                                type="text"
                                placeholder="Telegram або телефон"
                                style={inputStyle}
                                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(107,63,240,0.6)")}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(15,14,26,0.12)")}
                            />
                            {errors.contact && <p style={errorStyle}>{errors.contact.message}</p>}
                        </div>

                        <div>
                            <textarea
                                {...register("message")}
                                placeholder="Опишіть проєкт"
                                rows={5}
                                style={{ ...inputStyle, resize: "vertical" }}
                                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(107,63,240,0.6)")}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(15,14,26,0.12)")}
                            />
                            {errors.message && <p style={errorStyle}>{errors.message.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            style={{
                                padding: "14px 32px",
                                background: status === "loading"
                                    ? "rgba(107,63,240,0.4)"
                                    : "linear-gradient(135deg, #6B3FF0, #0066FF)",
                                color: "#ffffff",
                                fontWeight: 600,
                                fontSize: "15px",
                                borderRadius: "8px",
                                border: "none",
                                cursor: status === "loading" ? "not-allowed" : "pointer",
                                fontFamily: "inherit",
                                transition: "opacity 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                if (status !== "loading")
                                    (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
                            }}
                            onMouseLeave={(e) => {
                                if (status !== "loading")
                                    (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                            }}
                        >
                            {status === "loading" ? "Надсилаємо..." : "Надіслати"}
                        </button>

                        {status === "success" && (
                            <motion.p
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ fontSize: "14px", color: "#22C55E", fontWeight: 500 }}
                            >
                                {"✓ Дякую! Отримав повідомлення. Відповім якнайшвидше."}
                            </motion.p>
                        )}
                        {status === "error" && (
                            <p style={{ fontSize: "14px", color: "#F87171" }}>
                                {"Щось пішло не так. Напишіть мені напряму в Telegram."}
                            </p>
                        )}
                    </form>

                    {/* Contacts */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div
                            onClick={() => window.open(SITE.telegram, "_blank")}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                padding: "20px 24px",
                                background: "#FFFFFF",
                                border: "0.5px solid rgba(15,14,26,0.08)",
                                borderRadius: "12px",
                                cursor: "pointer",
                                boxShadow: "0 1px 3px rgba(15,14,26,0.04)",
                                transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(107,63,240,0.4)";
                                (e.currentTarget as HTMLDivElement).style.background = "rgba(107,63,240,0.03)";
                                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(107,63,240,0.14)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(15,14,26,0.08)";
                                (e.currentTarget as HTMLDivElement).style.background = "#FFFFFF";
                                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 3px rgba(15,14,26,0.04)";
                            }}
                        >
                            <span style={{ fontSize: "24px" }}>✈️</span>
                            <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: "12px", color: "rgba(15,14,26,0.45)", marginBottom: "2px" }}>
                                    Telegram
                                </div>
                                <div style={{ fontSize: "15px", fontWeight: 500, color: "#0F0E1A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {SITE.telegramNick}
                                </div>
                            </div>
                        </div>

                        <div
                            onClick={() => window.open(`mailto:${SITE.email}`)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                padding: "20px 24px",
                                background: "#FFFFFF",
                                border: "0.5px solid rgba(15,14,26,0.08)",
                                borderRadius: "12px",
                                cursor: "pointer",
                                boxShadow: "0 1px 3px rgba(15,14,26,0.04)",
                                transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(107,63,240,0.4)";
                                (e.currentTarget as HTMLDivElement).style.background = "rgba(107,63,240,0.03)";
                                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(107,63,240,0.14)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(15,14,26,0.08)";
                                (e.currentTarget as HTMLDivElement).style.background = "#FFFFFF";
                                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 3px rgba(15,14,26,0.04)";
                            }}
                        >
                            <span style={{ fontSize: "24px" }}>✉️</span>
                            <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: "12px", color: "rgba(15,14,26,0.45)", marginBottom: "2px" }}>
                                    Email
                                </div>
                                <div style={{ fontSize: "15px", fontWeight: 500, color: "#0F0E1A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {SITE.email}
                                </div>
                            </div>
                        </div>

                        <p style={{ fontSize: "13px", color: "rgba(15,14,26,0.4)", marginTop: "8px" }}>
                            {"Робочі години: пн–пт, 10:00–19:00"}
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
}