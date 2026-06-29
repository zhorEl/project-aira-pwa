import type {
  Farmer,
  Farm,
  Cooperative,
  ValueChainActor,
  Alert,
  Activity,
  AppUser,
  Tenant,
  AuditEntry,
  CoffeeVariety,
  VerificationStatus,
  GeoPoint,
} from "./types";

// Deterministic PRNG so SSR and client render identical mock data.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260629);
const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];
const between = (a: number, b: number) => a + rand() * (b - a);
const intBetween = (a: number, b: number) => Math.floor(between(a, b + 1));

// Map center: Bukidnon, Mindanao — major Philippine coffee region.
export const MAP_CENTER: GeoPoint = { lng: 125.05, lat: 8.15 };

const MUNICIPALITIES = [
  "Malaybalay", "Valencia", "Maramag", "Quezon", "Kitaotao",
  "Lantapan", "Impasugong", "Manolo Fortich", "Sumilao", "Cabanglasan",
];
const BARANGAYS = [
  "Sumpong", "Casisang", "Bangcud", "San Jose", "Poblacion",
  "Kalasungay", "Linabo", "Aglayan", "Dalwangan", "Imbayao",
];
const FIRST = ["Juan", "Maria", "Jose", "Rosa", "Pedro", "Ana", "Carlos", "Liza", "Mario", "Grace", "Ramon", "Cristina", "Eduardo", "Lourdes", "Antonio"];
const LAST = ["Dela Cruz", "Santos", "Reyes", "Bautista", "Gonzales", "Mendoza", "Torres", "Flores", "Ramos", "Aquino", "Castillo", "Villanueva", "Domingo", "Salvador"];
const VARIETIES: CoffeeVariety[] = ["Arabica", "Robusta", "Excelsa", "Liberica"];
const STATUSES: VerificationStatus[] = ["verified", "verified", "verified", "pending", "pending", "flagged", "rejected"];
const CERTS = ["Organic", "Fair Trade", "Rainforest Alliance", "UTZ", "4C"];

const COOP_NAMES = [
  ["Bukidnon Highland Coffee Growers", "BHCG"],
  ["Kalasungay Farmers Cooperative", "KFC"],
  ["Mt. Kitanglad Coffee Association", "MKCA"],
  ["Valencia Arabica Producers", "VAP"],
  ["Maramag Organic Coffee Coop", "MOCC"],
  ["Impasugong Upland Growers", "IUG"],
  ["Lantapan Specialty Coffee", "LSC"],
  ["Manolo Fortich Coffee Union", "MFCU"],
  ["Quezon Robusta Collective", "QRC"],
  ["Sumilao Coffee Stewards", "SCS"],
];

function coord(): GeoPoint {
  return {
    lng: MAP_CENTER.lng + between(-0.4, 0.4),
    lat: MAP_CENTER.lat + between(-0.3, 0.3),
  };
}

function makeBoundary(center: GeoPoint): GeoPoint[] {
  const n = intBetween(4, 6);
  const r = between(0.004, 0.012);
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return {
      lng: center.lng + Math.cos(a) * r * between(0.7, 1.3),
      lat: center.lat + Math.sin(a) * r * between(0.7, 1.3),
    };
  });
}

export const cooperatives: Cooperative[] = COOP_NAMES.map(([name, acronym], i) => ({
  id: `coop-${i + 1}`,
  name,
  acronym,
  municipality: MUNICIPALITIES[i % MUNICIPALITIES.length],
  members: intBetween(45, 340),
  farms: intBetween(60, 420),
  totalArea: Math.round(between(120, 980)),
  annualProduction: Math.round(between(45000, 380000)),
  rank: i + 1,
  certification: pick(CERTS),
  chairperson: `${pick(FIRST)} ${pick(LAST)}`,
  status: (rand() > 0.15 ? "Active" : pick(["Inactive", "Probationary"] as const)) as Cooperative["status"],
  location: coord(),
  established: `${intBetween(1998, 2019)}`,
}))
  .sort((a, b) => b.annualProduction - a.annualProduction)
  .map((c, i) => ({ ...c, rank: i + 1 }));

