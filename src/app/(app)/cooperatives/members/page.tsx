"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Filter, Download } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Toolbar } from "@/components/shared/toolbar";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select } from "@/components/ui/misc";
import { farmers, cooperatives } from "@/lib/mock-data";

export default function CooperativeMembersPage() {
  const [q, setQ] = useState("");
  const filtered = farmers.filter((f) =>
    (f.name + f.cooperative + f.municipality).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Cooperative Members"
        description="Consolidated membership directory across all cooperatives."
        breadcrumb={[{ label: "Cooperatives" }, { label: "Members" }]}
        actions={<Button variant="outline"><Download /> Export</Button>}
      />

      <Card className="p-4">
        <Toolbar
          searchPlaceholder="Search members…"
          onSearch={setQ}
          filters={
            <Select className="w-40">
              <option>All cooperatives</option>
              {cooperatives.map((c) => <option key={c.id}>{c.acronym}</option>)}
            </Select>
          }
        />
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Cooperative</TableHead>
                <TableHead>Municipality</TableHead>
                <TableHead className="text-right">Farms</TableHead>
                <TableHead className="text-right">Trainings</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.slice(0, 30).map((f) => (
                <TableRow key={f.id}>
                  <TableCell>
                    <Link href={`/farmers/${f.id}`} className="flex items-center gap-2.5">
                      <Avatar name={f.name} src={f.avatar} size="sm" />
                      <span className="font-medium">{f.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell><Badge variant="secondary">{f.cooperative}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{f.municipality}</TableCell>
                  <TableCell className="text-right tabular-nums">{f.farmCount}</TableCell>
                  <TableCell className="text-right tabular-nums">{f.trainings}</TableCell>
                  <TableCell><StatusBadge status={f.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
