"use client";

import { useState } from "react";
import {
  Coffee, Layers, Bell, ShieldCheck, Database, Plug, Save,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Label } from "@/components/ui/input";
import { Select, Switch } from "@/components/ui/misc";
import { cn } from "@/lib/utils";

const categories = [
  { key: "commodity", label: "Commodity", icon: Coffee },
  { key: "layers", label: "Map Layers", icon: Layers },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "validation", label: "Validation Rules", icon: ShieldCheck },
  { key: "backup", label: "Backup", icon: Database },
  { key: "integrations", label: "Integrations", icon: Plug },
];

export default function SettingsPage() {
  const [active, setActive] = useState("commodity");
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    heatmap: true, farms: true, coops: true, boundaries: false,
    emailAlerts: true, smsAlerts: false, weeklyDigest: true,
    requireGps: true, requirePolygon: false, requireDocs: true, autoVerify: false,
    autoBackup: true,
  });
  const set = (k: string) => (v: boolean) => setToggles((t) => ({ ...t, [k]: v }));

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Platform configuration — commodity, map, notifications, validation, backup, integrations."
        breadcrumb={[{ label: "Administration" }, { label: "Settings" }]}
        actions={<Button><Save /> Save changes</Button>}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {/* Category nav */}
        <Card className="h-fit lg:col-span-1">
          <CardContent className="p-2">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.key}
                  onClick={() => setActive(c.key)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                    active === c.key ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" /> {c.label}
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Panels */}
        <div className="lg:col-span-3">
          {active === "commodity" && (
            <Card>
              <CardHeader><CardTitle>Commodity Settings</CardTitle><CardDescription>Default coffee commodity configuration.</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <Field label="Primary commodity"><Select><option>Coffee</option><option>Cacao</option></Select></Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Default unit"><Select><option>Kilograms (kg)</option><option>Metric tonnes</option></Select></Field>
                  <Field label="Crop year start"><Select><option>October</option><option>January</option></Select></Field>
                </div>
                <Field label="Tracked varieties">
                  <div className="flex flex-wrap gap-2">{["Arabica", "Robusta", "Excelsa", "Liberica"].map((v) => <Badge key={v} variant="default">{v}</Badge>)}</div>
                </Field>
              </CardContent>
            </Card>
          )}
          {active === "layers" && (
            <Card>
              <CardHeader><CardTitle>Map Layer Defaults</CardTitle><CardDescription>Layers visible by default on the GIS map.</CardDescription></CardHeader>
              <CardContent className="space-y-1">
                <ToggleRow label="Coffee heatmap" desc="Production density overlay" checked={toggles.heatmap} onChange={set("heatmap")} />
                <ToggleRow label="Farm layer" desc="Individual farm markers" checked={toggles.farms} onChange={set("farms")} />
                <ToggleRow label="Cooperative layer" desc="Coop coverage markers" checked={toggles.coops} onChange={set("coops")} />
                <ToggleRow label="Polygon boundaries" desc="Farm boundary polygons" checked={toggles.boundaries} onChange={set("boundaries")} />
                <Field label="Default base map" className="pt-3"><Select><option>Outdoors</option><option>Satellite</option><option>Streets</option></Select></Field>
              </CardContent>
            </Card>
          )}
          {active === "notifications" && (
            <Card>
              <CardHeader><CardTitle>Notifications</CardTitle><CardDescription>How and when alerts are delivered.</CardDescription></CardHeader>
              <CardContent className="space-y-1">
                <ToggleRow label="Email alerts" desc="Critical alerts via email" checked={toggles.emailAlerts} onChange={set("emailAlerts")} />
                <ToggleRow label="SMS alerts" desc="Field staff SMS notifications" checked={toggles.smsAlerts} onChange={set("smsAlerts")} />
                <ToggleRow label="Weekly digest" desc="Monday summary email" checked={toggles.weeklyDigest} onChange={set("weeklyDigest")} />
              </CardContent>
            </Card>
          )}
          {active === "validation" && (
            <Card>
              <CardHeader><CardTitle>Validation Rules</CardTitle><CardDescription>Requirements before a record can be verified.</CardDescription></CardHeader>
              <CardContent className="space-y-1">
                <ToggleRow label="Require GPS coordinates" desc="Block verification without GPS" checked={toggles.requireGps} onChange={set("requireGps")} />
                <ToggleRow label="Require polygon boundary" desc="Block without farm boundary" checked={toggles.requirePolygon} onChange={set("requirePolygon")} />
                <ToggleRow label="Require documents" desc="Land title or coop proof" checked={toggles.requireDocs} onChange={set("requireDocs")} />
                <ToggleRow label="Auto-verify trusted coops" desc="Skip manual review for certified coops" checked={toggles.autoVerify} onChange={set("autoVerify")} />
              </CardContent>
            </Card>
          )}
          {active === "backup" && (
            <Card>
              <CardHeader><CardTitle>Backup & Data</CardTitle><CardDescription>Automated backups and data retention.</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <ToggleRow label="Automatic daily backup" desc="Nightly snapshot at 02:00" checked={toggles.autoBackup} onChange={set("autoBackup")} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Retention period"><Select><option>90 days</option><option>180 days</option><option>1 year</option></Select></Field>
                  <Field label="Storage region"><Select><option>Asia Pacific (Singapore)</option><option>Asia Pacific (Manila)</option></Select></Field>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-muted/40 p-3 text-sm">
                  <Database className="h-4 w-4 text-muted-foreground" /> Last backup: <span className="font-medium">Today, 02:00</span>
                  <Badge variant="success" className="ml-auto">Healthy</Badge>
                </div>
                <Button variant="outline">Run manual backup</Button>
              </CardContent>
            </Card>
          )}
          {active === "integrations" && (
            <Card>
              <CardHeader><CardTitle>Integrations</CardTitle><CardDescription>Connected services and API access.</CardDescription></CardHeader>
              <CardContent className="space-y-3">
                {[
                  ["Supabase", "Database & auth backend", "Connected", "success"],
                  ["Mapbox GL", "GIS map rendering", "Configure token", "warning"],
                  ["DA AgriData API", "Production data sync", "Connected", "success"],
                  ["SMS Gateway", "Field alerts", "Not connected", "muted"],
                ].map(([name, desc, status, variant]) => (
                  <div key={name} className="flex items-center justify-between rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground"><Plug className="h-5 w-5" /></div>
                      <div><p className="font-medium">{name}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
                    </div>
                    <Badge variant={variant as never}>{status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return <div className={cn("space-y-1.5", className)}><Label>{label}</Label>{children}</div>;
}

function ToggleRow({ label, desc, checked, onChange }: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between rounded-lg px-1 py-3">
      <div><p className="text-sm font-medium">{label}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
