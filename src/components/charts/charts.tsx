"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const AXIS = { fontSize: 11, fill: "hsl(var(--muted-foreground))" };
const GRID = "hsl(var(--border))";

const tooltipStyle = {
  contentStyle: {
    background: "hsl(var(--popover))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "0.5rem",
    fontSize: "12px",
    boxShadow: "0 4px 16px -2px rgb(0 0 0 / 0.12)",
  },
  labelStyle: { color: "hsl(var(--foreground))", fontWeight: 600 },
};

export function ProductionAreaChart({ data }: { data: { month: string; arabica: number; robusta: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="arabicaG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#5f8a3f" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#5f8a3f" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="robustaG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#a86f3f" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#a86f3f" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
        <XAxis dataKey="month" tick={AXIS} tickLine={false} axisLine={false} />
        <YAxis tick={AXIS} tickLine={false} axisLine={false} />
        <Tooltip {...tooltipStyle} />
        <Area type="monotone" dataKey="arabica" stroke="#5f8a3f" strokeWidth={2} fill="url(#arabicaG)" name="Arabica" />
        <Area type="monotone" dataKey="robusta" stroke="#a86f3f" strokeWidth={2} fill="url(#robustaG)" name="Robusta" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const PIE_COLORS = ["#5f8a3f", "#a86f3f", "#cda880", "#915a34"];

export function VarietyPieChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={52}
          outerRadius={80}
          paddingAngle={2}
          stroke="none"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip {...tooltipStyle} />
        <Legend
          iconType="circle"
          wrapperStyle={{ fontSize: "12px" }}
          formatter={(v) => <span style={{ color: "hsl(var(--muted-foreground))" }}>{v}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function ProductivityBarChart({
  data,
  dataKey = "yield",
  color = "#496d2f",
}: {
  data: { name: string; [k: string]: number | string }[];
  dataKey?: string;
  color?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
        <XAxis dataKey="name" tick={AXIS} tickLine={false} axisLine={false} interval={0} angle={-20} textAnchor="end" height={48} />
        <YAxis tick={AXIS} tickLine={false} axisLine={false} />
        <Tooltip {...tooltipStyle} cursor={{ fill: "hsl(var(--muted))" }} />
        <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} maxBarSize={42} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function TrendLineChart({
  data,
  dataKey,
  color = "#496d2f",
}: {
  data: { name: string; [k: string]: number | string }[];
  dataKey: string;
  color?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
        <XAxis dataKey="name" tick={AXIS} tickLine={false} axisLine={false} />
        <YAxis tick={AXIS} tickLine={false} axisLine={false} />
        <Tooltip {...tooltipStyle} />
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
