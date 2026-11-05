// Єдине місце для бренду, контактів і URL сайту: шапка, hero, FAQ, контакти,
// футер, мета-теги, sitemap і форма беруть дані тільки звідси.
// Щоб змінити телефон, Telegram, email чи години роботи, правити тут.

/** Поточний деплой; використовується, якщо NEXT_PUBLIC_SITE_URL не задано. */
const FALLBACK_URL = "https://portfolio-xi-bay-lhlrvfyrj9.vercel.app";

const PHONE_E164 = "+380966008376";
const PHONE_DISPLAY = "+38 096 600 83 76";

export const SITE = {
    brandName: "kindratyak",
    /** Бренд у заголовках вкладок: "... | Kindratyak". */
    brandTitle: "Kindratyak",
    ownerName: "Вадим Кіндратяк",
    role: "Розробка сайтів",
    title: "Сайти для локального бізнесу | Kindratyak",
    description:
        "Роблю сайти для клінік, майстерень і локальних послуг. Швидкі, з налаштованим пошуком, із ціною до початку роботи.",
    url: (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_URL).replace(/\/+$/, ""),

    telegram: `https://t.me/${PHONE_E164}`,
    telegramDisplay: PHONE_DISPLAY,
    phone: `tel:${PHONE_E164}`,
    phoneDisplay: PHONE_DISPLAY,
    email: "wadimlikar@gmail.com",
    hours: "Щодня, 9:00-22:00",

    github: "https://github.com/Vadim051507",
    instagram: "https://www.instagram.com/kindratyak.dev/",
    linkedin: encodeURI("https://www.linkedin.com/in/вадим-кіндратяк-869661397"),
};
