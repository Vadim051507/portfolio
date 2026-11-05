import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { SITE } from "@/config/site";
import Nav from "@/components/Nav";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import AuroraBackground from "@/components/site/AuroraBackground";
import ScrollProgress from "@/components/site/ScrollProgress";
import TelegramClickTracker from "@/components/site/TelegramClickTracker";

// The one typeface of the site. Variable font, so every weight comes from a
// single file per subset. Exposed as --font-onest and consumed through --font-sans in globals.css.
const onest = Onest({
    subsets: ["cyrillic", "latin"],
    variable: "--font-onest",
    display: "swap",
});

const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

// og:image and twitter:image come from app/opengraph-image.tsx; the
// canonical URL of each page is set by the page itself.
export const metadata: Metadata = {
    metadataBase: new URL(SITE.url),
    title: SITE.title,
    description: SITE.description,
    applicationName: SITE.brandTitle,
    openGraph: {
        title: SITE.title,
        description: SITE.description,
        type: "website",
        locale: "uk_UA",
        siteName: SITE.brandTitle,
        url: "/",
    },
    twitter: {
        card: "summary_large_image",
        title: SITE.title,
        description: SITE.description,
    },
    ...(gscVerification ? { verification: { google: gscVerification } } : {}),
};

// viewport-fit=cover lets the page draw under the iOS home-indicator /
// notch safe areas instead of Safari reserving that strip.
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: "#070C0B",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="uk" className={onest.variable} suppressHydrationWarning>
            <body>
                <AuroraBackground />
                <ScrollProgress />
                <div className="grain" />
                {/* Nav lives inside the provider too (not just {children}) —
                    its anchor links need useSmoothScroll() same as anything
                    in the page content. Content sits above the fixed aurora
                    background. */}
                <SmoothScrollProvider>
                    <Nav />
                    <div style={{ position: "relative", zIndex: 2 }}>
                        {children}
                    </div>
                </SmoothScrollProvider>
                <TelegramClickTracker />
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
