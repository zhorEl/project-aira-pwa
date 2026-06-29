"use client";

import { MapPin, Download } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/misc";
import { farms } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

export default function BarangayMonitoringPage() {
  // Aggregate farms by barangay
  const byBarangay = Object.values(
    farms.reduce<Record<string, { name: string; municipality: string; farms: number; area: number; production: number }>>(
      (acc, f) => {
        const key = `${f.barangay}|${f.municipality}`;
        acc[key] = acc[key] || { name: f.barangay, municipality: f.municipality, farms: 0, area: 0, production: 0 };
        acc[key].farms += 1;
        acc[key].area += f.area;
        acc[key].production += f.annualProduction;
        return acc;
      },
      {}
    )
  ).sort((a, b) => b.production - a.production);

  return (
    <div>
      <PageHeader
        title="Barangay Monitoring"
        description="Granular view of farm coverage and production at the barangay level."
        breadcrumb={[{ label: "Monitoring" }, { label: "Barangay" }]}
        actions={<Button variant="outline"><Download /> Export</Button>}
      />
      <Card>
        <CardContent className="pt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Barangay</TableHead>
                <TableHead>Municipality</TableHead>
                <TableHead className="text-right">Farms</TableHead>
                <TableHead className="text-right">Area</TableHead>
                <TableHead className="text-right">Production</TableHead>
                <TableHead>Data quality</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {byBarangay.map((b, i) => {
                const dq = 60 + ((i * 9) % 40);
                return (
                  <TableRow key={b.name + i}>
                    <TableCell>
                      <span className="flex items-center gap-2 font-medium">
                        <MapPin className="h-4 w-4 text-muted-foreground" /> {b.name}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{b.municipality}</TableCell>
                    <TableCell className="text-right tabular-nums">{b.farms}</TableCell>
                    <TableCell className="text-right tabular-nums">{b.area.toFixed(1)} ha</TableCell>
                    <TableCell className="text-right tabular-nums">{formatNumber(b.production)} kg</TableCell>
                    <TableCell className="w-40">
                      <div className="flex items-center gap-2">
                        <Progress value={dq} />
                        <Badge variant={dq > 80 ? "success" : "warning"}>{dq}%</Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
