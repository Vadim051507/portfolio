# Portfolio — повний опис проєкту

> Довідковий документ для планування подальшої роботи. Актуально на **2026-08-25**,
> гілка `main`, останній коміт `cbd3617`. Перевірено `npm run build` — проходить без помилок.

---

## 1. Що це за проєкт

Особистий сайт-портфоліо fullstack-розробника (бренд **KINDRATYAK / Kindratyak.dev**),
орієнтований на продаж послуг розробки сайтів малому бізнесу в Україні.

- **Формат:** one-page лендінг (`/`) + дві окремі сторінки-кейси (`/projects/...`).
- **Мова інтерфейсу:** українська (`<html lang="uk">`), i18n немає.
- **Ціль сайту:** заявка через контактну форму → повідомлення в Telegram.
- **Візуальний напрям:** «cinematic dark» — майже чорне полотно, неонові акценти
  фіолетовий → індиго → ціан, скло, зерно, aurora-фон, scroll-анімації.

---

## 2. Стек і залежності

| Категорія | Технологія |
|---|---|
| Фреймворк | **Next.js 16.2.6**, App Router, Turbopack |
| React | 19.2.4 |
| Мова | TypeScript 5 (`strict: true`) |
| Стилі | **Tailwind CSS v4** через `@tailwindcss/postcss` (без `tailwind.config`, тільки `app/globals.css`) |
| Анімації | **framer-motion 12.38** (`motion/*`, `useScroll`, `useTransform`, `useSpring`, `AnimatePresence`, `MotionConfig`) |
| Smooth scroll | **lenis 1.3.26** |
| 3D / частинки | **three 0.184** (+ `@types/three` — помилково в `dependencies`) |
| Форми | react-hook-form 7.75 + `@hookform/resolvers` + **zod 4.4** |
| Інше | `@next/third-parties` (**встановлений, але не використовується** — GA4 було додано і згодом видалено) |

**Скрипти:** тільки `dev`, `build`, `start`. **Немає** `lint`, тестів, CI.

> ⚠️ **Важлива конвенція репозиторію** (`AGENTS.md` / `CLAUDE.md`):
> це Next.js з ламаючими змінами відносно того, що «пам'ятає» модель — перед написанням
> коду треба читати відповідний гайд у `node_modules/next/dist/docs/` (там є `01-app`,
> `03-architecture` тощо) і зважати на deprecation-нотатки.

### Змінні оточення

| Змінна | Де використовується | Обов'язкова |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | `lib/telegram.ts` | так, інакше форма віддає 500 |
| `TELEGRAM_CHAT_ID` | `lib/telegram.ts` | так |

`.env*` у `.gitignore`; файлу `.env.example` немає.

---

## 3. Структура файлів

