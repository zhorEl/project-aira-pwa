"use client";

import { useState } from "react";
import { Check, X, Eye, Clock, AlertTriangle, ShieldCheck, MapPin } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { farmers } from "@/lib/mock-data";
import { relativeTime } from "@/lib/utils";

export default function VerificationPage() {
  const queue = farmers.filter((f) => f.status === "pending" || f.status === "flagged");
  const [active, setActive] = useState<string | null>(queue[0]?.id ?? null);
  const selected = queue.find((f) => f.id === active) ?? queue[0];

  return (
    <div>
      <PageHeader
        title="Verification Queue"
        description="Review and validate pending farmer registrations against field data and documents."
        breadcrumb={[{ label: "Farmers" }, { label: "Verification" }]}
        actions={
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All ({queue.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="flagged">Flagged</TabsTrigger>
            </TabsList>
          </Tabs>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="In Queue" value={queue.length} icon={Clock} accent="warning" />
        <StatCard label="Flagged" value={farmers.filter((f) => f.status === "flagged").length} icon={AlertTriangle} accent="info" />
        <StatCard label="Verified Today" value={14} icon={ShieldCheck} accent="success" />
        <StatCard label="Avg. Review Time" value="6.4" suffix="hrs" icon={Clock} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Queue list */}
        <Card className="lg:col-span-1">
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-semibold">Review Queue</p>
          </div>
          <div className="max-h-[560px] overflow-y-auto scrollbar-thin p-2">
            {queue.map((f) => (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition-colors ${
                  active === f.id ? "bg-accent" : "hover:bg-accent/60"
                }`}
              >
                <Avatar name={f.name} src={f.avatar} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{f.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{f.municipality} · {f.cooperative}</p>
                </div>
                <Badge variant={f.status === "flagged" ? "info" : "warning"}>
                  {f.status}
                </Badge>
              </button>
            ))}
          </div>
        </Card>

        {/* Detail review */}
        {selected && (
          <Card className="lg:col-span-2">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Avatar name={selected.name} src={selected.avatar} size="lg" />
                <div className="flex-1">
                  <h2 className="font-display text-lg font-bold">{selected.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {selected.gender} · {selected.age} yrs · {selected.phone}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {selected.barangay}, {selected.municipality}
                  </p>
                </div>
                <Badge variant={selected.status === "flagged" ? "info" : "warning"}>
                  {selected.status} · {relativeTime(selected.joinedAt)}
                </Badge>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["Cooperative", selected.cooperative],
                  ["Farms", String(selected.farmCount)],
                  ["Total area", `${selected.totalArea} ha`],
                  ["Production", `${selected.annualProduction} kg`],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg bg-muted/40 p-3">
                    <p className="text-xs text-muted-foreground">{k}</p>
                    <p className="font-medium">{v}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2">
                <p className="text-sm font-semibold">Validation checks</p>
                {[
                  ["GPS coordinates present", true],
                  ["Polygon boundary captured", selected.status !== "flagged"],
                  ["Coop membership confirmed", true],
                  ["Documents uploaded", selected.status !== "flagged"],
                  ["No duplicate record", true],
                ].map(([label, ok]) => (
                  <div key={label as string} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm">
                    {ok ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-warning" />
                    )}
                    <span className={ok ? "" : "text-muted-foreground"}>{label}</span>
                    <Badge variant={ok ? "success" : "warning"} className="ml-auto">
                      {ok ? "Pass" : "Needs review"}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-border pt-5">
                <Button variant="outline"><Eye /> View full profile</Button>
                <div className="ml-auto flex gap-2">
                  <Button variant="destructive"><X /> Reject</Button>
                  <Button><Check /> Approve & verify</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
