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

const errorStyle: React.CSSProperties = {
    fontSize: 12,
    color: "var(--danger)",
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
                .field {
                    width: 100%;
                    padding: 14px 20px;
                    font-size: 14.5px;
                    font-family: inherit;
                    color: var(--text);
                    background: var(--bg);
                    border: 1px solid var(--border-strong);
                    border-radius: 20px;
                    outline: none;
                    transition: border-color 0.25s, box-shadow 0.25s;
                }
                .field::placeholder { color: var(--text-muted); opacity: 1; }
                .field:hover { border-color: var(--text-muted); }
                /* Focus: accent border plus an inner ring, for pointer and keyboard alike. */
                .field:focus {
                    border-color: var(--accent-text);
                    box-shadow: inset 0 0 0 3px rgba(0, 105, 92, 0.2);
                }
                .contact-card {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    padding: 16px 20px;
                    background: var(--surface-2);
                    border: 1px solid var(--border);
                    border-radius: 20px;
                    color: inherit;
                    text-decoration: none;
                    cursor: pointer;
                    transition: border-color 0.25s, background 0.25s, transform 0.25s;
                }
                .contact-card:hover {
                    border-color: var(--border-strong);
                    transform: translateX(4px);
                }
            `}</style>

            <Container>
                {/* The section stays dark; only this card is light — a white
                    anchor at the end of the page. */}
                <div
                    className="card"
                    data-theme="light"
                    style={{
                        padding: "clamp(28px, 5vw, 60px)",
                        borderRadius: "var(--radius-sheet)",
                        boxShadow: "var(--sheet-shadow)",
                    }}
                >

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
                                <span className="eyebrow-num">07</span>
                                Контакти
                            </span>
                            <AnimatedHeading
                                segments={[
                                    { text: "Давайте зробимо" },
                                    { text: "щось круте", accent: true },
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
                                    color: "var(--text-muted)",
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
                                    href={SITE.telegram}
                                    external
                                />
                                <ContactCard
                                    icon="mail"
                                    label="Email"
                                    value={SITE.email}
                                    href={`mailto:${SITE.email}`}
                                />
                                <p
                                    className="mono-label"
                                    style={{ marginTop: 6 }}
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
                                        className="field"
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
                                        className="field"
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
                                        className="field"
                                        style={{ resize: "vertical", display: "block" }}
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
                                    className="btn btn-primary"
                                    style={{ display: "flex", marginTop: 4 }}
                                >
                                    <span className="btn-face">
                                        {status === "loading"
                                            ? "Надсилаємо..."
                                            : "Надіслати заявку →"}
                                    </span>
                                </button>

                                {status === "success" && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        style={{
                                            fontSize: 14,
                                            color: "var(--accent-text)",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {/* drawn, not typed: the ✓ character
                                            falls back to a colour emoji on
                                            some systems */}
                                        <span
                                            aria-hidden
                                            style={{
                                                display: "inline-block",
                                                verticalAlign: "-3px",
                                                marginRight: 6,
                                            }}
                                        >
                                            <Icon name="check" size={16} />
                                        </span>
                                        Дякую! Отримав повідомлення. Відповім
                                        якнайшвидше.
                                    </motion.p>
                                )}
                                {status === "error" && (
                                    <p style={{ fontSize: 14, color: "var(--danger)" }}>
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
    href,
    external,
}: {
    icon: string;
    label: string;
    value: string;
    href: string;
    external?: boolean;
}) {
    return (
        <a
            href={href}
            className="contact-card"
            {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
        >
            <span
                className="tile"
                style={{ width: 42, height: 42, borderRadius: 14 }}
            >
                <Icon name={icon} size={20} />
            </span>
            <div style={{ minWidth: 0 }}>
                <div className="mono-label" style={{ marginBottom: 2 }}>
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
        </a>
    );
}