"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CircularCarousel from "@/components/react-bits/CircularCarousel";
import { HERO_BROWSER_PROJECTS } from "@/lib/constants";
import { GALLERY } from "@/lib/gallery";

// Ring look. The component itself (components/react-bits) is third-party
// and stays untouched: everything is tuned from here and from the
// .pf-ring overrides in Portfolio.tsx.
//
// "orbit" keeps every card facing the viewer, so with only a few screens
// the ones behind still read as screens; "cylinder" turns them edge-on and
// shows their backs.
//
// Autoplay is "step", not "drift": drift turns the ring all the time, so
// most of the time two cards share the front half-and-half and stack into
// each other. Step rests with one card dead centre and springs to the next.
// Tilt stays 0: orbit cards face the viewer, so without tilt every screen
// is a straight rectangle; any tilt skews them into trapezoids.
// The component scales the whole ring to its box width, which is why the
// box breaks out of the container (.pf-ring) and the gap is negative:
// both make the front card larger. Low perspective widens the gap in size
// between the front card and the ones receding.
const RING = {
    preset: "orbit",
    cardWidth: 700,
    aspectRatio: 1.78,
    gap: -110,
    curve: 0,
    tilt: 0,
    perspective: 1000,
    depthFade: 0.9,
    innerShade: 0.9,
    cornerRadius: 20,
    interval: 4.5,
} as const;

/**
 * Desktop visual of the Portfolio section: a 3D ring of project screens
 * (lib/gallery.ts) with an info panel for whichever card is in front.
 * Loaded through next/dynamic from Portfolio.tsx, only from 1024px up.
 */
export default function PortfolioRing({ live }: { live: ReadonlySet<string> }) {
    const router = useRouter();
    const [active, setActive] = useState(0);
    // The carousel reports the front card through onChange a frame or more
    // after a click, so at click time this still holds the card that was
    // in front before it — exactly what "click the front card" needs.
    const activeRef = useRef(0);

    const handleChange = useCallback((index: number) => {
        activeRef.current = index;
        setActive(index);
    }, []);

    const handleItemClick = useCallback(
        (_item: unknown, index: number) => {
            if (index !== activeRef.current) return;
            const project = HERO_BROWSER_PROJECTS.find(
                (p) => p.slug === GALLERY[index].projectId
            );
            if (project && live.has(project.slug)) router.push(project.href);
        },
        [live, router]
    );

    const item = GALLERY[active] ?? GALLERY[0];
    const project = HERO_BROWSER_PROJECTS.find((p) => p.slug === item.projectId)!;
    const isLive = live.has(project.slug);

    return (
        <>
            <div className="pf-ring">
                <CircularCarousel
                    items={GALLERY}
                    {...RING}
                    fadeColor="var(--bg)"
                    captions={false}
                    autoplay="step"
                    pauseOnHover
                    snap
                    draggable
                    focusOnClick
                    intro="rise"
                    onChange={handleChange}
                    onItemClick={handleItemClick}
                />
            </div>

            <div className="pf-info">
                {/* keyed so the text cross-fades when another card comes forward */}
                <div className="pf-info-text" key={`t${active}`}>
                    <div className="meta-label pf-info-meta">
                        {/* one dot per screen in the ring, the front one lit */}
                        <span className="pf-info-dots" aria-hidden>
                            {GALLERY.map((g, k) => (
                                <span key={g.src} data-on={k === active} />
                            ))}
                        </span>
                        <span>{item.subtitle}</span>
                        <span>{project.domain}</span>
                    </div>
                    <h3 className="pf-info-title">{project.title}</h3>
                    <p className="pf-info-desc">{project.description}</p>
                    <div className="pf-info-tags">
                        {project.tags.map((t) => (
                            <span key={t} className="tag">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="pf-info-actions" key={`a${active}`}>
                    {isLive ? (
                        <>
                            <Link className="btn btn-primary" href={project.href}>
                                <span className="btn-face">Кейс</span>
                            </Link>
                            <a
                                className="btn btn-ghost"
                                href={`https://${project.domain}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="btn-face">
                                    Відкрити сайт
                                    <svg
                                        aria-hidden
                                        width="15"
                                        height="15"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M7 17 17 7M8 7h9v9" />
                                    </svg>
                                </span>
                            </a>
                        </>
                    ) : (
                        <span className="pf-soon pf-info-soon">Скоро</span>
                    )}
                </div>
            </div>
        </>
    );
}
