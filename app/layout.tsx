import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { SITE } from "@/lib/constants";
import Nav from "@/components/Nav";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import IntroAnimation from "@/components/site/IntroAnimation";
import AuroraBackground from "@/components/site/AuroraBackground";
import ScrollProgress from "@/components/site/ScrollProgress";
import SpotlightCursor from "@/components/site/SpotlightCursor";

export const metadata: Metadata = {
    title: SITE.title,
    description: SITE.description,
    openGraph: {
        title: SITE.title,
        description: SITE.description,
        type: "website",
        locale: "uk_UA",
    },
};

// viewport-fit=cover lets the page draw under the iOS home-indicator /
// notch safe areas instead of Safari reserving that strip — without it,
// fixed full-screen elements like the intro overlay can leave a gap right
// around the safe area at the bottom of the screen.
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="uk" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
                    rel="stylesheet"
                />
                {/* Runs before hydration: flags repeat visits within the same
                    session (or reduced-motion prefs) so the intro splash never
                    paints (see .intro-seen in globals.css) — keeps every
                    reload/crawl after the first one in a session instant. */}
                <Script
                    id="intro-seen-check"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `try{var f=/(?:^|[?&])intro=/.test(location.search);var s=sessionStorage.getItem("intro-shown");var r=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!f&&(s||r)){document.documentElement.classList.add("intro-seen")}}catch(e){}`,
                    }}
                />
            </head>
            <body>
                <IntroAnimation />
                <AuroraBackground />
                <ScrollProgress />
                <SpotlightCursor />
                <div className="grain" />
                {/* Nav lives inside the provider too (not just {children}) —
                    its anchor links need useSmoothScroll() same as anything
                    in the page content. Content sits above the fixed aurora
                    background. Hero keeps its own local particle trail
                    (ParticleTrail, mounted inside Hero.tsx) — the site-wide
                    "wave" that used to continue that trail down through every
                    section below Hero has been removed (GlobalParticles/
                    PageFlow), so it's Hero-only now. */}
                <SmoothScrollProvider>
                    <Nav />
                    <div style={{ position: "relative", zIndex: 2 }}>
                        {children}
                    </div>
                </SmoothScrollProvider>
            </body>
        </html>
    );
}