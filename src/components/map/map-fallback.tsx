"use client";

import { farms, cooperatives } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { MapLayerState } from "./coffee-map";

const varietyColors: Record<string, string> = {
  Arabica: "#5f8a3f",
  Robusta: "#a86f3f",
  Excelsa: "#cda880",
  Liberica: "#915a34",
};

/**
 * Stylized topographic placeholder shown when NEXT_PUBLIC_MAPBOX_TOKEN is absent,
 * so the GIS-centric UI is fully browsable without an API key. Projects mock
 * farm/coop coordinates onto an SVG viewport.
 */
export function MapFallback({
  layers,
  className,
}: {
  layers: MapLayerState;
  className?: string;
}) {
  const lngs = farms.map((f) => f.location.lng);
  const lats = farms.map((f) => f.location.lat);
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
  const minLat = Math.min(...lats), maxLat = Math.max(...lats);
  const W = 1000, H = 640, pad = 40;
  const px = (lng: number) => pad + ((lng - minLng) / (maxLng - minLng)) * (W - pad * 2);
  const py = (lat: number) => H - pad - ((lat - minLat) / (maxLat - minLat)) * (H - pad * 2);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-leaf-50 dark:bg-[#10160c]",
        className
      )}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="terrain" cx="40%" cy="35%" r="80%">
            <stop offset="0%" stopColor="#e3edda" />
            <stop offset="55%" stopColor="#cfe0bf" />
            <stop offset="100%" stopColor="#b7cda0" />
          </radialGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="rgba(73,109,47,0.10)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#terrain)" className="dark:opacity-30" />
        <rect width={W} height={H} fill="url(#grid)" />

        {/* Contour lines for topographic feel */}
        {[0.25, 0.45, 0.65, 0.82].map((r, i) => (
          <ellipse
            key={i}
            cx={W * 0.42}
            cy={H * 0.4}
            rx={W * r * 0.5}
            ry={H * r * 0.45}
            fill="none"
            stroke="rgba(73,109,47,0.16)"
            strokeWidth="1.5"
            strokeDasharray="2 6"
          />
        ))}

        {/* River */}
        <path
          d={`M${W * 0.1} ${H * 0.1} C ${W * 0.3} ${H * 0.3}, ${W * 0.45} ${H * 0.45}, ${W * 0.6} ${H * 0.7} S ${W * 0.85} ${H * 0.95}, ${W * 0.95} ${H}`}
          fill="none"
          stroke="#7eb8d6"
          strokeWidth="5"
          opacity="0.5"
          strokeLinecap="round"
        />

        {/* Heatmap blobs */}
        {layers.heatmap &&
          farms.map((f) => (
            <circle
              key={`h-${f.id}`}
              cx={px(f.location.lng)}
              cy={py(f.location.lat)}
              r={14 + (f.annualProduction / 6000) * 26}
              fill={varietyColors[f.variety]}
              opacity={0.1}
            />
          ))}

        {/* Boundaries */}
        {layers.boundaries &&
          farms.slice(0, 60).map((f) => (
            <polygon
              key={`b-${f.id}`}
              points={f.boundary.map((p) => `${px(p.lng)},${py(p.lat)}`).join(" ")}
              fill={varietyColors[f.variety]}
              fillOpacity={0.16}
              stroke={varietyColors[f.variety]}
              strokeWidth={1}
              strokeOpacity={0.5}
            />
          ))}

        {/* Farm points */}
        {layers.farms &&
          farms.map((f) => (
            <circle
              key={`f-${f.id}`}
              cx={px(f.location.lng)}
              cy={py(f.location.lat)}
              r={4 + (f.annualProduction / 6000) * 5}
              fill={varietyColors[f.variety]}
              stroke="#fff"
              strokeWidth={1.2}
              opacity={0.9}
            />
          ))}

        {/* Validation points */}
        {layers.validation &&
          farms
            .filter((f) => f.status === "pending" || f.status === "flagged")
            .map((f) => (
              <circle
                key={`v-${f.id}`}
                cx={px(f.location.lng)}
                cy={py(f.location.lat)}
                r={7}
                fill="#f59e0b"
                stroke="#fff"
                strokeWidth={2}
              />
            ))}

        {/* Cooperative markers */}
        {layers.cooperatives &&
          cooperatives.map((c) => (
            <g key={c.id}>
              <circle cx={px(c.location.lng)} cy={py(c.location.lat)} r={9} fill="#496d2f" stroke="#fff" strokeWidth={2.5} />
              <text
                x={px(c.location.lng)}
                y={py(c.location.lat) - 14}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="#304423"
              >
                {c.acronym}
              </text>
            </g>
          ))}
      </svg>

      <div className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-background/80 px-2.5 py-1.5 text-[11px] text-muted-foreground backdrop-blur">
        Demo map · add <code className="font-mono">NEXT_PUBLIC_MAPBOX_TOKEN</code> for live GIS
      </div>
    </div>
  );
}
