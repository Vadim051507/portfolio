import AnimatedHeading from "@/components/site/AnimatedHeading";
import Reveal from "@/components/site/Reveal";

export default function SectionTitle({
    title,
    subtitle,
    eyebrow,
    accentWord,
    align = "left",
}: {
    title: string;
    subtitle?: string;
    eyebrow?: string;
    /** substring inside `title` set as the accent word: mint text on dark,
     *  a mint marker on a light surface (.accent-word in globals.css) */
    accentWord?: string;
    align?: "left" | "center";
}) {
    // Build heading segments, splitting out the accent word if present.
    const segments: { text: string; accent?: boolean }[] = [];
    if (accentWord && title.includes(accentWord)) {
        const [before, after] = title.split(accentWord);
        if (before.trim()) segments.push({ text: before.trim() });
        segments.push({ text: accentWord, accent: true });
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
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                }}
            />
            {subtitle && (
                <Reveal delay={0.15} style={{ marginTop: "18px" }}>
                    <p
                        style={{
                            fontSize: "18px",
                            color: "var(--text-muted)",
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