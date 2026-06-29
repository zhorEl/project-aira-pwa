"use client";

import { Flame, Sprout, Building2, Hexagon, ShieldCheck } from "lucide-react";
import type { MapLayerState } from "./coffee-map";
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

export function LayerControl({
  layers,
  onChange,
  className,
}: {
  layers: MapLayerState;
  onChange: (l: MapLayerState) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-60 rounded-xl border border-border bg-card/95 p-3 shadow-elevated backdrop-blur",
        className
      )}
    >
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
