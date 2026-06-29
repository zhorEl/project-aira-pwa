"use client";

import { Coffee, TrendingUp, Scale, Percent, Download } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/misc";
import { ProductionAreaChart, VarietyPieChart } from "@/components/charts/charts";
import { farms, productionSeries, varietyDistribution } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

export default function FarmProductionPage() {
  const total = farms.reduce((s, f) => s + f.annualProduction, 0);
  const top = [...farms].sort((a, b) => b.annualProduction - a.annualProduction).slice(0, 10);
  const maxProd = top[0].annualProduction;

  return (
    <div>
      <PageHeader
        title="Production Records"
        description="Aggregate and per-farm coffee production across the crop year."
        breadcrumb={[{ label: "Farms" }, { label: "Production" }]}
        actions={<Button variant="outline"><Download /> Export CSV</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Production" value={Math.round(total * 38)} suffix="kg" delta={-3.1} icon={Coffee} accent="coffee" />
        <StatCard label="Avg. Yield" value={Math.round(farms.reduce((s, f) => s + f.yield, 0) / farms.length)} suffix="kg/ha" delta={2.4} icon={Scale} accent="success" />
        <StatCard label="Peak Month" value="May" icon={TrendingUp} accent="info" />
        <StatCard label="Arabica Share" value={48} suffix="%" icon={Percent} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Monthly Production</CardTitle>
            <CardDescription>Green coffee output (kg) by variety</CardDescription>
          </CardHeader>
          <CardContent><div className="h-64"><ProductionAreaChart data={productionSeries} /></div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle>By Variety</CardTitle></CardHeader>
          <CardContent><div className="h-64"><VarietyPieChart data={varietyDistribution} /></div></CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader><CardTitle>Top Producing Farms</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Farm</TableHead>
                <TableHead>Variety</TableHead>
                <TableHead>Production share</TableHead>
                <TableHead className="text-right">Annual (kg)</TableHead>
                <TableHead className="text-right">Yield</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {top.map((f, i) => (
                <TableRow key={f.id}>
                  <TableCell className="font-semibold text-muted-foreground">{i + 1}</TableCell>
                  <TableCell><span className="font-medium">{f.name}</span><p className="text-xs text-muted-foreground">{f.farmerName}</p></TableCell>
                  <TableCell className="text-sm">{f.variety}</TableCell>
                  <TableCell className="w-48">
                    <Progress value={(f.annualProduction / maxProd) * 100} />
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums">{formatNumber(f.annualProduction)}</TableCell>
                  <TableCell className="text-right tabular-nums">{f.yield} kg/ha</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
