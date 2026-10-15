# Hero і контакти: звіт

Дата: 2026-10-16, гілка `main`. Нічого не закомічено.

## 1. Що знайдено до змін

| Що | Де |
|---|---|
| Hero | `components/sections/Hero.tsx`, права карусель у `components/site/HeroShowcase.tsx` |
| Шапка | `components/Nav.tsx` (десктоп) + `components/NavMobile.tsx` (мобільне меню, бере `SOCIAL` з Nav) |
| Футер | `components/sections/Footer.tsx` |
| Контакти | `components/sections/Contact.tsx` (картки `ContactCard`) |
| FAQ | `components/sections/FAQ.tsx`, кнопка «Написати в Telegram» уже брала `SITE.telegram` |
| Мета-теги | `app/layout.tsx` бере `SITE.title` / `SITE.description` з `lib/constants.ts` |
| Конфіг | `lib/constants.ts` → об'єкт `SITE` уже існував, тому новий `lib/site-config.ts` не створював |
| Ефект «кнопки тягнуться за курсором» | `components/site/MagneticButton.tsx` (`onMouseMove` + inline `transform: translate`) |
| Лічильник цифр | `components/site/Counter.tsx` |

Плейсхолдери були в: `lib/constants.ts` (title, telegram, telegramNick, github, instagram),
`components/Nav.tsx` (3 соцпосилання + «YOUR NAME»), `components/NavMobile.tsx` («YOUR NAME»),
а також у title сторінок кейсів `app/projects/bavovnastore/page.tsx` і `app/projects/tokarchuk-dental/page.tsx`.

## 2. Змінені файли

| Файл | Що змінено |
|---|---|
| `lib/constants.ts` | `SITE`: ім'я, роль, title, description, 2 Telegram, телефон, GitHub, Instagram, LinkedIn. Прибрано `telegramNick` |
| `app/layout.tsx` | додано `twitter` (card, title, description) |
| `app/projects/bavovnastore/page.tsx` | title: `BavovnaStore \| Вадим Кіндратяк` (з `SITE.ownerName`) |
| `app/projects/tokarchuk-dental/page.tsx` | title: `Tokarchuk Dental Clinic \| Вадим Кіндратяк` |
| `components/Nav.tsx` | ім'я і роль з `SITE`, соцпосилання з `SITE`, українські `aria-label` |
| `components/NavMobile.tsx` | ім'я і роль з `SITE` |
| `components/sections/Contact.tsx` | Telegram, Telegram 2, Телефон |
| `components/sections/Footer.tsx` | додано LinkedIn |
| `components/site/Icons.tsx` | додано іконку `phone` для картки телефону |
| `components/sections/Hero.tsx` | новий текст, без цифр, без плашки, без magnetic, CSS-анімація появи |
| `components/site/HeroShowcase.tsx` | у каруселі лише Tokarchuk Dental Clinic і Bavovna Store |

## 3. Конфіг (`lib/constants.ts`, `SITE`)

```ts
ownerName: "Вадим Кіндратяк",
role: "Розробник сайтів",
title: "Сайти для локального бізнесу | Вадим Кіндратяк",
description: "Роблю сайти для клінік, майстерень і локальних послуг. Швидкі, з налаштованим пошуком, із ціною до початку роботи.",
telegram: "https://t.me/+380966008376",      telegramDisplay: "+38 096 600 83 76",
telegram2: "https://t.me/+380962380674",     telegram2Display: "+38 096 238 06 74",
phone: "tel:+380966008376",                  phoneDisplay: "+38 096 600 83 76",
email: "wadimlikar@gmail.com",
github: "https://github.com/Vadim051507",
instagram: "https://www.instagram.com/kindratyak.dev/",   // без srtk і utm_source
linkedin: encodeURI("https://www.linkedin.com/in/вадим-кіндратяк-869661397"), // без utm
```

## 4. Де замінено кожне посилання

| Посилання | Місця |
|---|---|
| Telegram основний (`SITE.telegram`) | шапка (іконка, десктоп і мобільне меню), hero кнопка «Обговорити проєкт», FAQ «Написати в Telegram», контакти (рядок «Telegram»), футер |
| Telegram 2 (`SITE.telegram2`) | контакти, рядок «Telegram 2» |
| Телефон (`SITE.phone`) | контакти, рядок «Телефон» (`tel:`) |
| Instagram (`SITE.instagram`) | шапка (десктоп і мобільне меню), футер |
| GitHub (`SITE.github`) | шапка (десктоп і мобільне меню), футер |
| LinkedIn (`SITE.linkedin`) | футер (новий рядок) |
| Email | контакти, без змін |

Усі зовнішні посилання мають `target="_blank"` і `rel="noopener noreferrer"`.
`aria-label` іконок у шапці: «Сторінка в Instagram», «Написати в Telegram», «Профіль на GitHub».
У футері та контактах посилання текстові, назва видима.

Мета-теги: `<title>`, `og:title`, `twitter:title` = «Сайти для локального бізнесу | Вадим Кіндратяк»;
description, og:description, twitter:description = новий текст. Перевірено у зібраному HTML.

