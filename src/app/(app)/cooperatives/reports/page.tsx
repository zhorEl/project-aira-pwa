"use client";

import { FileText, Download, Trophy, BarChart3 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/misc";
import { ProductivityBarChart } from "@/components/charts/charts";
import { cooperatives } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

export default function CooperativeReportsPage() {
  const ranked = [...cooperatives].sort((a, b) => b.annualProduction - a.annualProduction);
  const max = ranked[0].annualProduction;
  const chart = ranked.slice(0, 8).map((c) => ({ name: c.acronym, output: Math.round(c.annualProduction / 1000) }));

  return (
    <div>
      <PageHeader
        title="Cooperative Reports"
        description="Performance rankings and exportable cooperative reports."
        breadcrumb={[{ label: "Cooperatives" }, { label: "Reports" }]}
        actions={<Button><Download /> Generate report</Button>}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Production by Cooperative (tonnes)</CardTitle></CardHeader>
          <CardContent><div className="h-72"><ProductivityBarChart data={chart} dataKey="output" /></div></CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Trophy className="h-4 w-4 text-warning" /> Quick Exports</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {["Provincial Summary", "Membership Rollup", "Production Rankings", "Certification Status"].map((r) => (
              <div key={r} className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-sm">
                <span className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" /> {r}</span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">PDF</Button>
                  <Button variant="ghost" size="sm">XLSX</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader><CardTitle>Performance Rankings</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Rank</TableHead>
                <TableHead>Cooperative</TableHead>
                <TableHead className="text-right">Members</TableHead>
                <TableHead className="text-right">Farms</TableHead>
                <TableHead>Output share</TableHead>
                <TableHead className="text-right">Production</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ranked.map((c, i) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <Badge variant={i < 3 ? "warning" : "muted"}>#{i + 1}</Badge>
                  </TableCell>
                  <TableCell><span className="font-medium">{c.name}</span><p className="text-xs text-muted-foreground">{c.municipality}</p></TableCell>
                  <TableCell className="text-right tabular-nums">{c.members}</TableCell>
                  <TableCell className="text-right tabular-nums">{c.farms}</TableCell>
                  <TableCell className="w-48"><Progress value={(c.annualProduction / max) * 100} /></TableCell>
                  <TableCell className="text-right font-medium tabular-nums">{formatNumber(c.annualProduction)} kg</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
