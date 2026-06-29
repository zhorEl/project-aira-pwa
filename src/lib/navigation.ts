import {
  LayoutDashboard,
  Map,
  Users,
  Sprout,
  Building2,
  Link2,
  Activity,
  BarChart3,
  FileText,
  FolderArchive,
  Settings,
  ShieldCheck,
  Building,
  Layers,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  children?: { label: string; href: string }[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Map", href: "/map", icon: Map },
    ],
  },
  {
    title: "Registry",
    items: [
      {
        label: "Farmers",
        href: "/farmers",
        icon: Users,
        children: [
          { label: "Registry", href: "/farmers" },
          { label: "Verification", href: "/farmers/verification" },
          { label: "Register Farmer", href: "/farmers/create" },
        ],
      },
      {
        label: "Farms",
        href: "/farms",
        icon: Sprout,
        children: [
          { label: "All Farms", href: "/farms" },
          { label: "Boundaries", href: "/farms/boundaries" },
          { label: "Activities", href: "/farms/activities" },
          { label: "Production", href: "/farms/production" },
        ],
      },
      {
        label: "Cooperatives",
        href: "/cooperatives",
        icon: Building2,
      },
      {
        label: "Value Chain",
        href: "/value-chain/buyers",
        icon: Link2,
      },
    ],
  },
  {
    title: "Intelligence",
    items: [
      { label: "Monitoring", href: "/monitoring", icon: Activity, badge: "12" },
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
      { label: "Reports", href: "/reports", icon: FileText },
      { label: "Documents", href: "/documents", icon: FolderArchive },
    ],
  },
  {
    title: "Administration",
    items: [
      { label: "Users & Roles", href: "/users", icon: ShieldCheck },
      { label: "Organizations", href: "/organizations", icon: Building },
      { label: "Tenants", href: "/tenants", icon: Layers },
      { label: "Audit Log", href: "/audit", icon: FileText },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export const valueChainTabs = [
  { label: "Buyers", href: "/value-chain/buyers", type: "buyers" },
  { label: "Traders", href: "/value-chain/traders", type: "traders" },
  { label: "Processors", href: "/value-chain/processors", type: "processors" },
  { label: "Roasters", href: "/value-chain/roasters", type: "roasters" },
  { label: "Nurseries", href: "/value-chain/nurseries", type: "nurseries" },
  { label: "Service Providers", href: "/value-chain/service-providers", type: "service-providers" },
] as const;

export const monitoringTabs = [
  { label: "Municipality", href: "/monitoring/municipality" },
  { label: "Barangay", href: "/monitoring/barangay" },
  { label: "Production", href: "/monitoring/production" },
  { label: "Interventions", href: "/monitoring/interventions" },
  { label: "Field Status", href: "/monitoring/field-status" },
];
