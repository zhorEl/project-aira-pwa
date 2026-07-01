"use client";

import { useState } from "react";
import { Search, Layers as LayersIcon, Filter, Crosshair, Coffee, Sprout, Building2 } from "lucide-react";
import { CoffeeMap, type MapLayerState, type MapStyleKey } from "@/components/map/coffee-map";
import { LayerControl } from "@/components/map/layer-control";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { farms, cooperatives } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

export default function MapPage() {
  const [layers, setLayers] = useState<MapLayerState>({
    heatmap: true,
    farms: true,
    cooperatives: true,
    boundaries: false,
    validation: false,
  });
  const [panelOpen, setPanelOpen] = useState(true);
  const [mapStyle, setMapStyle] = useState<MapStyleKey>("auto");

  const totalProduction = farms.reduce((s, f) => s + f.annualProduction, 0);

  return (
    <div className="-mx-4 -my-6 flex h-[calc(100vh-4rem)] lg:-mx-8 lg:-my-8">
      {/* Left detail panel */}
      <aside
        className={`hidden w-80 shrink-0 flex-col border-r border-border bg-card lg:flex ${
          panelOpen ? "" : "lg:hidden"
        }`}
      >
        <div className="border-b border-border p-4">
          <h1 className="font-display text-lg font-bold">GIS Explorer</h1>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Bukidnon coffee landscape
          </p>
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search location…" className="pl-9" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px bg-border">
          {[
            { label: "Farms", value: formatNumber(farms.length), icon: Sprout },
            { label: "Coops", value: cooperatives.length, icon: Building2 },
            { label: "Production", value: `${(totalProduction / 1000).toFixed(0)}t`, icon: Coffee },
            { label: "Varieties", value: 4, icon: LayersIcon },
          ].map((s) => (
            <div key={s.label} className="bg-card p-3">
              <s.icon className="h-4 w-4 text-muted-foreground" />
              <p className="mt-1.5 font-display text-lg font-bold">{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin p-3">
          <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Features in view
          </p>
          <div className="space-y-1.5">
            {farms.slice(0, 18).map((f) => (
              <div
                key={f.id}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-transparent px-2.5 py-2 transition-colors hover:border-border hover:bg-accent"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    background:
                      f.variety === "Arabica"
                        ? "#5f8a3f"
                        : f.variety === "Robusta"
                          ? "#a86f3f"
                          : f.variety === "Excelsa"
                            ? "#cda880"
                            : "#915a34",
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{f.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {f.variety} · {f.barangay}
                  </p>
                </div>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                  {f.area} ha
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Map */}
      <div className="relative flex-1">
        <CoffeeMap layers={layers} mapStyle={mapStyle} className="absolute inset-0 h-full w-full" />

        {/* Top toolbar */}
        <div className="absolute left-4 right-4 top-4 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-card/90 backdrop-blur lg:hidden"
            onClick={() => setPanelOpen((o) => !o)}
          >
            <LayersIcon /> Panel
          </Button>
          <div className="relative max-w-xs flex-1 lg:hidden">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search…" className="bg-card/90 pl-9 backdrop-blur" />
          </div>
          <Button variant="outline" size="sm" className="ml-auto bg-card/90 backdrop-blur">
            <Filter /> Filters
          </Button>
          <Button variant="outline" size="icon-sm" className="bg-card/90 backdrop-blur">
            <Crosshair />
          </Button>
        </div>

        {/* Layer control */}
        <div className="absolute right-4 top-16">
          <LayerControl layers={layers} onChange={setLayers} mapStyle={mapStyle} onStyleChange={setMapStyle} />
        </div>

        {/* Bottom legend chip */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg glass-panel px-3 py-2 text-xs">
          <Badge variant="success">Live data</Badge>
          <span className="text-muted-foreground">
            {formatNumber(farms.length)} farms · updated 4 min ago
          </span>
        </div>
      </div>
    </div>
  );
}
