"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Sprout,
  Mountain,
  Coffee,
  Maximize2,
  FileText,
  ArrowUpRight,
  Bell,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { CoffeeMap, type MapLayerState } from "@/components/map/coffee-map";
import { LayerControl } from "@/components/map/layer-control";
import { ProductionAreaChart, VarietyPieChart } from "@/components/charts/charts";
import {
  kpis,
  alerts,
  activities,
  productionSeries,
  varietyDistribution,
  cooperatives,
} from "@/lib/mock-data";
import { relativeTime } from "@/lib/utils";

export default function DashboardPage() {
  const [layers, setLayers] = useState<MapLayerState>({
    heatmap: true,
    farms: false,
    cooperatives: true,
    boundaries: false,
    validation: false,
  });

  return (
    <div>
      <PageHeader
        title="Operations Dashboard"
        description="Province-wide coffee intelligence at a glance — Crop Year 2026, Bukidnon."
        actions={
          <>
            <Button variant="outline">
              <FileText /> Quick report
            </Button>
            <Link href="/map">
              <Button>
                <Maximize2 /> Full map
              </Button>
            </Link>
          </>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Registered Farmers" value={kpis.farmers} delta={4.2} icon={Users} accent="primary" spark={[12, 18, 15, 22, 26, 24, 30]} />
        <StatCard label="Mapped Farms" value={kpis.farms} delta={2.8} icon={Sprout} accent="success" spark={[40, 42, 48, 46, 52, 58, 60]} />
        <StatCard label="Total Area" value={kpis.totalArea} suffix="ha" delta={1.4} icon={Mountain} accent="info" spark={[20, 22, 21, 25, 27, 28, 30]} />
        <StatCard label="Annual Production" value={kpis.production} suffix="kg" delta={-3.1} icon={Coffee} accent="coffee" spark={[60, 58, 62, 55, 50, 48, 46]} />
      </div>

      {/* Map + side column */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="relative overflow-hidden xl:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div>
              <CardTitle>Interactive GIS Map</CardTitle>
              <CardDescription className="mt-0.5">
                Coffee heatmap · cooperative coverage · validation overlay
              </CardDescription>
            </div>
            <Badge variant="success">Live</Badge>
          </div>
          <div className="relative h-[460px]">
            <CoffeeMap layers={layers} className="absolute inset-0 h-full w-full" />
            <div className="absolute right-4 top-4">
              <LayerControl layers={layers} onChange={setLayers} />
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {/* Alerts */}
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-warning" /> Alerts
              </CardTitle>
              <Badge variant="destructive">{alerts.length}</Badge>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {alerts.slice(0, 4).map((a) => (
                <div key={a.id} className="flex gap-2.5">
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      a.severity === "critical"
                        ? "bg-destructive"
                        : a.severity === "warning"
                          ? "bg-warning"
                          : "bg-info"
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-tight">{a.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {a.module} · {relativeTime(a.time)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick reports */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Quick Reports</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {["Provincial", "Production", "Variety Mix", "Data Quality"].map((r) => (
                <button
                  key={r}
                  className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-left text-sm font-medium transition-colors hover:border-primary/40 hover:bg-accent"
                >
                  {r}
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts row */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Production Trend</CardTitle>
            <CardDescription>Monthly green coffee output (kg) by variety</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ProductionAreaChart data={productionSeries} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Variety Distribution</CardTitle>
            <CardDescription>Share of mapped farms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <VarietyPieChart data={varietyDistribution} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity + top coops */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Recent Activity</CardTitle>
            <Button variant="ghost" size="sm">View all</Button>
          </CardHeader>
          <CardContent className="space-y-1">
            {activities.map((a) => (
              <div key={a.id} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-accent">
                <Avatar name={a.actor} src={a.avatar} size="sm" />
                <p className="min-w-0 flex-1 text-sm">
                  <span className="font-medium">{a.actor}</span>{" "}
                  <span className="text-muted-foreground">{a.action}</span>{" "}
                  <span className="font-medium">{a.target}</span>
                </p>
                <Badge variant="muted" className="hidden sm:inline-flex">{a.module}</Badge>
                <span className="shrink-0 text-xs text-muted-foreground">{relativeTime(a.time)}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Top Cooperatives</CardTitle>
            <Link href="/cooperatives">
              <Button variant="ghost" size="sm">All</Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-1">
            {cooperatives.slice(0, 5).map((c) => (
              <Link
                key={c.id}
                href={`/cooperatives/${c.id}`}
                className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-accent"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                  {c.rank}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{c.acronym}</p>
                  <p className="truncate text-xs text-muted-foreground">{c.municipality}</p>
                </div>
                <span className="shrink-0 text-xs font-medium tabular-nums">
                  {(c.annualProduction / 1000).toFixed(0)}t
                </span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
