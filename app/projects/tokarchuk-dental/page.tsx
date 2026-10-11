import Container from "@/components/ui/Container";
import BackButton from "@/components/ui/BackButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tokarchuk Dental Clinic — YOUR_NAME",
    description: "Корпоративний сайт стоматологічної клініки на Next.js з повноцінною адмінкою.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div
            style={{
                marginBottom: "40px",
                paddingTop: "28px",
                borderTop: "1px solid var(--border)",
            }}
        >
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text)", marginBottom: "12px" }}>
                {title}
            </h2>
            <div style={{ fontSize: "16px", color: "var(--text-muted)", lineHeight: 1.7 }}>
                {children}
            </div>
        </div>
    );
}

export default function TokarchukDentalPage() {
    return (
        <div style={{ padding: "120px 0 80px" }}>
            <Container>
                <BackButton />

                <h1
                    style={{
                        fontSize: "clamp(32px, 5vw, 52px)",
                        fontWeight: 700,
                        color: "var(--text)",
                        letterSpacing: "-0.5px",
                        marginBottom: "16px",
                    }}
                >
                    Tokarchuk Dental Clinic
                </h1>

                <p style={{ fontSize: "18px", color: "var(--text-muted)", marginBottom: "32px" }}>
                    Корпоративний сайт стоматологічної клініки
                </p>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "64px" }}>
                    {["Next.js", "TypeScript", "Tailwind CSS v4", "Framer Motion", "NextAuth v5", "Vercel"].map((tag) => (
                        <span key={tag} className="tag">
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
                            className="card mono-label"
                            style={{
                                aspectRatio: "16/9",
                                borderRadius: 20,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
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