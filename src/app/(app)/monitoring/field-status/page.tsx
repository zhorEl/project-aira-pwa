"use client";

import { Users, MapPin, CheckCircle2, Clock, Circle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/misc";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const staff = [
  { name: "Mario Castillo", muni: "Valencia", assigned: 48, visited: 41, online: true, last: "8 min ago" },
  { name: "Liza Flores", muni: "Malaybalay", assigned: 52, visited: 38, online: true, last: "21 min ago" },
  { name: "Carlos Reyes", muni: "Maramag", assigned: 44, visited: 44, online: false, last: "3 hrs ago" },
  { name: "Grace Domingo", muni: "Lantapan", assigned: 39, visited: 22, online: true, last: "2 min ago" },
  { name: "Pedro Salvador", muni: "Quezon", assigned: 41, visited: 19, online: false, last: "1 day ago" },
  { name: "Ana Villanueva", muni: "Impasugong", assigned: 36, visited: 30, online: true, last: "44 min ago" },
];

export default function FieldStatusPage() {
  return (
    <div>
      <PageHeader
        title="Field Staff Monitoring"
        description="Real-time field staff coverage, visit progress, and activity status."
        breadcrumb={[{ label: "Monitoring" }, { label: "Field Status" }]}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Field Staff" value={32} icon={Users} accent="primary" />
        <StatCard label="Online Now" value={staff.filter((s) => s.online).length * 4} icon={Circle} accent="success" />
        <StatCard label="Visits This Week" value={428} icon={CheckCircle2} accent="info" />
        <StatCard label="Avg. Completion" value={73} suffix="%" icon={Clock} accent="warning" />
      </div>

      <Card className="mt-4">
        <CardHeader><CardTitle>Field Staff Status</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Field Staff</TableHead>
                <TableHead>Assigned Area</TableHead>
                <TableHead>Visit Progress</TableHead>
                <TableHead className="text-right">Completion</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((s) => {
                const pct = Math.round((s.visited / s.assigned) * 100);
                return (
                  <TableRow key={s.name}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={s.name} size="sm" />
                        <span className="font-medium">{s.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {s.muni}</span>
                    </TableCell>
                    <TableCell className="w-48"><Progress value={pct} /></TableCell>
                    <TableCell className="text-right text-sm tabular-nums">{s.visited}/{s.assigned} ({pct}%)</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{s.last}</TableCell>
                    <TableCell>
                      <Badge variant={s.online ? "success" : "muted"}>
                        <Circle className={`h-2 w-2 ${s.online ? "fill-success" : "fill-muted-foreground"}`} /> {s.online ? "Online" : "Offline"}
                      </Badge>
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