```
portfolio/
├── app/
│   ├── layout.tsx                  # Root layout: шрифти, blocking-script інтро, глобальні шари
│   ├── page.tsx                    # Головна: композиція 8 секцій + Footer
│   ├── globals.css                 # Дизайн-система: CSS-змінні, keyframes, хелпери, інтро-стилі
│   ├── favicon.ico
│   ├── logo/                       # logo(1).svg (використовується в інтро), logo-512/1024.png, favicon-192.png (не використовуються)
│   ├── api/contact/route.ts        # POST → валідація → Telegram
│   └── projects/
│       ├── tokarchuk-dental/page.tsx   # Server Component, СВІТЛА тема (застаріла)
│       └── bavovnastore/page.tsx       # Server Component, СВІТЛА тема (застаріла)
│
├── components/
│   ├── Nav.tsx                     # Fixed pill-навігація + соцмережі + UA/EN перемикач
│   ├── NavMobile.tsx               # Fullscreen overlay-меню (<768px)
│   ├── SmoothScrollProvider.tsx    # Lenis + React-контекст useSmoothScroll()
│   ├── ParticleTrail.tsx           # Three.js S-подібні потоки частинок (тільки Hero)
│   ├── ProjectsBrowser.tsx         # ❌ мертвий код (замінений на site/HeroShowcase)
│   ├── SphereCanvas.tsx            # ❌ мертвий код (стара 3D-куля)
│   ├── Background.tsx              # ❌ мертвий код (старий світлий фон)
│   ├── sections/
│   │   ├── Hero.tsx                # #hero
│   │   ├── MobileShowcase.tsx      # #about — найбільший файл (816 рядків), sticky-пін
│   │   ├── Services.tsx            # #services
│   │   ├── Portfolio.tsx           # #portfolio
│   │   ├── Process.tsx             # #process
│   │   ├── TechStack.tsx           # #tech
│   │   ├── FAQ.tsx                 # #faq
│   │   ├── Contact.tsx             # #contact
│   │   └── Footer.tsx
│   ├── site/
│   │   ├── IntroAnimation.tsx      # Splash-екран першого візиту в сесії
│   │   ├── AuroraBackground.tsx    # Фіксований фон: vignette + aurora-блоби + сітка
│   │   ├── ScrollProgress.tsx      # Неонова смужка прогресу зверху
│   │   ├── SpotlightCursor.tsx     # Неоновий «ліхтарик» за курсором
│   │   ├── HeroShowcase.tsx        # 3D браузер-мокап з автокаруселлю проєктів
│   │   ├── AnimatedHeading.tsx     # Кінетичний заголовок (слова виїжджають з маски)
│   │   ├── Reveal.tsx              # Універсальний scroll-reveal wrapper
│   │   ├── Counter.tsx             # Лічильник 0 → N при появі
│   │   ├── MagneticButton.tsx      # Кнопка з магнітним ефектом
│   │   ├── Icons.tsx               # Набір line-іконок (24px, stroke=currentColor)
│   │   ├── TechLogos.tsx           # Inline-SVG логотипи технологій для marquee
│   │   ├── GlobalParticles.tsx     # ❌ мертвий код
│   │   └── PageFlow.tsx            # ❌ мертвий код (використовується лише GlobalParticles)
│   └── ui/
│       ├── Container.tsx           # max-width 1200px, padding 0 24px
│       ├── SectionTitle.tsx        # eyebrow + AnimatedHeading + підзаголовок
│       └── BackButton.tsx          # window.history.back()
│
├── lib/
│   ├── constants.ts                # Увесь контент сайту (SITE, SERVICES, PROJECTS, FAQ…)
│   ├── validation.ts               # zod-схема контактної форми
│   └── telegram.ts                 # sendTelegramMessage()
│
├── public/
│   ├── projects/                   # bavovnastore.png, florist-shop.png, tokarchuk-dental.png (+ 2 ПОРОЖНІ теки)
│   ├── phone/iphone-frame.png      # Рамка iPhone з прозорим вирізом екрана
│   └── *.svg                       # Дефолтні ассети create-next-app (не використовуються)
│
├── AGENTS.md / CLAUDE.md           # Правила для AI-агентів
├── ARCHITECTURE.md … ARCHITECTURE4.md  # ⚠️ ЗАСТАРІЛІ снапшоти архітектури
├── ANSWERS.md                      # Звіт про відкат 2-ї ітерації MobileShowcase
└── types/                          # (порожня/технічна)
```

---

## 4. Дизайн-система (`app/globals.css`)

Всі токени — CSS-змінні на `:root`. Tailwind підключений (`@import "tailwindcss"`), але
**майже не використовується**: реальні стилі — це inline-`style` об'єкти в компонентах +
локальні `<style>{...}</style>` блоки всередині секцій.

### Токени

