import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { sendTelegramMessage } from "@/lib/telegram";

const rateMap = new Map<string, { count: number; ts: number }>();
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 3;

export async function POST(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const now = Date.now();
    const entry = rateMap.get(ip);

    if (entry && now - entry.ts < RATE_WINDOW_MS) {
        if (entry.count >= RATE_LIMIT) {
            return NextResponse.json({ error: "Too many requests" }, { status: 429 });
        }
        entry.count++;
    } else {
        rateMap.set(ip, { count: 1, ts: now });
    }

    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: "Validation failed" }, { status: 422 });
    }

    const { name, contact, message, honeypot } = parsed.data;

    if (honeypot) {
        return NextResponse.json({ ok: true });
    }

    try {
        await sendTelegramMessage(name, contact, message);
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Telegram error:", err);
        return NextResponse.json({ error: "Failed to send" }, { status: 500 });
    }
}