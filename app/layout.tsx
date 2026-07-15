import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/constants";
import Nav from "@/components/Nav";
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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="uk">
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
            </head>
            <body>
                <AuroraBackground />
                <ScrollProgress />
                <SpotlightCursor />
                <div className="grain" />
                <Nav />
                {children}
            </body>
        </html>
    );
}