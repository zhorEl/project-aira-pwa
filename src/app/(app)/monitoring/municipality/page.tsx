"use client";

import { Building, Download } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/misc";
import { productivityByMunicipality } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

export default function MunicipalityMonitoringPage() {
  return (
    <div>
      <PageHeader
        title="Municipality Monitoring"
        description="Roll-up of farmers, farms, and production by municipality."
        breadcrumb={[{ label: "Monitoring" }, { label: "Municipality" }]}
        actions={<Button variant="outline"><Download /> Export</Button>}
      />
      <Card>
        <CardContent className="pt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Municipality</TableHead>
                <TableHead className="text-right">Farms</TableHead>
                <TableHead className="text-right">Avg. Yield</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead>Coverage</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productivityByMunicipality.map((m, i) => {
                const cov = 55 + ((i * 11) % 45);
                return (
                  <TableRow key={m.name}>
                    <TableCell>
                      <span className="flex items-center gap-2 font-medium">
                        <Building className="h-4 w-4 text-muted-foreground" /> {m.name}
                      </span>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{formatNumber(m.farms)}</TableCell>
                    <TableCell className="text-right tabular-nums">{m.yield} kg/ha</TableCell>
                    <TableCell className="w-40"><Progress value={cov} /></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{cov}%</TableCell>
                    <TableCell><Badge variant={cov > 80 ? "success" : cov > 60 ? "warning" : "destructive"}>{cov > 80 ? "On track" : cov > 60 ? "Monitor" : "Behind"}</Badge></TableCell>
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