```
Поверхні:  --bg #05060C · --bg-2 #080A14 · --surface · --surface-2
Межі:      --border rgba(255,255,255,.08) · --border-strong rgba(255,255,255,.14)
Текст:     --text #F4F5FF · --text-2 (62%) · --text-3 (40%)
Неон:      --violet #8B5CF6 · --violet-bright #A855F7 · --indigo #6366F1
           --blue #3B82F6 · --cyan #22D3EE
Градієнт:  --grad linear-gradient(115deg, #A855F7 0%, #6366F1 45%, #22D3EE 100%)
Glow:      --glow-violet · --glow-cyan
Шрифти:    --font-display "Space Grotesk" · --font-body "Inter"  (Google Fonts, <link> у <head>)
Easing:    --ease-out cubic-bezier(0.16, 1, 0.3, 1)   ← використовується скрізь
```

### Хелпер-класи

- `.gradient-text` — текст, залитий фірмовим градієнтом.
- `.eyebrow` — надзаголовок (uppercase, letter-spacing 3px, з рискою через `::before`).
- `.glass` — картка: **суцільний** `#0b0d17` + border + radius 20px (спеціально не прозора,
  щоб фон не просвічував).
- `.spot` — картка зі spotlight-підсвіткою, реагує на `--mx/--my`, які виставляє JS на hover.
- `.grain` — фіксований шар зерна (inline SVG-турбулентність, `mix-blend-mode: overlay`).

### Keyframes
`aurora-drift`, `pulse-dot`, `marquee`, `shimmer`, `float-y`, `spin-slow`,
`kd-caret-blink`, `ms-sweep` (локально в MobileShowcase).

### Важливі CSS-рішення
- `body { overflow-x: clip }` (не `hidden`!) — інакше `<body>` став би scroll-контейнером
  і зламав `position: sticky` у MobileShowcase та вимірювання scroll-прогресу.
- `html { scroll-behavior: smooth }` — співіснує з Lenis; під reduced-motion вимикається.
- Медіа-фікси для мобілки: `#contact .contact-grid → 1fr` (<768px), `#portfolio` grid → 1fr (<480px).

---

## 5. Композиція layout і карта z-index

`app/layout.tsx` рендерить (у порядку):

```
<IntroAnimation />        z-index 10000   splash першого візиту
<AuroraBackground />      z-index 0       фіксований фон
<ScrollProgress />        z-index 9999    смужка прогресу
<SpotlightCursor />       z-index 3       glow за курсором
<div class="grain" />     z-index 9998    зерно
<SmoothScrollProvider>    ← Lenis; Nav ВСЕРЕДИНІ, бо його якорі теж ідуть через scrollTo()
    <Nav />               z-index 100     (NavMobile overlay: 198/199)
    <div z-index 2>{children}</div>
</SmoothScrollProvider>
```

**Метадані:** `title`/`description` з `SITE`, OpenGraph (`locale: uk_UA`).
`viewport` — `viewport-fit=cover` (щоб на iOS Safari fixed-елементи заходили під safe-area).
**Немає:** `metadataBase`, OG-картинки, `robots.txt`, `sitemap.xml`, JSON-LD.

**Blocking-script у `<head>`:** до гідрації перевіряє `sessionStorage["intro-shown"]`,
`prefers-reduced-motion` і параметр `?intro=` → вішає клас `.intro-seen` на `<html>`,
який миттєво ховає splash (`display: none`). Тобто інтро показується **раз на сесію**,
а `?intro=1` примусово його відтворює.

---

## 6. Секції головної сторінки

Порядок у `app/page.tsx`: Hero → MobileShowcase → Services → Portfolio → Process →
TechStack → FAQ → Contact → Footer.

### 6.1 Hero — `#hero`
Двоколонковий грід `1.05fr / 0.95fr` (на <900px — одна колонка, візуал іде першим).
- Бейдж «Доступний для нових проєктів» з пульсуючою зеленою крапкою.
- Кінетичний H1 «Сайти які **продають** ваш бізнес» — кожне слово виїжджає з overflow-маски.
- Дві `MagneticButton` → `scrollTo("#contact")` / `scrollTo("#portfolio")`.
- 3 стати з `Counter`: `0` передоплата · `30 днів` підтримки · `100%` проєктів з адмінкою.
- Права колонка — `HeroShowcase` (lazy, `ssr: false`).
- Фон секції — `ParticleTrail` (lazy, `ssr: false`): Three.js S-подібні потоки частинок,
  **тільки в Hero** (site-wide «хвиля» була навмисно видалена, коміт `f922036`).
