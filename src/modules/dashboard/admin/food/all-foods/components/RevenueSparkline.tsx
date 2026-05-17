"use client";

import { useMemo } from "react";

type Props = {
  points: number[];
  labels: string[];
};

/**
 * Inline SVG line chart with a soft area fill. No external chart lib
 * needed — this is decorative-but-honest: it renders the data points
 * we hand it. The parent owns aggregation.
 */
export function RevenueSparkline(props: Props) {
  const { points, labels } = props;

  const view = useMemo(() => {
    if (points.length === 0) {
      return { d: "", area: "", max: 0, min: 0, coords: [] };
    }
    const W = 600;
    const H = 180;
    const PAD_X = 24;
    const PAD_Y = 24;
    const max = Math.max(...points, 1);
    const min = Math.min(...points, 0);
    const span = max - min || 1;

    const stepX = (W - PAD_X * 2) / Math.max(1, points.length - 1);
    const coords = points.map((p, i) => ({
      x: PAD_X + i * stepX,
      y: H - PAD_Y - ((p - min) / span) * (H - PAD_Y * 2),
    }));

    const d = coords
      .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`)
      .join(" ");
    const area =
      `M ${coords[0].x} ${H - PAD_Y} ` +
      coords.map((c) => `L ${c.x} ${c.y}`).join(" ") +
      ` L ${coords[coords.length - 1].x} ${H - PAD_Y} Z`;

    return { d, area, max, min, coords };
  }, [points]);

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 600 180"
        className="w-full h-44"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="revArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(234 179 8)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="rgb(234 179 8)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* horizontal grid */}
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1="0"
            x2="600"
            y1={24 + (180 - 48) * t}
            y2={24 + (180 - 48) * t}
            stroke="currentColor"
            strokeOpacity="0.06"
            strokeDasharray="3 4"
          />
        ))}

        {view.area && (
          <>
            <path d={view.area} fill="url(#revArea)" />
            <path
              d={view.d}
              fill="none"
              stroke="rgb(234 179 8)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {view.coords.map((c, i) => (
              <circle
                key={i}
                cx={c.x}
                cy={c.y}
                r={3}
                fill="rgb(234 179 8)"
                stroke="white"
                strokeWidth={1.5}
                className="dark:[stroke:rgb(24,24,27)]"
              />
            ))}
          </>
        )}
      </svg>

      <div className="flex justify-between mt-2 px-2 text-[10px] text-muted-foreground">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}
