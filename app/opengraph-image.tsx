import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/config/site";

// Link preview for the whole site (og:image + twitter:image via
// metadata inheritance). Generated once at build time.
// Fonts are static TTFs (satori can't read woff2 or variable fonts) and
// carry Cyrillic, which the built-in fallback font does not.

export const alt = "Сайти для локального бізнесу. kindratyak";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#070C0B";
const ACCENT = "#21F1A8";
const TEXT = "#F4FFFB";
const MUTED = "#8FA8A0";
const ON_ACCENT = "#04120D";

export default async function OpengraphImage() {
    const [bold, medium] = await Promise.all([
        readFile(join(process.cwd(), "assets/fonts/Onest-Bold.ttf")),
        readFile(join(process.cwd(), "assets/fonts/Onest-Medium.ttf")),
    ]);

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "72px 80px",
                    background: BG,
                    backgroundImage: `radial-gradient(circle at 88% 12%, rgba(33,241,168,0.22), transparent 46%), radial-gradient(circle at 8% 100%, rgba(0,150,136,0.18), transparent 50%)`,
                    fontFamily: "Onest",
                    color: TEXT,
                }}
            >
                {/* brand row: the logo tile from app/icon.svg + wordmark */}
                <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
                    <svg width="72" height="72" viewBox="0 0 320 320">
                        <rect width="320" height="320" rx="82" fill={ACCENT} />
                        <rect x="105" y="66" width="36" height="100" fill={ON_ACCENT} />
                        <rect x="105" y="182" width="36" height="72" fill={ON_ACCENT} />
                        <rect x="179" y="88" width="36" height="145" fill={ON_ACCENT} />
                    </svg>
                    <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em" }}>
                        {SITE.brandName}
                    </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            fontSize: 92,
                            fontWeight: 700,
                            lineHeight: 1.04,
                            letterSpacing: "-0.03em",
                        }}
                    >
                        <span>Сайти для</span>
                        <span style={{ color: ACCENT }}>локального бізнесу</span>
                    </div>
                    <div
                        style={{
                            marginTop: 30,
                            fontSize: 30,
                            fontWeight: 500,
                            color: MUTED,
                        }}
                    >
                        Клініки, майстерні, локальні послуги. Ціна до початку роботи.
                    </div>
                </div>

                <div style={{ display: "flex", height: 6, width: 120, borderRadius: 6, background: ACCENT }} />
            </div>
        ),
        {
            ...size,
            fonts: [
                { name: "Onest", data: bold, weight: 700, style: "normal" },
                { name: "Onest", data: medium, weight: 500, style: "normal" },
            ],
        }
    );
}
