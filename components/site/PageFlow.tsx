"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The CONTINUATION of the hero trail.
 *
 * Where the hero S-curve leaves the bottom of the first screen, this picks it up
 * and draws one long, hand-shaped calligraphic ribbon flowing all the way to the
 * footer. The centreline is a Catmull-Rom spline through designed control points
 * (organic meander — a sum of sines that blossoms out of the hero exit, not a
 * mechanical left-right wobble), and the particles form a real ribbon whose
 * thickness follows the curve's normal. Colour drifts violet→indigo→cyan along
 * its length for a slow, hypnotic shimmer.
 *
 * It lives in document space (anchored to scroll), so it is one continuous
 * composition down the whole page rather than a shape that resets each screen.
 */
export default function PageFlow() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let W = mount.offsetWidth || window.innerWidth;
        let H = mount.offsetHeight || window.innerHeight;

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
        // pixel-space camera: x∈[0,W] left→right, y∈[0,H] top→bottom
        const cam = new THREE.OrthographicCamera(0, W, 0, H, -1, 1);
        cam.position.z = 1;

        const SPACING = 500; // vertical px between spline control points
        const START_X = 0.45; // where the hero S-curve exits (fraction of width)

        let heroBottom = 0;
        let docEnd = 0;
        let xf: number[] = []; // control-point x as fraction of width

        const buildPath = () => {
            heroBottom =
                document.getElementById("about")?.offsetTop ?? window.innerHeight;
            docEnd = Math.max(
                document.documentElement.scrollHeight - 40,
                heroBottom + SPACING * 4
            );
            const n = Math.ceil((docEnd - heroBottom) / SPACING) + 3;
            xf = new Array(n);
            for (let i = 0; i < n; i++) {
                const ramp = Math.min(i / 4, 1); // blossom out of the hero exit
                const drift = 0.5 + 0.07 * Math.sin(i * 0.21 + 0.5);
                const wob =
                    0.25 * Math.sin(i * 0.72) +
                    0.10 * Math.sin(i * 1.83 + 1.1) +
                    0.05 * Math.sin(i * 3.1 + 2.0);
                let x = START_X * (1 - ramp) + (drift + wob) * ramp;
                x = Math.max(0.12, Math.min(0.88, x));
                xf[i] = x;
            }
        };
        buildPath();

        const clampIdx = (i: number) => Math.max(0, Math.min(xf.length - 1, i));
        // Catmull-Rom value + tangent (per unit index) of the x-fraction spline
        const crVal = (i: number, t: number) => {
            const p0 = xf[clampIdx(i - 1)];
            const p1 = xf[clampIdx(i)];
            const p2 = xf[clampIdx(i + 1)];
            const p3 = xf[clampIdx(i + 2)];
            return (
                0.5 *
                (2 * p1 +
                    (-p0 + p2) * t +
                    (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t +
                    (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t)
            );
        };
        const crTan = (i: number, t: number) => {
            const p0 = xf[clampIdx(i - 1)];
            const p1 = xf[clampIdx(i)];
            const p2 = xf[clampIdx(i + 1)];
            const p3 = xf[clampIdx(i + 2)];
            return (
                0.5 *
                (-p0 +
                    p2 +
                    2 * (2 * p0 - 5 * p1 + 4 * p2 - p3) * t +
                    3 * (-p0 + 3 * p1 - 3 * p2 + p3) * t * t)
            );
        };

        const COUNT = 16000;
        type P = {
            u: number; // position along the spline (0 .. n-1)
            lat: number; // -0.5..0.5 across the ribbon
            speed: number;
            alpha: number;
            colorT: number;
            tw: number; // twinkle phase
        };
        const uMax = () => xf.length - 1;
        const makeP = (u0: number): P => ({
            u: u0,
            lat: (Math.random() - 0.5) * (0.4 + Math.random() * 0.6),
            speed: 0.0006 + Math.random() * 0.0016,
            alpha: 0.5 + Math.random() * 0.5,
            colorT: Math.random(),
            tw: Math.random() * Math.PI * 2,
        });
        const particles: P[] = Array.from({ length: COUNT }, () =>
            makeP(Math.random() * uMax())
        );

        const positions = new Float32Array(COUNT * 3);
        const colors = new Float32Array(COUNT * 4);
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(colors, 4));

        const tc = document.createElement("canvas");
        tc.width = tc.height = 32;
        const tctx = tc.getContext("2d")!;
        const tg = tctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        tg.addColorStop(0, "rgba(255,255,255,1)");
        tg.addColorStop(0.3, "rgba(255,255,255,0.9)");
        tg.addColorStop(1, "rgba(255,255,255,0)");
        tctx.fillStyle = tg;
        tctx.fillRect(0, 0, 32, 32);
        const tex = new THREE.CanvasTexture(tc);

        const mat = new THREE.PointsMaterial({
            size: 3.0,
            vertexColors: true,
            transparent: true,
            depthWrite: false,
            sizeAttenuation: false,
            map: tex,
            alphaTest: 0.005,
            blending: THREE.AdditiveBlending,
        });
        scene.add(new THREE.Points(geo, mat));

        const cA = new THREE.Color("#A855F7");
        const cB = new THREE.Color("#6366F1");
        const cC = new THREE.Color("#22D3EE");
        const tmp = new THREE.Color();
        const getColor = (t: number) => {
            t = ((t % 1) + 1) % 1;
            if (t < 0.5) tmp.lerpColors(cA, cB, t * 2);
            else tmp.lerpColors(cB, cC, (t - 0.5) * 2);
            return tmp;
        };

        let scrollY = window.scrollY;
        const onScroll = () => {
            scrollY = window.scrollY;
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        const ribbonW = () => Math.min(W * 0.07, 78);

        let raf = 0;
        let last = 0;
        let time = 0;
        const tick = (now: number) => {
            raf = requestAnimationFrame(tick);
            const dt = Math.min(now - last, 33);
            last = now;
            time += dt;

            const pos = geo.attributes.position.array as Float32Array;
            const col = geo.attributes.color.array as Float32Array;
            const uM = uMax();
            const rw = ribbonW();

            for (let i = 0; i < COUNT; i++) {
                const p = particles[i];
                p.u += p.speed * (dt / 16);
                if (p.u > uM) {
                    const np = makeP(p.u - uM);
                    particles[i] = np;
                    continue;
                }

                const docY = heroBottom + p.u * SPACING;
                const screenY = docY - scrollY;
                if (screenY < -80 || screenY > H + 80) {
                    col[i * 4 + 3] = 0;
                    continue;
                }

                const idx = Math.floor(p.u);
                const t = p.u - idx;
                const xFrac = crVal(idx, t);
                const dxFrac = crTan(idx, t); // per unit index
                const xPx = xFrac * W;
                const dxPx = dxFrac * W;

                // normal to the curve (curve step in y is SPACING per unit index)
                const len = Math.hypot(dxPx, SPACING) || 1;
                const nx = SPACING / len;
                const ny = -dxPx / len;
                const off = p.lat * rw;

                pos[i * 3] = xPx + nx * off;
                pos[i * 3 + 1] = screenY + ny * off;
                pos[i * 3 + 2] = 0;

                // fade the ribbon in at the top (hero seam) and out near the footer
                const endFade =
                    p.u < 0.6 ? p.u / 0.6 : p.u > uM - 0.8 ? (uM - p.u) / 0.8 : 1;
                const latFade = 1 - Math.abs(p.lat) * 0.5;
                const twinkle = 0.7 + 0.3 * Math.sin(time * 0.004 + p.tw);

                const c = getColor(p.colorT * 0.3 + p.u * 0.05);
                col[i * 4] = c.r;
                col[i * 4 + 1] = c.g;
                col[i * 4 + 2] = c.b;
                col[i * 4 + 3] = p.alpha * endFade * latFade * twinkle;
            }

            geo.attributes.position.needsUpdate = true;
            geo.attributes.color.needsUpdate = true;
            renderer.render(scene, cam);
        };
        raf = requestAnimationFrame(tick);

        const recompute = () => {
            W = mount.offsetWidth || window.innerWidth;
            H = mount.offsetHeight || window.innerHeight;
            renderer.setSize(W, H);
            cam.right = W;
            cam.bottom = H;
            cam.updateProjectionMatrix();
            buildPath();
        };
        const ro = new ResizeObserver(recompute);
        ro.observe(mount);
        const bodyRo = new ResizeObserver(buildPath);
        bodyRo.observe(document.body);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
            ro.disconnect();
            bodyRo.disconnect();
            renderer.dispose();
            geo.dispose();
            mat.dispose();
            tex.dispose();
            if (mount.contains(renderer.domElement))
                mount.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            ref={mountRef}
            aria-hidden
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        />
    );
}
