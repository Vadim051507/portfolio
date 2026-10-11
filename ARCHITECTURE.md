# KINDRATYAK — архітектура

Актуально на 2026-10-12, гілка `redesign/mint-square`. Це єдиний актуальний опис проєкту:
`ARCHITECTURE2.md`, `ARCHITECTURE3.md`, `ARCHITECTURE4.md` і `Portfolio.md` застаріли
(стара палітра, видалені компоненти) і лишені тільки як історія.

## 1. Що це

Особисте one-page портфоліо, бренд KINDRATYAK / Kindratyak.dev. Продає розробку сайтів
малому бізнесу в Україні; головна конверсія — заявка через форму, яка йде в Telegram.
Мова інтерфейсу українська (`<html lang="uk">`), i18n немає: перемикач EN/UA декоративний.

## 2. Стек

| Що | Версія / примітка |
|---|---|
| Next.js | 16.2.6, App Router, Turbopack. **Має ламаючі зміни** відносно старіших версій: перед кодом читати гайди в `node_modules/next/dist/docs/` (вимога `AGENTS.md`) |
| React | 19.2.4 |
| TypeScript | 5, `strict` |
| Tailwind CSS | v4 через `@tailwindcss/postcss`, без конфіг-файлу. Підключений, але **класи майже не використовуються** — див. розділ 9 |
| framer-motion | 12.38 |
| lenis | 1.3 (smooth scroll) |
| three | 0.184 (тільки `ParticleTrail`) |
| react-hook-form + zod | форма контактів |

