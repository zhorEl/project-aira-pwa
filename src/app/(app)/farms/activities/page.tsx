"use client";

import { Sprout, Scissors, Droplets, Bug, Coffee, Filter, Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { farms } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

const TYPES = [
  { type: "Harvest", icon: Coffee, color: "text-coffee-600 bg-coffee-500/15" },
  { type: "Pruning", icon: Scissors, color: "text-leaf-600 bg-leaf-500/15" },
  { type: "Fertilizing", icon: Droplets, color: "text-info bg-info/12" },
  { type: "Pest control", icon: Bug, color: "text-warning bg-warning/15" },
  { type: "Planting", icon: Sprout, color: "text-success bg-success/12" },
];

export default function FarmActivitiesPage() {
  const activities = farms.slice(0, 20).map((f, i) => {
    const t = TYPES[i % TYPES.length];
    return {
      id: f.id,
      farm: f.name,
      farmer: f.farmerName,
      type: t.type,
      icon: t.icon,
      color: t.color,
      date: f.updatedAt,
      note: `${t.type} recorded on ${f.area} ha · ${f.variety}`,
    };
  });

  return (
    <div>
      <PageHeader
        title="Farm Activities"
        description="Chronological log of field activities across all monitored farms."
        breadcrumb={[{ label: "Farms" }, { label: "Activities" }]}
        actions={
          <>
            <Button variant="outline"><Filter /> Filter</Button>
            <Button><Plus /> Log activity</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {TYPES.map((t) => (
          <StatCard key={t.type} label={t.type} value={Math.floor(Math.random() * 80) + 20} icon={t.icon} />
        ))}
      </div>

      <Card className="mt-4">
        <CardContent className="pt-6">
          <div className="relative space-y-1 pl-2">
            {activities.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.id} className="flex items-center gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-accent">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${a.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm">
                      <Badge variant="muted" className="mr-2">{a.type}</Badge>
                      <span className="font-medium">{a.farm}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{a.note}</p>
                  </div>
                  <div className="hidden items-center gap-2 sm:flex">
                    <Avatar name={a.farmer} size="sm" />
                    <span className="text-xs text-muted-foreground">{a.farmer}</span>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{formatDate(a.date)}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
