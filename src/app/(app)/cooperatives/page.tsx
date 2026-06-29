"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Building2, Users, Coffee, Trophy, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Toolbar } from "@/components/shared/toolbar";
import { GenericStatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cooperatives } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

export default function CooperativesPage() {
  const [q, setQ] = useState("");
  const filtered = cooperatives.filter((c) =>
    (c.name + c.municipality + c.acronym).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Cooperatives"
        description="Coffee cooperatives, their membership, coverage, and production performance."
        breadcrumb={[{ label: "Registry" }, { label: "Cooperatives" }]}
        actions={<Button><Plus /> Add cooperative</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Cooperatives" value={cooperatives.length} icon={Building2} accent="primary" />
        <StatCard label="Total Members" value={cooperatives.reduce((s, c) => s + c.members, 0)} delta={5.1} icon={Users} accent="info" />
        <StatCard label="Combined Production" value={cooperatives.reduce((s, c) => s + c.annualProduction, 0)} suffix="kg" icon={Coffee} accent="coffee" />
        <StatCard label="Active" value={cooperatives.filter((c) => c.status === "Active").length} icon={Trophy} accent="success" />
      </div>

      <div className="mt-4">
        <Toolbar searchPlaceholder="Search cooperatives…" onSearch={setQ} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Link key={c.id} href={`/cooperatives/${c.id}`}>
            <Card className="group h-full transition-shadow hover:shadow-elevated">
              <CardContent className="pt-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 font-display text-sm font-bold text-primary">
                      {c.acronym}
                    </div>
                    <div className="min-w-0">
                      <p className="line-clamp-1 font-medium leading-tight">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.municipality}</p>
                    </div>
                  </div>
                  {c.rank <= 3 && (
                    <Badge variant="warning"><Trophy className="h-3 w-3" /> #{c.rank}</Badge>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 border-y border-border py-3 text-center">
                  <div><p className="font-display text-lg font-bold">{c.members}</p><p className="text-[11px] text-muted-foreground">Members</p></div>
                  <div><p className="font-display text-lg font-bold">{c.farms}</p><p className="text-[11px] text-muted-foreground">Farms</p></div>
                  <div><p className="font-display text-lg font-bold">{(c.annualProduction / 1000).toFixed(0)}t</p><p className="text-[11px] text-muted-foreground">Output</p></div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GenericStatusBadge status={c.status} />
                    <Badge variant="info">{c.certification}</Badge>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
