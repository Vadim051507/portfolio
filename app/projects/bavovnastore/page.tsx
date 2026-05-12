import Container from "@/components/ui/Container";
import BackButton from "@/components/ui/BackButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "BavovnaStore — YOUR_NAME",
    description: "Інтернет-магазин українського одягу на Spring Boot + React.",
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

export default function BavovnaStorePage() {
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
                    BavovnaStore
                </h1>

                <p style={{ fontSize: "18px", color: "#666666", marginBottom: "48px" }}>
                    Інтернет-магазин українського одягу
                </p>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "64px" }}>
                    {["Spring Boot", "Java 21", "React", "TypeScript", "PostgreSQL", "Telegram", "Nova Poshta"].map((tag) => (
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
                            Клієнт — бренд українського одягу — потребував інтернет-магазин
                            з інтеграцією Нової Пошти, сповіщеннями про замовлення в Telegram
                            та зручною адмінкою для управління товарами.
                        </p>
                    </Section>

                    <Section title="Рішення">
                        <p>
                            Backend на Spring Boot (Java 21) з REST API, подвійний SecurityFilterChain
                            для API та адмінки. Фронтенд на React + TypeScript, Zustand для стану кошика,
                            infinite scroll. Інтеграція з Nova Poshta для вибору міст і відділень.
                            Telegram-сповіщення про нові замовлення.
                        </p>
                    </Section>

                    <Section title="Технічні деталі">
                        <p>
                            Rate limiting через Bucket4j + Caffeine. Soft-delete для товарів.
                            PostgreSQL sequence для номерів замовлень. Thumbnailator для стиснення зображень.
                            100+ backend тестів. i18n (українська/англійська).
                        </p>
                    </Section>

                    <Section title="Результат">
                        <p>
                            Повнофункціональний магазин готовий до продажу.
                            Клієнт самостійно управляє каталогом через адмінку.
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