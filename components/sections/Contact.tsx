"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Reveal from "@/components/site/Reveal";
import AnimatedHeading from "@/components/site/AnimatedHeading";
import Icon from "@/components/site/Icons";
import { contactSchema, ContactFormData } from "@/lib/validation";
import { SITE } from "@/lib/constants";

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    fontSize: 14.5,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    outline: "none",
    color: "var(--text)",
    fontFamily: "inherit",
    transition: "border-color 0.25s, box-shadow 0.25s",
};

const errorStyle: React.CSSProperties = {
    fontSize: 12,
    color: "#FB7185",
    marginTop: 6,
};

export default function Contact() {
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

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
            } else setStatus("error");
        } catch {
            setStatus("error");
        }
    };

    const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.currentTarget.style.borderColor = "rgba(139,92,246,0.6)";
        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(139,92,246,0.14)";
    };
    const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
    };

    return (
        <section id="contact" style={{ padding: "130px 0", position: "relative" }}>
            <style>{`
                .contact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 56px;
                    align-items: stretch;
                }
                @media (max-width: 768px) {
                    .contact-grid { grid-template-columns: 1fr; gap: 40px; }
                }
            `}</style>

            <Container>
                <div
                    className="glass"
                    style={{
                        padding: "clamp(28px, 5vw, 60px)",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* corner glow */}
                    <div
                        aria-hidden
                        style={{
                            position: "absolute",
                            top: "-30%",
                            right: "-10%",
                            width: 420,
                            height: 420,
                            borderRadius: "50%",
                            background:
                                "radial-gradient(circle, rgba(139,92,246,0.28), transparent 65%)",
                            filter: "blur(20px)",
                            pointerEvents: "none",
                        }}
                    />

                    <div className="contact-grid" style={{ position: "relative" }}>
                        {/* Left — pitch + contacts */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <span
                                className="eyebrow"
                                style={{ marginBottom: 18 }}
                            >
                                Контакти
                            </span>
                            <AnimatedHeading
                                segments={[
                                    { text: "Давайте зробимо" },
                                    { text: "щось круте", gradient: true },
                                ]}
                                style={{
                                    fontSize: "clamp(28px, 4vw, 44px)",
                                    fontWeight: 700,
                                    letterSpacing: "-1.2px",
                                    lineHeight: 1.05,
                                    color: "var(--text)",
                                }}
                            />
                            <p
                                style={{
                                    fontSize: 16,
                                    color: "var(--text-2)",
                                    lineHeight: 1.7,
                                    marginTop: 18,
                                    marginBottom: 32,
                                    maxWidth: 400,
                                }}
                            >
                                Розкажіть про проєкт — відповім протягом дня. Без
                                передоплати, поки не побачите результат.
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 12,
                                    marginTop: "auto",
                                }}
                            >
                                <ContactCard
                                    icon="telegram"
                                    label="Telegram"
                                    value={SITE.telegramNick}
                                    onClick={() =>
                                        window.open(SITE.telegram, "_blank")
                                    }
                                />
                                <ContactCard
                                    icon="mail"
                                    label="Email"
                                    value={SITE.email}
                                    onClick={() =>
                                        window.open(`mailto:${SITE.email}`)
                                    }
                                />
                                <p
                                    style={{
                                        fontSize: 13,
                                        color: "var(--text-3)",
                                        marginTop: 6,
                                    }}
                                >
                                    Робочі години: пн–пт, 10:00–19:00
                                </p>
                            </div>
                        </div>

                        {/* Right — form */}
                        <Reveal delay={0.1}>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 16,
                                }}
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
                                        placeholder="Ваше ім'я"
                                        style={inputStyle}
                                        onFocus={focus}
                                        onBlur={blur}
                                    />
                                    {errors.name && (
                                        <p style={errorStyle}>
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <input
                                        {...register("contact")}
                                        placeholder="Telegram або телефон"
                                        style={inputStyle}
                                        onFocus={focus}
                                        onBlur={blur}
                                    />
                                    {errors.contact && (
                                        <p style={errorStyle}>
                                            {errors.contact.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <textarea
                                        {...register("message")}
                                        placeholder="Опишіть проєкт"
                                        rows={5}
                                        style={{ ...inputStyle, resize: "vertical" }}
                                        onFocus={focus}
                                        onBlur={blur}
                                    />
                                    {errors.message && (
                                        <p style={errorStyle}>
                                            {errors.message.message}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    style={{
                                        padding: "16px 32px",
                                        marginTop: 4,
                                        background:
                                            status === "loading"
                                                ? "rgba(139,92,246,0.4)"
                                                : "linear-gradient(115deg,#A855F7,#6366F1 55%,#22D3EE)",
                                        color: "#fff",
                                        fontWeight: 600,
                                        fontSize: 15,
                                        fontFamily: "var(--font-display)",
                                        borderRadius: 12,
                                        border: "none",
                                        cursor:
                                            status === "loading"
                                                ? "not-allowed"
                                                : "pointer",
                                        boxShadow:
                                            "0 10px 34px rgba(139,92,246,0.4)",
                                        transition: "opacity 0.2s, transform 0.2s",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (status !== "loading")
                                            e.currentTarget.style.transform =
                                                "translateY(-2px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform =
                                            "translateY(0)";
                                    }}
                                >
                                    {status === "loading"
                                        ? "Надсилаємо..."
                                        : "Надіслати заявку →"}
                                </button>

                                {status === "success" && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        style={{
                                            fontSize: 14,
                                            color: "#4ADE80",
                                            fontWeight: 500,
                                        }}
                                    >
                                        ✓ Дякую! Отримав повідомлення. Відповім
                                        якнайшвидше.
                                    </motion.p>
                                )}
                                {status === "error" && (
                                    <p style={{ fontSize: 14, color: "#FB7185" }}>
                                        Щось пішло не так. Напишіть мені напряму в
                                        Telegram.
                                    </p>
                                )}
                            </form>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    );
}

function ContactCard({
    icon,
    label,
    value,
    onClick,
}: {
    icon: string;
    label: string;
    value: string;
    onClick: () => void;
}) {
    return (
        <div
            onClick={onClick}
            style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                cursor: "pointer",
                transition: "border-color 0.25s, background 0.25s, transform 0.25s",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-strong)";
                e.currentTarget.style.background = "rgba(139,92,246,0.06)";
                e.currentTarget.style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.transform = "translateX(0)";
            }}
        >
            <span
                style={{
                    width: 42,
                    height: 42,
                    flexShrink: 0,
                    borderRadius: 12,
                    display: "grid",
                    placeItems: "center",
                    color: "#fff",
                    background: "linear-gradient(135deg,#8B5CF6,#22D3EE)",
                    boxShadow: "0 4px 16px rgba(139,92,246,0.4)",
                }}
            >
                <Icon name={icon} size={20} />
            </span>
            <div style={{ minWidth: 0 }}>
                <div
                    style={{
                        fontSize: 12,
                        color: "var(--text-3)",
                        marginBottom: 2,
                    }}
                >
                    {label}
                </div>
                <div
                    style={{
                        fontSize: 15,
                        fontWeight: 500,
                        color: "var(--text)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}
                >
                    {value}
                </div>
            </div>
        </div>
    );
}