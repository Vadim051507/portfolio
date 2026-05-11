import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(2, "Введіть ім'я"),
    contact: z.string().min(3, "Введіть Telegram або телефон"),
    message: z.string().min(10, "Опишіть проєкт (мінімум 10 символів)"),
    honeypot: z.string().max(0),
});

export type ContactFormData = z.infer<typeof contactSchema>;