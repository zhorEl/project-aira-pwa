import Link from "next/link";
import {
  ArrowRight,
  Map as MapIcon,
  Smartphone,
  MapPin,
  Sprout,
  Building2,
  LineChart,
  ShieldCheck,
  Layers,
  Database,
  ClipboardCheck,
  BarChart3,
  Target,
  Server,
  Cpu,
  HardDrive,
  Check,
} from "lucide-react";
import { Logo } from "@/components/shell/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";

/* ---------------------------------- data ---------------------------------- */

const projectInfo: { label: string; value: string }[] = [
  { label: "Project Name", value: "AIRA Nexus" },
  {
    label: "Project Title",
    value:
      "AIRA Nexus: A Map-First Agricultural Intelligence Platform for the Bukidnon Coffee Industry",
  },
  { label: "Pilot Commodity", value: "Coffee" },
  { label: "Pilot Coverage", value: "Province of Bukidnon" },
];

const objectives = [
  "Develop a centralized coffee industry database",
  "Digitize farm and farmer information",
  "Establish a geospatial coffee ecosystem map",
  "Improve project monitoring and reporting",
  "Support evidence-based planning",
  "Enable multi-level collaboration among stakeholders",
  "Build a scalable platform for future agricultural commodities",
];

const challenges = [
  "Multiple disconnected databases",
  "Manual reporting",
  "Inconsistent farmer profiles",
  "Limited farm geotagging",
  "Difficult monitoring of interventions",
  "Lack of spatial intelligence",
  "Limited decision support for planning",
];

const frameworkLayers = [
  "Field Collection (Farmer App + Geo Tagger)",
  "Farm Management System",
  "Cooperative Monitoring System",
  "Provincial Monitoring System",
  "Decision Support System",
];

const apps: { icon: typeof Smartphone; name: string; points: string[] }[] = [
  {
    icon: Smartphone,
    name: "Farmer Mobile App",
    points: [
      "Farm activity reporting",
      "Offline data collection",
      "Farm monitoring",
      "Photo documentation",
      "Synchronization",
    ],
  },
  {
    icon: MapPin,
    name: "Geo Tagging Mobile App",
    points: [
      "GPS capture",
      "Farm boundary mapping",
      "Image documentation",
      "Offline mapping",
    ],
  },
  {
    icon: Sprout,
    name: "Farm Management System",
    points: [
      "Farm registry",
      "Activity management",
      "Reporting",
      "Farm analytics",
      "Interactive maps",
    ],
  },
  {
    icon: Building2,
    name: "Cooperative Monitoring System",
    points: [
      "Cooperative monitoring",
      "Member management",
      "Production analytics",
      "Validation",
      "Reporting",
    ],
  },
  {
    icon: LineChart,
    name: "Provincial Monitoring System",
    points: [
      "Provincial dashboard",
      "Decision support",
      "Interactive GIS",
      "Executive reporting",
    ],
  },
];

const dataFlow = [
  "Farmer",
  "Farmer Mobile App",
  "Offline Database",
  "Synchronization Engine",
  "Farm Database",
  "Farm Management",
  "Cooperative Database",
  "Project Management Team (PMT)",
  "Provincial Database",
  "Decision Support Dashboard",
];

const userHierarchy: { role: string; sub?: string[] }[] = [
  { role: "Super Administrator" },
  { role: "Project Management Team (PMT)", sub: ["PMT Administrator", "PMT User"] },
  { role: "Cooperative", sub: ["Administrator", "User"] },
  { role: "Farmer" },
];

const abacFactors = [
  "User Role",
  "Organization",
  "Cooperative",
  "Municipality",
  "Barangay",
  "Assigned Project",
  "Verification Status",
  "Data Ownership",
];

const dashboardComponents = [
  "Interactive Coffee Map",
  "KPI Cards",
  "Farmer Distribution",
  "Cooperative Coverage",
  "Production Heatmaps",
  "Coffee Variety Layers",
  "Intervention Layers",
  "Validation Status",
  "Reports",
];

const featureGroups: { icon: typeof Database; title: string; items: string[] }[] = [
  {
    icon: Database,
    title: "Registry",
    items: ["Farmer Registry", "Farm Registry", "Cooperative Registry"],
  },
  {
    icon: MapPin,
    title: "Mapping",
    items: ["GPS Plotting", "Farm Boundaries", "Interactive Layers", "Clustering"],
  },
  {
    icon: ClipboardCheck,
    title: "Monitoring",
    items: ["Farm Activities", "Production Monitoring", "Validation Workflow"],
  },
  {
    icon: BarChart3,
    title: "Analytics",
    items: [
      "Production Reports",
      "Cooperative Performance",
      "Geographic Insights",
      "Intervention Analysis",
    ],
  },
  {
    icon: Target,
    title: "Decision Support",
    items: [
      "Executive Dashboard",
      "Planning Reports",
      "Investment Prioritization",
      "Resource Allocation",
    ],
  },
];

