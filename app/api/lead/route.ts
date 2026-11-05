import { NextRequest, NextResponse } from "next/server";
import { leadSchema, type LeadData } from "@/lib/validation";

// Lead form → Telegram bot. Needs TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.

// ── Rate limit: 3 leads per IP per 10 minutes, in memory. ──
// Per server instance: on Vercel each warm function keeps its own map, so
// this stops casual repeats, not a determined attacker.
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now: number): boolean {
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
    if (recent.length >= RATE_LIMIT) {
        hits.set(ip, recent);
        return true;
    }
    recent.push(now);
    hits.set(ip, recent);
    // keep the map from growing without bound
    if (hits.size > 5000) {
        for (const [key, times] of hits) {
            if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
        }
    }
    return false;
}

function clientIp(req: NextRequest): string {
    const fwd = req.headers.get("x-forwarded-for");
    if (fwd) return fwd.split(",")[0].trim();
    return req.headers.get("x-real-ip") ?? "unknown";
}

// ── Telegram ──
const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function formatLead({ name, contact, message }: LeadData): string {
    const when = new Intl.DateTimeFormat("uk-UA", {
        timeZone: "Europe/Kyiv",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date());

    return [
        "<b>Нова заявка з сайту</b>",
        "",
        `<b>Ім'я:</b> ${escapeHtml(name)}`,
        `<b>Контакт:</b> ${escapeHtml(contact)}`,
        `<b>Повідомлення:</b> ${message ? `\n${escapeHtml(message)}` : "не вказано"}`,
        "",
        `<i>${when}, за Києвом</i>`,
    ].join("\n");
}

async function sendToTelegram(text: string): Promise<void> {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) throw new Error("Telegram credentials are not configured");

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: "HTML",
            disable_web_page_preview: true,
        }),
        signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
        throw new Error(`Telegram API ${res.status}: ${await res.text()}`);
    }
}

export async function POST(req: NextRequest) {
    if (rateLimited(clientIp(req), Date.now())) {
        return NextResponse.json(
            { error: "Забагато заявок. Спробуйте пізніше або напишіть у Telegram." },
            { status: 429 }
        );
    }

    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Некоректний запит" }, { status: 400 });
    }

    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { error: "Перевірте поля форми", fields: parsed.error.flatten().fieldErrors },
            { status: 422 }
        );
    }

    // Honeypot filled: pretend success, send nothing.
    if (parsed.data.website) {
        return NextResponse.json({ ok: true });
    }

    try {
        await sendToTelegram(formatLead(parsed.data));
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("[lead] Telegram send failed:", err);
        return NextResponse.json({ error: "Не вдалося надіслати" }, { status: 502 });
    }
}
