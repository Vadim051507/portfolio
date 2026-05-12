# Portfolio — ARCHITECTURE.md

## Загальний опис
Особистий сайт-портфоліо fullstack розробника. One-page з окремими підсторінками для кейсів.
Світла тема (#F2F1F6), градієнтний акцент (purple/blue), анімації Framer Motion.
Навігація тимчасово прибрана — буде переписана з нуля.

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
│   ├── layout.tsx              # Root layout, metadata — Nav/NavMobile прибрані
│   ├── page.tsx                # Головна сторінка (one-page), без Nav імпорту
│   ├── globals.css             # Tailwind v4, кольори (#F2F1F6 фон), overflow-x:hidden, scrollbar
│   ├── api/
│   │   └── contact/
│   │       └── route.ts        # POST → Telegram бот
│   └── projects/
│       ├── tokarchuk-dental/
│       │   └── page.tsx
│       └── bavovnastore/
│           └── page.tsx
│
├── components/
│   ├── Nav.tsx                 # ⚠️ ВИМКНЕНО — не рендериться, буде переписано
│   ├── NavMobile.tsx           # ⚠️ ВИМКНЕНО — не рендериться, буде переписано
│   ├── SphereCanvas.tsx        # Three.js куля частинок (lazy, з fallback)
│   │                           # renderer.domElement.style.width/height = "100%"
│   │                           # mount div має overflow:hidden
│   ├── sections/
│   │   ├── Hero.tsx            # Двоколонковий grid, куля справа
│   │   │                       # @media(max-width:860px): 1 колонка, куля display:none
│   │   │                       # aspect-ratio: 1/1 на .hero-sphere замість фікс. висоти
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Process.tsx
│   │   ├── TechStack.tsx
│   │   ├── FAQ.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── Container.tsx       # max-width 1200px, margin auto, padding 0 24px
│       └── SectionTitle.tsx
│
├── lib/
│   ├── constants.ts            # SITE (додано instagram поле), SERVICES, PROJECTS, FAQ, PROCESS_STEPS, TECH_STACK
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

### Nav — статус
- **Обидва компоненти (Nav.tsx, NavMobile.tsx) тимчасово вимкнені** — прибрані з layout.tsx і page.tsx
- Причина: конфлікт між JS hydration і CSS media queries призводив до розтягування логотипу і обрізання контенту
- Планується переписати з нуля з іншим підходом

### Hero
- Двоколонковий grid `1fr 1fr`, gap 40px
- Ліво (order: -1): текст, badge, кнопки
- Право: SphereCanvas (lazy import, ssr: false)
- `.hero-sphere` використовує `aspect-ratio: 1/1` замість фіксованої висоти
- `@media(max-width:860px)`: grid → 1 колонка, `.hero-sphere { display: none }`
- Cursor glow: mousemove → CSS vars → no reflow
- Background: 2 статичні glow + dot grid з mask

### SphereCanvas
- WebGL availability check перед ініціалізацією
- Fallback: пульсуючий CSS glow якщо WebGL недоступний
- Three.js імпортується динамічно всередині useEffect
- 8000 частинок, size 0.011, opacity 0.9
- Wave distortion + scatter ефект (scatterOffsets + scatterStrength lerp 0.06)
- `renderer.domElement.style.width/height = "100%"` — canvas не вилазить за межі
- mount div: `overflow: hidden`
- ResizeObserver + window resize listener
- Cleanup: cancelAnimationFrame + renderer.dispose() + ro.disconnect()

### globals.css
- `overflow-x: hidden` на body — страховка від горизонтального скролу

### constants.ts
- Додано поле `instagram: "https://instagram.com/YOUR_INSTA"`

### Contact форма
- react-hook-form + zod resolver
- Honeypot поле (display:none, tabIndex:-1) проти ботів
- In-memory rate limit (3 req/хв per IP)

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

## TODO
- [ ] Написати навігацію з нуля (без JS hydration проблем)
- [ ] i18n (UA/EN) — next-intl або react-i18next
- [ ] Скріншоти проєктів в /public/projects/
- [ ] Мобільна адаптація секцій (Services, Portfolio, Process, etc.)
- [ ] sitemap.ts, robots.ts
- [ ] OG image
- [ ] JSON-LD schema
- [ ] Vercel Analytics
- [ ] .env.local з Telegram credentials
- [ ] Замінити всі YOUR_NAME/YOUR_NICK placeholders

## Деплой
```bash
git add .
git commit -m "chore: remove broken nav, fix sphere mobile, add overflow-x hidden"
git push origin main
```
Vercel: підключити репо, додати env vars TELEGRAM_BOT_TOKEN і TELEGRAM_CHAT_ID.