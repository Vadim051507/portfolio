import { z } from "zod";

/** Field limits, shared by the form and the API route. */
export const LEAD_LIMITS = { name: 80, contact: 100, message: 2000 } as const;

// A phone number (at least 9 digits), a Telegram @username or a t.me link.
const isPhoneOrTelegram = (v: string) => {
    const s = v.trim();
    if (s.replace(/\D/g, "").length >= 9 && /^[+\d\s()-]+$/.test(s)) return true;
    if (/^@?[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(s)) return true;
    return /^(https?:\/\/)?t\.me\/[a-zA-Z0-9_+]{5,}$/.test(s);
};

export const leadSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Вкажіть ім'я")
        .max(LEAD_LIMITS.name, `Не довше ${LEAD_LIMITS.name} символів`),
    contact: z
        .string()
        .trim()
        .min(3, "Вкажіть телефон або Telegram")
        .max(LEAD_LIMITS.contact, `Не довше ${LEAD_LIMITS.contact} символів`)
        .refine(isPhoneOrTelegram, "Вкажіть телефон або Telegram, наприклад @username"),
    message: z
        .string()
        .trim()
        .max(LEAD_LIMITS.message, `Не довше ${LEAD_LIMITS.message} символів`)
        .optional()
        .default(""),
    // Honeypot: hidden from people, bots fill it in. Checked on the server.
    website: z.string().max(500).optional().default(""),
});

export type LeadFormInput = z.input<typeof leadSchema>;
export type LeadData = z.output<typeof leadSchema>;
