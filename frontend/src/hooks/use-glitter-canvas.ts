import { useEffect, useRef, useCallback } from "react";

/**
 * useGlitterCanvas(sectionRef)
 *
 * Attaches a canvas-based glitter particle system to the given section ref.
 * Particles emit from the mouse cursor as it moves within the section.
 * Returns the canvasRef to place inside the section.
 *
 * Usage:
 *   const sectionRef = useRef<HTMLDivElement>(null);
 *   const canvasRef = useGlitterCanvas(sectionRef);
 *   <section ref={sectionRef}><canvas ref={canvasRef} .../></section>
 */

const COLORS = [
    "#3B82F6", "#6366F1", "#818CF8", "#38BDF8",
    "#A5B4FC", "#C7D2FE", "#93C5FD", "#67E8F9", "#FFFFFF",
];

type Shape = "circle" | "star" | "square";

interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    size: number;
    color: string;
    alpha: number;
    decay: number;
    rotate: number;
    rotateSpeed: number;
    shape: Shape;
}

export function useGlitterCanvas(sectionRef: React.RefObject<HTMLDivElement>) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const rafRef = useRef<number>(0);
    const lastPos = useRef<{ x: number; y: number } | null>(null);

    const spawn = useCallback((cx: number, cy: number, count = 6) => {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.5 + Math.random() * 3.5;
            particles.current.push({
                x: cx, y: cy,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - Math.random() * 2,
                size: 3 + Math.random() * 6,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                alpha: 0.95,
                decay: 0.012 + Math.random() * 0.018,
                rotate: Math.random() * 360,
                rotateSpeed: (Math.random() - 0.5) * 8,
                shape: (["circle", "star", "square"] as Shape[])[Math.floor(Math.random() * 3)],
            });
        }
    }, []);

    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((rot * Math.PI) / 180);
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const b = ((i * 4 * Math.PI) / 5 + (2 * Math.PI) / 5) - Math.PI / 2;
            i === 0
                ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
                : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
            ctx.lineTo(Math.cos(b) * (r * 0.4), Math.sin(b) * (r * 0.4));
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const section = sectionRef.current;
        if (!canvas || !section) return;
        const ctx = canvas.getContext("2d")!;

        const resize = () => {
            canvas.width = section.offsetWidth;
            canvas.height = section.offsetHeight;
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(section);

        const onMove = (e: MouseEvent) => {
            const rect = section.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (x < 0 || y < 0 || x > canvas.width || y > canvas.height) return;
            const last = lastPos.current;
            if (last) {
                const dx = x - last.x, dy = y - last.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > 10) spawn(x, y, Math.min(8, Math.floor(dist / 4)));
            }
            lastPos.current = { x, y };
        };

        const onLeave = () => { lastPos.current = null; };
        section.addEventListener("mousemove", onMove);
        section.addEventListener("mouseleave", onLeave);

        const loop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.current = particles.current.filter(p => p.alpha > 0.01);
            for (const p of particles.current) {
                p.x += p.vx; p.y += p.vy;
                p.vy += 0.12; p.vx *= 0.98;
                p.alpha -= p.decay;
                p.rotate += p.rotateSpeed;
                ctx.globalAlpha = Math.max(0, p.alpha);
                ctx.fillStyle = p.color;
                if (p.shape === "circle") {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                } else if (p.shape === "star") {
                    drawStar(ctx, p.x, p.y, p.size / 2, p.rotate);
                } else {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rotate * Math.PI) / 180);
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                    ctx.restore();
                }
            }
            ctx.globalAlpha = 1;
            rafRef.current = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            section.removeEventListener("mousemove", onMove);
            section.removeEventListener("mouseleave", onLeave);
            cancelAnimationFrame(rafRef.current);
            ro.disconnect();
        };
    }, [sectionRef, spawn]);

    return canvasRef;
}