Скрипти: `dev`, `build`, `start`. Немає `lint`, тестів, CI — перевірка це `npm run build`.
GSAP у проєкті немає. Змінні оточення: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`.

## 3. Структура

```
app/
  layout.tsx            шрифти, metadata, themeColor, глобальні шари (Intro, Aurora, ScrollProgress, grain, Nav)
  page.tsx              головна: 8 секцій у <main> + Footer; Services і Portfolio обгорнуті в .light-sheet
  globals.css           ВСЯ дизайн-система: токени, світла тема, спільні класи, інтро
  icon.svg, favicon.ico логотип-плитка (favicon згенеровано з icon.svg через sharp)
  logo/logo(1).svg      логотип для інтро
  api/contact/route.ts  POST → zod → honeypot → Telegram (rate limit у пам'яті)
  projects/*/page.tsx   дві кейс-сторінки (Server Components)
components/
  Nav.tsx, NavMobile.tsx        фіксована скляна pill-навігація (два розміри), повноекранне мобільне меню
  SmoothScrollProvider.tsx      Lenis + useSmoothScroll()
  ParticleTrail.tsx             Three.js частинки, тільки в Hero
  sections/                     Hero, MobileShowcase (#about), Services, Portfolio,
                                Process, TechStack (#tech), FAQ, Contact, Footer
  site/                         AnimatedHeading, AuroraBackground, Counter, HeroShowcase,
                                Icons, IntroAnimation, MagneticButton, Reveal,
                                ScrollProgress, TechLogos
  ui/                           Container, SectionTitle, BackButton
lib/
  colors.ts             JS-дзеркало кольорів для Three.js і Framer Motion
  constants.ts          увесь текстовий контент сайту
  telegram.ts, validation.ts
public/
  phone/iphone-frame.png        рамка телефона з прозорим вирізом екрана
  projects/*.png                скриншоти проєктів
```

Порядок секцій і теми:

| # | Секція | id | Тема |
|---|---|---|---|
| — | Hero | `#hero` | темна |
| 01 | MobileShowcase (Про мене) | `#about` | темна |
| 02 | Services | `#services` | **світлий аркуш** (`.light-sheet`) |
| 03 | Portfolio | `#portfolio` | **світлий аркуш** (той самий) |
| 04 | Process | `#process` | темна |
| 05 | TechStack | `#tech` | темна |
| 06 | FAQ | `#faq` | темна |
| 07 | Contact | `#contact` | темна секція, **світла картка** всередині |
| — | Footer | | темний |

## 4. Токени (`app/globals.css`)

Єдине джерело правди — CSS-змінні на `:root`. Компоненти беруть кольори тільки через
`var(--…)`; хардкод кольору в компоненті вважається помилкою.

### Темна тема (`:root`)

```
--bg #070C0B   --surface #0F1715   --surface-2 #16211E
--border rgba(33,241,168,.14)      --border-strong rgba(33,241,168,.32)    мʼятні рамки
--white #F4FFFB
--border-soft rgba(244,255,251,.12)   --border-soft-strong rgba(244,255,251,.28)   нейтральні рамки
--text #F4FFFB   --text-muted #8FA8A0   --text-on-accent #04120D
--accent #21F1A8   --accent-glow rgba(33,241,168,.35)   --accent-text: var(--accent)
--teal-300 #4DB6AC  -400 #26A69A  -500 #009688  -700 #00796B  -800 #00695C  -900 #004D40
--danger #FB7185
--radius-pill 100px   --radius-card 28px   --radius-md 12px   --radius-sm 8px
--radius-sheet 40px (28 / 22 на вужчих)   --sheet-shadow 0 24px 60px rgba(0,0,0,.35)
```

Компонентні токени, які відрізняються між темами: `--card-border`, `--tile-bg`,
`--tile-border`, `--card-hover-shadow`, `--spot-color`, `--node-glow`, `--ghost-border`,
`--ghost-border-hover`, `--ghost-bg-hover`.

### Світла тема (`[data-theme="light"]`)

**Правило «один світлий блок».** Сторінка темна. Світлих поверхонь рівно дві: аркуш
`.light-sheet` (Services + Portfolio) і картка форми в Contact. Нових світлих секцій не
додавати: чергування тем уже пробували, воно розвалювало сторінку. Пошук
`data-theme="light"` у `.tsx` має показувати лише `app/page.tsx` і `Contact.tsx`
(плюс селектор у `Nav.tsx`, який ці поверхні шукає).

Блок `[data-theme="light"]` перевизначає токени, тому вміст перефарбовується сам:

```
--bg #F4FFFB   --surface #FFFFFF   --surface-2 #E4F4EE
--border rgba(7,17,14,.12)   --border-strong rgba(7,17,14,.28)
--text #07110E   --text-muted #4A635C
--accent-text #00695C     --accent #21F1A8 (тільки заливки)
--danger #BE123C
```

### Аркуш (`.light-sheet`)

`<div class="light-sheet" data-theme="light">` у `app/page.tsx` навколо `<Services />` і
`<Portfolio />`. Секції всередині прозорі, без власного `data-theme`.

- Форма: `margin: 24px clamp(12px, 2vw, 28px)` (до 640px — `16px 8px`), радіус
  `--radius-sheet` (40px; 28px до 1024px; 22px до 640px), `overflow: clip` (не `hidden`,
  щоб не ламати sticky), `isolation: isolate`, тінь `--sheet-shadow`.
- `::before`: сітка 64px (темна, 0.045) і «світла aurora» — два статичні радіальні
  градієнти (мʼята 0.16 справа зверху, teal-300 0.12 зліва знизу). `::after`: рамка 1px
  `rgba(7,17,14,.06)`.
- Між секціями (`.light-sheet > section + section::before`): лінія 1px `--border` на ширину
  контейнера з мʼятним відрізком 72×2px на початку.
- Картки на аркуші: радіус 20px, мʼяка тінь; hover — підйом 4px, рамка
  `rgba(33,241,168,.7)`, глибша тінь, 220ms. Плитка з іконкою — суцільна мʼята з темною
  іконкою (`--tile-bg` перевизначено на аркуші). Теги на світлому — мʼятний тінт з текстом
  `--accent-text`.
- Картка Contact бере ті самі `--radius-sheet` і `--sheet-shadow`, щоб дві білі поверхні
  читались як один матеріал.
- `main > section + section` малює лінію лише між темними секціями; аркуш не `<section>`,
  тож біля нього ліній немає.

### Tailwind

`@theme inline` привʼязує токени до утиліт (`bg-surface`, `text-muted`, `text-accent-text`,
`border-border`, `font-mono` …). Вони доступні, але код ними майже не користується.

## 5. Правила кольору

1. **Одна мʼята-акцент.** `#21F1A8` — головна кнопка, активні стани, ключові слова, тонкі
   лінії, одне світіння на екран. Не заливати великі площі.
2. **Мʼята не буває текстом на світлому** (контраст ~1.3–1.45). Усе, що є текстом, тонкою
   іконкою чи лінією, бере `--accent-text`; заливки беруть `--accent`.
3. **Білий — окрема роль.** Статичні рамки в темних секціях нейтральні (`--border-soft`,
   `--border-soft-strong`): картки, теги, чіпи, бейдж Hero, вторинна кнопка. Мʼятні рамки
   (`--border`, `--border-strong`) — для інтерактивних елементів і активних станів.
4. **Градієнти тільки в межах одного відтінку** (мʼята → бірюза). Градієнтний текст —
   один на сайт: слово «продають» у Hero.
5. **Акцентне слово є в кожному заголовку** — це підпис бренду (клас `.accent-word`,
   ставить `AnimatedHeading`). На темному це мʼятний текст. На світлому — **маркер**:
   темний текст `--text-on-accent` на мʼятній заливці, яка «дописується» зліва направо за
   700ms, коли заголовок входить у видимість (`data-inview` на `<h2>`, CSS-transition
   `background-size`; змінні `--mk-dur/-delay/-ease` на кожне слово, щоб маркер із кількох
   слів ішов одним рухом). При reduced-motion заливка одразу повна.
6. **`--danger`** — єдиний колір поза бірюзовою шкалою, тільки для помилок форми.
7. Жодних фіолетових/синіх/рожевих відтінків, декоративних glow-блобів, емодзі в UI.
   Символи, які можуть відмалюватись кольоровим емодзі (`↗`, `✓`, `❤`, `🔒`), замінені на SVG.
8. `--teal-700/800/900` не проходять контраст як текст на темному: тільки заливки й лінії.

## 6. Форма, радіуси, типографіка

- **Заокруглена геометрія.** Кнопки завжди pill. Картки `--radius-card` (28px; на аркуші 20px), аркуш і картка Contact `--radius-sheet`, поля форми
  й контактні картки 20px, теги й чіпи pill, плитки з іконками 14–18px, вузли Process
  круглі. Квадратну геометрію і зрізані кути власник відхилив — не повертати.
- **Спільні класи** (`globals.css`): `.card`, `.card-hover`, `.card-clip`, `.spot`, `.tag`,
  `.tile`, `.logo-mark`, `.btn` + `.btn-primary` / `.btn-ghost` (видима частина — внутрішній
  `.btn-face`), `.eyebrow`, `.eyebrow-num`, `.mono-label`, `.gradient-text`, `.back-link`.
- **Кнопки.** Темна секція: головна мʼятна з темним текстом, hover — зсув 2px і світіння;
  вторинна прозора з білуватою рамкою. Світла: головна чорнильна `#07110E` зі світлим
  текстом, на hover стає мʼятною.
- **Шрифти.** Space Grotesk (заголовки) і Inter (текст) — через `<link>` на Google Fonts.
  JetBrains Mono — через `next/font/google`, змінна `--font-mono`, **тільки** для службових
  міток: номери секцій, підписи, теги.

## 7. Ключові компоненти

**ParticleTrail** (`components/ParticleTrail.tsx`) — головний візуал Hero. 14 000 частинок
на чотирьох S-подібних кривих Безьє. Два `THREE.Points`: круглі точки (90%, `size: 3`) і
вертикальні капсули (10%, `size: 7`). Колір фіксований на частинку: ~89% між teal-400 і
teal-500, ~8% мʼята, ~3% білі. Additive blending, `opacity: 0.42` — підібрано, щоб щільні
ділянки не вигорали. Кольори з `lib/colors.ts`. Не монтується при
`prefers-reduced-motion`; при відсутності WebGL тихо нічого не малює. Кількість частинок,
траєкторії і швидкості не міняти без прохання.

**MobileShowcase** — секція «Про мене» з рендером iPhone. Від 1024px: `.ms-track` 340vh +
`.ms-pin` sticky 100vh; на вужчих і при reduced-motion — звичайний потік. Чотири пункти з
кольорами `PILLAR_COLORS` (`#21F1A8`, `#4DB6AC`, `#26A69A`, `#009688`); активний
перефарбовує німб телефона, свічення екрана, риску, номер. Діагональна смуга за списком
статична за кольором. Радіус екрана телефона повторює виріз у PNG-рамці — не чіпати.

**`lib/colors.ts`** — `COLORS`, `accentAlpha()`, `PILLAR_COLORS`. CSS-змінні не доходять до
матеріалів Three.js і до значень, які Framer Motion інтерполює, тому там беруться константи.
Синхронізується з `globals.css` вручну. На світлих поверхнях константи не годяться (вони не
знають про тему): там у Framer передаються рядки `"var(--accent)"`, як у `Process.tsx`.

**SectionTitle** — mono-мітка з номером (`index`) + кінетичний заголовок
(`AnimatedHeading`) + підзаголовок.

**Nav** — скляна панель (liquid glass): напівпрозорий фон + `backdrop-filter`, світла
кромка через `::before` з маскою. Два розміри, атрибут `data-scrolled` на `.nav-shell`:
розгорнутий (до 1240×72, top 24) лише на `/`, від 1024px і на самому верху; компактний
(900×~52, top 16) — усюди далі, на мобільних і кейс-сторінках. Пороги 32px / 12px
(гістерезис). Той самий rAF-слухач скролу виставляє `data-surface="light"`, коли під
центром панелі лежить `[data-theme="light"]`: світле скло — це шар `::after`, що
проявляється через opacity (градієнт не анімується), токени тексту перевизначені на панелі.
`backdrop-filter` не анімується. До першого вимірювання панель прихована
(`data-ready`), щоб перезавантаження посеред сторінки не блимало великою панеллю.

**Contact** — темна секція, велика біла картка (`data-theme="light"` на картці).
`react-hook-form` + zod, honeypot, стани `idle | loading | success | error`.

## 8. Важливі технічні рішення

- **`body { overflow-x: clip }`, не `hidden`.** `hidden` зробив би `<body>`
  scroll-контейнером, що ламає `position: sticky` у MobileShowcase і вимірювання
  scroll-прогресу.
- **Скрол** — завжди через `useSmoothScroll().scrollTo()` (Lenis), не `window.scrollTo`.
- **Важкі клієнтські компоненти** (`ParticleTrail`, `HeroShowcase`) — `dynamic(..., { ssr: false })`.
- **`prefers-reduced-motion`** обробляється в кожному анімованому компоненті: Lenis не
  створюється, інтро не показується, частинки не монтуються, пін знімається, marquee стоїть.
- **Інтро** не використовує viewport-юнітів (фікс iOS Safari) — див. коментарі в `globals.css`.
- **Стилі — inline `style` і локальні `<style>` блоки**, не Tailwind-класи. Hover там, де
  стилі inline, робиться через `onMouseEnter/Leave`; нові речі краще класом у CSS.

## 9. Доступність

- Глобальний `:focus-visible`: 2px мʼятний, offset 3px; у світлому контексті 2px `#00695C`,
  offset 2px. Поля форми мають власний фокус (рамка + внутрішнє кільце).
- Усе клікабельне — нативні елементи: посилання футера `<a>` (якорі перехоплюються для
  Lenis), контактні картки `<a href>` / `mailto:`, «Наверх» — `<button type="button">`.
- Закрите мобільне меню має `inert` + `aria-hidden`. При відкритті фокус іде на кнопку
  закриття, Esc закриває, фокус повертається на бургер.
- Живі картки Portfolio — `div` з `role="link"`, `tabIndex=0` і Enter.
- Відома прогалина: пастки фокуса у відкритому мобільному меню немає.

## 10. Відкладено

- OG-картинка, `manifest`, `metadataBase`, sitemap/robots, JSON-LD.
- ElectricLogo і CircularCarousel з React Bits.
- Плейсхолдери в `lib/constants.ts` і навігації: `YOUR_NAME`, `YOUR_NICK`, `YOUR`,
  `YOUR_INSTA`, ціни `від $XXX` у Services (розходяться з конкретними цінами у FAQ).
- Реальне демо в екрані телефона MobileShowcase (зараз «демо · скоро»).
- UA/EN перемикач нічого не робить; у `florist-shop` немає кейс-сторінки.
- `lib/constants.ts`: невживані `PROJECTS`, `TECH_STACK` і поле `accent` у
  `HERO_BROWSER_PROJECTS`.
- Скриншоти проєктів — важкі PNG через `<img>`, не `next/image`.