- Внизу — підказка «Гортайте» з анімованою мишкою.

### 6.2 MobileShowcase — `#about` (ключова, найскладніша секція)
Секція «Про мене», побудована навколо рендера iPhone. **816 рядків**, уся CSS — в
`const styles` в кінці файлу.

- **Пін:** `.ms-track { height: 340vh }` + `.ms-pin { position: sticky; height: 100vh }` —
  **тільки від `min-width: 1024px`** і **тільки без reduced-motion**. На мобілці/reduced —
  звичайний потік документа з reveal-анімаціями по появі.
- **Телефон:** `public/phone/iphone-frame.png` — PNG із **прозорим вирізом екрана**.
  Слот `.ms-screen` (координати `SCREEN = {left 5.263%, top 2.381%, width 89.035%, height 95.238%}`,
  зміряні по альфа-каналу) лежить **під** рамкою → туди можна вставити `<video>` або `<iframe>`
  без інших змін. Зараз там плейсхолдер «**демо · скоро**» + світловий sweep.
- **Scroll-linked хореографія** (усе через пружину `eased`, не напряму зі `scrollYProgress` —
  інакше Motion може віддати анімацію нативному ScrollTimeline і збити синхронізацію):
  `rotateY 26° → 0° → −7°`, `rotateX 13° → 0° → 2°`, `y 90 → 0`, `scale 0.9 → 1`, fade.
- **4 «стовпи»** (Швидкість / Результат / Адмінка / Підтримка), кожен зі своїм кольором
  (`#A855F7`, `#6366F1`, `#3B82F6`, `#22D3EE`). Активний перемикається по рівних відрізках
  прогресу у вікні `0.30 → 0.96`. Активний пункт перефарбовує німб телефона, свічення екрана,
  риску, номер і text-shadow заголовка.
- **Діагональна смуга** за списком: паралакс від прогресу всієї сторінки + пружинне
  під'їжджання до активного рядка + «удар» (x/rotate/scaleY keyframes) при зміні пункту.
- Типографіка на десктопі масштабується у `vh` (`clamp(24px, 4.4vh, 42px)` тощо), є окремий
  медіазапит для низьких екранів (`max-height: 800px` ховає лід-абзац).
- Історія ітерацій і що саме було відкочено — у `ANSWERS.md`.

### 6.3 Services — `#services`
Грід `auto-fit, minmax(300px, 1fr)`. Дані з `SERVICES`, візуальна мета (іконка, glow, теги) —
в локальному масиві `META`. Картки `.glass .spot` з hover-підйомом і spotlight за курсором.
Ціна виводиться градієнтним текстом (зараз — плейсхолдер `від $XXX`).

### 6.4 Portfolio — `#portfolio`
Рендерить `HERO_BROWSER_PROJECTS` (не `PROJECTS`!). Картка: скріншот із zoom на hover,
чіп із доменом, теги, стрілка `↗`. `const LIVE = new Set(["tokarchuk-dental", "bavovnastore"])` —
лише для них клік веде на сторінку-кейс; решта отримує бейдж «Скоро» і не клікається.
Тінь на hover фарбується в `accent` конкретного проєкту.

### 6.5 Process — `#process`
Вертикальний таймлайн із 4 кроків (`PROCESS_STEPS`). Рейка заповнюється неоновим градієнтом
по `useScroll` + `useSpring`; точка кроку «загорається», коли заливка проходить її поріг.

### 6.6 TechStack — `#tech`
Нескінченний marquee (`animation: marquee 38s linear infinite`, масив продубльований),
маска градієнтом по краях. Логотипи — inline-SVG з `TechLogos.tsx` (без зовнішніх ассетів).
`TECH_STACK` з `constants.ts` **не використовується**.

