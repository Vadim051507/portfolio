"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { COLORS } from "@/lib/colors";

export default function ParticleTrail() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let W = mount.offsetWidth;
        let H = mount.offsetHeight;

        // Gracefully degrade when WebGL is unavailable.
        let renderer: THREE.WebGLRenderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
        } catch {
            return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(W, H);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const cam = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
        cam.position.z = 5;

        const toWorld = (nx: number, ny: number) => {
            const vH = 2 * Math.tan(30 * Math.PI / 180) * cam.position.z;
            const vW = vH * (W / H);
            return { x: -vW / 2 + nx * vW, y: vH / 2 - ny * vH };
        };

        // S-форма:
        // p0 — верх, притиснутий до правого краю (0.85-1.05)
        // p1 — різко вліво (0.55-0.65) — верхній вигин S
        // p2 — різко вправо (0.90-1.05) — нижній вигин S назад
        // p3 — низ, до центру (0.40-0.55)
        const STREAMS = [
            {
                p0: { x: 1.05, y: -0.04 },
                p1: { x: 0.62, y: 0.28 },
                p2: { x: 1.02, y: 0.65 },
                p3: { x: 0.52, y: 1.04 },
                spread: 0.024,
            },
            {
                p0: { x: 0.97, y: -0.04 },
                p1: { x: 0.57, y: 0.30 },
                p2: { x: 0.96, y: 0.63 },
                p3: { x: 0.46, y: 1.04 },
                spread: 0.022,
            },
            {
                p0: { x: 0.90, y: -0.04 },
                p1: { x: 0.52, y: 0.32 },
                p2: { x: 0.90, y: 0.61 },
                p3: { x: 0.41, y: 1.04 },
                spread: 0.020,
            },
            {
                p0: { x: 0.84, y: -0.04 },
                p1: { x: 0.48, y: 0.34 },
                p2: { x: 0.85, y: 0.59 },
                p3: { x: 0.37, y: 1.04 },
                spread: 0.018,
            },
        ];

        const COUNT = 14000;
        // Most particles are small round dots; a small share are short
        // round-ended capsules. Capsules live in the tail of the particle
        // array and are drawn by a second Points object, since a point
        // sprite's shape is per-material, not per-vertex.
        const DASH_COUNT = Math.round(COUNT * 0.1);
        const DOT_COUNT = COUNT - DASH_COUNT;

        type P = {
            p0x: number; p0y: number;
            p1x: number; p1y: number;
            p2x: number; p2y: number;
            p3x: number; p3y: number;
            t: number;
            speed: number;
            alpha: number;
            r: number; g: number; b: number;
        };

        // ~89% of the mass sits between teal-400 and teal-500, ~8% are bright
        // mint sparks and ~3% are white ones (taken out of the teal share). Colour is fixed per particle, so it is resolved once
        // here instead of allocating a THREE.Color per particle per frame.
        const cTealA = new THREE.Color(COLORS.teal400);
        const cTealB = new THREE.Color(COLORS.teal500);
        const cMint  = new THREE.Color(COLORS.accent);
        const cWhite = new THREE.Color(COLORS.text);
        const tmp = new THREE.Color();
        const pickColor = () => {
            const roll = Math.random();
            if (roll < 0.08) return { r: cMint.r, g: cMint.g, b: cMint.b };
            if (roll < 0.11) return { r: cWhite.r, g: cWhite.g, b: cWhite.b };
            tmp.lerpColors(cTealA, cTealB, Math.random());
            return { r: tmp.r, g: tmp.g, b: tmp.b };
        };

        const makeP = (t0: number): P => {
            const s = STREAMS[Math.floor(Math.random() * STREAMS.length)];
            const jx = (Math.random() - 0.5) * s.spread * 5;
            const jy = (Math.random() - 0.5) * 0.05;

            const p0 = toWorld(s.p0.x + jx * 0.5,  s.p0.y + Math.random() * 0.06);
            const p1 = toWorld(s.p1.x + jx * 1.6,  s.p1.y + jy * 2.0);
            const p2 = toWorld(s.p2.x + jx * 1.6,  s.p2.y + jy * 2.0);
            const p3 = toWorld(s.p3.x + jx * 0.5,  s.p3.y - Math.random() * 0.06);

            const c = pickColor();
            return {
                p0x: p0.x, p0y: p0.y,
                p1x: p1.x, p1y: p1.y,
                p2x: p2.x, p2y: p2.y,
                p3x: p3.x, p3y: p3.y,
                t: t0,
                speed: 0.00025 + Math.random() * 0.00075,
                alpha: 0.55 + Math.random() * 0.45,
                r: c.r, g: c.g, b: c.b,
            };
        };

        const particles: P[] = Array.from({ length: COUNT }, () => makeP(Math.random()));

        const makeLayer = (count: number) => {
            const geo = new THREE.BufferGeometry();
            geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
            geo.setAttribute("color",    new THREE.BufferAttribute(new Float32Array(count * 4), 4));
            return geo;
        };
        const geoDot = makeLayer(DOT_COUNT);
        const geoDash   = makeLayer(DASH_COUNT);

        // Both sprites are solid shapes with a thin antialiased edge (not the
        // old soft radial falloff), so each one puts more light on screen.
        // With additive blending that is compensated by a lower opacity —
        // otherwise the pinch points of the S-curve blow out.
        const OPACITY = 0.42;
        const makeSprite = (draw: (ctx: CanvasRenderingContext2D, s: number) => void) => {
            const size = 32;
            const c = document.createElement("canvas");
            c.width = c.height = size;
            const ctx = c.getContext("2d")!;
            ctx.fillStyle = COLORS.text;
            draw(ctx, size);
            return new THREE.CanvasTexture(c);
        };

        const dotTex = makeSprite((ctx, s) => {
            ctx.beginPath();
            ctx.arc(s / 2, s / 2, s / 2 - 1, 0, Math.PI * 2);
            ctx.fill();
        });
        // Vertical capsule, about a third as wide as it is tall.
        const dashTex = makeSprite((ctx, s) => {
            const w = s * 0.34;
            ctx.beginPath();
            ctx.roundRect((s - w) / 2, 1, w, s - 2, w / 2);
            ctx.fill();
        });

        const baseMaterial = {
            vertexColors: true,
            transparent: true,
            opacity: OPACITY,
            depthWrite: false,
            sizeAttenuation: false,
            alphaTest: 0.02,
            blending: THREE.AdditiveBlending,
        };
        const matDot = new THREE.PointsMaterial({ ...baseMaterial, size: 3, map: dotTex });
        const matDash   = new THREE.PointsMaterial({ ...baseMaterial, size: 7, map: dashTex });

        scene.add(new THREE.Points(geoDot, matDot));
        scene.add(new THREE.Points(geoDash, matDash));

        const bz = (p0: number, p1: number, p2: number, p3: number, t: number) =>
            (1-t)**3*p0 + 3*(1-t)**2*t*p1 + 3*(1-t)*t**2*p2 + t**3*p3;

        let raf: number;
        let last = 0;

        const tick = (now: number) => {
            raf = requestAnimationFrame(tick);
            const dt = Math.min(now - last, 33);
            last = now;

            const posP = geoDot.attributes.position.array as Float32Array;
            const colP = geoDot.attributes.color.array    as Float32Array;
            const posD = geoDash.attributes.position.array   as Float32Array;
            const colD = geoDash.attributes.color.array      as Float32Array;

            for (let n = 0; n < COUNT; n++) {
                const p = particles[n];
                p.t += p.speed * (dt / 16);
                if (p.t > 1) { particles[n] = makeP(0); continue; }

                const dash = n >= DOT_COUNT;
                const pos = dash ? posD : posP;
                const col = dash ? colD : colP;
                const i = dash ? n - DOT_COUNT : n;

                const x = bz(p.p0x, p.p1x, p.p2x, p.p3x, p.t);
                const y = bz(p.p0y, p.p1y, p.p2y, p.p3y, p.t);

                pos[i*3]   = x;
                pos[i*3+1] = y;
                pos[i*3+2] = 0;

                const fade = p.t < 0.04 ? p.t / 0.04
                    : p.t > 0.90 ? (1 - p.t) / 0.10
                        : 1;

                col[i*4]   = p.r;
                col[i*4+1] = p.g;
                col[i*4+2] = p.b;
                col[i*4+3] = p.alpha * fade;
            }

            geoDot.attributes.position.needsUpdate = true;
            geoDot.attributes.color.needsUpdate    = true;
            geoDash.attributes.position.needsUpdate   = true;
            geoDash.attributes.color.needsUpdate      = true;
            renderer.render(scene, cam);
        };

        raf = requestAnimationFrame(tick);

        const ro = new ResizeObserver(() => {
            W = mount.offsetWidth;
            H = mount.offsetHeight;
            renderer.setSize(W, H);
            cam.aspect = W / H;
            cam.updateProjectionMatrix();
            for (let i = 0; i < COUNT; i++) particles[i] = makeP(Math.random());
        });
        ro.observe(mount);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            renderer.dispose();
            geoDot.dispose();
            geoDash.dispose();
            matDot.dispose();
            matDash.dispose();
            dotTex.dispose();
            dashTex.dispose();
            if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div ref={mountRef} aria-hidden style={{
            position: "absolute", inset: 0,
            pointerEvents: "none", zIndex: 0,
        }} />
    );
}
