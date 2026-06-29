"use client";

import { Layers, Building, Users, Plus, MoreHorizontal, Pencil, Power, Settings } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { GenericStatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dropdown, DropdownItem, DropdownSeparator } from "@/components/ui/dropdown";
import { tenants } from "@/lib/mock-data";

export default function TenantsPage() {
  return (
    <div>
      <PageHeader
        title="Tenants"
        description="Top-level multi-tenant boundaries. Each tenant isolates organizations, users, and data."
        breadcrumb={[{ label: "Administration" }, { label: "Tenants" }]}
        actions={<Button><Plus /> Create tenant</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Tenants" value={tenants.length} icon={Layers} accent="primary" />
        <StatCard label="Active" value={tenants.filter((t) => t.status === "Active").length} icon={Power} accent="success" />
        <StatCard label="Organizations" value={tenants.reduce((s, t) => s + t.organizations, 0)} icon={Building} accent="info" />
        <StatCard label="Total Users" value={tenants.reduce((s, t) => s + t.users, 0)} icon={Users} accent="warning" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {tenants.map((t) => (
          <Card key={t.id} className="transition-shadow hover:shadow-elevated">
            <CardContent className="pt-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sidebar-accent/15 text-sidebar-accent"><Layers className="h-6 w-6" /></div>
                  <div>
                    <p className="font-display font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">/{t.slug} · {t.region}</p>
                  </div>
                </div>
                <Dropdown trigger={<Button variant="ghost" size="icon-sm"><MoreHorizontal /></Button>}>
                  <DropdownItem><Pencil /> Edit</DropdownItem>
                  <DropdownItem><Settings /> Configure</DropdownItem>
                  <DropdownSeparator />
                  <DropdownItem destructive><Power /> Suspend</DropdownItem>
                </Dropdown>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 border-y border-border py-3 text-center">
                <div><p className="font-display text-lg font-bold">{t.organizations}</p><p className="text-[11px] text-muted-foreground">Orgs</p></div>
                <div><p className="font-display text-lg font-bold">{t.users}</p><p className="text-[11px] text-muted-foreground">Users</p></div>
                <div><Badge variant="info">{t.plan}</Badge><p className="mt-1 text-[11px] text-muted-foreground">Plan</p></div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <GenericStatusBadge status={t.status} />
                <Button variant="outline" size="sm"><Settings /> Manage</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
