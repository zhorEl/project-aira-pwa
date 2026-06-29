"use client";

import Link from "next/link";
import {
  Building, MapPin, Coffee, Users, ShieldCheck, AlertTriangle,
  ArrowRight, Activity, ClipboardCheck, Clock,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/misc";
import { ProductivityBarChart } from "@/components/charts/charts";
import { monitoringTabs } from "@/lib/navigation";
import { productivityByMunicipality, farmers, alerts } from "@/lib/mock-data";
import { relativeTime } from "@/lib/utils";

export default function MonitoringPage() {
  const queue = farmers.filter((f) => f.status === "pending" || f.status === "flagged");

  return (
    <div>
      <PageHeader
        title="PMT Monitoring Dashboard"
        description="Project Management Team oversight across geography, production, and field operations."
        breadcrumb={[{ label: "Intelligence" }, { label: "Monitoring" }]}
        actions={
          <Link href="/monitoring/field-status">
            <Button><Activity /> Field status</Button>
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Municipalities" value={10} icon={Building} accent="primary" />
        <StatCard label="Barangays Covered" value={84} icon={MapPin} accent="info" />
        <StatCard label="Field Staff" value={32} icon={Users} accent="success" />
        <StatCard label="Validation Queue" value={queue.length} icon={ClipboardCheck} accent="warning" />
      </div>

      {/* Sub-module entry cards */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {monitoringTabs.map((t) => (
          <Link key={t.href} href={t.href}>
            <Card className="group h-full transition-shadow hover:shadow-elevated">
              <CardContent className="flex h-full flex-col justify-between py-4">
                <p className="text-sm font-semibold">{t.label}</p>
                <div className="mt-3 flex items-center justify-between">
                  <Badge variant="muted">Monitor</Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Productivity by Municipality (kg/ha)</CardTitle></CardHeader>
          <CardContent><div className="h-72"><ProductivityBarChart data={productivityByMunicipality} dataKey="yield" /></div></CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" /> Active Alerts</CardTitle>
            <Badge variant="destructive">{alerts.length}</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((a) => (
              <div key={a.id} className="flex gap-2.5">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${a.severity === "critical" ? "bg-destructive" : a.severity === "warning" ? "bg-warning" : "bg-info"}`} />
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-tight">{a.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.module} · {relativeTime(a.time)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Field staff coverage */}
      <Card className="mt-4">
        <CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Coverage Completion by Municipality</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {productivityByMunicipality.map((m, i) => {
            const pct = 55 + ((i * 7) % 45);
            return (
              <div key={m.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium">{m.name}</span>
                  <span className="text-muted-foreground">{pct}% · {m.farms} farms</span>
                </div>
                <Progress value={pct} indicatorClassName={pct > 80 ? "bg-success" : pct > 60 ? "bg-primary" : "bg-warning"} />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
