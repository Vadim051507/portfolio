export default function Container({
                                      children,
                                      className,
                                  }: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
            className={className}
        >
            {children}
        </div>
    );
}