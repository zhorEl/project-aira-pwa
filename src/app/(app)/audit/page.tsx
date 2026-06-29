"use client";

import { useState } from "react";
import { FileText, ShieldCheck, ShieldX, AlertCircle, Download, Filter } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Toolbar } from "@/components/shared/toolbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/misc";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auditLog } from "@/lib/mock-data";
import { relativeTime } from "@/lib/utils";

const resultBadge: Record<string, "success" | "destructive" | "warning"> = {
  success: "success", denied: "destructive", error: "warning",
};

export default function AuditPage() {
  const [q, setQ] = useState("");
  const sorted = [...auditLog].sort((a, b) => +new Date(b.time) - +new Date(a.time));
  const filtered = sorted.filter((e) =>
    (e.actor + e.action + e.resource).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Audit Log"
        description="Immutable record of access and changes across the platform."
        breadcrumb={[{ label: "Administration" }, { label: "Audit Log" }]}
        actions={<Button variant="outline"><Download /> Export log</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Events (24h)" value={342} icon={FileText} accent="primary" />
        <StatCard label="Successful" value={318} icon={ShieldCheck} accent="success" />
        <StatCard label="Denied" value={18} icon={ShieldX} accent="destructive" />
        <StatCard label="Errors" value={6} icon={AlertCircle} accent="warning" />
      </div>

      <Card className="mt-4 p-4">
        <Toolbar
          searchPlaceholder="Search actor, action, resource…"
          onSearch={setQ}
          filters={<Select className="w-36"><option>All results</option><option>Success</option><option>Denied</option><option>Error</option></Select>}
        />
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="text-sm text-muted-foreground">{relativeTime(e.time)}</TableCell>
                  <TableCell className="font-medium">{e.actor}</TableCell>
                  <TableCell><code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{e.action}</code></TableCell>
                  <TableCell><code className="font-mono text-xs text-muted-foreground">{e.resource}</code></TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{e.ip}</TableCell>
                  <TableCell><Badge variant={resultBadge[e.result]}>{e.result}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
