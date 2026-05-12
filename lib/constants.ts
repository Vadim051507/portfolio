export const SITE = {
    name: "KINDRATYAK",
    title: "Розробка сайтів для малого бізнесу — YOUR_NAME",
    description:
        "Інтернет-магазини, корпоративні сайти та лендінги для малого бізнесу в Україні. Швидко, надійно, з підтримкою після запуску.",
    telegram: "https://t.me/YOUR_NICK",
    telegramNick: "@YOUR_NICK",
    email: "wadimlikar@gmail.com",
    github: "https://github.com/YOUR",
    instagram: "https://instagram.com/YOUR_INSTA",  // ← додати
};

export const SERVICES = [
    {
        id: "shop",
        title: "Інтернет-магазини",
        description:
            "Каталог, кошик, оплата, інтеграція з Новою Поштою. Адмінка для самостійного керування товарами.",
        price: "від $XXX",
    },
    {
        id: "corporate",
        title: "Корпоративні сайти",
        description:
            "Багатосторінкові сайти для клінік, студій, агенцій. Адмінка для редагування контенту.",
        price: "від $XXX",
    },
    {
        id: "landing",
        title: "Landing pages",
        description:
            "Односторінкові сайти під рекламні кампанії або презентацію продукту.",
        price: "від $XXX",
    },
];

export const PROJECTS = [
    {
        id: "tokarchuk-dental",
        title: "Tokarchuk Dental Clinic",
        description: "Корпоративний сайт стоматологічної клініки",
        tags: ["Next.js", "TypeScript", "Tailwind", "Адмінка"],
        image: "/projects/tokarchuk-dental/preview.webp",
        href: "/projects/tokarchuk-dental",
    },
    {
        id: "bavovnastore",
        title: "BavovnaStore",
        description: "Інтернет-магазин українського одягу",
        tags: ["Spring Boot", "React", "PostgreSQL", "Telegram"],
        image: "/projects/bavovnastore/preview.webp",
        href: "/projects/bavovnastore",
    },
];

export const PROCESS_STEPS = [
    {
        number: "01",
        title: "Обговорення",
        description:
            "Зідзвонимось або переписка. Уточнюємо завдання, терміни, бюджет.",
    },
    {
        number: "02",
        title: "Дизайн та структура",
        description: "Узгоджуємо макет і функціонал перед початком розробки.",
    },
    {
        number: "03",
        title: "Розробка",
        description:
            "Показую проміжний результат, ви даєте фідбек. Без сюрпризів в кінці.",
    },
    {
        number: "04",
        title: "Запуск та підтримка",
        description:
            "Деплой, домен, навчання роботи з адмінкою. Підтримка після здачі.",
    },
];

export const TECH_STACK = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Spring Boot",
    "PostgreSQL",
    "Vercel",
];

export const FAQ = [
    {
        question: "Скільки коштує сайт?",
        answer:
            "Залежить від типу та обсягу проєкту. Лендінг — від $300, корпоративний сайт — від $500, інтернет-магазин — від $800. Точна ціна визначається після обговорення.",
    },
    {
        question: "Скільки часу займає розробка?",
        answer:
            "Лендінг — 1–2 тижні. Корпоративний сайт — 3–5 тижнів. Інтернет-магазин — 1–2 місяці.",
    },
    {
        question: "Хостинг і домен входять у вартість?",
        answer:
            "Ні, це окремі витрати. Хостинг — від $0 до $15/міс залежно від проєкту, домен — $10–15/рік. Допоможу з вибором і налаштуванням.",
    },
    {
        question: "Що з підтримкою після запуску?",
        answer:
            "Перший місяць безкоштовно: фікс багів, дрібні правки. Далі домовляємось індивідуально.",
    },
    {
        question: "Чи можу я сам редагувати контент?",
        answer:
            "Так. Для всіх проєктів робиться адмінка — можна міняти тексти, фото, ціни без допомоги розробника.",
    },
    {
        question: "Як ми працюємо — передоплата чи поетапно?",
        answer:
            "30% передоплата перед початком, решта — по етапах або після здачі. Залежить від обсягу проєкту.",
    },
];
/**
 * Додати у lib/constants.ts (поряд з PROJECTS).
 *
 * Тут зумисне окремий масив, а не повторне використання PROJECTS,
 * бо для Hero потрібен підмножина проєктів + спеціальний accent-колір,
 * а PROJECTS може містити проєкти, які в Hero не показуються.
 */

export const HERO_BROWSER_PROJECTS = [
    {
        slug: "tokarchuk-dental",
        domain: "tokarchuk-dental.com.ua",
        title: "Tokarchuk Dental Clinic",
        image: "/projects/tokarchuk-dental.png",
        // Холодний м'ятно-блакитний — характерний для медицини
        accent: "rgba(56, 178, 172, 0.45)",
        href: "/projects/tokarchuk-dental",
    },
    {
        slug: "bavovnastore",
        domain: "bavovnastore.com.ua",
        title: "Bavovna Store",
        image: "/projects/bavovnastore.png",
        // Теплий бурштиновий — товари, тепло, український колорит
        accent: "rgba(217, 119, 6, 0.4)",
        href: "/projects/bavovnastore",
    },
    // Якщо додаси третій проєкт, наприклад адмін-панель Bavovna:
    // {
    //   slug: "bavovnastore-admin",
    //   domain: "admin.bavovnastore.com.ua",
    //   title: "Bavovna — адмін-панель",
    //   image: "/projects/bavovnastore-admin.png",
    //   accent: "rgba(107, 63, 240, 0.4)",
    //   href: "/projects/bavovnastore", // або окрема сторінка
    // },
] as const;