export const farmers: Farmer[] = Array.from({ length: 64 }, (_, i) => {
  const coop = pick(cooperatives);
  const farmCount = intBetween(1, 4);
  const totalArea = +between(0.5, 6).toFixed(1);
  return {
    id: `farmer-${i + 1}`,
    name: `${pick(FIRST)} ${pick(LAST)}`,
    avatar: `https://i.pravatar.cc/120?img=${(i % 70) + 1}`,
    phone: `+63 9${intBetween(10, 99)} ${intBetween(100, 999)} ${intBetween(1000, 9999)}`,
    email: rand() > 0.4 ? `farmer${i + 1}@aira.coop` : undefined,
    gender: rand() > 0.45 ? "Male" : "Female",
    age: intBetween(24, 68),
    municipality: coop.municipality,
    barangay: pick(BARANGAYS),
    cooperativeId: coop.id,
    cooperative: coop.acronym,
    farmCount,
    totalArea,
    annualProduction: Math.round(totalArea * between(600, 1400)),
    status: pick(STATUSES),
    certifications: rand() > 0.5 ? [pick(CERTS)] : [],
    trainings: intBetween(0, 9),
    joinedAt: `2023-${String(intBetween(1, 12)).padStart(2, "0")}-${String(intBetween(1, 28)).padStart(2, "0")}`,
    location: coord(),
  };
});

export const farms: Farm[] = Array.from({ length: 120 }, (_, i) => {
  const farmer = pick(farmers);
  const area = +between(0.3, 4.5).toFixed(2);
  const trees = Math.round(area * between(900, 1600));
  const yieldPerHa = Math.round(between(550, 1500));
  const center = coord();
  return {
    id: `farm-${i + 1}`,
    name: `${farmer.barangay} Farm ${i + 1}`,
    farmerId: farmer.id,
    farmerName: farmer.name,
    municipality: farmer.municipality,
    barangay: farmer.barangay,
    variety: pick(VARIETIES),
    elevation: intBetween(600, 1650),
    area,
    trees,
    annualProduction: Math.round(area * yieldPerHa),
    yield: yieldPerHa,
    status: pick(STATUSES),
    health: pick(["Excellent", "Good", "Good", "Fair", "Poor"] as const),
    location: center,
    boundary: makeBoundary(center),
    updatedAt: `2026-0${intBetween(1, 6)}-${String(intBetween(1, 28)).padStart(2, "0")}`,
  };
});

const VC_TEMPLATES: { type: ValueChainActor["type"]; names: string[] }[] = [
  { type: "buyers", names: ["Nestlé Philippines", "Kalsada Coffee", "Sunny Hills Trading", "Highland Bean Co."] },
  { type: "traders", names: ["Mindanao Green Trade", "Mountain Pass Traders", "Bukidnon Bean Brokers"] },
  { type: "processors", names: ["Valencia Wet Mill", "Highland Pulping Station", "Maramag Dry Mill"] },
  { type: "roasters", names: ["Kape Maramag Roastery", "Summit Roasters", "Civet Craft Roasting"] },
  { type: "nurseries", names: ["DA Coffee Nursery", "Kitanglad Seedling Center", "Highland Propagation Hub"] },
  { type: "service-providers", names: ["AgriFinance Coop Bank", "FieldTech Advisory", "SoilLab Diagnostics"] },
];

export const valueChainActors: ValueChainActor[] = VC_TEMPLATES.flatMap((t, ti) =>
  t.names.map((name, i) => ({
    id: `vc-${ti}-${i}`,
    name,
    type: t.type,
    contact: `+63 88 ${intBetween(100, 999)} ${intBetween(1000, 9999)}`,
    municipality: pick(MUNICIPALITIES),
    volume: `${intBetween(5, 220)} MT/yr`,
    linkedCoops: intBetween(1, 8),
    status: pick(["Active", "Active", "Pending", "Inactive"] as const),
    rating: +between(3.4, 5).toFixed(1),
  }))
);

