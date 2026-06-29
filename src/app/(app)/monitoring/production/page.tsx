"use client";

import { Coffee, TrendingUp, TrendingDown, Download } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductionAreaChart, ProductivityBarChart } from "@/components/charts/charts";
import { productionSeries, productivityByMunicipality } from "@/lib/mock-data";

export default function ProductionMonitoringPage() {
  return (
    <div>
      <PageHeader
        title="Production Monitoring"
        description="Track output trends against targets and flag underperforming areas."
        breadcrumb={[{ label: "Monitoring" }, { label: "Production" }]}
        actions={<Button variant="outline"><Download /> Export</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="YTD Output" value={892000} suffix="kg" delta={-3.1} icon={Coffee} accent="coffee" />
        <StatCard label="vs Target" value={94} suffix="%" icon={TrendingUp} accent="warning" />
        <StatCard label="Best Region" value="Lantapan" icon={TrendingUp} accent="success" />
        <StatCard label="Watchlist" value="Maramag" icon={TrendingDown} accent="info" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Production vs Target</CardTitle>
            <CardDescription>Monthly green coffee output by variety</CardDescription>
          </CardHeader>
          <CardContent><div className="h-72"><ProductionAreaChart data={productionSeries} /></div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle>Regional Yield</CardTitle></CardHeader>
          <CardContent><div className="h-72"><ProductivityBarChart data={productivityByMunicipality.slice(0, 6)} dataKey="yield" /></div></CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader><CardTitle>Production Flags</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {[
            ["Maramag district", "Yield down 23% vs seasonal baseline", "critical"],
            ["Quezon barangays", "12 farms missing Q2 production records", "warning"],
            ["Valencia Arabica", "Output 8% above target", "info"],
          ].map(([title, desc, sev]) => (
            <div key={title} className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
              <span className={`h-2.5 w-2.5 rounded-full ${sev === "critical" ? "bg-destructive" : sev === "warning" ? "bg-warning" : "bg-info"}`} />
              <div className="flex-1"><p className="text-sm font-medium">{title}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
              <Badge variant={sev === "critical" ? "destructive" : sev === "warning" ? "warning" : "info"}>{sev}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
