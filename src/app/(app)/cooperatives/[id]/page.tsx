"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import {
  Users, Coffee, Mountain, MapPin, Calendar, User, Award,
  Download, Pencil, FileText, Activity, Map as MapIcon, Trophy,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { GenericStatusBadge } from "@/components/shared/status-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CoffeeMap, type MapLayerState } from "@/components/map/coffee-map";
import { ProductionAreaChart } from "@/components/charts/charts";
import { cooperatives, farmers, productionSeries } from "@/lib/mock-data";
import { formatNumber, formatDate } from "@/lib/utils";

export default function CooperativeProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const coop = cooperatives.find((c) => c.id === id);
  if (!coop) notFound();

  const members = farmers.filter((f) => f.cooperativeId === coop.id).slice(0, 12);
  const [layers] = useState<MapLayerState>({
    heatmap: true, farms: false, cooperatives: true, boundaries: false, validation: false,
  });

  return (
    <div>
      <PageHeader
        title={coop.name}
        breadcrumb={[{ label: "Cooperatives" }, { label: coop.acronym }]}
        actions={
          <>
            <Button variant="outline"><Download /> Reports</Button>
            <Button><Pencil /> Edit</Button>
          </>
        }
      />

      {/* Header card */}
      <Card>
        <CardContent className="flex flex-col gap-5 pt-6 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 font-display text-lg font-bold text-primary">
            {coop.acronym}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-xl font-bold">{coop.name}</h2>
              {coop.rank <= 3 && <Badge variant="warning"><Trophy className="h-3 w-3" /> Rank #{coop.rank}</Badge>}
              <GenericStatusBadge status={coop.status} />
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {coop.municipality}</span>
              <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {coop.chairperson}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Est. {coop.established}</span>
              <span className="flex items-center gap-1.5"><Award className="h-4 w-4" /> {coop.certification}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat icon={Users} label="Members" value={formatNumber(coop.members)} />
        <Stat icon={MapIcon} label="Farms" value={formatNumber(coop.farms)} />
        <Stat icon={Mountain} label="Total Area" value={`${formatNumber(coop.totalArea)} ha`} />
        <Stat icon={Coffee} label="Production" value={`${(coop.annualProduction / 1000).toFixed(0)} t`} />
      </div>

      <div className="mt-4">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="coverage"><MapIcon className="h-4 w-4" /> Coverage</TabsTrigger>
            <TabsTrigger value="interventions"><Activity className="h-4 w-4" /> Interventions</TabsTrigger>
            <TabsTrigger value="reports"><FileText className="h-4 w-4" /> Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardHeader><CardTitle>Production Summary</CardTitle></CardHeader>
              <CardContent><div className="h-72"><ProductionAreaChart data={productionSeries} /></div></CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="mt-4">
            <Card>
              <CardContent className="pt-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Barangay</TableHead>
                      <TableHead className="text-right">Farms</TableHead>
                      <TableHead className="text-right">Area</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell>
                          <div className="flex items-center gap-2.5">
                            <Avatar name={m.name} src={m.avatar} size="sm" />
                            <span className="font-medium">{m.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{m.barangay}</TableCell>
                        <TableCell className="text-right tabular-nums">{m.farmCount}</TableCell>
                        <TableCell className="text-right tabular-nums">{m.totalArea} ha</TableCell>
                        <TableCell><StatusBadge status={m.status} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coverage" className="mt-4">
            <Card className="overflow-hidden">
              <div className="h-[420px]"><CoffeeMap layers={layers} className="h-full w-full" /></div>
            </Card>
          </TabsContent>

          <TabsContent value="interventions" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="relative space-y-5 pl-6">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
                  {[
                    ["2026-05-14", "Seedling distribution", "1,200 Arabica seedlings distributed to 40 members"],
                    ["2026-03-02", "Training program", "Post-harvest handling workshop — 65 attendees"],
                    ["2025-12-10", "Equipment grant", "Wet processing equipment provided by DA"],
                    ["2025-08-21", "Certification audit", "Fair Trade re-certification completed"],
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

          <TabsContent value="reports" className="mt-4">
            <Card>
              <CardContent className="grid grid-cols-1 gap-3 pt-6 sm:grid-cols-2">
                {["Q2 2026 Production Report", "Annual Membership Report", "Certification Compliance", "Coverage & Density Analysis"].map((r) => (
                  <div key={r} className="flex items-center justify-between rounded-lg border border-border p-4">
                    <span className="flex items-center gap-2.5 text-sm font-medium">
                      <FileText className="h-5 w-5 text-muted-foreground" /> {r}
                    </span>
                    <Button variant="outline" size="sm"><Download /> PDF</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
        <div><p className="text-xs text-muted-foreground">{label}</p><p className="font-display text-lg font-bold">{value}</p></div>
      </CardContent>
    </Card>
  );
}