### 6.7 FAQ — `#faq`
Грід «акордеон + sticky-aside» (aside `top: 110px`, на <900px стає статичним).
6 питань з `FAQ`, розкриття через `AnimatePresence` (height auto), плюс-іконка обертається на 135°.

### 6.8 Contact — `#contact`
Дві колонки: контактні картки (Telegram, Email, робочі години пн–пт 10:00–19:00) + форма.
- `react-hook-form` + `zodResolver(contactSchema)`.
- Поля: `name`, `contact`, `message`, прихований `honeypot`.
- Стан: `idle | loading | success | error`, повідомлення під кнопкою.
- Кастомний focus/blur (фіолетова рамка + ring) через inline-обробники.

### 6.9 Footer
Гігантський напівпрозорий wordmark на фоні, дві колонки посилань (Навігація / Соцмережі),
копірайт із поточним роком, кнопка «Наверх ↑» через `scrollTo(0)`.

---

## 7. Навігація

**`Nav.tsx`** — fixed pill-бар по центру зверху (`z-index: 100`, `header` має
`pointer-events: none`, сам pill — `auto`). На скролі >20px додається клас `.scrolled`
(щільніший фон і тінь). Склад: логотип → роздільник → посилання → соцмережі → UA/EN → бургер.

Посилання: `#hero`, `#about`, `#services`, `#portfolio`, `#contact` — всі якорі існують
(`#about` = MobileShowcase). `#process`, `#tech`, `#faq` у меню **немає** (є у футері).
Перехід — завжди через `useSmoothScroll().scrollTo()`, ніколи напряму `window.scrollTo`.

**`NavMobile.tsx`** — fullscreen overlay (<768px): затемнення + панель, закриття по `Escape`
і по кліку на фон, блокування `body` скролу, перехід із затримкою 300ms (щоб меню встигло закритись).

**`LangSwitcher`** — локальний `useState<"UA"|"EN">`, **суто декоративний**: ніякої
локалізації за ним немає.

---

## 8. Дані та контент (`lib/constants.ts`)

Увесь текстовий контент сайту централізований тут.

| Експорт | Використовується | Примітка |
|---|---|---|
| `SITE` | layout, Contact, FAQ, Footer | **містить плейсхолдери**: `YOUR_NAME`, `YOUR_NICK`, `YOUR`, `YOUR_INSTA` |
| `SERVICES` | Services | ціни — плейсхолдери `від $XXX` |
| `PROJECTS` | ❌ ніде | посилається на неіснуючі `/projects/*/preview.webp` |
| `PROCESS_STEPS` | Process | ✔ |
| `TECH_STACK` | ❌ ніде | замінений на `TECH_LOGOS` |
| `FAQ` | FAQ | тут ціни вже конкретні ($300 / $500 / $800) — **розходиться з `SERVICES`** |
| `HERO_BROWSER_PROJECTS` | HeroShowcase, Portfolio | `as const`; 3 проєкти, у кожного `accent`-колір |

`HERO_BROWSER_PROJECTS`: `tokarchuk-dental`, `bavovnastore`, `florist-shop`
(в останнього немає сторінки-кейсу → у Portfolio він як «Скоро»).

---

## 9. Backend: контактна форма

```
Contact.tsx  → fetch POST /api/contact
             → rate limit (in-memory Map: 3 запити / 60с на IP з x-forwarded-for)
             → JSON.parse       (400 при помилці)
             → contactSchema.safeParse (422 при помилці)
             → honeypot непорожній → тихо повертає { ok: true }, нічого не шле
             → sendTelegramMessage() → api.telegram.org/bot<TOKEN>/sendMessage (Markdown)
             → 200 { ok: true } | 500 { error: "Failed to send" }
```

Схема (`lib/validation.ts`): `name ≥2`, `contact ≥3`, `message ≥10`, `honeypot` — **обов'язкове
поле з `max(0)`** (тобто його відсутність у body → 422).

