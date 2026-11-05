"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Reveal from "@/components/site/Reveal";
import AnimatedHeading from "@/components/site/AnimatedHeading";
import Icon from "@/components/site/Icons";
import { track } from "@vercel/analytics";
import {
    LEAD_LIMITS,
    leadSchema,
    type LeadData,
    type LeadFormInput,
} from "@/lib/validation";
import { SITE } from "@/config/site";

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
    } = useForm<LeadFormInput, unknown, LeadData>({
        resolver: zodResolver(leadSchema),
    });

    const onSubmit = async (data: LeadData) => {
        setStatus("loading");
        try {
            const res = await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                setStatus("success");
                track("lead_submit");
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
                .hp-field {
                    position: absolute;
                    left: -10000px;
                    width: 1px;
                    height: 1px;
                    overflow: hidden;
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
                                    letterSpacing: "-0.02em",
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
                                Розкажіть про проєкт: відповім протягом дня і
                                безкоштовно проконсультую.
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
                                    value={SITE.telegramDisplay}
                                    href={SITE.telegram}
                                    external
                                />
                                <ContactCard
                                    icon="phone"
                                    label="Телефон"
                                    value={SITE.phoneDisplay}
                                    href={SITE.phone}
                                />
                                <ContactCard
                                    icon="mail"
                                    label="Email"
                                    value={SITE.email}
                                    href={`mailto:${SITE.email}`}
                                />
                                <p
                                    className="meta-label"
                                    style={{ marginTop: 6 }}
                                >
                                    Робочі години: {SITE.hours}
                                </p>
                            </div>
                        </div>

                        {/* Right — form */}
                        <Reveal delay={0.1}>
                            <form
                                noValidate
                                aria-label="Заявка на проєкт"
                                onSubmit={handleSubmit(onSubmit)}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 16,
                                }}
                            >
                                {/* honeypot: off-screen, not display:none, so
                                    bots still see and fill it */}
                                <div aria-hidden="true" className="hp-field">
                                    <label>
                                        Сайт
                                        <input
                                            {...register("website")}
                                            type="text"
                                            tabIndex={-1}
                                            autoComplete="off"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <input
                                        {...register("name")}
                                        placeholder="Ваше ім'я"
                                        aria-label="Ваше ім'я"
                                        aria-invalid={errors.name ? true : undefined}
                                        autoComplete="name"
                                        maxLength={LEAD_LIMITS.name}
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
                                        placeholder="Телефон або Telegram"
                                        aria-label="Телефон або Telegram"
                                        aria-invalid={errors.contact ? true : undefined}
                                        autoComplete="tel"
                                        maxLength={LEAD_LIMITS.contact}
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
                                        placeholder="Коротко про проєкт (необов'язково)"
                                        aria-label="Коротко про проєкт, необов'язково"
                                        maxLength={LEAD_LIMITS.message}
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
                                        {status === "loading" ? (
                                            "Надсилаю..."
                                        ) : (
                                            <>
                                                Надіслати заявку
                                                <svg
                                                    aria-hidden
                                                    width="15"
                                                    height="15"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                                </svg>
                                            </>
                                        )}
                                    </span>
                                </button>

                                {status === "success" && (
                                    <motion.p
                                        role="status"
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
                                        Дякую! Відповім протягом дня.
                                    </motion.p>
                                )}
                                {status === "error" && (
                                    <p
                                        role="alert"
                                        style={{ fontSize: 14, color: "var(--danger)", lineHeight: 1.6 }}
                                    >
                                        Не вдалося надіслати заявку. Напишіть мені
                                        напряму в{" "}
                                        <a
                                            href={SITE.telegram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: "inherit", fontWeight: 600 }}
                                        >
                                            Telegram
                                        </a>
                                        .
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
                <div className="meta-label" style={{ marginBottom: 2 }}>
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