const roadmap: { phase: string; deliverables: string }[] = [
  { phase: "Phase 1", deliverables: "Farmer Registry, Farm Registry, Map Dashboard" },
  { phase: "Phase 2", deliverables: "Validation Workflow, Reporting, Analytics" },
  { phase: "Phase 3", deliverables: "Cooperative Monitoring" },
  { phase: "Phase 4", deliverables: "Provincial Monitoring & DSS" },
  { phase: "Phase 5", deliverables: "Expansion to Additional Commodities" },
];

const cloudBudget: {
  item: string;
  use: string;
  monthly: number | null;
  sixMonths: number;
}[] = [
  {
    item: "PostgreSQL / Database",
    use: "Supabase Pro (PostgreSQL, Auth, APIs, Realtime, PostGIS)",
    monthly: 1539,
    sixMonths: 9233,
  },
  {
    item: "App/API Server",
    use: "Amazon Lightsail (Backend API, Sync Services, PWA Hosting)",
    monthly: 1231,
    sixMonths: 7386,
  },
  {
    item: "Image & File Storage",
    use: "Cloudflare R2 (Farm Images, Geotagged Photos, Attachments)",
    monthly: 308,
    sixMonths: 1847,
  },
  {
    item: "AI Development Tools (4 Seats)",
    use: "Claude AI Pro (Development, Documentation, Debugging)",
    monthly: 4924,
    sixMonths: 29544,
  },
  {
    item: "Backup & Monitoring",
    use: "Snapshots, Logging, Monitoring Services",
    monthly: 616,
    sixMonths: 3693,
  },
];

const bareMetal: { item: string; cost: string }[] = [
  { item: "Dell PowerEdge R640 (Xeon Gold)", cost: "₱81,550" },
  { item: "Backhaul Fiber (Public IP)", cost: "₱42,880" },
  { item: "12U Rack Cabinet", cost: "₱12,500" },
  { item: "2× SFP+ Modules", cost: "₱4,400" },
  { item: "Prolink Server UPS 2KVA", cost: "₱29,660" },
  { item: "Server Configuration", cost: "₱15,000" },
  { item: "Internet", cost: "₱4,600 / month" },
];

const devCost: { category: string; cost: number }[] = [
  { category: "UI/UX Design", cost: 80000 },
  { category: "Web Platform Development", cost: 220000 },
  { category: "Mobile Applications", cost: 150000 },
  { category: "GIS & Mapping Integration", cost: 80000 },
  { category: "Data Migration & Validation", cost: 50000 },
  { category: "Testing & Deployment", cost: 40000 },
  { category: "Documentation & Training", cost: 30000 },
];

const outcomes = [
  "A unified digital coffee registry",
  "Verified farmer and farm database",
  "Interactive provincial coffee map",
  "Digital monitoring tools for the Project Management Team (PMT)",
  "Cooperative performance dashboards",
  "Evidence-based planning and reporting",
  "Scalable architecture for future commodity expansion",
];

const sustainability = [
  "Multi-commodity support",
  "AI-powered recommendations",
  "Climate analytics",
  "Carbon accounting",
  "Marketplace integration",
  "Farm certification tracking",
  "Traceability",
  "Mobile advisory services",
];

/* ------------------------------- primitives ------------------------------- */

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-12 md:py-16">
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight md:text-3xl">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-6 shadow-card ${className}`}
    >
      {children}
    </div>
  );
}

function FlowDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-col items-stretch gap-0">
      {steps.map((step, i) => (
        <div key={step} className="flex flex-col items-center">
          <div className="w-full max-w-md rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium shadow-soft">
            {step}
          </div>
          {i < steps.length - 1 && (
            <div className="my-1.5 h-5 w-px bg-gradient-to-b from-primary/60 to-primary/20" />
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function ProposalPage() {
  const cloudSubtotalMonthly = cloudBudget.reduce((s, r) => s + (r.monthly ?? 0), 0);
  const cloudSubtotalSix = cloudBudget.reduce((s, r) => s + r.sixMonths, 0);
  const domain = 4615;
  const cloudTotal = cloudSubtotalSix + domain;
  const bareMetalInitial = 190590;
  const cloudServerTotal = 56318;
  const onSiteServerTotal = 246908;
  const devTotal = devCost.reduce((s, r) => s + r.cost, 0);

  return (
    <main>
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="rounded-lg bg-sidebar px-2.5 py-1.5">
            <Logo />
          </div>
          <Link
            href="/login"
            className={cn(buttonVariants({ size: "sm", variant: "subtle" }))}
          >
            Open Platform <ArrowRight />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-sidebar text-sidebar-foreground">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.05]" />
        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-sidebar-accent/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 -left-40 h-96 w-96 rounded-full bg-coffee-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-sidebar-border bg-sidebar-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-sidebar-foreground/90">
            <MapIcon className="h-3.5 w-3.5" /> Bukidnon Coffee Industry Pilot
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">
            AIRA Nexus
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-sidebar-foreground/80 md:text-xl">
            A Map-First Agricultural Intelligence Platform for the Bukidnon Coffee
            Industry.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-sidebar-muted">
            Proposal for the Digital Coffee Industry Intelligence Platform
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#executive-summary"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Read the Proposal <ArrowRight />
            </Link>
            <Link
              href="#budget"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-sidebar-border bg-transparent text-sidebar-foreground hover:bg-sidebar-accent/15 hover:text-sidebar-foreground"
              )}
            >
              View Budget
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        {/* Project information */}
        <Section id="project-information" eyebrow="Overview" title="Project Information">
          <div className="grid gap-4 sm:grid-cols-2">
            {projectInfo.map((row) => (
              <Card key={row.label}>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {row.label}
                </dt>
                <dd className="mt-2 text-base font-medium leading-snug">{row.value}</dd>
              </Card>
            ))}
          </div>
        </Section>

        {/* Executive summary */}
        <Section id="executive-summary" eyebrow="Context" title="Executive Summary">
          <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              The coffee industry in Bukidnon continues to grow as one of the
              province&apos;s priority agricultural sectors. However, data related to
              farmers, cooperatives, farm locations, production, processing facilities,
              and value chain stakeholders remain fragmented across different
              organizations and formats.
            </p>
            <p>
              This lack of centralized and validated information limits the ability of
              stakeholders to effectively plan interventions, monitor production, allocate
              resources, and formulate evidence-based policies.
            </p>
            <p>
              AIRA Nexus addresses these challenges by providing a{" "}
              <span className="font-semibold text-foreground">
                map-first agricultural intelligence platform
              </span>{" "}
              that consolidates field-level information into a unified geospatial
              ecosystem. The platform combines offline field data collection, farm
              management, cooperative monitoring, and provincial decision support into one
              integrated digital ecosystem.
            </p>
            <p>
              The Bukidnon Coffee Industry will serve as the pilot implementation before
              expanding to other agricultural commodities.
            </p>
          </div>
        </Section>

        {/* Background */}
        <Section id="background" eyebrow="Problem" title="Background">
          <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              Bukidnon has become one of the country&apos;s emerging coffee-producing
              provinces. Despite numerous government initiatives, cooperative programs, and
              private-sector investments, agricultural information remains fragmented.
            </p>
            <p className="font-medium text-foreground">Common challenges include:</p>
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {challenges.map((c) => (
              <li
                key={c}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm"
              >
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-destructive/70" />
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            These challenges create inefficiencies in implementation and reduce the
            effectiveness of agricultural development programs.
          </p>
        </Section>

        {/* Proposed solution */}
        <Section id="proposed-solution" eyebrow="Solution" title="Proposed Solution">
          <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              AIRA Nexus is a{" "}
              <span className="font-semibold text-foreground">
                multi-tenant agricultural intelligence platform
              </span>{" "}
              designed to digitize, validate, visualize, and analyze the entire coffee
              ecosystem. Rather than functioning as a simple registry or GIS viewer, AIRA
              Nexus transforms field data into actionable intelligence through a layered
              architecture.
            </p>
            <p>
              Its primary interface is an interactive geospatial dashboard where
              stakeholders can monitor farms, cooperatives, production areas, facilities,
              and interventions in real time.
            </p>
          </div>
        </Section>

        {/* Objectives */}
        <Section id="objectives" eyebrow="Goals" title="Project Objectives">
          <div className="grid gap-3 sm:grid-cols-2">
            {objectives.map((o, i) => (
              <div
                key={o}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <span className="text-sm font-medium leading-snug">{o}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Platform framework */}
        <Section id="framework" eyebrow="Architecture" title="Platform Framework">
          <p className="mb-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Each layer transforms raw field information into trusted intelligence.
          </p>
          <FlowDiagram steps={frameworkLayers} />
        </Section>

        {/* Application ecosystem */}
        <Section id="ecosystem" eyebrow="Applications" title="Application Ecosystem">
          <div className="grid gap-4 md:grid-cols-2">
            {apps.map((app, i) => {
              const Icon = app.icon;
              return (
                <Card key={app.name} className={i === apps.length - 1 ? "md:col-span-2" : ""}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">
                      <span className="mr-1.5 text-muted-foreground">{i + 1}.</span>
                      {app.name}
                    </h3>
                  </div>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {app.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="h-4 w-4 shrink-0 text-primary" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </Section>

        {/* Data flow + system architecture */}
        <Section id="data-flow" eyebrow="Pipeline" title="Data Flow & System Architecture">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <h3 className="mb-5 font-display text-lg font-semibold">Data Flow</h3>
              <FlowDiagram steps={dataFlow} />
            </Card>
            <Card>
              <h3 className="mb-5 font-display text-lg font-semibold">
                System Architecture
              </h3>
              <FlowDiagram
                steps={[
                  "Farmer Mobile App",
                  "Geo Tagging App",
                  "Farm Management System",
                  "Farm Database",
                  "Cooperative Monitoring System",
                  "Cooperative Database",
                  "Provincial Monitoring System",
                  "Decision Support System",
                ]}
              />
            </Card>
          </div>
        </Section>

        {/* User hierarchy + access control */}
        <Section id="access" eyebrow="Governance" title="User Hierarchy & Access Control">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <h3 className="mb-5 font-display text-lg font-semibold">User Hierarchy</h3>
              <div className="space-y-1">
                {userHierarchy.map((level, i) => (
                  <div key={level.role} className="flex flex-col items-center">
                    <div className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-center">
                      <span className="text-sm font-semibold">{level.role}</span>
                      {level.sub && (
                        <div className="mt-1.5 flex flex-wrap justify-center gap-1.5">
                          {level.sub.map((s) => (
                            <span
                              key={s}
                              className="rounded-md bg-background px-2 py-0.5 text-xs text-muted-foreground"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {i < userHierarchy.length - 1 && (
                      <div className="my-1 h-4 w-px bg-primary/40" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">Access Control</h3>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                The platform implements{" "}
                <span className="font-semibold text-foreground">
                  Attribute-Based Access Control (ABAC)
                </span>
                . Permissions are determined by:
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {abacFactors.map((f) => (
                  <span
                    key={f}
                    className="rounded-lg border border-border bg-secondary/40 px-3 py-1.5 text-sm font-medium"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </Section>

        {/* Dashboard */}
        <Section id="dashboard" eyebrow="Interface" title="Map-First Dashboard">
          <p className="mb-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            The platform adopts a Map-First Dashboard. Components include:
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {dashboardComponents.map((c) => (
              <div
                key={c}
                className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-4 text-sm font-medium"
              >
                <Layers className="h-4 w-4 shrink-0 text-primary" />
                {c}
              </div>
            ))}
          </div>
        </Section>

        {/* Core features */}
        <Section id="features" eyebrow="Capabilities" title="Core Features">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featureGroups.map((group) => {
              const Icon = group.icon;
              return (
                <Card key={group.title}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="font-display text-base font-semibold">{group.title}</h3>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="h-4 w-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </Section>

        {/* Roadmap */}
        <Section id="roadmap" eyebrow="Timeline" title="Implementation Roadmap">
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold">Phase</th>
                  <th className="px-5 py-3 text-left font-semibold">Deliverables</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {roadmap.map((r) => (
                  <tr key={r.phase}>
                    <td className="whitespace-nowrap px-5 py-3 font-semibold text-primary">
                      {r.phase}
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{r.deliverables}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Budget */}
        <Section
          id="budget"
          eyebrow="Investment"
          title="Proposed Infrastructure Budget (6-Month Pilot)"
        >
          {/* Cloud server */}
          <div className="flex items-center gap-2.5">
            <Server className="h-5 w-5 text-primary" />
            <h3 className="font-display text-lg font-semibold">Cloud Server</h3>
          </div>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Expense Item</th>
                  <th className="px-4 py-3 text-left font-semibold">Service / Use</th>
                  <th className="px-4 py-3 text-right font-semibold">Monthly</th>
                  <th className="px-4 py-3 text-right font-semibold">6 Months</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {cloudBudget.map((row) => (
                  <tr key={row.item}>
                    <td className="px-4 py-3 font-medium">{row.item}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.use}</td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {row.monthly != null ? formatCurrency(row.monthly) : "—"}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {formatCurrency(row.sixMonths)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-secondary/30 font-semibold">
                  <td className="px-4 py-3" colSpan={2}>
                    Infrastructure Subtotal
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatCurrency(cloudSubtotalMonthly)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatCurrency(cloudSubtotalSix)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium" colSpan={2}>
                    Domain Name
                    <span className="ml-1 font-normal text-muted-foreground">
                      (Annual Domain Registration ₱923 × 5 yrs)
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">—</td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatCurrency(domain)}
                  </td>
                </tr>
                <tr className="bg-primary/5 font-bold">
                  <td className="px-4 py-3" colSpan={3}>
                    Total Infrastructure Cost (6 Months)
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-primary">
                    {formatCurrency(cloudTotal)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bare metal */}
          <div className="mt-10 flex items-center gap-2.5">
            <HardDrive className="h-5 w-5 text-primary" />
            <h3 className="font-display text-lg font-semibold">
              Bare Metal Server (On-Site Server)
            </h3>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Expense Item</th>
                  <th className="px-4 py-3 text-right font-semibold">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {bareMetal.map((row) => (
                  <tr key={row.item}>
                    <td className="px-4 py-3 font-medium">{row.item}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{row.cost}</td>
                  </tr>
                ))}
                <tr className="bg-primary/5 font-bold">
                  <td className="px-4 py-3">Initial Total</td>
                  <td className="px-4 py-3 text-right tabular-nums text-primary">
                    {formatCurrency(bareMetalInitial)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Deployment options */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Card className="bg-secondary/20">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Server className="h-4 w-4 text-primary" /> With Cloud Server
              </div>
              <p className="mt-2 font-display text-2xl font-bold tabular-nums">
                {formatCurrency(cloudServerTotal)}
              </p>
            </Card>
            <Card className="bg-secondary/20">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <HardDrive className="h-4 w-4 text-primary" /> With On-Site Server
              </div>
              <p className="mt-2 font-display text-2xl font-bold tabular-nums">
                {formatCurrency(onSiteServerTotal)}
              </p>
            </Card>
          </div>
        </Section>

        {/* Development cost */}
        <Section id="development-cost" eyebrow="Investment" title="Development Cost">
          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold">Category</th>
                  <th className="px-5 py-3 text-right font-semibold">Estimated Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {devCost.map((row) => (
                  <tr key={row.category}>
                    <td className="px-5 py-3 font-medium">{row.category}</td>
                    <td className="px-5 py-3 text-right tabular-nums">
                      {formatCurrency(row.cost)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-primary/5 font-bold">
                  <td className="px-5 py-3">Estimated Development Investment</td>
                  <td className="px-5 py-3 text-right tabular-nums text-primary">
                    {formatCurrency(devTotal)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* Expected outcomes + sustainability */}
        <Section id="outcomes" eyebrow="Impact" title="Expected Outcomes">
          <p className="mb-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            The pilot will establish:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {outcomes.map((o) => (
              <div
                key={o}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm font-medium">{o}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section id="sustainability" eyebrow="Roadmap" title="Sustainability">
          <p className="mb-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            The platform is designed with scalability in mind. Future enhancements
            include:
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {sustainability.map((s) => (
              <div
                key={s}
                className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-4 text-sm font-medium"
              >
                <Cpu className="h-4 w-4 shrink-0 text-primary" />
                {s}
              </div>
            ))}
          </div>
        </Section>

        {/* Conclusion */}
        <Section id="conclusion" eyebrow="Closing" title="Conclusion">
          <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              AIRA Nexus represents a strategic investment in the digital transformation of
              the Bukidnon coffee industry. By integrating field data collection,
              geospatial mapping, cooperative monitoring, and decision support into a
              unified platform, AIRA Nexus empowers the Project Management Team (PMT),
              cooperatives, farmers, and partner institutions with reliable, timely, and
              actionable information.
            </p>
            <p>
              The Bukidnon Coffee Industry pilot will establish the foundation for a
              scalable Agricultural Intelligence Platform capable of supporting additional
              commodities and wider geographic deployments — contributing to more efficient
              project implementation, sustainable agricultural development, and
              evidence-based decision-making.
            </p>
          </div>
        </Section>
      </div>

      {/* CTA footer */}
      <footer className="mt-8 border-t border-border bg-sidebar text-sidebar-foreground">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center">
          <div>
            <div className="rounded-lg bg-sidebar/0">
              <Logo />
            </div>
            <p className="mt-3 max-w-md text-sm text-sidebar-muted">
              A Map-First Agricultural Intelligence Platform — Bukidnon Coffee Industry
              Pilot.
            </p>
          </div>
          <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
            Open Platform <ArrowRight />
          </Link>
        </div>
      </footer>
    </main>
  );
}