export const alerts: Alert[] = [
  { id: "a1", severity: "critical", title: "Production drop flagged", description: "Maramag district shows 23% yield decline vs. seasonal baseline.", module: "Monitoring", time: "2026-06-29T07:42:00" },
  { id: "a2", severity: "warning", title: "12 farmer records pending verification", description: "Validation queue exceeds 48h SLA in Valencia.", module: "Farmers", time: "2026-06-29T06:10:00" },
  { id: "a3", severity: "warning", title: "Coffee leaf rust detected", description: "Field staff reported CLR symptoms across 3 farms in Lantapan.", module: "Farms", time: "2026-06-28T15:30:00" },
  { id: "a4", severity: "info", title: "New cooperative onboarded", description: "Sumilao Coffee Stewards completed registration.", module: "Cooperatives", time: "2026-06-28T11:05:00" },
  { id: "a5", severity: "info", title: "Q2 provincial report ready", description: "Bukidnon provincial production report generated.", module: "Reports", time: "2026-06-27T18:20:00" },
];

export const activities: Activity[] = [
  { id: "ac1", actor: "Maria Santos", action: "verified farm", target: "Aglayan Farm 42", module: "Farms", time: "2026-06-29T08:15:00", avatar: "https://i.pravatar.cc/80?img=5" },
  { id: "ac2", actor: "Field Staff · Carlos R.", action: "submitted production record for", target: "BHCG", module: "Cooperatives", time: "2026-06-29T07:50:00", avatar: "https://i.pravatar.cc/80?img=12" },
  { id: "ac3", actor: "PMT Admin", action: "approved 8 farmer registrations in", target: "Valencia", module: "Farmers", time: "2026-06-29T07:20:00", avatar: "https://i.pravatar.cc/80?img=33" },
  { id: "ac4", actor: "Liza Flores", action: "updated boundary polygon for", target: "Casisang Farm 18", module: "Farms", time: "2026-06-28T16:40:00", avatar: "https://i.pravatar.cc/80?img=20" },
  { id: "ac5", actor: "System", action: "ran nightly data-quality scan on", target: "120 farms", module: "Analytics", time: "2026-06-28T02:00:00" },
  { id: "ac6", actor: "Ramon Aquino", action: "registered new buyer link for", target: "Kalsada Coffee", module: "Value Chain", time: "2026-06-27T14:12:00", avatar: "https://i.pravatar.cc/80?img=51" },
];

export const appUsers: AppUser[] = [
  { id: "u1", name: "Elena Marquez", email: "elena@aira.gov.ph", role: "Super Admin", organization: "Provincial PMT", status: "Active", lastActive: "2026-06-29T08:30:00", avatar: "https://i.pravatar.cc/80?img=47" },
  { id: "u2", name: "Carlos Reyes", email: "carlos@aira.gov.ph", role: "PMT Coordinator", organization: "Provincial PMT", status: "Active", lastActive: "2026-06-29T08:05:00", avatar: "https://i.pravatar.cc/80?img=12" },
  { id: "u3", name: "Grace Domingo", email: "grace@coop.ph", role: "Cooperative Manager", organization: "BHCG", status: "Active", lastActive: "2026-06-28T17:22:00", avatar: "https://i.pravatar.cc/80?img=24" },
  { id: "u4", name: "Mario Castillo", email: "mario@aira.gov.ph", role: "Field Staff", organization: "Valencia LGU", status: "Active", lastActive: "2026-06-29T06:48:00", avatar: "https://i.pravatar.cc/80?img=15" },
  { id: "u5", name: "Ana Villanueva", email: "ana@aira.gov.ph", role: "Analyst", organization: "Provincial PMT", status: "Invited", lastActive: "—", avatar: "https://i.pravatar.cc/80?img=44" },
  { id: "u6", name: "Pedro Salvador", email: "pedro@coop.ph", role: "Validator", organization: "MKCA", status: "Suspended", lastActive: "2026-06-12T09:10:00", avatar: "https://i.pravatar.cc/80?img=8" },
];

