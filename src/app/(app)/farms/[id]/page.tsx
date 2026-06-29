"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Mountain, Sprout, TreePine, Coffee, MapPin, User, Pencil, Download,
  Ruler, Hexagon, Image as ImageIcon, Activity,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CoffeeMap, type MapLayerState } from "@/components/map/coffee-map";
import { TrendLineChart } from "@/components/charts/charts";
import { farms } from "@/lib/mock-data";
import { formatNumber, formatDate } from "@/lib/utils";

export default function FarmDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const farm = farms.find((f) => f.id === id);
  if (!farm) notFound();

  const [layers] = useState<MapLayerState>({
    heatmap: false, farms: true, cooperatives: false, boundaries: true, validation: false,
  });

  const prod = ["2021", "2022", "2023", "2024", "2025", "2026"].map((y, i) => ({
    name: y,
    production: Math.round(farm.annualProduction * (0.7 + i * 0.07)),
  }));

  return (
    <div>
      <PageHeader
        title={farm.name}
        breadcrumb={[{ label: "Farms" }, { label: farm.name }]}
        actions={
          <>
            <Button variant="outline"><Download /> Export</Button>
            <Button><Pencil /> Edit</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat icon={Ruler} label="Area" value={`${farm.area} ha`} />
        <Stat icon={Mountain} label="Elevation" value={`${formatNumber(farm.elevation)} masl`} />
        <Stat icon={TreePine} label="Trees" value={formatNumber(farm.trees)} />
        <Stat icon={Coffee} label="Yield" value={`${farm.yield} kg/ha`} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Map */}
        <Card className="overflow-hidden lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <CardTitle className="flex items-center gap-2"><Hexagon className="h-4 w-4" /> Farm Boundary</CardTitle>
            <Badge variant="info">{farm.variety}</Badge>
          </div>
          <div className="h-[360px]">
            <CoffeeMap layers={layers} className="h-full w-full" interactive />
          </div>
        </Card>

        {/* Details */}
        <Card>
          <CardHeader><CardTitle>Details</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Row icon={User} label="Owner" value={<Link href={`/farms`} className="font-medium hover:text-primary">{farm.farmerName}</Link>} />
            <Row icon={MapPin} label="Location" value={`${farm.barangay}, ${farm.municipality}`} />
            <Row icon={Sprout} label="Variety" value={farm.variety} />
            <Row icon={Coffee} label="Production" value={`${formatNumber(farm.annualProduction)} kg/yr`} />
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground"><Activity className="h-4 w-4" /> Health</span>
              <Badge variant={farm.health === "Excellent" ? "success" : farm.health === "Good" ? "info" : farm.health === "Fair" ? "warning" : "destructive"}>
                {farm.health}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Status</span>
              <StatusBadge status={farm.status} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">GPS</span>
              <span className="font-mono text-xs">{farm.location.lat.toFixed(4)}, {farm.location.lng.toFixed(4)}</span>
            </div>
            <p className="pt-2 text-xs text-muted-foreground">Last updated {formatDate(farm.updatedAt)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="mt-4">
        <Tabs defaultValue="production">
          <TabsList>
            <TabsTrigger value="production"><Coffee className="h-4 w-4" /> Production</TabsTrigger>
            <TabsTrigger value="images"><ImageIcon className="h-4 w-4" /> Images</TabsTrigger>
            <TabsTrigger value="activity"><Activity className="h-4 w-4" /> Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="production" className="mt-4">
            <Card>
              <CardHeader><CardTitle>Production History</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64"><TrendLineChart data={prod} dataKey="production" /></div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="mt-4">
            <Card>
              <CardContent className="grid grid-cols-2 gap-3 pt-6 sm:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-border bg-muted/40 text-muted-foreground">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="relative space-y-5 pl-6">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
                  {[
                    ["2026-06-12", "Production logged", "1,240 kg Q2 harvest recorded"],
                    ["2026-04-20", "Pruning activity", "Selective pruning completed by farmer"],
                    ["2026-03-08", "Boundary verified", "Polygon validated by field staff"],
                    ["2026-01-15", "Fertilizer application", "Organic compost applied"],
                  ].map(([date, title, desc], i) => (
                    <div key={i} className="relative">
                      <span className="absolute -left-6 top-1 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background" />
                      <p className="text-xs text-muted-foreground">{formatDate(date)}</p>
                      <p className="font-medium">{title}</p>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Mountain; label: string; value: string }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="font-display text-lg font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function Row({ icon: Icon, label, value }: { icon: typeof Mountain; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-muted-foreground"><Icon className="h-4 w-4" /> {label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
