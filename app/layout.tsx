import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SITE } from "@/lib/constants";
import Nav from "@/components/Nav";
import IntroAnimation from "@/components/site/IntroAnimation";
import AuroraBackground from "@/components/site/AuroraBackground";
import GlobalParticles from "@/components/site/GlobalParticles";
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
                <GlobalParticles />
                <ScrollProgress />
                <SpotlightCursor />
                <div className="grain" />
                <Nav />
                {/* Content sits above the fixed background layers (aurora +
                    particle wave) so the wave shows through transparent sections
                    all the way down to the footer. */}
                <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
            </body>
        </html>
    );
}