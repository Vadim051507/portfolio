# Portfolio — ARCHITECTURE.md

## Загальний опис
Особистий сайт-портфоліо fullstack розробника. One-page з окремими підсторінками для кейсів.
Темна тема, градієнтний дизайн (purple/blue), floating nav, анімації Framer Motion.

## Стек
- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** (без конфіг файлу, тільки globals.css)
- **Framer Motion** — анімації секцій
- **react-hook-form + zod** — валідація контактної форми
- **Three.js** — 3D куля частинок в Hero (з WebGL fallback)

## Файлова структура

```
portfolio/
├── app/
│   ├── layout.tsx              # Root layout, metadata
│   ├── page.tsx                # Головна сторінка (one-page)
│   ├── globals.css             # Tailwind v4, кольори, scrollbar
│   ├── api/
│   │   └── contact/
│   │       └── route.ts        # POST → Telegram бот
│   └── projects/
│       ├── tokarchuk-dental/
│       │   └── page.tsx        # Кейс стоматологічна клініка
│       └── bavovnastore/
│           └── page.tsx        # Кейс інтернет-магазин
│
├── components/
│   ├── Nav.tsx                 # Floating pill nav, lang switcher, соцмережі
│   ├── SphereCanvas.tsx        # Three.js куля частинок (lazy, з fallback)
│   ├── sections/
│   │   ├── Hero.tsx            # Двоколонковий, куля справа, cursor glow
│   │   ├── Services.tsx        # 3 картки послуг
│   │   ├── Portfolio.tsx       # 2 кейси, router.push для навігації
│   │   ├── Process.tsx         # 4 кроки з великими номерами на фоні
│   │   ├── TechStack.tsx       # Бейджі технологій
│   │   ├── FAQ.tsx             # Accordion з AnimatePresence
│   │   ├── Contact.tsx         # Форма + прямі контакти
│   │   └── Footer.tsx          # GitHub, Telegram, рік
│   └── ui/
│       ├── Container.tsx       # max-width 1200px wrapper
│       └── SectionTitle.tsx    # h2 + subtitle
│
├── lib/
│   ├── constants.ts            # SITE, SERVICES, PROJECTS, FAQ, PROCESS_STEPS, TECH_STACK
│   ├── telegram.ts             # sendTelegramMessage()
│   └── validation.ts           # contactSchema (zod), honeypot field
│
└── types/                      # (порожньо, резерв)
```

## Дизайн-система

### Кольори
```
Фон:          #000010
Акцент:       linear-gradient(135deg, #6B3FF0, #0066FF)
Текст:        #ffffff / rgba(255,255,255,0.5)
Картки:       rgba(255,255,255,0.04) + border rgba(255,255,255,0.08)
Hover:        rgba(107,63,240,0.06) + border rgba(107,63,240,0.4)
```

### Типографіка
- Font: Inter, -apple-system, system-ui
- H1: clamp(40px, 5vw, 68px), weight 700, letter-spacing -2.5px
- H2: clamp(28px, 4vw, 40px), weight 700, letter-spacing -0.5px
- Body: 16-18px, color rgba(255,255,255,0.5)

### Анімації
- Framer Motion `whileInView` fade+Y на секціях (once: true)
- Cursor glow через CSS custom properties (--glow-x, --glow-y) — без reflow
- Three.js куля: wave distortion + mouse rotation
- Nav: backdrop-filter blur(20px) після скролу

## Ключові архітектурні рішення

### Nav (floating pill)
- `position: fixed`, `top: 24px`, `justify-content: center`
- `pointerEvents: none` на header, `pointerEvents: all` на pill
- Містить: logo | nav links | соцмережі (TG, IG) | lang switcher (UA/EN) | CTA
- Lang switcher — поки тільки UI стан, i18n не підключено

### Hero
- Двоколонковий grid 1fr 1fr
- Ліво: текст, badge, кнопки
- Право: SphereCanvas (lazy import, ssr: false)
- Cursor glow: mousemove → CSS vars → no reflow
- Background: 3 статичні glow + dot grid з mask

### SphereCanvas
- WebGL availability check перед ініціалізацією
- Fallback: пульсуючий CSS glow якщо WebGL недоступний
- Three.js імпортується динамічно всередині useEffect
- 4000 частинок, wave distortion по sin/cos, mouse rotation
- Cleanup: cancelAnimationFrame + renderer.dispose()

### Contact форма
- react-hook-form + zod resolver
- Honeypot поле (display:none, tabIndex:-1) проти ботів
- In-memory rate limit (3 req/хв per IP) в route handler
- Success/error стан через useState

### API /api/contact
- POST → валідація zod → honeypot check → sendTelegramMessage()
- Rate limiting через Map (reset на cold start — прийнятно для MVP)
- Env vars: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID

## .env.local (потрібно створити)
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

## TODO (не зроблено)
- [ ] Мобільна адаптація (hamburger menu для Nav)
- [ ] i18n (UA/EN) — підключити next-intl або react-i18next
- [ ] Скріншоти проєктів в /public/projects/
- [ ] sitemap.ts, robots.ts
- [ ] OG image
- [ ] JSON-LD schema
- [ ] Vercel Analytics
- [ ] .env.local з Telegram credentials
- [ ] Замінити всі YOUR_NAME/YOUR_NICK placeholders

## Деплой
```bash
git add .
git commit -m "feat: dark theme, gradient UI, floating nav, sphere hero"
git push origin main
```
Vercel: підключити репо, додати env vars TELEGRAM_BOT_TOKEN і TELEGRAM_CHAT_ID.