**metadataBase не додано**: реального домену в проєкті немає. Коли буде домен, додайте в
`app/layout.tsx` `metadataBase: new URL("https://ваш-домен")`.

## 5. Hero

- Прибрано: блок трьох цифр (масив `STATS`, розмітка, стилі `.hero-stats` / `.hero-stat`, `Counter` з hero),
  плашку «Доступний для нових проєктів», старий підзаголовок, пословну анімацію старого заголовка.
- `Counter.tsx` **не видалено**: він ще використовується в `components/sections/Portfolio.tsx` (рядок з фактами).
  Keyframes `pulse-dot` теж лишились, їх використовує `MobileShowcase.tsx`.
- H1: «Сайти, через які / вас **знаходять** / **у Google**», акцент той самий клас `gradient-text`, що був у «продають».
  Шрифт `clamp(36px, 5.4vw, 72px)`. Групи «через які» і «у Google» не розриваються, на вузьких екранах `text-wrap: balance`.
- Підзаголовок і кнопки дослівно за ТЗ, стрілку `→` з «Обговорити проєкт» прибрано.
- «Обговорити проєкт» тепер `<a>` на основний Telegram (раніше скрол до #contact), «Подивитись роботи» `<a href="#portfolio">` зі скролом через Lenis.

### Magnetic-ефект

У hero `MagneticButton` замінено на звичайні `<a className="btn ...">`. Додатково для `.hero-cta`:
вимкнено зсув `.btn-face` на 2px при hover і `will-change`, transition 0.2s лише для кольору, фону, рамки
та світіння (`filter`). Перевірено в headless Chrome: після руху мишею по кнопках позиція і `transform`
кнопок і їхніх `.btn-face` не змінились (`transform: none`).

**Де ще використовується magnetic-ефект (не чіпав):**
- `components/sections/Portfolio.tsx:427`: `<MagneticButton onClick={() => scrollTo("#contact")}>` у портфоліо.
- Схожий, але інший ефект: `components/site/HeroShowcase.tsx`, 3D-нахил мокапа браузера за курсором (`useMotionValue` + `useSpring`). Це не кнопки, тож лишив.
- Глобальний `.btn:hover .btn-face { transform: translate(2px, -2px) }` у `app/globals.css` діє на всі інші кнопки сайту.

### Карусель

`HeroShowcase.tsx` фільтрує `HERO_BROWSER_PROJECTS` за `["tokarchuk-dental", "bavovnastore"]`.
Florist Shop, Eurokitchen і MuscleMania лишились у `lib/constants.ts` і в портфоліо.
Перевірено: 2 крапки-індикатори, автопрогортання чергує Bavovna Store ↔ Tokarchuk Dental Clinic, помилок у консолі немає.

### Анімація появи

CSS keyframes (без JS, без нових бібліотек): `opacity 0→1` + `translateY(14px)→0`, 450ms,
затримки 0 / 100 / 200ms для H1, підзаголовка, кнопок. H1 є в серверному HTML одразу.
Під `prefers-reduced-motion: reduce` анімація вимкнена (перевірено: `animation: none`, `opacity: 1`).
Фонові частинки, карусель і підказку «Гортайте» не чіпав.
Нюанс: при першому візиті в сесії поверх сторінки грає інтро з логотипом, тож поява hero відбувається під ним (так було і зі старою анімацією).

## 6. Перевірки

- `tsc --noEmit`: без помилок.
- Lint: **не запускався**. ESLint у проєкті не встановлено, а в Next 16 команди `next lint` немає. Залежності не додавав.
- `next build`: успішно, всі 6 маршрутів зібрано.
- grep `YOUR_|YOUR NAME|YOUR_NICK|YOUR_INSTA|github.com/YOUR` по `app components lib types`: **0 збігів**.
- Hero в headless Chrome:

| Ширина | Горизонтальний скрол | Рядки H1 | Кнопки |
|---|---|---|---|
| 375px | немає | 3: «Сайти, через які / вас знаходять / у Google» (36px) | одна під одною, не перекриваються |
| 768px | немає | 3 (41px) | в один ряд, не перекриваються |
| 1440px | немає | 3 (72px) | в один ряд, не перекриваються |

Ім'я «Вадим Кіндратяк» у шапці вміщається на всіх трьох ширинах.

## 7. Що з плейсхолдерів лишилось

- `lib/constants.ts`, `SERVICES`: ціни `від $XXX` (×3).
- «Скоро» на непублікованих проєктах: `components/sections/Portfolio.tsx:331`, `components/sections/PortfolioRing.tsx:146`.
- `lib/constants.ts`, MuscleMania: `tags: []` з `TODO: вписати стек`.
- `HERO_BROWSER_PROJECTS`: заглушки в описах («Просто класний сайт», «Ще один класний сайт, написаний мною»).
- `metadataBase` і og:image: немає домену.
- Перемикач EN/UA поки лише візуальний (окреме завдання).
- Тире в існуючих текстах, яких я не торкався: контакти («Розкажіть про проєкт — відповім…», «пн–пт, 10:00–19:00»), FAQ, футер.
