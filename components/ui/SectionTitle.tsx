import AnimatedHeading from "@/components/site/AnimatedHeading";
import Reveal from "@/components/site/Reveal";

export default function SectionTitle({
    title,
    subtitle,
    eyebrow,
    gradientWord,
    align = "left",
}: {
    title: string;
    subtitle?: string;
    eyebrow?: string;
    /** substring inside `title` to paint with the neon gradient */
    gradientWord?: string;
    align?: "left" | "center";
}) {
    // Build heading segments, splitting out the gradient word if present.
    const segments: { text: string; gradient?: boolean }[] = [];
    if (gradientWord && title.includes(gradientWord)) {
        const [before, after] = title.split(gradientWord);
        if (before.trim()) segments.push({ text: before.trim() });
        segments.push({ text: gradientWord, gradient: true });
        if (after.trim()) segments.push({ text: after.trim() });
    } else {
        segments.push({ text: title });
    }

    return (
        <div
            style={{
                marginBottom: "60px",
                textAlign: align,
                ...(align === "center"
                    ? { marginLeft: "auto", marginRight: "auto", maxWidth: "760px" }
                    : {}),
            }}
        >
            {eyebrow && (
                <Reveal style={{ marginBottom: "18px" }}>
                    <span
                        className="eyebrow"
                        style={
                            align === "center"
                                ? { justifyContent: "center" }
                                : undefined
                        }
                    >
                        {eyebrow}
                    </span>
                </Reveal>
            )}
            <AnimatedHeading
                segments={segments}
                style={{
                    fontSize: "clamp(30px, 4.6vw, 52px)",
                    fontWeight: 700,
                    color: "var(--text)",
                    letterSpacing: "-1.5px",
                    lineHeight: 1.05,
                }}
            />
            {subtitle && (
                <Reveal delay={0.15} style={{ marginTop: "18px" }}>
                    <p
                        style={{
                            fontSize: "18px",
                            color: "var(--text-2)",
                            maxWidth: "600px",
                            lineHeight: 1.65,
                            ...(align === "center"
                                ? { marginLeft: "auto", marginRight: "auto" }
                                : {}),
                        }}
                    >
                        {subtitle}
                    </p>
                </Reveal>
            )}
        </div>
    );
}