**Обмеження:** rate-limit тримається в пам'яті процесу — на serverless скидається при
cold start і не має витіснення старих ключів (Map росте необмежено).

---

## 10. Анімаційна архітектура

Три взаємодоповнювані рівні:

1. **Глобальні шари** — Aurora-фон (CSS-анімація `aurora-drift` 26/32/38с), зерно,
   ScrollProgress (`useScroll` + `useSpring`), SpotlightCursor (rAF-лерп 0.12 до курсора).
2. **Reveal-рівень** — `Reveal` (`useInView once`, `opacity/y/blur`) і `AnimatedHeading`
   (пословний вихід із маски, stagger 0.05с). Через них проходить майже весь контент.
3. **Scroll-linked** — Process (заливка рейки), MobileShowcase (пін і хореографія),
   HeroShowcase (3D-нахил за курсором).

**Спільний easing:** `[0.16, 1, 0.3, 1]` (він же `--ease-out`).

### Reduced-motion: політика
Обробляється **всюди й послідовно** — це важлива властивість кодової бази:
- Lenis взагалі не інстанціюється (нативний скрол), `scrollTo` падає на `scrollIntoView`.
- Інтро не показується (клас `.intro-seen` до першого пейнта).
- `ParticleTrail` / `PageFlow` не монтують WebGL взагалі.
- `Counter` одразу ставить кінцеве значення.
- `HeroShowcase` не автоперемикає слайди.
- `MobileShowcase` знімає пін (`height: auto`) і переходить на reveal-по-появі, плюс `MotionConfig reducedMotion="user"`.
- CSS вимикає `aurora-blob`, `grain`, marquee.

### Обробка відсутнього WebGL
`ParticleTrail` / `PageFlow` обгортають створення `THREE.WebGLRenderer` у `try/catch`
і просто нічого не рендерять при відмові. `SphereCanvas` (мертвий) робив явну перевірку контексту.

### Smooth scroll (`SmoothScrollProvider`)
Один глобальний Lenis (`duration: 1.15`, `smoothWheel`), власний rAF-цикл, контекст
`{ lenis, scrollTo }`. У коментарях зафіксовано: якщо колись з'явиться GSAP/ScrollTrigger —
замінити rAF на `gsap.ticker` і викликати `ScrollTrigger.update()` з події `scroll`,
щоб не було двох конкуруючих rAF-циклів.

---

## 11. Адаптивність

Брейкпоінти (усі — вручну, Tailwind-класи не використовуються):

| Поріг | Що змінюється |
|---|---|
| `≥1024px` | вмикається пін MobileShowcase (`340vh` + sticky `100vh`) |
| `≤900px` | Hero → одна колонка (візуал угору); FAQ → одна колонка |
| `≤768px` | Nav ховає посилання/соцмережі/мову, показує бургер; Contact → одна колонка |
| `≤720px` | Portfolio grid → одна колонка |
| `≤640px` | зменшуються елементи інтро |
| `≤480px` | додатковий фікс гріда Portfolio |
| `+ max-height: 800px` (десктоп) | MobileShowcase ховає лід-абзац, стискає паддінги |

**Окремо про iOS Safari:** інтро-оверлей навмисно **не використовує жодних viewport-юнітів**
(`vh/dvh/svh/lvh`) — замість них фіксований overscan `top/bottom: -200px` (працює з першого
пейнта) + `--vvh`, який `IntroAnimation` рахує з `visualViewport` API (+400px буфера).
Це фікс щілини під час анімації згортання адресного рядка.

---

## 12. Сторінки-кейси

`/projects/tokarchuk-dental` і `/projects/bavovnastore` — Server Components із власними
`metadata`, локальним хелпером `Section` і `BackButton` (`window.history.back()`).

> ⚠️ **Головна невідповідність проєкту:** ці сторінки залишились у **старій світлій темі**
> (`backgroundColor: #ffffff`, текст `#0A0A0A`/`#666666`, акцент `#0066FF`) і рендеряться
> всередині темного layout з aurora-фоном, зерном і темною навігацією. Візуально вони
> випадають із решти сайту.

