"use client";

import { useState } from "react";
import {
  Coffee, PieChart, Flame, TrendingUp, Grid3x3, Trophy, ShieldCheck, Download,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/misc";
import { Select } from "@/components/ui/misc";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CoffeeMap, type MapLayerState } from "@/components/map/coffee-map";
import { ProductionAreaChart, VarietyPieChart, ProductivityBarChart } from "@/components/charts/charts";
import {
  productionSeries, varietyDistribution, productivityByMunicipality,
  cooperatives, dataQuality,
} from "@/lib/mock-data";

export default function AnalyticsPage() {
  const [layers] = useState<MapLayerState>({
    heatmap: true, farms: false, cooperatives: false, boundaries: false, validation: false,
  });
  const ranked = [...cooperatives].sort((a, b) => b.annualProduction - a.annualProduction).slice(0, 6);
  const maxR = ranked[0].annualProduction;

  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Cross-cutting intelligence — production, varieties, density, productivity, and data quality."
        breadcrumb={[{ label: "Intelligence" }, { label: "Analytics" }]}
        actions={
          <>
            <Select className="w-36"><option>Crop Year 2026</option><option>2025</option></Select>
            <Button variant="outline"><Download /> Export</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Production" value={892000} suffix="kg" delta={-3.1} icon={Coffee} accent="coffee" spark={[60, 58, 62, 55, 50, 48, 46]} />
        <StatCard label="Avg. Productivity" value={1045} suffix="kg/ha" delta={2.4} icon={TrendingUp} accent="success" spark={[30, 34, 33, 38, 40, 42, 45]} />
        <StatCard label="Farm Density" value={3.2} suffix="/km²" delta={1.1} icon={Grid3x3} accent="info" />
        <StatCard label="Data Quality" value={84} suffix="%" delta={5.0} icon={ShieldCheck} accent="primary" />
      </div>

      <Tabs defaultValue="production" className="mt-4">
        <TabsList>
          <TabsTrigger value="production"><Coffee className="h-4 w-4" /> Production</TabsTrigger>
          <TabsTrigger value="variety"><PieChart className="h-4 w-4" /> Variety</TabsTrigger>
          <TabsTrigger value="heatmap"><Flame className="h-4 w-4" /> Heatmaps</TabsTrigger>
          <TabsTrigger value="rankings"><Trophy className="h-4 w-4" /> Rankings</TabsTrigger>
          <TabsTrigger value="quality"><ShieldCheck className="h-4 w-4" /> Data Quality</TabsTrigger>
        </TabsList>

        <TabsContent value="production" className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2"><CardTitle>Production Trend</CardTitle><CardDescription>Monthly output by variety (kg)</CardDescription></CardHeader>
            <CardContent><div className="h-72"><ProductionAreaChart data={productionSeries} /></div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle>Productivity by Region</CardTitle></CardHeader>
            <CardContent><div className="h-72"><ProductivityBarChart data={productivityByMunicipality.slice(0, 6)} dataKey="yield" /></div></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variety" className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-2"><CardTitle>Variety Distribution</CardTitle></CardHeader>
            <CardContent><div className="h-72"><VarietyPieChart data={varietyDistribution} /></div></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Variety Breakdown</CardTitle></CardHeader>
            <CardContent className="space-y-4 pt-2">
              {varietyDistribution.map((v, i) => {
                const total = varietyDistribution.reduce((s, x) => s + x.value, 0);
                const pct = Math.round((v.value / total) * 100);
                const colors = ["bg-leaf-500", "bg-coffee-500", "bg-coffee-300", "bg-coffee-700"];
                return (
                  <div key={v.name}>
                    <div className="mb-1.5 flex justify-between text-sm"><span className="font-medium">{v.name}</span><span className="text-muted-foreground">{pct}% · {v.value} farms</span></div>
                    <Progress value={pct} indicatorClassName={colors[i]} />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap" className="mt-4">
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <CardTitle className="flex items-center gap-2"><Flame className="h-4 w-4 text-coffee-600" /> Coffee Production Heatmap</CardTitle>
              <Badge variant="success">Live</Badge>
            </div>
            <div className="h-[440px]"><CoffeeMap layers={layers} className="h-full w-full" /></div>
          </Card>
        </TabsContent>

        <TabsContent value="rankings" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Cooperative Rankings</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {ranked.map((c, i) => (
                <div key={c.id} className="flex items-center gap-4">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${i < 3 ? "bg-warning/15 text-warning" : "bg-muted text-muted-foreground"}`}>{i + 1}</span>
                  <div className="w-40 shrink-0"><p className="truncate text-sm font-medium">{c.acronym}</p><p className="truncate text-xs text-muted-foreground">{c.municipality}</p></div>
                  <Progress value={(c.annualProduction / maxR) * 100} className="flex-1" />
                  <span className="w-20 shrink-0 text-right text-sm font-medium tabular-nums">{(c.annualProduction / 1000).toFixed(0)}t</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality" className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Data Quality Scorecard</CardTitle><CardDescription>Completeness across the registry</CardDescription></CardHeader>
            <CardContent className="space-y-4 pt-2">
              {dataQuality.map((d) => (
                <div key={d.label}>
                  <div className="mb-1.5 flex justify-between text-sm"><span className="font-medium">{d.label}</span><span className="text-muted-foreground">{d.value}%</span></div>
                  <Progress value={d.value} indicatorClassName={d.value > 85 ? "bg-success" : d.value > 70 ? "bg-primary" : "bg-warning"} />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Quality Issues</CardTitle></CardHeader>
            <CardContent className="space-y-2 pt-2">
              {[
                ["Missing polygon boundaries", "29% of farms", "warning"],
                ["Unverified documents", "32% of farmers", "warning"],
                ["Stale production records", "14 farms > 90 days", "info"],
                ["Duplicate suspected records", "3 flagged", "destructive"],
              ].map(([t, v, sev]) => (
                <div key={t} className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5">
                  <div><p className="text-sm font-medium">{t}</p><p className="text-xs text-muted-foreground">{v}</p></div>
                  <Badge variant={sev as never}>Review</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
