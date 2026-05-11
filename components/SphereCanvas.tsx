"use client";

import { useEffect, useRef, useState } from "react";

export default function SphereCanvas() {
    const mountRef = useRef<HTMLDivElement>(null);
    const [webglAvailable, setWebglAvailable] = useState(true);

    useEffect(() => {
        // Перевірка WebGL
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (!gl) {
            setWebglAvailable(false);
            return;
        }

        const mount = mountRef.current;
        if (!mount) return;

        import("three").then((THREE) => {
            const w = mount.clientWidth || 500;
            const h = mount.clientHeight || 500;

            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(w, h);
            renderer.setClearColor(0x000000, 0);
            mount.appendChild(renderer.domElement);

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
            camera.position.z = 2.5;

            const count = 4000;
            const positions = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);

            for (let i = 0; i < count; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const r = 1 + (Math.random() - 0.5) * 0.15;

                positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
                positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                positions[i * 3 + 2] = r * Math.cos(phi);

                const t = Math.random();
                if (t < 0.5) {
                    colors[i * 3] = 0.42; colors[i * 3 + 1] = 0.25; colors[i * 3 + 2] = 0.94;
                } else {
                    colors[i * 3] = 0.0; colors[i * 3 + 1] = 0.39; colors[i * 3 + 2] = 1.0;
                }
            }

            const geo = new THREE.BufferGeometry();
            geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
            geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

            const mat = new THREE.PointsMaterial({
                size: 0.012, vertexColors: true, transparent: true, opacity: 0.85,
            });

            const sphere = new THREE.Points(geo, mat);
            scene.add(sphere);

            const originalPositions = positions.slice();
            let time = 0;
            const mouse = { x: 0, y: 0 };

            const onMouseMove = (e: MouseEvent) => {
                mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
                mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
            };
            window.addEventListener("mousemove", onMouseMove, { passive: true });

            const onResize = () => {
                const nw = mount.clientWidth;
                const nh = mount.clientHeight;
                camera.aspect = nw / nh;
                camera.updateProjectionMatrix();
                renderer.setSize(nw, nh);
            };
            window.addEventListener("resize", onResize, { passive: true });

            let animId: number;
            const animate = () => {
                animId = requestAnimationFrame(animate);
                time += 0.005;

                const pos = geo.attributes.position.array as Float32Array;
                for (let i = 0; i < count; i++) {
                    const ox = originalPositions[i * 3];
                    const oy = originalPositions[i * 3 + 1];
                    const oz = originalPositions[i * 3 + 2];
                    const wave = Math.sin(ox * 3 + time) * Math.cos(oy * 3 + time) * 0.06;
                    pos[i * 3] = ox + wave;
                    pos[i * 3 + 1] = oy + wave;
                    pos[i * 3 + 2] = oz + wave;
                }
                geo.attributes.position.needsUpdate = true;

                sphere.rotation.y += 0.002 + mouse.x * 0.001;
                sphere.rotation.x += 0.001 + mouse.y * 0.001;

                renderer.render(scene, camera);
            };
            animate();

            (mount as any)._cleanup = () => {
                cancelAnimationFrame(animId);
                window.removeEventListener("mousemove", onMouseMove);
                window.removeEventListener("resize", onResize);
                renderer.dispose();
                if (mount.contains(renderer.domElement)) {
                    mount.removeChild(renderer.domElement);
                }
            };
        });

        return () => {
            const m = mountRef.current as any;
            if (m?._cleanup) m._cleanup();
        };
    }, []);

    if (!webglAvailable) {
        return (
            <div style={{
                width: "100%", height: "100%",
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative",
            }}>
                <div style={{
                    width: "400px", height: "400px", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(107,63,240,0.3) 0%, rgba(0,100,255,0.15) 50%, transparent 70%)",
                    animation: "pulse 3s ease-in-out infinite",
                }} />
                <style>{`
          @keyframes pulse {
            0%,100%{transform:scale(1);opacity:0.7}
            50%{transform:scale(1.05);opacity:1}
          }
        `}</style>
            </div>
        );
    }

    return (
        <div ref={mountRef} style={{
            width: "100%", height: "100%",
            position: "absolute", inset: 0,
            pointerEvents: "none",
        }} />
    );
}