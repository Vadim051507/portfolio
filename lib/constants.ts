// Текстовий контент секцій. Бренд, контакти й URL сайту лежать в config/site.ts.

export const SERVICES = [
    {
        id: "shop",
        title: "Інтернет-магазини",
        description:
            "Каталог, кошик, оплата, інтеграція з Новою Поштою. Адмінка для самостійного керування товарами.",
        price: "від $300",
    },
    {
        id: "corporate",
        title: "Корпоративні сайти",
        description:
            "Багатосторінкові сайти для клінік, студій, агенцій. Адмінка для редагування контенту.",
        price: "від $300",
    },
    {
        id: "landing",
        title: "Landing pages",
        description:
            "Односторінкові сайти під рекламні кампанії або презентацію продукту.",
        price: "від $200",
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
            "Лендінг від $200, корпоративний сайт від $300, інтернет-магазин від $300 до $600. Проєкти з індивідуальним функціоналом від $600. Точну ціну називаю після обговорення задачі, ще до початку роботи, і в процесі вона не змінюється. Оплачувати можна в гривнях за курсом НБУ на день платежу.",
    },
    {
        question: "Скільки часу займає розробка?",
        answer:
            "Лендінг: 1-2 тижні. Інтернет-магазин: близько місяця. Більші проєкти: від місяця, точний термін узгоджуємо на етапі планування.",
    },
    {
        question: "Хостинг і домен входять у вартість?",
        answer:
            "Ні, вони оплачуються окремо. Я допоможу обрати домен і хостинг під ваш проєкт і все налаштую сам.",
    },
    {
        question: "Що з підтримкою після запуску?",
        answer:
            "Перший місяць після запуску підтримка безкоштовна: правки, дрібні доопрацювання, відповіді на питання. Далі працюємо за домовленістю.",
    },
    {
        question: "Чи можу я сам редагувати контент?",
        answer:
            "Так. Для сайтів з адмінкою показую, як самостійно змінювати тексти, фото і ціни. Якщо щось не виходить, пишете мені.",
    },
    {
        question: "Як ми працюємо: передоплата чи поетапно?",
        answer:
            "30% передоплата на старті, решта поетапно, по мірі готовності сайту. Ви бачите проміжний результат на кожному етапі.",
    },
];

/** Рядок під картками послуг. */
export const PRICING_NOTE =
    "Ціну фіксуємо до початку роботи. Оплачувати можна в гривнях за курсом НБУ на день платежу. Проєкти з індивідуальним функціоналом від $600.";
/**
 * Проєкти портфоліо (і Hero), у порядку показу.
 *
 * - live: true  сайт працює: картка клікабельна, веде на кейс (якщо є) або
 *               на https://{domain}.
 * - live: false сайт зараз не працює: картка зі скріншотом і стеком, без
 *               посилання, без hover-стану і без домену.
 * - tags        тільки технології, не функції сайту.
 */
export const HERO_BROWSER_PROJECTS = [
    {
        slug: "tokarchuk-dental",
        domain: "tokarchuk-dental.com.ua",
        title: "Tokarchuk Dental Clinic",
        live: true,
        tags: ["Next.js", "Tailwind", "Framer Motion"],
        description:
            "Лендінг для стоматологічної клініки: послуги, лікарі і запис на прийом в одному місці. Мобільна версія в пріоритеті.",
        image: "/projects/tokarchuk-dental.png",
        href: "/projects/tokarchuk-dental",
    },
    {
        slug: "furniture-site",
        domain: "furniture-site-topaz.vercel.app",
        title: "Eurokitchen",
        live: true,
        tags: ["Next.js", "Tailwind", "Framer Motion"],
        description:
            "Лендінг для виробника меблів на замовлення з Житомира: каталог робіт і швидка заявка на прорахунок.",
        image: "/projects/furniture-site.png",
        href: "/projects/furniture-site",
    },
    {
        slug: "muscle-mania",
        domain: "musclemania.com.ua",
        title: "MuscleMania",
        live: true,
        // TODO: вписати стек.
        tags: [],
        description:
            "Інтернет-магазин спортивного харчування: каталог, кошик, оформлення замовлення і адмінка для керування товарами.",
        image: "/projects/muscle-mania.png",
        href: "/projects/muscle-mania",
    },
    {
        slug: "bavovnastore",
        domain: "bavovnastore.com.ua",
        title: "Bavovna Store",
        live: false,
        tags: ["Spring Boot", "React", "PostgreSQL"],
        description:
            "Інтернет-магазин одягу: каталог, кошик і адмінка на власному бекенді.",
        image: "/projects/bavovnastore.png",
        href: "/projects/bavovnastore",
    },
    {
        slug: "florist-shop",
        domain: "florist-shop.com.ua",
        title: "Florist Shop",
        live: false,
        tags: ["Spring Boot", "React", "PostgreSQL"],
        description:
            "Інтернет-магазин квітів з каталогом букетів і оформленням замовлення.",
        image: "/projects/florist-shop.png",
        href: "/projects/florist-shop",
    },
] as const;