---

## 13. Мертвий код і невикористані ассети

**Компоненти, які ніде не імпортуються:**
- `components/Background.tsx` (104 рядки) — старий світлий фон
- `components/SphereCanvas.tsx` (201) — 3D-куля частинок (попереднє покоління Hero)
- `components/ProjectsBrowser.tsx` (488) — попередник `site/HeroShowcase.tsx`
- `components/site/GlobalParticles.tsx` (27) + `components/site/PageFlow.tsx` (277) —
  site-wide «хвиля», навмисно відключена в коміті `f922036` (PageFlow імпортується
  лише з GlobalParticles, а той — нізвідки)

Разом ≈ **1100 рядків** мертвого коду.

**Невикористані дані:** `PROJECTS`, `TECH_STACK` у `lib/constants.ts`.

**Невикористані ассети:** `public/*.svg` (дефолт create-next-app), `public/phone/image-removebg-preview.png`,
`app/logo/logo-512.png`, `logo-1024.png`, `favicon-192.png`, порожні теки
`public/projects/bavovnastore/` і `public/projects/tokarchuk-dental/`.

**Невикористана залежність:** `@next/third-parties`. Також `@types/three` лежить у
`dependencies` замість `devDependencies`.

---

## 14. Відомі прогалини й ризики (важливе для планування)

**Контент / бренд**
1. `SITE` повний плейсхолдерів: `YOUR_NAME`, `YOUR_NICK`, `YOUR`, `YOUR_INSTA` — вони
   потрапляють у `<title>`, OpenGraph і всі посилання на соцмережі.
2. `Nav.tsx` хардкодить URL соцмереж замість того, щоб брати їх із `SITE`.
3. Ціни в `SERVICES` (`від $XXX`) не заповнені й суперечать конкретним цифрам у `FAQ`.
4. Екран телефона в MobileShowcase — плейсхолдер «демо · скоро» (слот під відео готовий).

**SEO / аналітика**
5. Немає `metadataBase`, OG-картинки, `sitemap.ts`, `robots.ts`, JSON-LD (`LocalBusiness`/`Person`).
6. GA4 було додано і потім видалено — аналітики зараз немає, залежність лишилась.

**Продуктивність**
7. Скріншоти проєктів — важкі PNG (`tokarchuk-dental.png` ≈ **1.7 MB**, `florist-shop.png` ≈ 862 KB),
   рендеряться звичайним `<img>` (з відключеним eslint-правилом), не через `next/image`.
   `next/image` використовується лише для рамки телефона.
8. `next.config.ts` порожній — жодних налаштувань зображень чи заголовків.

**Функціональність**
9. UA/EN перемикач нічого не робить.
10. `florist-shop` не має сторінки-кейсу.
11. Rate-limit контактної форми не переживає serverless cold start і не чистить Map.
12. `/projects/*` — світла тема (див. §12).

**Інфраструктура**
13. Немає `lint`-скрипта, тестів, CI, `.env.example`.
14. `ARCHITECTURE.md` … `ARCHITECTURE4.md` описують **попередні** покоління сайту
    (світла тема `#F2F1F6`, Next.js 15, `SphereCanvas`, `ProjectsBrowser`) — вони
    **не відповідають** поточному коду й вводять в оману. Актуальні описи —
    цей файл та `ANSWERS.md` (лише по MobileShowcase).

---

## 15. Історія розвитку (за git log)

