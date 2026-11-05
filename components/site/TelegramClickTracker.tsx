"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Sends a `telegram_click` event for a click on ANY link to Telegram
 * (hero CTA, nav, FAQ, contacts, footer, form error), via one delegated
 * listener, so new Telegram links are counted without extra code.
 */
export default function TelegramClickTracker() {
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const target = e.target as Element | null;
            const link = target?.closest?.<HTMLAnchorElement>('a[href*="t.me/"]');
            if (!link) return;
            const section = link.closest("section[id], header, footer");
            track("telegram_click", {
                location: section?.id || section?.tagName.toLowerCase() || "page",
            });
        };
        // capture: still counted if a handler stops propagation
        document.addEventListener("click", onClick, true);
        return () => document.removeEventListener("click", onClick, true);
    }, []);

    return null;
}
