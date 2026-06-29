"use client";

import { useState } from "react";
import {
  FileText, FileType, FileImage, FileSpreadsheet, Folder, Upload,
  Search, MoreHorizontal, Download, Trash2, Share2, HardDrive,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dropdown, DropdownItem, DropdownSeparator } from "@/components/ui/dropdown";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate, cn } from "@/lib/utils";

const folders = [
  { name: "Land Titles", count: 1240, color: "text-coffee-600" },
  { name: "Certifications", count: 482, color: "text-warning" },
  { name: "Coop Documents", count: 318, color: "text-primary" },
  { name: "Reports", count: 96, color: "text-info" },
];

const docs = [
  { name: "Land title - Dela Cruz.pdf", type: "PDF", icon: FileType, owner: "Juan Dela Cruz", tag: "Land Title", date: "2026-06-18", size: "1.2 MB" },
  { name: "Organic cert 2026 - BHCG.pdf", type: "PDF", icon: FileType, owner: "BHCG", tag: "Certification", date: "2026-06-12", size: "640 KB" },
  { name: "Membership roster.xlsx", type: "XLSX", icon: FileSpreadsheet, owner: "MKCA", tag: "Coop", date: "2026-06-08", size: "320 KB" },
  { name: "Farm boundary survey.jpg", type: "Image", icon: FileImage, owner: "Maria Santos", tag: "Survey", date: "2026-06-04", size: "3.8 MB" },
  { name: "Q2 production summary.pdf", type: "PDF", icon: FileType, owner: "Provincial PMT", tag: "Report", date: "2026-05-30", size: "2.1 MB" },
  { name: "Training attendance.csv", type: "CSV", icon: FileText, owner: "Valencia LGU", tag: "Training", date: "2026-05-22", size: "88 KB" },
];

export default function DocumentsPage() {
  const [q, setQ] = useState("");
  const filtered = docs.filter((d) => (d.name + d.owner + d.tag).toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Documents"
        description="Centralized document store for titles, certifications, and reports."
        breadcrumb={[{ label: "Intelligence" }, { label: "Documents" }]}
        actions={<Button><Upload /> Upload</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Documents" value={2136} icon={FileText} accent="primary" />
        <StatCard label="Storage Used" value={48} suffix="GB" icon={HardDrive} accent="info" />
        <StatCard label="Pending Review" value={23} icon={FileType} accent="warning" />
        <StatCard label="Shared" value={184} icon={Share2} accent="success" />
      </div>

      {/* Folders */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {folders.map((f) => (
          <Card key={f.name} className="cursor-pointer transition-shadow hover:shadow-elevated">
            <CardContent className="flex items-center gap-3 py-4">
              <Folder className={cn("h-9 w-9", f.color)} />
              <div><p className="text-sm font-semibold">{f.name}</p><p className="text-xs text-muted-foreground">{f.count} files</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-4 p-4">
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search documents…" className="pl-9" onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Size</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((d) => {
                const Icon = d.icon;
                return (
                  <TableRow key={d.name} className="cursor-pointer">
                    <TableCell><span className="flex items-center gap-2.5 font-medium"><Icon className="h-5 w-5 text-muted-foreground" /> {d.name}</span></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{d.owner}</TableCell>
                    <TableCell><Badge variant="secondary">{d.tag}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatDate(d.date)}</TableCell>
                    <TableCell className="text-right text-sm tabular-nums">{d.size}</TableCell>
                    <TableCell>
                      <Dropdown trigger={<Button variant="ghost" size="icon-sm"><MoreHorizontal /></Button>}>
                        <DropdownItem><Download /> Download</DropdownItem>
                        <DropdownItem><Share2 /> Share</DropdownItem>
                        <DropdownSeparator />
                        <DropdownItem destructive><Trash2 /> Delete</DropdownItem>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