```
ecefd88  init
22636ce→0a2ecee→51e625b  темна тема, градієнти, floating nav, 3D-куля
71f74ee  перехід на СВІТЛУ тему, Nav + NavMobile, ефекти кулі
ea1096c→3906a28→1aac7a0  pill-навігація, фікси мобільного overflow, BackButton
b96b579→8901f85  куля замінена на браузер-мокап із проєктами
0ae5044→95515c6  Three.js S-подібний трейл частинок у Hero
53199c9  GA4  (згодом видалено)
27a800b→8c6bfde  повернення до темної теми, глобальний редизайн
706a88d→764495f→d09eabc→1bbfd31→20ce90e→ef0fdbe  інтро-splash + серія iOS Safari фіксів
f922036  прибрано site-wide хвилю частинок, лишено тільки в Hero
1870ef3  Lenis smooth scroll з opt-out на reduced-motion
94ac19e  MobileShowcase: spawn-анімація + гармонізована палітра  (частково відкочено, див. ANSWERS.md)
cbd3617  update last commit  ← HEAD
```

Коротко: проєкт пройшов темна → світла → темна тему і три покоління Hero-візуалу
(3D-куля → браузер-мокап → браузер-мокап + трейл частинок). Останні місяці роботи —
поліш анімацій, мобільні/iOS фікси й нова секція MobileShowcase.

---

## 16. Конвенції кодової бази

- **Стилі — inline `style` об'єкти**, не Tailwind-класи. Спільна геометрія й адаптив —
  локальні `<style>{...}</style>` всередині секції. Токени — тільки через `var(--…)`.
- **Hover-ефекти** — через `onMouseEnter`/`onMouseLeave`, які напряму мутують
  `e.currentTarget.style` (без CSS `:hover`), бо стилі inline.
- **Іконки** — `Icons.tsx` (line, 24px, `stroke="currentColor"`, strokeWidth 1.8) і
  `TechLogos.tsx` (кольорові бренд-логотипи). **Ніяких емодзі** й зовнішніх іконкових пакетів.
- **Скрол** — завжди `useSmoothScroll().scrollTo()`, ніколи `window.scrollTo`/`scrollIntoView` напряму.
- **Важкі візуальні компоненти** — `dynamic(..., { ssr: false })`.
- **Reduced-motion** — перевіряється в кожному компоненті з анімацією (див. §10).
- **Коментарі в коді** розлогі й пояснюють *чому* (особливо навколо iOS-фіксів, sticky,
  порядку motion-шарів) — цей стиль варто зберігати.
- **Мова коментарів** змішана: англійська в новіших файлах, українська — в старіших.

---

## 17. Стан збірки

`npm run build` (Next 16.2.6, Turbopack) — **успішно**, ~3.3с компіляція + 3.4с TypeScript.

```
○ /                          static
○ /_not-found                static
ƒ /api/contact               dynamic (server)
○ /projects/bavovnastore     static
○ /projects/tokarchuk-dental static
```

Кастомної сторінки 404 немає — використовується дефолтна Next.

---

## 18. Можливі напрямки подальшої роботи

Згруповано за очікуваним ефектом (не пріоритезовано остаточно — це матеріал для обговорення):

**Швидкі виграші**
- Заповнити `SITE` реальними даними, підв'язати `Nav` до `SITE`, узгодити ціни `SERVICES`↔`FAQ`.
- Стиснути/конвертувати скріншоти в WebP і перевести Portfolio на `next/image`.
- Видалити ~1100 рядків мертвого коду, невикористані ассети й залежності.
- Замінити `ARCHITECTURE*.md` на один актуальний документ.

**Продуктова цінність**
- Переписати сторінки-кейсів у темній системі + додати кейс для `florist-shop`.
- Вставити реальне демо у слот екрана MobileShowcase (`<video>` вже підготовлено).
- SEO-пакет: OG-картинка, `metadataBase`, sitemap/robots, JSON-LD.
- Повернути аналітику (GA4 через уже встановлений `@next/third-parties`, або Vercel Analytics).

**Технічний борг**
- Винести rate-limit контактної форми у зовнішнє сховище (Upstash/Redis) або прийняти обмеження свідомо.
- Додати `lint`-скрипт і мінімальний CI.
- Реалізувати або прибрати UA/EN перемикач.
- Кастомна сторінка 404 у стилістиці сайту.
