# Portfolio — ARCHITECTURE.md

## Загальний опис
Особистий сайт-портфоліо fullstack розробника. One-page з окремими підсторінками для кейсів.
Світла тема (#F2F1F6), градієнтний акцент (purple/blue), floating nav, анімації Framer Motion.

## Стек
- **Next.js 15** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** (без конфіг файлу, тільки globals.css)
- **Framer Motion** — анімації секцій
- **react-hook-form + zod** — валідація контактної форми
- **Three.js** — 3D куля частинок в Hero (з WebGL fallback)

## Файлова структура
portfolio/
├── app/
│   ├── layout.tsx              # Root layout, metadata, рендерить Nav + NavMobile
│   ├── page.tsx                # Головна сторінка (one-page)
│   ├── globals.css             # Tailwind v4, кольори (#F2F1F6 фон), scrollbar
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
│   ├── Nav.tsx                 # Floating pill nav — ТІЛЬКИ десктоп (>860px)
│   │                           # Повертає null якщо window.innerWidth <= 860 (isMobile state)
│   │                           # Містить: logo | nav links | TG + IG | lang switcher | CTA
│   ├── NavMobile.tsx           # Мобільна навігація (<861px)
│   │                           # Прихована через CSS: @media(min-width:861px){display:none}
│   │                           # Містить: logo | CTA кнопка | hamburger → dropdown з посиланнями
│   │                           # ⚠️ ВІДОМИЙ БАГ: кнопка "Зв'язатись" може обрізатись на вузьких
│   │                           # екранах якщо SITE.name довгий. Pill має overflow:hidden як фікс.
│   ├── SphereCanvas.tsx        # Three.js куля частинок (lazy, з fallback)
│   ├── sections/
│   │   ├── Hero.tsx            # Двоколонковий grid, куля справа, cursor glow
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

## Дизайн-система

### Кольори
Фон:          #F2F1F6  (світло-сірий, ЗМІНЕНО з #000010)
Акцент:       linear-gradient(135deg, #6B3FF0, #0066FF)
Текст:        #0F0E1A / rgba(15,14,26,0.5)
Картки:       rgba(0,0,0,0.04) + border rgba(0,0,0,0.12)
Hover:        rgba(0,0,0,0.08)
Nav bg:       rgba(8,6,18,0.78–0.95) — темна пілюля на світлому фоні
Glow 1:       rgba(107,63,240,0.12) — top left
Glow 2:       rgba(0,100,255,0.08) — top right
Dot grid:     rgba(0,0,0,0.07) 1px dots, 28px grid

### Типографіка
- Font: Inter, -apple-system, system-ui
- H1: clamp(36px, 5vw, 68px), weight 700, letter-spacing -2.5px
- H2: clamp(28px, 4vw, 40px), weight 700, letter-spacing -0.5px
- Body: 16-17px, color rgba(15,14,26,0.5)

### Анімації
- Framer Motion `whileInView` fade+Y на секціях (once: true)
- Cursor glow через CSS custom properties (--glow-x, --glow-y) — без reflow
- Three.js куля: wave distortion + mouse rotation + scatter ефект при hover
- Nav: backdrop-filter blur(20px), темніє після скролу

## Ключові архітектурні рішення

### Nav — адаптивність
- Два окремі компоненти: `Nav.tsx` (десктоп) і `NavMobile.tsx` (мобільний)
- Обидва рендеряться в `layout.tsx`
- `Nav.tsx` — повертає `null` якщо `window.innerWidth <= 860` через `isMobile` useState
- `NavMobile.tsx` — ховається через `@media(min-width:861px){display:none}` в `<style>` тезі
- Breakpoint: 860px — нижче мобільний, вище десктоп
- `Nav.tsx`: `pointerEvents: none` на header, `pointerEvents: all` на pill
- Lang switcher — поки тільки UI стан, i18n не підключено

### Hero
- Двоколонковий grid `1fr 1fr`, gap 40px
- Ліво (order: -1): текст, badge, кнопки
- Право: SphereCanvas (lazy import, ssr: false)
- Адаптив: `@media(max-width:900px)` — висота кулі 400px; `@media(max-width:640px)` — одна колонка, куля абсолютно позиціонована на фоні з opacity 0.2
- Cursor glow: mousemove → CSS vars → no reflow
- Background: 2 статичні glow + dot grid з mask

### SphereCanvas
- WebGL availability check перед ініціалізацією
- Fallback: пульсуючий CSS glow якщо WebGL недоступний
- Three.js імпортується динамічно всередині useEffect
- 8000 частинок, size 0.011, opacity 0.9
- Wave distortion по sin/cos + mouse rotation
- Scatter ефект: при наведенні курсора точки розбігаються від нього (scatterOffsets + scatterStrength lerp 0.06)
- camera.position.z = 2.5, FOV = 75
- ResizeObserver на mount контейнер для ресайзу рендерера
- Cleanup: cancelAnimationFrame + renderer.dispose() + ro.disconnect()
- position: relative (не absolute!) — інакше буде дублікат кулі

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
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_CHAT_ID=your_chat_id

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
- [ ] NavMobile — протестувати на реальному девайсі, впевнитись що pill не обрізається
- [ ] i18n (UA/EN) — підключити next-intl або react-i18next
- [ ] Скріншоти проєктів в /public/projects/
- [ ] sitemap.ts, robots.ts
- [ ] OG image
- [ ] JSON-LD schema
- [ ] Vercel Analytics
- [ ] .env.local з Telegram credentials
- [ ] Замінити всі YOUR_NAME/YOUR_NICK placeholders
- [ ] Мобільна адаптація інших секцій (Services, Portfolio, Process, etc.)

## Деплой
```bash
git add .
git commit -m "feat: light theme, adaptive nav (Nav+NavMobile), sphere scatter effect, mobile hero"
git push origin main
```
Vercel: підключити репо, додати env vars TELEGRAM_BOT_TOKEN і TELEGRAM_CHAT_ID.