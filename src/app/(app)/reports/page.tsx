"use client";

import { useState } from "react";
import {
  FileText, FileSpreadsheet, FileType, Download, Users, Sprout,
  Building2, MapPin, Globe, Clock, Play,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/misc";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn, formatDate } from "@/lib/utils";

const reportTypes = [
  { label: "Farmer Reports", icon: Users, desc: "Profiles, certifications, production summaries" },
  { label: "Farm Reports", icon: Sprout, desc: "Boundaries, varieties, yield analysis" },
  { label: "Cooperative Reports", icon: Building2, desc: "Membership, coverage, performance" },
  { label: "Municipality Reports", icon: MapPin, desc: "Geographic roll-ups and rankings" },
  { label: "Provincial Reports", icon: Globe, desc: "Province-wide intelligence summary" },
];

const recent = [
  { name: "Bukidnon Q2 2026 Provincial Report", type: "Provincial", format: "PDF", size: "4.2 MB", date: "2026-06-27", by: "Elena Marquez" },
  { name: "BHCG Membership Rollup", type: "Cooperative", format: "XLSX", size: "820 KB", date: "2026-06-25", by: "Grace Domingo" },
  { name: "Valencia Production Analysis", type: "Municipality", format: "PDF", size: "2.1 MB", date: "2026-06-22", by: "Carlos Reyes" },
  { name: "Farmer Verification Export", type: "Farmer", format: "CSV", size: "340 KB", date: "2026-06-20", by: "Mario Castillo" },
];

const formatIcon: Record<string, typeof FileText> = { PDF: FileType, XLSX: FileSpreadsheet, CSV: FileText };

export default function ReportsPage() {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <PageHeader
        title="Reports"
        description="Generate and export reports across the platform in PDF, Excel, or CSV."
        breadcrumb={[{ label: "Intelligence" }, { label: "Reports" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Generator */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Generate Report</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {reportTypes.map((r, i) => {
                const Icon = r.icon;
                return (
                  <button
                    key={r.label}
                    onClick={() => setSelected(i)}
                    className={cn(
                      "flex flex-col items-start gap-2 rounded-lg border p-4 text-left transition-colors",
                      selected === i ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                    )}
                  >
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", selected === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold">{r.label}</p>
                    <p className="text-xs text-muted-foreground">{r.desc}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 border-t border-border pt-5 sm:grid-cols-3">
              <div className="space-y-1.5"><label className="text-sm font-medium">Scope</label><Select><option>All municipalities</option><option>By cooperative</option><option>Single farm</option></Select></div>
              <div className="space-y-1.5"><label className="text-sm font-medium">Period</label><Select><option>Crop Year 2026</option><option>Q2 2026</option><option>2025</option></Select></div>
              <div className="space-y-1.5"><label className="text-sm font-medium">Format</label><Select><option>PDF</option><option>Excel (XLSX)</option><option>CSV</option></Select></div>
            </div>

            <div className="mt-5 flex justify-end">
              <Button><Play /> Generate {reportTypes[selected].label.replace(" Reports", "")} Report</Button>
            </div>
          </CardContent>
        </Card>

        {/* Scheduled */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-4 w-4" /> Scheduled</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {[
              ["Weekly Production Digest", "Every Monday 08:00"],
              ["Monthly Provincial Report", "1st of month"],
              ["Quarterly Coop Rankings", "End of quarter"],
            ].map(([t, when]) => (
              <div key={t} className="rounded-lg border border-border px-3 py-2.5">
                <p className="text-sm font-medium">{t}</p>
                <p className="text-xs text-muted-foreground">{when}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full">Manage schedules</Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent reports */}
      <Card className="mt-4">
        <CardHeader><CardTitle>Recent Reports</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Generated by</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Size</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((r) => {
                const Icon = formatIcon[r.format];
                return (
                  <TableRow key={r.name}>
                    <TableCell><span className="flex items-center gap-2 font-medium"><Icon className="h-4 w-4 text-muted-foreground" /> {r.name}</span></TableCell>
                    <TableCell><Badge variant="secondary">{r.type}</Badge></TableCell>
                    <TableCell><Badge variant="muted">{r.format}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.by}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatDate(r.date)}</TableCell>
                    <TableCell className="text-right text-sm tabular-nums">{r.size}</TableCell>
                    <TableCell><Button variant="ghost" size="icon-sm"><Download /></Button></TableCell>
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
