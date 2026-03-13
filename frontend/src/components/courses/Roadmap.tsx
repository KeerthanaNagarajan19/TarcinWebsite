import { useRef, useEffect, useState } from "react";

interface Module {
    name: string;
    status: "completed" | "in-progress" | "upcoming";
}

interface RoadmapProps {
    modules: Module[];
}

export default function Roadmap({ modules }: RoadmapProps) {
    const pathRef = useRef<SVGPathElement>(null);
    const [points, setPoints] = useState<DOMPoint[]>([]);

    useEffect(() => {
        if (!pathRef.current || !modules || modules.length === 0) return;

        const path = pathRef.current;
        const length = path.getTotalLength();

        const calculatedPoints = modules.map((_, i) => {
            const t = modules.length === 1 ? 0.5 : i / (modules.length - 1);
            return path.getPointAtLength(t * length);
        });

        setPoints(calculatedPoints);
    }, [modules]);

    if (!modules || modules.length === 0) return null;

    return (
        <div className="w-full py-10 overflow-visible">
            <svg
                className="w-full h-auto"
                viewBox="-150 -50 1300 450"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* SHADOW */}
                <defs>
                    <filter id="labelShadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow
                            dx="0"
                            dy="6"
                            stdDeviation="6"
                            floodColor="#000"
                            floodOpacity="0.15"
                        />
                    </filter>
                </defs>

                {/* ROAD */}
                <path
                    ref={pathRef}
                    d="M 50 200 Q 300 50 550 200 T 1050 200"
                    fill="none"
                    stroke="#0f2a44"
                    strokeWidth="48"
                    strokeLinecap="round"
                />

                {/* CENTER LINE */}
                <path
                    d="M 50 200 Q 300 50 550 200 T 1050 200"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="6"
                    strokeDasharray="18 20"
                    strokeLinecap="round"
                />

                {/* PINS + LABELS */}
                {points.length === modules.length &&
                    points.map((pt, i) => {
                        const mod = modules[i];

                        const color =
                            mod.status === "completed"
                                ? "#22c55e"
                                : mod.status === "in-progress"
                                    ? "#facc15"
                                    : "#64748b";

                        return (
                            <g key={i}>
                                {/* PIN */}
                                <circle
                                    cx={pt.x}
                                    cy={pt.y}
                                    r="18"
                                    fill={color}
                                    stroke="#ffffff"
                                    strokeWidth="5"
                                />

                                {/* LABEL BOX */}
                                <rect
                                    x={pt.x - 140}
                                    y={pt.y + 45}
                                    width="280"
                                    height="80"
                                    rx="20"
                                    ry="20"
                                    fill="#ffffff"
                                    filter="url(#labelShadow)"
                                />

                                {/* LABEL TEXT */}
                                <text
                                    x={pt.x}
                                    y={pt.y + 75}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize="18"
                                    className="font-heading font-black"
                                    fill="#001D4D"
                                >
                                    <tspan x={pt.x}>
                                        {mod.name.split(" ").slice(0, 3).join(" ")}
                                    </tspan>
                                    {mod.name.split(" ").length > 3 && (
                                        <tspan x={pt.x} dy="24">
                                            {mod.name.split(" ").slice(3).join(" ")}
                                        </tspan>
                                    )}
                                </text>
                            </g>
                        );
                    })}
            </svg>
        </div>
    );
}
