"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Phone, Mail, MapPin, Calendar, Award, GraduationCap, FileText,
  Sprout, Coffee, Pencil, ShieldCheck, Download, ChevronRight,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/misc";
import { farmers, farms } from "@/lib/mock-data";
import { formatNumber, formatDate } from "@/lib/utils";

export default function FarmerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const farmer = farmers.find((f) => f.id === id);
  if (!farmer) notFound();

  const ownedFarms = farms.filter((f) => f.farmerId === farmer.id).slice(0, farmer.farmCount || 1);
  const timeline = [
    { date: "2026-06-12", title: "Production record submitted", desc: "Q2 harvest logged — 1,240 kg green coffee" },
    { date: "2026-04-03", title: "Farm boundary verified", desc: "Polygon validated by field staff" },
    { date: "2026-02-18", title: "Completed training", desc: "Good Agricultural Practices (GAP) certification" },
    { date: "2025-11-22", title: "Certification renewed", desc: `${farmer.certifications[0] ?? "Organic"} renewed for 2026` },
    { date: farmer.joinedAt, title: "Registered to AIRA Nexus", desc: `Onboarded via ${farmer.cooperative}` },
  ];

  return (
    <div>
      <PageHeader
        title={farmer.name}
        breadcrumb={[
          { label: "Farmers" },
          { label: "Registry" },
          { label: farmer.name },
        ]}
        actions={
          <>
            <Button variant="outline"><Download /> Export</Button>
            <Button><Pencil /> Edit profile</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Left: identity card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar name={farmer.name} src={farmer.avatar} size="xl" />
              <h2 className="mt-3 font-display text-lg font-bold">{farmer.name}</h2>
              <p className="text-sm text-muted-foreground">
                {farmer.gender} · {farmer.age} yrs
              </p>
              <div className="mt-3"><StatusBadge status={farmer.status} /></div>
            </div>

            <Separator className="my-5" />

            <div className="space-y-3 text-sm">
              <InfoRow icon={Phone} label="Phone" value={farmer.phone} />
              <InfoRow icon={Mail} label="Email" value={farmer.email ?? "—"} />
              <InfoRow icon={MapPin} label="Location" value={`${farmer.barangay}, ${farmer.municipality}`} />
              <InfoRow icon={ShieldCheck} label="Cooperative" value={farmer.cooperative} />
              <InfoRow icon={Calendar} label="Joined" value={formatDate(farmer.joinedAt)} />
            </div>

            <Separator className="my-5" />

            <div className="grid grid-cols-3 gap-2 text-center">
              <Metric value={farmer.farmCount} label="Farms" />
              <Metric value={farmer.totalArea} label="Hectares" />
              <Metric value={farmer.trainings} label="Trainings" />
            </div>
          </CardContent>
        </Card>

        {/* Right: tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="farms">Farms</TabsTrigger>
              <TabsTrigger value="certs">Certifications</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Annual Production</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-display text-2xl font-bold">{formatNumber(farmer.annualProduction)} <span className="text-base font-normal text-muted-foreground">kg</span></p>
                    <p className="mt-1 text-xs text-success">▲ 8.2% vs last year</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Avg. Yield</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-display text-2xl font-bold">{Math.round(farmer.annualProduction / farmer.totalArea)} <span className="text-base font-normal text-muted-foreground">kg/ha</span></p>
                    <p className="mt-1 text-xs text-muted-foreground">Above regional median</p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader><CardTitle className="text-sm flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Trainings completed</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {["Good Agricultural Practices", "Coffee Post-Harvest Handling", "Organic Certification Prep"].map((t) => (
                    <div key={t} className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-sm">
                      <span>{t}</span><Badge variant="success">Completed</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-sm flex items-center gap-2"><FileText className="h-4 w-4" /> Documents</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {["Land title.pdf", "Coop membership.pdf", "Organic cert 2026.pdf"].map((d) => (
                    <div key={d} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm">
                      <span className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" /> {d}</span>
                      <Button variant="ghost" size="icon-sm"><Download /></Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="farms" className="mt-4 space-y-3">
              {ownedFarms.map((f) => (
                <Link key={f.id} href={`/farms/${f.id}`}>
                  <Card className="transition-colors hover:border-primary/40">
                    <CardContent className="flex items-center gap-4 py-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-leaf-100 text-leaf-700 dark:bg-leaf-900/40 dark:text-leaf-300">
                        <Sprout className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">{f.name}</p>
                        <p className="text-xs text-muted-foreground">{f.variety} · {f.area} ha · {f.elevation} masl</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatNumber(f.annualProduction)} kg</p>
                        <StatusBadge status={f.status} />
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </TabsContent>

            <TabsContent value="certs" className="mt-4">
              <Card>
                <CardContent className="grid grid-cols-1 gap-3 pt-6 sm:grid-cols-2">
                  {(farmer.certifications.length ? farmer.certifications : ["Organic", "Fair Trade"]).map((c) => (
                    <div key={c} className="flex items-center gap-3 rounded-lg border border-border p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/15 text-warning">
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{c}</p>
                        <p className="text-xs text-muted-foreground">Valid until Dec 2026</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="relative space-y-6 pl-6">
                    <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
                    {timeline.map((t, i) => (
                      <div key={i} className="relative">
                        <span className="absolute -left-6 top-1 flex h-3.5 w-3.5 items-center justify-center">
                          <span className="h-3.5 w-3.5 rounded-full border-2 border-primary bg-background" />
                        </span>
                        <p className="text-xs text-muted-foreground">{formatDate(t.date)}</p>
                        <p className="font-medium">{t.title}</p>
                        <p className="text-sm text-muted-foreground">{t.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof Phone; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
      <span className="text-muted-foreground">{label}</span>
      <span className="ml-auto truncate font-medium">{value}</span>
    </div>
  );
}

function Metric({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-lg bg-muted/40 py-2">
      <p className="font-display text-lg font-bold">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}
