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
        fontSize: "15px",
        border: "1.5px solid #EEEEEE",
        borderRadius: "8px",
        outline: "none",
        color: "#0A0A0A",
        backgroundColor: "#ffffff",
        transition: "border-color 0.2s",
        fontFamily: "inherit",
    };

    const errorStyle = {
        fontSize: "13px",
        color: "#E53E3E",
        marginTop: "4px",
    };

    return (
        <section id="contact" style={{ padding: "120px 0", backgroundColor: "#ffffff" }}>
            <Container>
                <SectionTitle
                    title="Зв'язатись"
                    subtitle="Розкажіть про проєкт — відповім протягом дня."
                />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "64px",
                        alignItems: "start",
                    }}
                >
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
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
                                onFocus={(e) => (e.currentTarget.style.borderColor = "#0066FF")}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#EEEEEE")}
                            />
                            {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
                        </div>

                        <div>
                            <input
                                {...register("contact")}
                                type="text"
                                placeholder="Telegram або телефон"
                                style={inputStyle}
                                onFocus={(e) => (e.currentTarget.style.borderColor = "#0066FF")}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#EEEEEE")}
                            />
                            {errors.contact && <p style={errorStyle}>{errors.contact.message}</p>}
                        </div>

                        <div>
              <textarea
                  {...register("message")}
                  placeholder="Опишіть проєкт"
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#0066FF")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#EEEEEE")}
              />
                            {errors.message && <p style={errorStyle}>{errors.message.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            style={{
                                padding: "14px 32px",
                                backgroundColor: status === "loading" ? "#99BBFF" : "#0066FF",
                                color: "#ffffff",
                                fontWeight: 600,
                                fontSize: "16px",
                                borderRadius: "8px",
                                border: "none",
                                cursor: status === "loading" ? "not-allowed" : "pointer",
                                fontFamily: "inherit",
                            }}
                            onMouseEnter={(e) => {
                                if (status !== "loading")
                                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0052CC";
                            }}
                            onMouseLeave={(e) => {
                                if (status !== "loading")
                                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0066FF";
                            }}
                        >
                            {status === "loading" ? "Надсилаємо..." : "Надіслати"}
                        </button>

                        {status === "success" && (
                            <motion.p
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ fontSize: "15px", color: "#38A169", fontWeight: 500 }}
                            >
                                {"✓ Дякую! Отримав повідомлення. Відповім якнайшвидше."}
                            </motion.p>
                        )}
                        {status === "error" && (
                            <p style={{ fontSize: "15px", color: "#E53E3E" }}>
                                {"Щось пішло не так. Напишіть мені напряму в Telegram."}
                            </p>
                        )}
                    </form>

                    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                padding: "20px 24px",
                                border: "1.5px solid #EEEEEE",
                                borderRadius: "10px",
                                cursor: "pointer",
                            }}
                            onClick={() => window.open(SITE.telegram, "_blank")}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.borderColor = "#0066FF")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.borderColor = "#EEEEEE")
                            }
                        >
                            <span style={{ fontSize: "28px" }}>✈️</span>
                            <div>
                                <div style={{ fontSize: "13px", color: "#666666", marginBottom: "2px" }}>
                                    Telegram
                                </div>
                                <div style={{ fontSize: "16px", fontWeight: 600, color: "#0A0A0A" }}>
                                    {SITE.telegramNick}
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                padding: "20px 24px",
                                border: "1.5px solid #EEEEEE",
                                borderRadius: "10px",
                                cursor: "pointer",
                            }}
                            onClick={() => window.open(`mailto:${SITE.email}`)}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.borderColor = "#0066FF")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.borderColor = "#EEEEEE")
                            }
                        >
                            <span style={{ fontSize: "28px" }}>✉️</span>
                            <div>
                                <div style={{ fontSize: "13px", color: "#666666", marginBottom: "2px" }}>
                                    Email
                                </div>
                                <div style={{ fontSize: "16px", fontWeight: 600, color: "#0A0A0A" }}>
                                    {SITE.email}
                                </div>
                            </div>
                        </div>

                        <p style={{ fontSize: "14px", color: "#666666" }}>
                            {"Робочі години: пн–пт, 10:00–19:00"}
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
}