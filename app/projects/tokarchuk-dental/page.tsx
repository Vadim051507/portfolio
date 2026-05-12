import Container from "@/components/ui/Container";
import BackButton from "@/components/ui/BackButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tokarchuk Dental Clinic — YOUR_NAME",
    description: "Корпоративний сайт стоматологічної клініки на Next.js з повноцінною адмінкою.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#0A0A0A", marginBottom: "12px" }}>
                {title}
            </h2>
            <div style={{ fontSize: "16px", color: "#666666", lineHeight: 1.7 }}>
                {children}
            </div>
        </div>
    );
}

export default function TokarchukDentalPage() {
    return (
        <div style={{ padding: "120px 0 80px", backgroundColor: "#ffffff" }}>
            <Container>
                <BackButton />

                <h1
                    style={{
                        fontSize: "clamp(32px, 5vw, 52px)",
                        fontWeight: 700,
                        color: "#0A0A0A",
                        letterSpacing: "-0.5px",
                        marginBottom: "16px",
                    }}
                >
                    Tokarchuk Dental Clinic
                </h1>

                <p style={{ fontSize: "18px", color: "#666666", marginBottom: "48px" }}>
                    Корпоративний сайт стоматологічної клініки
                </p>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "64px" }}>
                    {["Next.js", "TypeScript", "Tailwind CSS v4", "Framer Motion", "NextAuth v5", "Vercel"].map((tag) => (
                        <span
                            key={tag}
                            style={{
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "#0066FF",
                                backgroundColor: "#EEF4FF",
                                padding: "6px 14px",
                                borderRadius: "6px",
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div style={{ maxWidth: "720px" }}>
                    <Section title="Задача">
                        <p>
                            Клієнт — стоматологічна клініка — потребував сучасний корпоративний сайт
                            з можливістю самостійно оновлювати контент: відгуки, ціни, фото команди,
                            кейси до/після, інформацію про контакти та FAQ.
                        </p>
                    </Section>

                    <Section title="Рішення">
                        <p>
                            Розроблено повноцінний сайт з адмінкою на Next.js App Router.
                            Адмін-панель побудована на тому ж стеку — без окремого CMS.
                            Авторизація через NextAuth v5. Фото зберігаються у Vercel Blob.
                            Для зберігання даних використовується Vercel KV.
                        </p>
                    </Section>

                    <Section title="Результат">
                        <p>
                            Клієнт отримав сайт з повним контролем над контентом через зручну адмінку.
                            Lighthouse 95+ по всіх метриках.
                        </p>
                    </Section>
                </div>

                <div
                    style={{
                        marginTop: "64px",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "16px",
                    }}
                >
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            style={{
                                aspectRatio: "16/9",
                                backgroundColor: "#F5F7FA",
                                borderRadius: "10px",
                                border: "1px solid #EEEEEE",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "14px",
                                color: "#666666",
                            }}
                        >
                            {`Screenshot ${i}`}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}