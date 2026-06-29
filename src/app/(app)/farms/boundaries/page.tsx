"use client";

import { useState } from "react";
import { Hexagon, Pencil, Save, Undo2, MapPin, Ruler } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CoffeeMap, type MapLayerState } from "@/components/map/coffee-map";
import { farms } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function BoundariesPage() {
  const [active, setActive] = useState(farms[0].id);
  const [layers] = useState<MapLayerState>({
    heatmap: false, farms: false, cooperatives: false, boundaries: true, validation: false,
  });
  const withBoundary = farms.slice(0, 24);

  return (
    <div>
      <PageHeader
        title="Polygon Boundaries"
        description="Draw, edit, and validate farm boundary polygons captured from the field."
        breadcrumb={[{ label: "Farms" }, { label: "Boundaries" }]}
        actions={
          <>
            <Button variant="outline"><Undo2 /> Revert</Button>
            <Button><Save /> Save changes</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <Card className="lg:col-span-1">
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-semibold">Farms with boundaries</p>
            <p className="text-xs text-muted-foreground">{withBoundary.length} of {farms.length} mapped</p>
          </div>
          <div className="max-h-[540px] overflow-y-auto scrollbar-thin p-2">
            {withBoundary.map((f) => (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors",
                  active === f.id ? "bg-accent" : "hover:bg-accent/60"
                )}
              >
                <Hexagon className="h-4 w-4 text-info" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{f.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{f.area} ha · {f.boundary.length} vertices</p>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card className="overflow-hidden lg:col-span-3">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="flex items-center gap-2">
              <Badge variant="info"><Hexagon className="h-3 w-3" /> Editing</Badge>
              <span className="text-sm font-medium">{farms.find((f) => f.id === active)?.name}</span>
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm"><Pencil /> Draw</Button>
              <Button variant="outline" size="sm"><MapPin /> Add vertex</Button>
            </div>
          </div>
          <div className="relative h-[490px]">
            <CoffeeMap layers={layers} className="h-full w-full" interactive />
            <div className="absolute bottom-4 left-4 flex items-center gap-4 rounded-lg border border-border bg-card/90 px-4 py-2.5 text-sm backdrop-blur">
              <span className="flex items-center gap-1.5"><Ruler className="h-4 w-4 text-muted-foreground" /> {farms.find((f) => f.id === active)?.area} ha</span>
              <span className="flex items-center gap-1.5"><Hexagon className="h-4 w-4 text-muted-foreground" /> {farms.find((f) => f.id === active)?.boundary.length} vertices</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
