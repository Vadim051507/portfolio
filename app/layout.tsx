import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/constants";
import Nav from "@/components/Nav";
import NavMobile from "@/components/NavMobile";

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
        <body>
        <Nav />
        <NavMobile />
        {children}
        </body>
        </html>
    );
}