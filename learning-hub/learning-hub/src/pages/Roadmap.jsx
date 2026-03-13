import React, { useRef, useEffect, useState } from "react";

export default function Roadmap({ title, modules }) {
  const pathRef = useRef(null);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (!pathRef.current || !modules || modules.length === 0) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    const calculatedPoints = modules.map((_, i) => {
      const t =
        modules.length === 1 ? 0.5 : i / (modules.length - 1);
      return path.getPointAtLength(t * length);
    });

    setPoints(calculatedPoints);
  }, [modules]);

  if (!modules || modules.length === 0) return null;

  return (
    <div className="curve-roadmap-wrapper">
      <div className="roadmap-rect">
        <h2 className="roadmap-title">{title}</h2>

        <svg
          className="road-svg"
          viewBox="-120 0 1240 300"
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
            d="M 50 140 Q 250 40 450 140 T 950 140"
            fill="none"
            stroke="#0f2a44"
            strokeWidth="44"
            strokeLinecap="round"
          />

          {/* CENTER LINE */}
          <path
            d="M 50 140 Q 250 40 450 140 T 950 140"
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
                    r="16"
                    fill={color}
                    stroke="#ffffff"
                    strokeWidth="4"
                  />

                  {/* LABEL BOX */}
                  <rect
                    x={pt.x - 130}
                    y={pt.y + 34}
                    width="260"
                    height="72"
                    rx="18"
                    ry="18"
                    fill="#ffffff"
                    filter="url(#labelShadow)"
                  />

                  {/* LABEL TEXT */}
                  <text
                    x={pt.x}
                    y={pt.y + 60}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="16.5"
                    fontWeight="800"
                    fill="#0f172a"
                  >
                    <tspan x={pt.x}>
                      {mod.name.split(" ").slice(0, 3).join(" ")}
                    </tspan>
                    {mod.name.split(" ").length > 3 && (
                      <tspan x={pt.x} dy="20">
                        {mod.name.split(" ").slice(3).join(" ")}
                      </tspan>
                    )}
                  </text>
                </g>
              );
            })}
        </svg>
      </div>
    </div>
  );
}
