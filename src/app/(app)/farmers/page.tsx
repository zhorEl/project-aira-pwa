"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Users, UserCheck, Clock, MapPin, MoreHorizontal, Eye, Pencil } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Toolbar } from "@/components/shared/toolbar";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";
import { farmers } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

export default function FarmersPage() {
  const [q, setQ] = useState("");
  const filtered = farmers.filter((f) =>
    (f.name + f.municipality + f.cooperative).toLowerCase().includes(q.toLowerCase())
  );
  const verified = farmers.filter((f) => f.status === "verified").length;
  const pending = farmers.filter((f) => f.status === "pending").length;

  return (
    <div>
      <PageHeader
        title="Farmer Registry"
        description="Manage farmer profiles, ownership, certifications, and verification status."
        breadcrumb={[{ label: "Registry" }, { label: "Farmers" }]}
        actions={
          <Link href="/farmers/create">
            <Button>
              <Plus /> Register farmer
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Farmers" value={farmers.length * 47} delta={4.2} icon={Users} />
        <StatCard label="Verified" value={verified * 47} icon={UserCheck} accent="success" />
        <StatCard label="Pending Review" value={pending + 9} icon={Clock} accent="warning" />
        <StatCard label="Municipalities" value={10} icon={MapPin} accent="info" />
      </div>

      <Card className="mt-4 p-4">
        <Toolbar searchPlaceholder="Search farmers, coop, municipality…" onSearch={setQ} />

        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Farmer</TableHead>
                <TableHead>Cooperative</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Farms</TableHead>
                <TableHead className="text-right">Area (ha)</TableHead>
                <TableHead className="text-right">Production</TableHead>
                <TableHead>Certifications</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.slice(0, 30).map((f) => (
                <TableRow key={f.id} className="cursor-pointer">
                  <TableCell>
                    <Link href={`/farmers/${f.id}`} className="flex items-center gap-3">
                      <Avatar name={f.name} src={f.avatar} size="md" />
                      <div className="min-w-0">
                        <p className="truncate font-medium">{f.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{f.phone}</p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{f.cooperative}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {f.barangay}, {f.municipality}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{f.farmCount}</TableCell>
                  <TableCell className="text-right tabular-nums">{f.totalArea}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatNumber(f.annualProduction)} kg
                  </TableCell>
                  <TableCell>
                    {f.certifications.length ? (
                      <Badge variant="info">{f.certifications[0]}</Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={f.status} />
                  </TableCell>
                  <TableCell>
                    <Dropdown
                      trigger={
                        <Button variant="ghost" size="icon-sm">
                          <MoreHorizontal />
                        </Button>
                      }
                    >
                      <Link href={`/farmers/${f.id}`}>
                        <DropdownItem><Eye /> View profile</DropdownItem>
                      </Link>
                      <DropdownItem><Pencil /> Edit</DropdownItem>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing {Math.min(30, filtered.length)} of {filtered.length} farmers</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
