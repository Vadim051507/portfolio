export default function SectionTitle({
                                         title,
                                         subtitle,
                                     }: {
    title: string;
    subtitle?: string;
}) {
    return (
        <div style={{ marginBottom: "56px" }}>
            <h2
                style={{
                    fontSize: "clamp(28px, 4vw, 40px)",
                    fontWeight: 700,
                    color: "#0F0E1A",
                    letterSpacing: "-0.5px",
                    lineHeight: 1.2,
                }}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    style={{
                        marginTop: "12px",
                        fontSize: "17px",
                        color: "rgba(15,14,26,0.55)",
                        maxWidth: "560px",
                    }}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}