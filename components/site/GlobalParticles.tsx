"use client";

import dynamic from "next/dynamic";

const PageFlow = dynamic(() => import("@/components/site/PageFlow"), {
    ssr: false,
});

/**
 * Mounts the flowing ribbon that continues the hero trail down to the footer
 * as a fixed, full-viewport layer anchored to the page scroll.
 */
export default function GlobalParticles() {
    return (
        <div
            aria-hidden
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 1,
                pointerEvents: "none",
                opacity: 0.9,
            }}
        >
            <PageFlow />
        </div>
    );
}