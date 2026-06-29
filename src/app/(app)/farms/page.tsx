"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Sprout, Mountain, Coffee, TreePine, LayoutGrid, List as ListIcon } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Toolbar } from "@/components/shared/toolbar";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { farms } from "@/lib/mock-data";
import { formatNumber, cn } from "@/lib/utils";

const varietyColor: Record<string, string> = {
  Arabica: "bg-leaf-500", Robusta: "bg-coffee-500", Excelsa: "bg-coffee-300", Liberica: "bg-coffee-700",
};
const healthColor: Record<string, "success" | "info" | "warning" | "destructive"> = {
  Excellent: "success", Good: "info", Fair: "warning", Poor: "destructive",
};

export default function FarmsPage() {
  const [q, setQ] = useState("");
  const [view, setView] = useState<"grid" | "table">("table");
  const filtered = farms.filter((f) =>
    (f.name + f.variety + f.barangay + f.farmerName).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Farms"
        description="Geospatial registry of coffee farms — boundaries, varieties, and production."
        breadcrumb={[{ label: "Registry" }, { label: "Farms" }]}
        actions={<Button><Plus /> Add farm</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Mapped Farms" value={farms.length * 38} delta={2.8} icon={Sprout} accent="success" />
        <StatCard label="Total Area" value={Math.round(farms.reduce((s, f) => s + f.area, 0) * 38)} suffix="ha" icon={Mountain} accent="info" />
        <StatCard label="Avg. Elevation" value={Math.round(farms.reduce((s, f) => s + f.elevation, 0) / farms.length)} suffix="masl" icon={TreePine} />
        <StatCard label="Total Production" value={Math.round(farms.reduce((s, f) => s + f.annualProduction, 0) * 38)} suffix="kg" icon={Coffee} accent="coffee" />
      </div>

      <Card className="mt-4 p-4">
        <Toolbar
          searchPlaceholder="Search farms, variety, farmer…"
          onSearch={setQ}
          actions={
            <div className="flex rounded-lg border border-input p-0.5">
              <button onClick={() => setView("table")} className={cn("rounded p-1.5", view === "table" ? "bg-accent" : "text-muted-foreground")}>
                <ListIcon className="h-4 w-4" />
              </button>
              <button onClick={() => setView("grid")} className={cn("rounded p-1.5", view === "grid" ? "bg-accent" : "text-muted-foreground")}>
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          }
        />

        {view === "table" ? (
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Farm</TableHead>
                  <TableHead>Farmer</TableHead>
                  <TableHead>Variety</TableHead>
                  <TableHead className="text-right">Area</TableHead>
                  <TableHead className="text-right">Elevation</TableHead>
                  <TableHead className="text-right">Trees</TableHead>
                  <TableHead className="text-right">Yield</TableHead>
                  <TableHead>Health</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.slice(0, 28).map((f) => (
                  <TableRow key={f.id} className="cursor-pointer">
                    <TableCell>
                      <Link href={`/farms/${f.id}`} className="font-medium hover:text-primary">{f.name}</Link>
                      <p className="text-xs text-muted-foreground">{f.barangay}</p>
                    </TableCell>
                    <TableCell className="text-sm">{f.farmerName}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2 text-sm">
                        <span className={cn("h-2.5 w-2.5 rounded-full", varietyColor[f.variety])} />
                        {f.variety}
                      </span>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{f.area} ha</TableCell>
                    <TableCell className="text-right tabular-nums">{formatNumber(f.elevation)}</TableCell>
                    <TableCell className="text-right tabular-nums">{formatNumber(f.trees)}</TableCell>
                    <TableCell className="text-right tabular-nums">{f.yield} kg/ha</TableCell>
                    <TableCell><Badge variant={healthColor[f.health]}>{f.health}</Badge></TableCell>
                    <TableCell><StatusBadge status={f.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, 18).map((f) => (
              <Link key={f.id} href={`/farms/${f.id}`}>
                <Card className="h-full transition-shadow hover:shadow-elevated">
                  <CardContent className="pt-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{f.name}</p>
                        <p className="text-xs text-muted-foreground">{f.farmerName}</p>
                      </div>
                      <StatusBadge status={f.status} />
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <span className={cn("h-2.5 w-2.5 rounded-full", varietyColor[f.variety])} />
                      <span className="text-sm font-medium">{f.variety}</span>
                      <Badge variant={healthColor[f.health]} className="ml-auto">{f.health}</Badge>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3 text-center text-xs">
                      <div><p className="font-semibold">{f.area} ha</p><p className="text-muted-foreground">Area</p></div>
                      <div><p className="font-semibold">{formatNumber(f.elevation)}</p><p className="text-muted-foreground">masl</p></div>
                      <div><p className="font-semibold">{f.yield}</p><p className="text-muted-foreground">kg/ha</p></div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
