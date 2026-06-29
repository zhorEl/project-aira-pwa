"use client";

import { Sprout, GraduationCap, Wrench, Award, Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

const interventions = [
  { id: 1, type: "Seedling", icon: Sprout, color: "text-success bg-success/12", title: "Arabica seedling distribution", coop: "BHCG", muni: "Malaybalay", reach: "40 farmers", date: "2026-05-14", status: "Completed" },
  { id: 2, type: "Training", icon: GraduationCap, color: "text-info bg-info/12", title: "Post-harvest handling workshop", coop: "MKCA", muni: "Lantapan", reach: "65 attendees", date: "2026-04-22", status: "Completed" },
  { id: 3, type: "Equipment", icon: Wrench, color: "text-coffee-600 bg-coffee-500/15", title: "Wet processing equipment grant", coop: "VAP", muni: "Valencia", reach: "1 coop", date: "2026-04-03", status: "In progress" },
  { id: 4, type: "Certification", icon: Award, color: "text-warning bg-warning/15", title: "Organic certification support", coop: "MOCC", muni: "Maramag", reach: "28 farms", date: "2026-03-18", status: "In progress" },
  { id: 5, type: "Training", icon: GraduationCap, color: "text-info bg-info/12", title: "GAP refresher course", coop: "IUG", muni: "Impasugong", reach: "52 attendees", date: "2026-02-27", status: "Planned" },
];

export default function InterventionsPage() {
  return (
    <div>
      <PageHeader
        title="Interventions"
        description="Track PMT programs, grants, and training across cooperatives."
        breadcrumb={[{ label: "Monitoring" }, { label: "Interventions" }]}
        actions={<Button><Plus /> Log intervention</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Interventions" value={147} icon={Wrench} accent="primary" />
        <StatCard label="Trainings" value={62} icon={GraduationCap} accent="info" />
        <StatCard label="Seedlings Issued" value={48200} icon={Sprout} accent="success" />
        <StatCard label="Active Programs" value={9} icon={Award} accent="warning" />
      </div>

      <Card className="mt-4">
        <CardContent className="pt-4">
          <div className="space-y-2">
            {interventions.map((iv) => {
              const Icon = iv.icon;
              return (
                <div key={iv.id} className="flex items-center gap-4 rounded-lg border border-border px-4 py-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-full ${iv.color}`}><Icon className="h-5 w-5" /></div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{iv.title}</p>
                    <p className="text-xs text-muted-foreground">{iv.coop} · {iv.muni} · {iv.reach}</p>
                  </div>
                  <Badge variant="muted">{iv.type}</Badge>
                  <Badge variant={iv.status === "Completed" ? "success" : iv.status === "In progress" ? "warning" : "info"}>{iv.status}</Badge>
                  <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">{formatDate(iv.date)}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
