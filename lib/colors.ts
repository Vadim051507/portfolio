/**
 * JS mirror of the colour tokens in app/globals.css (:root).
 *
 * CSS variables don't reach Three.js materials, canvas fillStyle or values
 * Framer Motion has to interpolate, so those read from here instead. Keep
 * the two in sync by hand — globals.css is the source of truth.
 */
export const COLORS = {
    bg: "#070C0B",
    surface: "#0F1715",
    surface2: "#16211E",
    text: "#F4FFFB",
    textMuted: "#8FA8A0",
    textOnAccent: "#04120D",
    accent: "#21F1A8",
    teal300: "#4DB6AC",
    teal400: "#26A69A",
    teal500: "#009688",
    teal700: "#00796B",
    teal800: "#00695C",
    teal900: "#004D40",
} as const;

/** `rgba(33, 241, 168, a)` — the accent at a given opacity. */
export const accentAlpha = (a: number) => `rgba(33, 241, 168, ${a})`;

/** MobileShowcase pillars 01–04: one hue, descending brightness. */
export const PILLAR_COLORS = [
    COLORS.accent,
    COLORS.teal300,
    COLORS.teal400,
    COLORS.teal500,
] as const;
