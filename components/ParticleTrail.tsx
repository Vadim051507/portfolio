"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleTrail() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let W = mount.offsetWidth;
        let H = mount.offsetHeight;

        // Gracefully degrade when WebGL is unavailable (old devices, some
        // headless/embedded browsers) instead of crashing the page.
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

        type P = {
            p0x: number; p0y: number;
            p1x: number; p1y: number;
            p2x: number; p2y: number;
            p3x: number; p3y: number;
            t: number;
            speed: number;
            alpha: number;
            colorT: number;
        };

        const makeP = (t0: number): P => {
            const s = STREAMS[Math.floor(Math.random() * STREAMS.length)];
            const jx = (Math.random() - 0.5) * s.spread * 5;
            const jy = (Math.random() - 0.5) * 0.05;

            const p0 = toWorld(s.p0.x + jx * 0.5,  s.p0.y + Math.random() * 0.06);
            const p1 = toWorld(s.p1.x + jx * 1.6,  s.p1.y + jy * 2.0);
            const p2 = toWorld(s.p2.x + jx * 1.6,  s.p2.y + jy * 2.0);
            const p3 = toWorld(s.p3.x + jx * 0.5,  s.p3.y - Math.random() * 0.06);

            return {
                p0x: p0.x, p0y: p0.y,
                p1x: p1.x, p1y: p1.y,
                p2x: p2.x, p2y: p2.y,
                p3x: p3.x, p3y: p3.y,
                t: t0,
                speed: 0.00025 + Math.random() * 0.00075,
                alpha: 0.55 + Math.random() * 0.45,
                colorT: Math.random(),
            };
        };

        const particles: P[] = Array.from({ length: COUNT }, () => makeP(Math.random()));

        const positions = new Float32Array(COUNT * 3);
        const colors    = new Float32Array(COUNT * 4);
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("color",    new THREE.BufferAttribute(colors,    4));

        const tc = document.createElement("canvas");
        tc.width = tc.height = 32;
        const tctx = tc.getContext("2d")!;
        const tg = tctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        tg.addColorStop(0,   "rgba(255,255,255,1)");
        tg.addColorStop(0.3, "rgba(255,255,255,0.9)");
        tg.addColorStop(1,   "rgba(255,255,255,0)");
        tctx.fillStyle = tg;
        tctx.fillRect(0, 0, 32, 32);

        const mat = new THREE.PointsMaterial({
            size: 3.4,
            vertexColors: true,
            transparent: true,
            depthWrite: false,
            sizeAttenuation: false,
            map: new THREE.CanvasTexture(tc),
            alphaTest: 0.005,
            blending: THREE.AdditiveBlending,
        });
        scene.add(new THREE.Points(geo, mat));

        const cA = new THREE.Color("#A855F7");
        const cB = new THREE.Color("#6366F1");
        const cC = new THREE.Color("#22D3EE");
        const getColor = (t: number) => {
            const c = new THREE.Color();
            if (t < 0.5) c.lerpColors(cA, cB, t * 2);
            else         c.lerpColors(cB, cC, (t - 0.5) * 2);
            return c;
        };

        const bz = (p0: number, p1: number, p2: number, p3: number, t: number) =>
            (1-t)**3*p0 + 3*(1-t)**2*t*p1 + 3*(1-t)*t**2*p2 + t**3*p3;

        let raf: number;
        let last = 0;

        const tick = (now: number) => {
            raf = requestAnimationFrame(tick);
            const dt = Math.min(now - last, 33);
            last = now;

            const pos = geo.attributes.position.array as Float32Array;
            const col = geo.attributes.color.array    as Float32Array;

            for (let i = 0; i < COUNT; i++) {
                const p = particles[i];
                p.t += p.speed * (dt / 16);
                if (p.t > 1) { particles[i] = makeP(0); continue; }

                const x = bz(p.p0x, p.p1x, p.p2x, p.p3x, p.t);
                const y = bz(p.p0y, p.p1y, p.p2y, p.p3y, p.t);

                pos[i*3]   = x;
                pos[i*3+1] = y;
                pos[i*3+2] = 0;

                const fade = p.t < 0.04 ? p.t / 0.04
                    : p.t > 0.90 ? (1 - p.t) / 0.10
                        : 1;

                const c = getColor(p.colorT + p.t * 0.3);
                col[i*4]   = c.r;
                col[i*4+1] = c.g;
                col[i*4+2] = c.b;
                col[i*4+3] = p.alpha * fade;
            }

            geo.attributes.position.needsUpdate = true;
            geo.attributes.color.needsUpdate    = true;
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
            geo.dispose();
            mat.dispose();
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