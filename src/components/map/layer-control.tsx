"use client";

import { Flame, Sprout, Building2, Hexagon, ShieldCheck, Mountain, Satellite, Sun, Moon } from "lucide-react";
import type { MapLayerState, MapStyleKey } from "./coffee-map";
import { Switch } from "@/components/ui/misc";
import { cn } from "@/lib/utils";

const LAYERS: {
  key: keyof MapLayerState;
  label: string;
  icon: typeof Flame;
  color: string;
}[] = [
  { key: "heatmap", label: "Coffee Heatmap", icon: Flame, color: "text-coffee-600" },
  { key: "farms", label: "Farm Layer", icon: Sprout, color: "text-leaf-600" },
  { key: "cooperatives", label: "Cooperative Layer", icon: Building2, color: "text-primary" },
  { key: "boundaries", label: "Polygon Boundaries", icon: Hexagon, color: "text-info" },
  { key: "validation", label: "Validation Layer", icon: ShieldCheck, color: "text-warning" },
];

const STYLES: { key: Exclude<MapStyleKey, "auto">; label: string; icon: typeof Sun }[] = [
  { key: "satellite", label: "Satellite", icon: Satellite },
  { key: "outdoors", label: "Terrain", icon: Mountain },
  { key: "light", label: "Light", icon: Sun },
  { key: "dark", label: "Dark", icon: Moon },
];

export function LayerControl({
  layers,
  onChange,
  mapStyle,
  onStyleChange,
  className,
}: {
  layers: MapLayerState;
  onChange: (l: MapLayerState) => void;
  mapStyle?: MapStyleKey;
  onStyleChange?: (s: MapStyleKey) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-60 rounded-lg glass-panel p-3",
        className
      )}
    >
      {onStyleChange && (
        <div className="mb-3 border-b border-border pb-3">
          <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Base Map
          </p>
          <div className="grid grid-cols-4 gap-1">
            {STYLES.map((s) => {
              const Icon = s.icon;
              const active = (mapStyle ?? "auto") === s.key;
              return (
                <button
                  key={s.key}
                  onClick={() => onStyleChange(s.key)}
                  title={s.label}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-lg border px-1 py-1.5 text-[10px] font-medium transition-colors",
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-transparent text-muted-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Map Layers
      </p>
      <div className="space-y-0.5">
        {LAYERS.map((l) => {
          const Icon = l.icon;
          return (
            <label
              key={l.key}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-accent"
            >
              <Icon className={cn("h-4 w-4", l.color)} />
              <span className="flex-1 text-sm">{l.label}</span>
              <Switch
                checked={layers[l.key]}
                onCheckedChange={(v) => onChange({ ...layers, [l.key]: v })}
              />
            </label>
          );
        })}
      </div>
      <div className="mt-3 border-t border-border pt-3">
        <p className="mb-1.5 px-1 text-[11px] font-medium text-muted-foreground">Variety legend</p>
        <div className="grid grid-cols-2 gap-1.5 px-1">
          {[
            ["Arabica", "#5f8a3f"],
            ["Robusta", "#a86f3f"],
            ["Excelsa", "#cda880"],
            ["Liberica", "#915a34"],
          ].map(([name, color]) => (
            <div key={name} className="flex items-center gap-1.5 text-[11px]">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
