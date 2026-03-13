import { useEffect, useRef, useState } from "react";

/**
 * PremiumCursor — used by top-tier tech/SaaS/agency sites.
 *
 * What it does:
 *  - Small sharp dot that follows cursor exactly
 *  - Larger soft ring that follows with a smooth lag (magnetic feel)
 *  - On hover over links/buttons: ring expands + blends into the element
 *  - On click: ripple burst (professional, not childish)
 *  - Hides native cursor on desktop; no-op on touch devices
 */

export default function PremiumCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    // Ring position uses spring-like interpolation
    const ring = useRef({ x: -100, y: -100 });
    const target = useRef({ x: -100, y: -100 });
    const rafRef = useRef<number>(0);

    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
    const [isHovering, setIsHovering] = useState(false);

    // Check if touch device — don't run on mobile
    const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

    useEffect(() => {
        if (isTouch) return;

        const dot = dotRef.current;
        const ringEl = ringRef.current;
        if (!dot || !ringEl) return;

        // Hide the native cursor globally
        document.body.style.cursor = "none";

        const onMove = (e: MouseEvent) => {
            target.current = { x: e.clientX, y: e.clientY };

            // Dot follows immediately
            dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;

            // Detect hover over interactive elements
            const el = document.elementFromPoint(e.clientX, e.clientY);
            const interactive = el?.closest("a, button, [role='button'], input, textarea, select, label");
            setIsHovering(!!interactive);
        };

        const onClick = (e: MouseEvent) => {
            const id = Date.now();
            setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
            setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
        };

        // Smooth ring animation — lerp toward target
        const LERP = 0.12;
        const animateRing = () => {
            ring.current.x += (target.current.x - ring.current.x) * LERP;
            ring.current.y += (target.current.y - ring.current.y) * LERP;
            ringEl.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
            rafRef.current = requestAnimationFrame(animateRing);
        };
        animateRing();

        window.addEventListener("mousemove", onMove);
        window.addEventListener("click", onClick);

        return () => {
            document.body.style.cursor = "";
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("click", onClick);
            cancelAnimationFrame(rafRef.current);
        };
    }, [isTouch]);

    if (isTouch) return null;

    return (
        <>
            <style>{`
        * { cursor: none !important; }

        .cursor-dot {
          position: fixed;
          top: 0; left: 0;
          width: 8px; height: 8px;
          background: #3B82F6;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          will-change: transform;
          transition: width 0.2s, height 0.2s, background 0.2s;
        }

        .cursor-ring {
          position: fixed;
          top: 0; left: 0;
          width: 40px; height: 40px;
          border: 1.5px solid rgba(59, 130, 246, 0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          will-change: transform;
          transition: width 0.3s ease, height 0.3s ease,
                      border-color 0.3s ease, border-width 0.3s ease,
                      background 0.3s ease;
        }

        .cursor-ring.hovering {
          width: 56px;
          height: 56px;
          border-color: rgba(99, 102, 241, 0.6);
          border-width: 2px;
          background: rgba(99, 102, 241, 0.05);
        }

        .cursor-ripple {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          border: 1.5px solid rgba(59, 130, 246, 0.6);
          animation: ripple-expand 0.65s ease-out forwards;
          transform: translate(-50%, -50%);
        }

        @keyframes ripple-expand {
          0%   { width: 0px;   height: 0px;   opacity: 0.8; }
          100% { width: 80px;  height: 80px;  opacity: 0;   }
        }
      `}</style>

            {/* Dot */}
            <div ref={dotRef} className="cursor-dot" />

            {/* Ring */}
            <div ref={ringRef} className={`cursor-ring${isHovering ? " hovering" : ""}`} />

            {/* Click ripples */}
            {ripples.map((r) => (
                <div
                    key={r.id}
                    className="cursor-ripple"
                    style={{ top: r.y, left: r.x }}
                />
            ))}
        </>
    );
}
