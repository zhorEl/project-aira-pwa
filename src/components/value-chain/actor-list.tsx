"use client";

import { useState } from "react";
import { Star, Phone, Building2, Link2, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/shared/stat-card";
import { Toolbar } from "@/components/shared/toolbar";
import { GenericStatusBadge } from "@/components/shared/status-badge";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { valueChainActors } from "@/lib/mock-data";
import type { ValueChainType } from "@/lib/types";

const LABELS: Record<ValueChainType, string> = {
  buyers: "Buyers", traders: "Traders", processors: "Processors",
  roasters: "Roasters", nurseries: "Nurseries", "service-providers": "Service Providers",
};

export function ActorList({ type }: { type: ValueChainType }) {
  const [q, setQ] = useState("");
  const actors = valueChainActors.filter((a) => a.type === type);
  const filtered = actors.filter((a) =>
    (a.name + a.municipality).toLowerCase().includes(q.toLowerCase())
  );
  const active = actors.filter((a) => a.status === "Active").length;
  const totalLinks = actors.reduce((s, a) => s + a.linkedCoops, 0);
  const avgRating = (actors.reduce((s, a) => s + a.rating, 0) / (actors.length || 1)).toFixed(1);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label={`Total ${LABELS[type]}`} value={actors.length} icon={Building2} />
        <StatCard label="Active" value={active} icon={TrendingUp} accent="success" />
        <StatCard label="Coop Links" value={totalLinks} icon={Link2} accent="info" />
        <StatCard label="Avg. Rating" value={avgRating} icon={Star} accent="warning" />
      </div>

      <Card className="mt-4 p-4">
        <Toolbar searchPlaceholder={`Search ${LABELS[type].toLowerCase()}…`} onSearch={setQ} />
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Municipality</TableHead>
                <TableHead className="text-right">Volume</TableHead>
                <TableHead className="text-right">Coop Links</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((a) => (
                <TableRow key={a.id} className="cursor-pointer">
                  <TableCell className="font-medium">{a.name}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Phone className="h-3.5 w-3.5" /> {a.contact}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{a.municipality}</TableCell>
                  <TableCell className="text-right tabular-nums">{a.volume}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary">{a.linkedCoops}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-sm font-medium">
                      <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {a.rating}
                    </span>
                  </TableCell>
                  <TableCell><GenericStatusBadge status={a.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
