"use client";

import { useMemo } from "react";

type Props = {
  points: number[];
  labels: string[];
};

/**
 * Inline SVG line + area chart, themed against the app's `primary` token
 * so it tracks dark/light + future palette changes. Stroke + dots use
 * `currentColor` (set by `text-primary` on the parent), and the area
 * fill is derived via opacity layers.
 */
export function RevenueSparkline(props: Props) {
  const { points, labels } = props;

  const view = useMemo(() => {
    if (points.length === 0) {
      return { d: "", area: "", coords: [] as Array<{ x: number; y: number }> };
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

    return { d, area, coords };
  }, [points]);

  return (
    <div className="w-full text-primary">
      <svg
        viewBox="0 0 600 180"
        className="w-full h-44"
        preserveAspectRatio="none"
      >
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1="0"
            x2="600"
            y1={24 + (180 - 48) * t}
            y2={24 + (180 - 48) * t}
            stroke="currentColor"
            strokeOpacity="0.08"
            strokeDasharray="3 4"
          />
        ))}

        {view.area && (
          <>
            <defs>
              <linearGradient id="revArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={view.area} fill="url(#revArea)" />
            <path
              d={view.d}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.25}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {view.coords.map((c, i) => (
              <circle
                key={i}
                cx={c.x}
                cy={c.y}
                r={3.25}
                fill="currentColor"
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
