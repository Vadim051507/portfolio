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
- **Three.js** — ParticleTrail (S-подібні потоки частинок у Hero)
- **react-hook-form + zod** — валідація контактної форми
- **next/image** — оптимізація скріншотів проєктів в Hero

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
│   ├── ProjectsBrowser.tsx             # 3D браузер-mockup з ротацією проєктів
│   ├── ParticleTrail.tsx               # ★ NEW: Three.js S-подібні потоки частинок (Hero bg)
│   ├── sections/
│   │   ├── Hero.tsx                    # overflow:hidden, ProjectsBrowser + ParticleTrail
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
│   │                                   # HERO_BROWSER_PROJECTS (для ProjectsBrowser)
│   ├── telegram.ts
│   └── validation.ts
│
├── public/
│   └── projects/                       # Скріншоти для HERO_BROWSER_PROJECTS
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

Browser-mockup акценти:
  Dental:     rgba(56, 178, 172, 0.45)   — м'ятно-блакитний (медицина)
  Bavovna:    rgba(217, 119, 6, 0.4)     — бурштиновий (товари)
  Chrome bg:  #F4F2EE                     — фон шапки браузера (Safari-style)
  Dots:       #ED6A5E / #F4BF4F / #61C554 — традиційні traffic-lights

★ ParticleTrail кольори:
  cA: #9933FF  — яскравий фіолет (старт потоку)
  cB: #1144FF  — яскравий синій (середина)
  cC: #0099FF  — блакитний (кінець потоку)
