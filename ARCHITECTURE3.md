# Portfolio — ARCHITECTURE.md

## Загальний опис
Особистий сайт-портфоліо fullstack розробника. One-page з окремими підсторінками для кейсів.
Світла тема (#F2F1F6), градієнтний акцент (purple/blue), анімації Framer Motion.
Задеплоєно на Vercel.

## Стек
- **Next.js 15** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** (без конфіг файлу, тільки globals.css)
- **Framer Motion** — анімації секцій
- **react-hook-form + zod** — валідація контактної форми
- **Three.js** — 3D куля частинок в Hero (з WebGL fallback)

## Файлова структура
```
portfolio/
├── app/
│   ├── layout.tsx                      # Root layout, metadata — підключено Nav
│   ├── page.tsx                        # Головна сторінка (one-page)
│   ├── globals.css                     # Tailwind v4, overflow-x:hidden на html+body, scrollbar
│   ├── api/
│   │   └── contact/
│   │       └── route.ts                # POST → Telegram бот
│   └── projects/
│       ├── tokarchuk-dental/
│       │   └── page.tsx                # Server Component, використовує BackButton
│       └── bavovnastore/
│           └── page.tsx                # Server Component, використовує BackButton
│
├── components/
│   ├── Nav.tsx                         # Pill-навігація (desktop + mobile hamburger)
│   ├── NavMobile.tsx                   # Full-screen overlay мобільне меню
│   ├── SphereCanvas.tsx                # Three.js куля частинок (lazy, з fallback)
│   ├── sections/
│   │   ├── Hero.tsx                    # overflow:hidden на section (кліпає glow-блоби)
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx               # responsive grid: 1fr на < 700px
│   │   ├── Process.tsx
│   │   ├── TechStack.tsx
│   │   ├── FAQ.tsx
│   │   ├── Contact.tsx                 # responsive grid: 1fr на < 768px
│   │   └── Footer.tsx
│   └── ui/
│       ├── Container.tsx               # max-width 1200px, margin auto, padding 0 24px
│       ├── SectionTitle.tsx
│       └── BackButton.tsx              # "use client" — window.history.back()
│
├── lib/
│   ├── constants.ts                    # SITE, SERVICES, PROJECTS, FAQ, PROCESS_STEPS, TECH_STACK
│   ├── telegram.ts
│   └── validation.ts
│
└── types/
```

## Дизайн-система

### Кольори
```
Фон:          #F2F1F6
Акцент:       linear-gradient(135deg, #6B3FF0, #0066FF)
Текст:        #0F0E1A / rgba(15,14,26,0.5)
Картки:       rgba(0,0,0,0.04) + border rgba(0,0,0,0.12)
Hover:        rgba(0,0,0,0.08)
Glow 1:       rgba(107,63,240,0.12) — top left
Glow 2:       rgba(0,100,255,0.08) — top right
Dot grid:     rgba(0,0,0,0.07) 1px dots, 28px grid
Nav bg:       rgba(18,16,28,0.85) + backdrop-filter blur(20px)
Nav accent:   rgba(167,139,250) — активна мова (#a78bfa)
```

### Типографіка
- Font: Inter, -apple-system, system-ui
- H1: clamp(36px, 5vw, 68px), weight 700, letter-spacing -2.5px
- H2: clamp(28px, 4vw, 40px), weight 700, letter-spacing -0.5px
- Body: 16-17px, color rgba(15,14,26,0.5)

### Анімації
- Framer Motion `whileInView` fade+Y на секціях (once: true)
- Cursor glow через CSS custom properties (--glow-x, --glow-y) — без reflow
- Three.js куля: wave distortion + mouse rotation + scatter ефект при hover

## Ключові архітектурні рішення

### Nav
- **Pill-навігація** — `position: fixed`, темна "таблетка" з blur backdrop
- `header`: `width: 100vw`, `padding: 16px 20px`, `box-sizing: border-box`
- `nav.nav-pill`: `width: 100%` → займає `100vw - 40px`, `overflow: hidden`, `minWidth: 0`
- Desktop (> 768px): логотип | посилання | Instagram + Telegram + GitHub + EN/UA switcher
- Mobile (≤ 768px): логотип + hamburger кнопка (градієнтне коло)
- Scroll listener прибраний — pill не змінюється при скролі (статичний padding)

### NavMobile
- Full-screen overlay, `translateY(-100%)` → `translateY(0)` при відкритті
- Посилання з'являються зі stagger-ефектом (delay `i * 60ms`) + slide-in зліва
- Hover: колір `#a78bfa` + `paddingLeft: 8px`
- Знизу: кнопки соцмереж з border-колом + перемикач мов
- `Escape` закриває overlay

### Hero
- `overflow: hidden` на `<section>` — кліпає glow-блоби що вилазять за межі
  (`left: -150px`, `right: -100px`) і запобігає горизонтальному скролу
- Двоколонковий grid `1fr 1fr`, gap 40px
- `@media(max-width:860px)`: grid → 1 колонка, `.hero-sphere { display: none }`
- Cursor glow: mousemove → CSS vars → no reflow

### SphereCanvas
- WebGL availability check перед ініціалізацією
- Fallback: пульсуючий CSS glow якщо WebGL недоступний
- Three.js імпортується динамічно всередині useEffect
- 8000 частинок, size 0.011, opacity 0.9
- `renderer.domElement.style.width/height = "100%"` — canvas не вилазить за межі
- ResizeObserver + cleanup

### globals.css — overflow фікс
```css
html {
  overflow-x: hidden;  /* критично — body alone не достатньо для fixed елементів */
}
body {
  overflow-x: hidden;
  max-width: 100vw;
}
```

### BackButton
- Окремий `"use client"` компонент в `components/ui/BackButton.tsx`
- Причина: сторінки кейсів (`/projects/*`) є Server Components (мають `metadata` export)
- `onClick={() => window.history.back()}` не можна передавати в Server Component props

### Contact форма
- react-hook-form + zod resolver
- Honeypot поле (display:none, tabIndex:-1) проти ботів
- In-memory rate limit (3 req/хв per IP)
- Responsive grid: `1fr 1fr` → `1fr` на `≤ 768px` через CSS клас `.contact-grid`

### Portfolio grid
- `repeat(auto-fit, minmax(320px, 1fr))` → `1fr` на `≤ 700px` через CSS клас `.portfolio-grid`

### API /api/contact
- POST → zod валідація → honeypot check → sendTelegramMessage()
- Env vars: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID

## .env.local
```
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_CHAT_ID=your_chat_id
```

## Що потрібно замінити в constants.ts
```ts
name: "YOUR_NAME"
telegram: "https://t.me/YOUR_NICK"
telegramNick: "@YOUR_NICK"
email: "wadimlikar@gmail.com"
github: "https://github.com/YOUR"
instagram: "https://instagram.com/YOUR_INSTA"
```
Те саме в Nav.tsx (SOCIAL масив) і metadata в сторінках кейсів.

## Деплой
- **Vercel**: `portfolio-xi-bay-lhlrvfyrj9.vercel.app`
- Env vars додати в Vercel Dashboard → Settings → Environment Variables
- Після додавання env vars → Redeploy

## TODO
- [ ] Додати TELEGRAM_BOT_TOKEN і TELEGRAM_CHAT_ID в Vercel env vars → Redeploy
- [ ] Замінити всі YOUR_NAME/YOUR_NICK/YOUR_INSTA placeholders в constants.ts і Nav.tsx
- [ ] Власний домен (Settings → Domains в Vercel)
- [ ] Скріншоти проєктів в /public/projects/
- [ ] i18n (UA/EN) — next-intl або react-i18next
- [ ] sitemap.ts, robots.ts
- [ ] OG image
- [ ] JSON-LD schema
- [ ] Vercel Analytics
- [ ] Мобільна адаптація інших секцій (Process, TechStack)