"use client";

import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";
import Lenis from "lenis";

type ScrollToTarget = number | string | HTMLElement;
type ScrollToOptions = Parameters<Lenis["scrollTo"]>[1];

type SmoothScrollContextValue = {
    lenis: Lenis | null;
    scrollTo: (target: ScrollToTarget, options?: ScrollToOptions) => void;
};

// Native fallback used whenever there's no live Lenis instance to hand the
// scroll off to — reduced motion, or a call before/after the provider has
// mounted one. Anchor links and scroll-to-top buttons should always go
// through `scrollTo` (never call window.scrollTo/scrollIntoView directly)
// so they transparently pick up Lenis when it's active.
function nativeScrollTo(target: ScrollToTarget) {
    if (typeof window === "undefined") return;
    if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
        return;
    }
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
    lenis: null,
    scrollTo: nativeScrollTo,
});

export function useSmoothScroll() {
    return useContext(SmoothScrollContext);
}

/**
 * Sets up a single global Lenis instance and drives it with its own
 * requestAnimationFrame loop. There's no GSAP/ScrollTrigger in this project
 * yet — if that's added later, replace the rAF loop below with
 * `gsap.ticker.add((time) => lenis.raf(time * 1000))` and call
 * `ScrollTrigger.update()` from lenis's 'scroll' event, so both stay on the
 * same tick instead of racing two separate rAF loops.
 *
 * Skipped entirely under prefers-reduced-motion: Lenis is never
 * instantiated, so the browser's native scroll behavior is left as-is
 * rather than smoothed out. `scrollTo` still works in that case — it falls
 * back to native `scrollIntoView`/`window.scrollTo`.
 */
export default function SmoothScrollProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [lenis, setLenis] = useState<Lenis | null>(null);
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (reduced) return;

        const instance = new Lenis({
            duration: 1.15,
            smoothWheel: true,
            // easing intentionally omitted — Lenis's own default
            // (an easeOutExpo-ish curve) already reads well.
        });
        lenisRef.current = instance;
        setLenis(instance);

        let rafId: number;
        const raf = (time: number) => {
            instance.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            instance.destroy();
            lenisRef.current = null;
            setLenis(null);
        };
    }, []);

    const scrollTo = (target: ScrollToTarget, options?: ScrollToOptions) => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(target, options);
            return;
        }
        nativeScrollTo(target);
    };

    return (
        <SmoothScrollContext.Provider value={{ lenis, scrollTo }}>
            {children}
        </SmoothScrollContext.Provider>
    );
}