export async function sendTelegramMessage(
    name: string,
    contact: string,
    message: string
): Promise<void> {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        throw new Error("Telegram credentials not configured");
    }

    const text = `📩 *Нова заявка з сайту*\n\n*Ім'я:* ${name}\n*Контакт:* ${contact}\n*Повідомлення:*\n${message}`;

    const res = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text,
                parse_mode: "Markdown",
            }),
        }
    );

    if (!res.ok) {
        throw new Error(`Telegram API error: ${res.status}`);
    }
}