export const tenants: Tenant[] = [
  { id: "t1", name: "Bukidnon Province", slug: "bukidnon", organizations: 14, users: 86, plan: "Provincial", status: "Active", region: "Region X" },
  { id: "t2", name: "Davao del Sur", slug: "davao-sur", organizations: 9, users: 52, plan: "Provincial", status: "Active", region: "Region XI" },
  { id: "t3", name: "Sultan Kudarat", slug: "sultan-kudarat", organizations: 6, users: 31, plan: "Regional", status: "Active", region: "Region XII" },
  { id: "t4", name: "Benguet Pilot", slug: "benguet", organizations: 3, users: 12, plan: "Pilot", status: "Suspended", region: "CAR" },
];

export const auditLog: AuditEntry[] = Array.from({ length: 24 }, (_, i) => ({
  id: `audit-${i}`,
  actor: pick(appUsers).name,
  action: pick(["login", "update_policy", "verify_farmer", "export_report", "delete_record", "create_user", "view_farm", "edit_boundary"]),
  resource: pick(["farmer/farmer-12", "policy/abac-7", "report/q2-2026", "farm/farm-88", "user/u4", "coop/coop-3"]),
  ip: `192.168.${intBetween(0, 4)}.${intBetween(2, 254)}`,
  result: pick(["success", "success", "success", "denied", "error"] as const),
  time: `2026-06-${String(intBetween(20, 29)).padStart(2, "0")}T${String(intBetween(0, 23)).padStart(2, "0")}:${String(intBetween(0, 59)).padStart(2, "0")}:00`,
}));

// Aggregate KPIs derived from the dataset.
export const kpis = {
  farmers: farmers.length * 47, // scale up to represent full registry
  farms: farms.length * 38,
  totalArea: Math.round(farms.reduce((s, f) => s + f.area, 0) * 38),
  production: Math.round(farms.reduce((s, f) => s + f.annualProduction, 0) * 38),
  cooperatives: cooperatives.length,
  verified: Math.round((farmers.filter((f) => f.status === "verified").length / farmers.length) * 100),
  pending: farmers.filter((f) => f.status === "pending").length + 9,
};

// Variety distribution for charts.
export const varietyDistribution = VARIETIES.map((v) => ({
  name: v,
  value: farms.filter((f) => f.variety === v).length,
}));

// Monthly production series.
export const productionSeries = [
  { month: "Jan", arabica: 4200, robusta: 6800 },
  { month: "Feb", arabica: 3900, robusta: 6200 },
  { month: "Mar", arabica: 5100, robusta: 7400 },
  { month: "Apr", arabica: 6800, robusta: 8900 },
  { month: "May", arabica: 8200, robusta: 9600 },
  { month: "Jun", arabica: 7400, robusta: 9100 },
  { month: "Jul", arabica: 5600, robusta: 7800 },
  { month: "Aug", arabica: 4300, robusta: 6500 },
  { month: "Sep", arabica: 3800, robusta: 5900 },
  { month: "Oct", arabica: 4600, robusta: 6700 },
  { month: "Nov", arabica: 6200, robusta: 8100 },
  { month: "Dec", arabica: 7100, robusta: 8800 },
];

export const productivityByMunicipality = MUNICIPALITIES.slice(0, 8).map((m) => ({
  name: m,
  yield: intBetween(600, 1400),
  farms: intBetween(40, 220),
}));

export const dataQuality = [
  { label: "Complete profiles", value: 87 },
  { label: "GPS coordinates", value: 94 },
  { label: "Polygon boundaries", value: 71 },
  { label: "Production records", value: 82 },
  { label: "Verified documents", value: 68 },
];
