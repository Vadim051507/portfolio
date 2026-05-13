"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleTrail() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        // Reduced motion — нічого не рендеримо
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let W = mount.offsetWidth;
        let H = mount.offsetHeight;

        // ── Renderer ──────────────────────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(W, H);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        // ── Scene ─────────────────────────────────────────────────────────────
        const scene = new THREE.Scene();

        // PerspectiveCamera дивиться прямо, z=5
        const cam = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
        cam.position.z = 5;

        // ── Helpers: screen coords → world coords ─────────────────────────────
        // При z=0 і fov=60, z_cam=5:
        // visibleHeight = 2 * tan(fov/2 * PI/180) * camZ = 2 * tan(30°) * 5 ≈ 5.77
        // visibleWidth  = visibleHeight * aspect
        const getVisible = () => {
            const vH = 2 * Math.tan((60 / 2) * (Math.PI / 180)) * cam.position.z;
            const vW = vH * (W / H);
            return { vW, vH };
        };

        // (0,0) = top-left, (1,1) = bottom-right → world XY
        const toWorld = (nx: number, ny: number) => {
            const { vW, vH } = getVisible();
            return new THREE.Vector2(
                -vW / 2 + nx * vW,
                vH / 2 - ny * vH   // Y перевернутий
            );
        };

        // ── Particle data ─────────────────────────────────────────────────────
        const COUNT = 4000;

        type P = {
            // Bezier: start → ctrl → end
            sx: number; sy: number;
            cx: number; cy: number;
            ex: number; ey: number;
            t: number;
            speed: number;
            size: number;
            alpha: number;
            colorT: number;
        };

        const makeP = (t0: number): P => {
            // START: верхній правий кут (80-100% X, 0-15% Y)
            const s = toWorld(0.80 + Math.random() * 0.22, Math.random() * 0.15);
            // END: нижній центр (38-62% X, 82-100% Y)
            const e = toWorld(0.38 + Math.random() * 0.24, 0.82 + Math.random() * 0.18);
            // CTRL: правий-центр, вигин огинає браузер
            const c = toWorld(0.72 + (Math.random() - 0.5) * 0.18, 0.35 + (Math.random() - 0.5) * 0.22);

            return {
                sx: s.x, sy: s.y,
                cx: c.x, cy: c.y,
                ex: e.x, ey: e.y,
                t: t0,
                speed: 0.0006 + Math.random() * 0.0012,
                size: 1.5 + Math.random() * 2.5,
                alpha: 0.15 + Math.random() * 0.5,
                colorT: Math.random(),
            };
        };

        const particles: P[] = Array.from({ length: COUNT }, () => makeP(Math.random()));

        // ── Geometry ──────────────────────────────────────────────────────────
        const positions = new Float32Array(COUNT * 3);
        const colors    = new Float32Array(COUNT * 4);

        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("color",    new THREE.BufferAttribute(colors,    4));

        // ── Soft circle texture ───────────────────────────────────────────────
        const tc = document.createElement("canvas");
        tc.width = tc.height = 64;
        const tctx = tc.getContext("2d")!;
        const tgrad = tctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        tgrad.addColorStop(0,   "rgba(255,255,255,1)");
        tgrad.addColorStop(0.3, "rgba(255,255,255,0.9)");
        tgrad.addColorStop(1,   "rgba(255,255,255,0)");
        tctx.fillStyle = tgrad;
        tctx.fillRect(0, 0, 64, 64);

        const mat = new THREE.PointsMaterial({
            vertexColors: true,
            transparent: true,
            depthWrite: false,
            sizeAttenuation: false,
            map: new THREE.CanvasTexture(tc),
            alphaTest: 0.005,
        });

        const pts = new THREE.Points(geo, mat);
        scene.add(pts);

        // ── Color palette ─────────────────────────────────────────────────────
        const cA = new THREE.Color("#7B3FF2"); // фіолет
        const cB = new THREE.Color("#2255FF"); // синій
        const cC = new THREE.Color("#00AAFF"); // блакитний

        const getColor = (t: number) => {
            const c = new THREE.Color();
            if (t < 0.5) c.lerpColors(cA, cB, t * 2);
            else         c.lerpColors(cB, cC, (t - 0.5) * 2);
            return c;
        };

        // Quadratic Bezier
        const bz = (a: number, b: number, c: number, t: number) =>
            (1 - t) ** 2 * a + 2 * (1 - t) * t * b + t ** 2 * c;

        // ── Animate ───────────────────────────────────────────────────────────
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
                if (p.t > 1) {
                    particles[i] = makeP(0);
                    continue;
                }

                const x = bz(p.sx, p.cx, p.ex, p.t) + (Math.random() - 0.5) * 0.008;
                const y = bz(p.sy, p.cy, p.ey, p.t) + (Math.random() - 0.5) * 0.008;

                pos[i * 3]     = x;
                pos[i * 3 + 1] = y;
                pos[i * 3 + 2] = 0;

                // fade in / fade out
                const fade = p.t < 0.06 ? p.t / 0.06
                    : p.t > 0.88 ? (1 - p.t) / 0.12
                        : 1;

                const c = getColor(p.colorT + p.t * 0.25);
                col[i * 4]     = c.r;
                col[i * 4 + 1] = c.g;
                col[i * 4 + 2] = c.b;
                col[i * 4 + 3] = p.alpha * fade;

                // розмір через position.z trick не працює з PointsMaterial напряму —
                // використовуємо окремий атрибут через custom shader або просто фіксований
                // size + alpha для відчуття глибини
            }

            geo.attributes.position.needsUpdate = true;
            geo.attributes.color.needsUpdate    = true;

            // Динамічний розмір точок залежно від екрану
            mat.size = 2.5;

            renderer.render(scene, cam);
        };

        raf = requestAnimationFrame(tick);

        // ── Resize ────────────────────────────────────────────────────────────
        const ro = new ResizeObserver(() => {
            W = mount.offsetWidth;
            H = mount.offsetHeight;
            renderer.setSize(W, H);
            cam.aspect = W / H;
            cam.updateProjectionMatrix();
            // Перегенеруємо всі частинки під нові розміри
            for (let i = 0; i < COUNT; i++) {
                particles[i] = makeP(Math.random());
            }
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
        <div
            ref={mountRef}
            aria-hidden
            style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 0,
            }}
        />
    );
}