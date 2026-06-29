"use client";

import { Building, Users, Plus, MoreHorizontal, Pencil, Settings, Globe } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { GenericStatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";

const orgs = [
  { id: 1, name: "Provincial PMT", type: "Government", tenant: "Bukidnon", members: 24, status: "Active", desc: "Lead project management team" },
  { id: 2, name: "Valencia LGU", type: "Government", tenant: "Bukidnon", members: 12, status: "Active", desc: "Local government unit" },
  { id: 3, name: "Bukidnon Highland Coffee Growers", type: "Cooperative", tenant: "Bukidnon", members: 340, status: "Active", desc: "Largest member cooperative" },
  { id: 4, name: "Mt. Kitanglad Coffee Association", type: "Cooperative", tenant: "Bukidnon", members: 186, status: "Active", desc: "Highland Arabica producers" },
  { id: 5, name: "DA Region X", type: "Agency", tenant: "Bukidnon", members: 8, status: "Active", desc: "Department of Agriculture" },
  { id: 6, name: "Maramag Organic Coffee Coop", type: "Cooperative", tenant: "Bukidnon", members: 92, status: "Probationary", desc: "Organic certification pending" },
];

const typeColor: Record<string, "default" | "info" | "warning"> = {
  Government: "info", Cooperative: "default", Agency: "warning",
};

export default function OrganizationsPage() {
  return (
    <div>
      <PageHeader
        title="Organizations"
        description="Organizations operating within tenants — PMTs, LGUs, cooperatives, and agencies."
        breadcrumb={[{ label: "Administration" }, { label: "Organizations" }]}
        actions={<Button><Plus /> Add organization</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Organizations" value={14} icon={Building} accent="primary" />
        <StatCard label="Cooperatives" value={10} icon={Building} accent="success" />
        <StatCard label="Government Units" value={3} icon={Globe} accent="info" />
        <StatCard label="Total Members" value={862} icon={Users} accent="warning" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {orgs.map((o) => (
          <Card key={o.id} className="transition-shadow hover:shadow-elevated">
            <CardContent className="pt-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Building className="h-5 w-5" /></div>
                  <div className="min-w-0"><p className="line-clamp-1 font-medium leading-tight">{o.name}</p><Badge variant={typeColor[o.type]} className="mt-1">{o.type}</Badge></div>
                </div>
                <Dropdown trigger={<Button variant="ghost" size="icon-sm"><MoreHorizontal /></Button>}>
                  <DropdownItem><Pencil /> Edit</DropdownItem>
                  <DropdownItem><Settings /> Configure</DropdownItem>
                </Dropdown>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{o.desc}</p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground"><Users className="h-4 w-4" /> {o.members} members</span>
                <GenericStatusBadge status={o.status} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