```

### Типографіка
- Font: Inter, -apple-system, system-ui
- H1: clamp(36px, 5vw, 68px), weight 700, letter-spacing -2.5px
- H2: clamp(28px, 4vw, 40px), weight 700, letter-spacing -0.5px
- Body: 16-17px, color rgba(15,14,26,0.5)
- Browser URL bar: SFMono-Regular/Menlo/Consolas, 12px

### Анімації
- Framer Motion `whileInView` fade+Y на секціях (once: true)
- Cursor glow через CSS custom properties (--glow-x, --glow-y) — без reflow
- Browser-mockup: float-анімація 7s, rotateY(-14deg) rotateX(6deg), `perspective` ВСЕРЕДИНІ transform
- Slide transitions: opacity + scale 1.02→1, cubic-bezier(0.16, 1, 0.3, 1)
- Domain rotation in URL bar: AnimatePresence з вертикальним slide
- ★ ParticleTrail: requestAnimationFrame, кубічний Безьє, fade-in/fade-out кожної частинки

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
- `overflow: hidden` на `<section>` — кліпає glow-блоби і ParticleTrail що вилазять за межі
- Двоколонковий grid `1fr 1fr`, gap 40px
- Ліва колонка: badge → H1 → опис → 3 guarantee-плашки → CTA-кнопки
- Права колонка: `ProjectsBrowser` (раніше була `SphereCanvas`)
- `zIndex` шари: `0` — ParticleTrail + dot grid, `1` — контент (текст, браузер)
- `@media(max-width:860px)`:
    - grid → 1 колонка
    - `.hero-visual` отримує `order: -1` — браузер ВГОРІ на мобільному
    - **НЕ** `display: none` — браузер головний візуальний елемент
- Cursor glow: mousemove → CSS vars → no reflow
- Обгортка над `ProjectsBrowser` не використовує `scale` у `motion.div` — ламає 3D `perspective` всередині. Тільки `opacity` + `y`.

**Імпорти в Hero:**
```tsx
const ProjectsBrowser = dynamic(() => import("@/components/ProjectsBrowser"), { ssr: false });
const ParticleTrail   = dynamic(() => import("@/components/ParticleTrail"),    { ssr: false });
```
Обидва `ssr: false` — використовують browser API.

### ★ ParticleTrail (NEW)
Three.js компонент — декоративні S-подібні потоки частинок у правій частині Hero.

**Розміщення:** `position: absolute, inset: 0, zIndex: 0` — повністю під контентом.

**Технічна реалізація:**
- `WebGLRenderer` з `alpha: true` — прозорий фон, рендер поверх CSS фону секції
- `PerspectiveCamera(fov=60, z=5)` + функція `toWorld(nx, ny)` конвертує нормалізовані координати (0..1) у world-простір
- `BufferGeometry` з `position` (Float32Array) і `color` (Float32Array RGBA) атрибутами
- `PointsMaterial` з `sizeAttenuation: false` (розмір у пікселях, не залежить від глибини), `size: 3.0`, кастомна кругла текстура через `CanvasTexture`
- 14 000 частинок, ~60fps через `requestAnimationFrame`

**Форма потоків:**
4 S-подібні криві (кубічний Безьє з 4 контрольними точками):
```
p0 — верх, притиснутий до правого краю (0.84–1.05 X)
p1 — різко вліво (0.48–0.62 X) — верхній вигин S
p2 — різко вправо назад (0.85–1.02 X) — нижній вигин S
p3 — низ, до центру (0.37–0.52 X)
```

**Jitter:** `jx * 1.6` на p1/p2 — частинки розсипані навколо кривої, потік виглядає органічно а не як лінія.

**Fade:** кожна частинка має fade-in перші 4% шляху і fade-out останні 10%.

**Перероджування:** коли `t > 1` — частинка перестворюється з `t=0` і новими випадковими параметрами. Завдяки ініціалізації з `makeP(Math.random())` всі частинки рівномірно розподілені вздовж кривих від старту.

**Resize:** `ResizeObserver` на mount div → оновлює renderer, camera aspect, перегенеровує всі частинки під нові розміри.

**`prefers-reduced-motion`:** перевіряється одразу на вході у `useEffect`, повертає без рендеру.

**Cleanup:** `cancelAnimationFrame` + `ResizeObserver.disconnect()` + `renderer/geo/mat.dispose()` + видалення canvas з DOM.

**Чому не canvas 2D:**
Three.js дає GPU-прискорення через WebGL — 14k частинок з плавними 60fps. Canvas 2D при такій кількості дав би просідання до 20-30fps.

### ProjectsBrowser
Інтерактивний браузер-mockup з ротацією проєктів. Замінив SphereCanvas як головний візуальний елемент Hero.

**Нові поля типу Project (v2):**
```ts
type Project = {
  slug: string;
  domain: string;
  title: string;
  description?: string;
  tags?: readonly string[];  // readonly — сумісно з as const в constants.ts
  image: string;
  accent?: string;
  href: string;
};
```
**Важливо:** `tags` має бути `readonly string[]`, не `string[]` — бо `HERO_BROWSER_PROJECTS as const` робить масиви readonly.

**Підпис під браузером (v2):**
- `.pb-caption-wrap` — фіксована висота `44px`, щоб layout не стрибав при зміні слайду
- `.pb-caption` — назва + теги моноспейсом з точками-роздільниками
- `AnimatePresence mode="wait"` — плавна зміна caption при перемиканні слайду

**Структура:**
- `.pb-wrap` — flex-обгортка, центрує
- `.pb-float` — 3D-нахилений контейнер з float-анімацією
- `.pb-accent-glow` — м'яке блюр-світіння під браузером
- `.pb-browser` — `<Link>` обгортка, веде на `/projects/{slug}`
- `.pb-chrome` — шапка з 3 dots + URL bar + actions menu
- `.pb-screen` — контейнер слайдів з прогрес-баром
- `.pb-slide` — окремий слайд (всі в DOM одночасно, керування через opacity)
- `.pb-indicators` / `.pb-ind` — точки-перемикачі
- `.pb-caption-wrap` / `.pb-caption` — підпис з назвою і тегами

**API:**
```ts
type Props = {
  projects: Project[];
  intervalMs?: number;      // default 4500
  showProgress?: boolean;   // default true
  appearDelay?: number;     // default 0
};
```

**3D-перспектива:**
```css
.pb-float {
  transform: perspective(1600px) rotateY(-14deg) rotateX(6deg);
}
```
Perspective всередині transform — стійка до Framer Motion композитних шарів.

**Адаптив:**
- `@media (max-width: 860px)` — `transform: none`, `animation: none`
- `@media (prefers-reduced-motion: reduce)` — float і ротація вимикаються

**Дані проєктів (lib/constants.ts):**
```ts
export const HERO_BROWSER_PROJECTS = [
  {
    slug: "tokarchuk-dental",
    domain: "tokarchuk-dental.com.ua",
    title: "Tokarchuk Dental Clinic",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    image: "/projects/tokarchuk-dental.webp",
    accent: "rgba(56, 178, 172, 0.45)",
    href: "/projects/tokarchuk-dental",
  },
  {
    slug: "bavovnastore",
    domain: "bavovnastore.com.ua",
    title: "Bavovna Store",
    tags: ["Spring Boot", "React", "PostgreSQL"],
    image: "/projects/bavovnastore.webp",
    accent: "rgba(217, 119, 6, 0.4)",
    href: "/projects/bavovnastore",
  },
] as const;
```

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

## Виправлені проблеми

### Лаг при перемиканні слайдів ProjectsBrowser
**Причина:** `AnimatePresence` з `key={current.slug}` → unmount/mount `<Image>` при кожному перемиканні.
**Рішення:** всі слайди в DOM одночасно, `opacity` + `.is-active`.

### Плоский вигляд браузера
**Причина:** `perspective` на батьку + Framer Motion `scale` → compositor layer розриває 3D-контекст.
**Рішення:** `perspective()` всередині самого `transform`. `scale` замінено на `y`.

### readonly string[] TS помилка
**Симптом:** `TS2769` — `readonly string[]` несумісний з `string[]` при передачі projects у ProjectsBrowser.
**Причина:** `HERO_BROWSER_PROJECTS as const` робить `tags` readonly tuple.
**Рішення:** тип `tags` у `ProjectsBrowser` — `readonly string[]`, не `string[]`.

## TODO
- [ ] Додати TELEGRAM_BOT_TOKEN і TELEGRAM_CHAT_ID в Vercel env vars → Redeploy
- [ ] Замінити всі YOUR_NAME/YOUR_NICK/YOUR_INSTA placeholders
- [ ] Власний домен (Settings → Domains в Vercel)
- [ ] Конвертувати скріншоти PNG → WebP (1400×875, q=85)
- [ ] i18n (UA/EN) — next-intl або react-i18next
- [ ] sitemap.ts, robots.ts
- [ ] OG image
- [ ] JSON-LD schema
- [ ] Vercel Analytics
- [ ] Мобільна адаптація інших секцій (Process, TechStack)
- [ ] Додати третій проєкт у HERO_BROWSER_PROJECTS
- [ ] ParticleTrail на мобільному — розглянути `display:none` на < 860px для економії батареї