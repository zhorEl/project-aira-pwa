// Domain model types for AIRA Nexus — mirrors the Scaffold.md hierarchy.

export type VerificationStatus = "verified" | "pending" | "rejected" | "flagged";
export type CoffeeVariety = "Arabica" | "Robusta" | "Excelsa" | "Liberica";

export interface GeoPoint {
  lng: number;
  lat: number;
}

export interface Farmer {
  id: string;
  name: string;
  avatar?: string;
  phone: string;
  email?: string;
  gender: "Male" | "Female";
  age: number;
  municipality: string;
  barangay: string;
  cooperativeId: string;
  cooperative: string;
  farmCount: number;
  totalArea: number; // hectares
  annualProduction: number; // kg
  status: VerificationStatus;
  certifications: string[];
  trainings: number;
  joinedAt: string;
  location: GeoPoint;
}

export interface Farm {
  id: string;
  name: string;
  farmerId: string;
  farmerName: string;
  municipality: string;
  barangay: string;
  variety: CoffeeVariety;
  elevation: number; // masl
  area: number; // hectares
  trees: number;
  annualProduction: number; // kg
  yield: number; // kg/ha
  status: VerificationStatus;
  health: "Excellent" | "Good" | "Fair" | "Poor";
  location: GeoPoint;
  boundary: GeoPoint[];
  updatedAt: string;
}

export interface Cooperative {
  id: string;
  name: string;
  acronym: string;
  municipality: string;
  members: number;
  farms: number;
  totalArea: number;
  annualProduction: number;
  rank: number;
  certification: string;
  chairperson: string;
  status: "Active" | "Inactive" | "Probationary";
  location: GeoPoint;
  established: string;
}

export type ValueChainType =
  | "buyers"
  | "traders"
  | "processors"
  | "roasters"
  | "nurseries"
  | "service-providers";

export interface ValueChainActor {
  id: string;
  name: string;
  type: ValueChainType;
  contact: string;
  municipality: string;
  volume: string;
  linkedCoops: number;
  status: "Active" | "Pending" | "Inactive";
  rating: number;
}

export interface Alert {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  module: string;
  time: string;
}

export interface Activity {
  id: string;
  actor: string;
  action: string;
  target: string;
  module: string;
  time: string;
  avatar?: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: string;
  organization: string;
  status: "Active" | "Invited" | "Suspended";
  lastActive: string;
  avatar?: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  organizations: number;
  users: number;
  plan: "Provincial" | "Regional" | "Pilot";
  status: "Active" | "Suspended";
  region: string;
}

export interface AuditEntry {
  id: string;
  actor: string;
  action: string;
  resource: string;
  ip: string;
  result: "success" | "denied" | "error";
  time: string;
}
