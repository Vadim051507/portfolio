# Portfolio — ARCHITECTURE.md

## Загальний опис
Особистий сайт-портфоліо fullstack розробника. One-page з окремими підсторінками для кейсів.
Світла тема (#F2F1F6), градієнтний акцент (purple/blue), анімації Framer Motion.
Задеплоєно на Vercel.

## Стек
- **Next.js 15** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** (без конфіг файлу, тільки globals.css)
- **Framer Motion** — анімації секцій + ротація домену в адресному рядку браузер-mockup
- **react-hook-form + zod** — валідація контактної форми
- **next/image** — оптимізація скріншотів проєктів в Hero

> **SphereCanvas + Three.js видалені.** 3D-куля частинок замінена на інтерактивний браузер-mockup
> з ротацією реальних проєктів. Three.js більше не у залежностях — це -200KB від бандла.

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
│   ├── ProjectsBrowser.tsx             # ★ NEW: 3D браузер-mockup з ротацією проєктів
│   ├── sections/
│   │   ├── Hero.tsx                    # overflow:hidden, підключає ProjectsBrowser у правій колонці
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
│   ├── constants.ts                    # SITE, SERVICES, PROJECTS, FAQ, PROCESS_STEPS, TECH_STACK,
│   │                                   # ★ HERO_BROWSER_PROJECTS (для ProjectsBrowser)
│   ├── telegram.ts
│   └── validation.ts
│
├── public/
│   └── projects/                       # ★ Скріншоти для HERO_BROWSER_PROJECTS
│       ├── tokarchuk-dental.webp       # 1400×875 рекомендовано
│       └── bavovnastore.webp
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

★ Browser-mockup акценти:
  Dental:     rgba(56, 178, 172, 0.45)   — м'ятно-блакитний (медицина)
  Bavovna:    rgba(217, 119, 6, 0.4)     — бурштиновий (товари)
  Chrome bg:  #F4F2EE                     — фон шапки браузера (Safari-style)
  Dots:       #ED6A5E / #F4BF4F / #61C554 — традиційні traffic-lights
```

### Типографіка
- Font: Inter, -apple-system, system-ui
- H1: clamp(36px, 5vw, 68px), weight 700, letter-spacing -2.5px
- H2: clamp(28px, 4vw, 40px), weight 700, letter-spacing -0.5px
- Body: 16-17px, color rgba(15,14,26,0.5)
- ★ Browser URL bar: SFMono-Regular/Menlo/Consolas, 12px

### Анімації
- Framer Motion `whileInView` fade+Y на секціях (once: true)
- Cursor glow через CSS custom properties (--glow-x, --glow-y) — без reflow
- ★ Browser-mockup: float-анімація 7s, rotateY(-14deg) rotateX(6deg), `perspective` ВСЕРЕДИНІ transform
- ★ Slide transitions: opacity + scale 1.02→1, cubic-bezier(0.16, 1, 0.3, 1)
- ★ Domain rotation in URL bar: AnimatePresence з вертикальним slide

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
- Ліва колонка: badge → H1 → опис → 3 guarantee-плашки → CTA-кнопки
- Права колонка: `ProjectsBrowser` (раніше була `SphereCanvas`)
- `@media(max-width:860px)`:
  - grid → 1 колонка
  - `.hero-visual` отримує `order: -1` — браузер ВГОРІ на мобільному (для миттєвого "вау")
  - **НЕ** `display: none` як було зі сферою — браузер головний візуальний елемент
- Cursor glow: mousemove → CSS vars → no reflow
- ★ Обгортка над `ProjectsBrowser` не використовує `scale` у `motion.div` — це створює композитний шар і ламає 3D `perspective` всередині. Тільки `opacity` + `y`.

### ★ ProjectsBrowser (NEW)
Інтерактивний браузер-mockup з ротацією проєктів. Замінив SphereCanvas як головний візуальний елемент Hero.

**Чому це зроблено:** 3D-сфера красива, але не відповідає на головне питання клієнта — "А ти взагалі робиш сайти, і чи виглядають вони добре?". Браузер відповідає на нього з першої секунди.

**Структура:**
- `.pb-wrap` — flex-обгортка, центрує
- `.pb-float` — 3D-нахилений контейнер з float-анімацією
- `.pb-accent-glow` — м'яке блюр-світіння під браузером, колір змінюється з проєктом
- `.pb-browser` — `<Link>` обгортка, веде на `/projects/{slug}`
- `.pb-chrome` — шапка з 3 dots + URL bar + actions menu
- `.pb-screen` — контейнер слайдів з прогрес-баром
- `.pb-slide` — окремий слайд (всі в DOM одночасно, керування через opacity)
- `.pb-progress-track` / `.pb-progress-bar` — прогрес автоплею
- `.pb-indicators` / `.pb-ind` — точки-перемикачі

**API:**
```ts
type Props = {
  projects: Project[];      // обов'язково 2-4 проєкти
  intervalMs?: number;      // default 4500
  showProgress?: boolean;   // default true
  appearDelay?: number;     // default 0 (для stagger у Hero)
};
```

**Імпорт у Hero:**
```tsx
import dynamic from "next/dynamic";
const ProjectsBrowser = dynamic(
  () => import("@/components/ProjectsBrowser"),
  { ssr: false }
);
```
`ssr: false` критично — компонент використовує `window.matchMedia` і `performance.now()`.

**3D-перспектива:**
Перспектива застосована **прямо до transform**, не до батька:
```css
.pb-float {
  transform: perspective(1600px) rotateY(-14deg) rotateX(6deg);
}
```
**Чому не `perspective` на батьку:** Framer Motion при анімації `scale`/`opacity` створює композитний шар (через `will-change`/`translateZ(0)`), який розриває ланцюг 3D-сцени від батька до дитини. Self-contained `perspective()` всередині самого transform — стійка до цього.

**Float-анімація:**
```css
@keyframes pb-float {
  0%, 100% { transform: perspective(1600px) rotateY(-14deg) rotateX(6deg) translateY(0); }
  50%      { transform: perspective(1600px) rotateY(-14deg) rotateX(6deg) translateY(-12px); }
}
```
Важливо: перспектива і повороти повторюються в кожному keyframe, інакше анімація скидала б 3D на середині.

**Адаптив:**
- `@media (max-width: 860px)` — `transform: none`, `animation: none`, тіні зменшуються (повна 3D-сцена скасовується). На тач-екранах нахилений mockup виглядає неприродно і ускладнює тап.
- `@media (prefers-reduced-motion: reduce)` — float і ротація вимикаються, користувач сам перемикає індикаторами.

**Логіка ротації:**
- `requestAnimationFrame` замість `setInterval` — точніший прогрес, корректна пауза при `mouseEnter`/`focus`, без drift.
- `elapsedRef` зберігає прогрес між паузами.
- Hover/focus на `.pb-wrap` → `paused = true` → rAF cancel → прогрес зберігається.
- Клік на `.pb-ind` → `goTo(idx)` → скидає прогрес, перемикає `active`.

**Оптимізація завантаження зображень:**
1. **Всі слайди в DOM одночасно**, керування через `opacity` (не unmount/mount). Завдяки цьому:
  - всі картинки завантажуються паралельно при першому відкритті Hero
  - ротація миттєва — все вже в кеші браузера
  - повернення на попередній слайд без затримки
2. **`priority` для всіх слайдів** — Hero у viewport з самого початку, lazy-load не має сенсу.
3. **`quality={82}`** — компроміс якість/вага (default 75 даває мутний текст на скріншотах сайтів).
4. **`sizes="(max-width: 860px) 90vw, 580px"`** — Next.js генерує оптимальні розміри.
5. **Рекомендований формат файлів:** WebP, 1400×875 (16:10 співвідношення), q=85.

**Конвертація скріншотів:**
```bash
# Потрібен пакет webp
cwebp -q 85 -resize 1400 0 tokarchuk-dental.png -o tokarchuk-dental.webp
cwebp -q 85 -resize 1400 0 bavovnastore.png -o bavovnastore.webp
```

**Дані проєктів (lib/constants.ts):**
```ts
export const HERO_BROWSER_PROJECTS = [
  {
    slug: "tokarchuk-dental",
    domain: "tokarchuk-dental.com.ua",
    title: "Tokarchuk Dental Clinic",
    image: "/projects/tokarchuk-dental.webp",
    accent: "rgba(56, 178, 172, 0.45)",
    href: "/projects/tokarchuk-dental",
  },
  {
    slug: "bavovnastore",
    domain: "bavovnastore.com.ua",
    title: "Bavovna Store",
    image: "/projects/bavovnastore.webp",
    accent: "rgba(217, 119, 6, 0.4)",
    href: "/projects/bavovnastore",
  },
] as const;
```

**Чому окремий масив, а не повторне використання PROJECTS:**
HERO_BROWSER_PROJECTS — підмножина з додатковими полями (accent, domain). PROJECTS може містити проєкти, які в Hero не показуються. Розділення дає гнучкість.

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
- ★ Перевірити кеш next/image: у dev-режимі картинки не кешуються агресивно (відчувається повільність ротації), у проді — повний кеш через `Cache-Control` headers Next.js.

## Виправлені проблеми

### Лаг при перемиканні слайдів ProjectsBrowser
**Симптом:** наступна картинка з'являлась з затримкою 1-2 секунди при перемиканні.
**Причина:** `AnimatePresence mode="sync"` з `key={current.slug}` створював unmount/mount циклу `<Image>` на кожне перемикання. Next.js починав завантаження нової картинки тільки в момент перемикання.
**Рішення:** всі слайди тримаються в DOM одночасно, керування через `opacity` + клас `.is-active`. Всі картинки з `priority` — паралельне завантаження при першому візиті.

### Плоский вигляд браузера (без 3D-об'єму)
**Симптом:** браузер відображався без перспективи, як 2D-картка.
**Причина:** `perspective: 1600px` стояла на `.pb-wrap`, але батьківський `motion.div` у Hero використовував `initial={{ scale: 0.9 }}` — Framer Motion створював композитний шар через `will-change: transform`, що розривало 3D-контекст для дітей.
**Рішення:**
1. `perspective` переїхала всередину transform: `perspective(1600px) rotateY(-14deg) rotateX(6deg)`.
2. У Hero `scale` обгортки замінено на `y: 20 → 0` (translate не створює композитного шару).
3. Кути нахилу збільшені з -9°/5° до -14°/6° для помітнішого об'єму.
4. Box-shadow посилений (50px → 60px при hover) — додатковий візуальний об'єм.

## TODO
- [ ] Додати TELEGRAM_BOT_TOKEN і TELEGRAM_CHAT_ID в Vercel env vars → Redeploy
- [ ] Замінити всі YOUR_NAME/YOUR_NICK/YOUR_INSTA placeholders в constants.ts і Nav.tsx
- [ ] Власний домен (Settings → Domains в Vercel)
- [x] Скріншоти проєктів в /public/projects/ — ★ використовуються в ProjectsBrowser
- [ ] Конвертувати скріншоти PNG → WebP (1400×875, q=85)
- [ ] Видалити невикористовуваний SphereCanvas.tsx + three.js з package.json
- [ ] i18n (UA/EN) — next-intl або react-i18next
- [ ] sitemap.ts, robots.ts
- [ ] OG image
- [ ] JSON-LD schema
- [ ] Vercel Analytics
- [ ] Мобільна адаптація інших секцій (Process, TechStack)
- [ ] Додати третій проєкт у HERO_BROWSER_PROJECTS (наприклад, адмін-панель BavovnaStore) для більш насиченої ротації