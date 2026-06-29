"use client";

import { useState } from "react";
import {
  ShieldCheck, Users, UserPlus, Lock, MoreHorizontal, Pencil, Ban, Key, Plus,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Toolbar } from "@/components/shared/toolbar";
import { GenericStatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dropdown, DropdownItem, DropdownSeparator } from "@/components/ui/dropdown";
import { appUsers } from "@/lib/mock-data";
import { relativeTime } from "@/lib/utils";

const roles = [
  { name: "Super Admin", users: 2, perms: "Full platform access", scope: "All tenants" },
  { name: "PMT Coordinator", users: 8, perms: "Manage province operations", scope: "Tenant" },
  { name: "Cooperative Manager", users: 24, perms: "Manage own cooperative", scope: "Organization" },
  { name: "Field Staff", users: 32, perms: "Capture & verify field data", scope: "Assigned area" },
  { name: "Analyst", users: 6, perms: "Read analytics & reports", scope: "Tenant" },
  { name: "Validator", users: 11, perms: "Approve registrations", scope: "Assigned queue" },
];

const policies = [
  { name: "tenant-isolation", effect: "allow", resource: "*", condition: "user.tenantId == resource.tenantId", priority: 1 },
  { name: "coop-scope-read", effect: "allow", resource: "cooperative:*", condition: "user.orgId == resource.coopId", priority: 5 },
  { name: "field-area-write", effect: "allow", resource: "farm:*", condition: "resource.municipality in user.assignedAreas", priority: 8 },
  { name: "deny-cross-tenant", effect: "deny", resource: "*", condition: "user.tenantId != resource.tenantId", priority: 0 },
  { name: "analyst-readonly", effect: "deny", resource: "*:write", condition: "user.role == 'Analyst'", priority: 3 },
];

export default function UsersPage() {
  const [q, setQ] = useState("");
  const filtered = appUsers.filter((u) => (u.name + u.email + u.role).toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Users, Roles & Access"
        description="Manage platform users, role assignments, and ABAC policies."
        breadcrumb={[{ label: "Administration" }, { label: "Users & Roles" }]}
        actions={<Button><UserPlus /> Invite user</Button>}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Users" value={86} icon={Users} accent="primary" />
        <StatCard label="Active" value={71} icon={ShieldCheck} accent="success" />
        <StatCard label="Roles" value={roles.length} icon={Key} accent="info" />
        <StatCard label="ABAC Policies" value={policies.length} icon={Lock} accent="warning" />
      </div>

      <Tabs defaultValue="users" className="mt-4">
        <TabsList>
          <TabsTrigger value="users"><Users className="h-4 w-4" /> Users</TabsTrigger>
          <TabsTrigger value="roles"><Key className="h-4 w-4" /> Roles</TabsTrigger>
          <TabsTrigger value="abac"><Lock className="h-4 w-4" /> ABAC Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-4">
          <Card className="p-4">
            <Toolbar searchPlaceholder="Search users…" onSearch={setQ} showExport={false} />
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Last active</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar name={u.name} src={u.avatar} size="md" />
                          <div><p className="font-medium">{u.name}</p><p className="text-xs text-muted-foreground">{u.email}</p></div>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="default">{u.role}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{u.organization}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{u.lastActive === "—" ? "—" : relativeTime(u.lastActive)}</TableCell>
                      <TableCell><GenericStatusBadge status={u.status} /></TableCell>
                      <TableCell>
                        <Dropdown trigger={<Button variant="ghost" size="icon-sm"><MoreHorizontal /></Button>}>
                          <DropdownItem><Pencil /> Edit</DropdownItem>
                          <DropdownItem><Key /> Change role</DropdownItem>
                          <DropdownSeparator />
                          <DropdownItem destructive><Ban /> Suspend</DropdownItem>
                        </Dropdown>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="mt-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((r) => (
              <Card key={r.name}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{r.name}</CardTitle>
                    <Badge variant="muted">{r.users} users</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{r.perms}</p>
                  <div className="flex items-center gap-2 text-xs"><Lock className="h-3.5 w-3.5 text-muted-foreground" /> Scope: <Badge variant="secondary">{r.scope}</Badge></div>
                  <Button variant="outline" size="sm" className="mt-2 w-full"><Pencil /> Edit role</Button>
                </CardContent>
              </Card>
            ))}
            <Card className="flex items-center justify-center border-dashed">
              <Button variant="ghost"><Plus /> Create role</Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="abac" className="mt-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <div><CardTitle>Attribute-Based Access Policies</CardTitle><p className="mt-1 text-sm text-muted-foreground">Evaluated by priority — lower numbers run first.</p></div>
              <Button><Plus /> New policy</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Priority</TableHead>
                    <TableHead>Policy</TableHead>
                    <TableHead>Effect</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Condition</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {policies.sort((a, b) => a.priority - b.priority).map((p) => (
                    <TableRow key={p.name}>
                      <TableCell><Badge variant="muted">{p.priority}</Badge></TableCell>
                      <TableCell className="font-mono text-sm font-medium">{p.name}</TableCell>
                      <TableCell><Badge variant={p.effect === "allow" ? "success" : "destructive"}>{p.effect}</Badge></TableCell>
                      <TableCell><code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{p.resource}</code></TableCell>
                      <TableCell><code className="font-mono text-xs text-muted-foreground">{p.condition}</code></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
