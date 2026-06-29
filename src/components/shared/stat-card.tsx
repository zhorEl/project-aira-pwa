import { cn, formatCompact } from "@/lib/utils";
import { Delta } from "@/components/ui/misc";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  suffix,
  accent = "primary",
  spark,
  className,
}: {
  label: string;
  value: number | string;
  delta?: number;
  icon?: LucideIcon;
  suffix?: string;
  accent?: "primary" | "info" | "warning" | "success" | "coffee" | "destructive";
  spark?: number[];
  className?: string;
}) {
  const accents: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    info: "bg-info/10 text-info",
    warning: "bg-warning/15 text-warning",
    success: "bg-success/12 text-success",
    coffee: "bg-coffee-500/15 text-coffee-700 dark:text-coffee-300",
    destructive: "bg-destructive/12 text-destructive",
  };
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-elevated",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-muted-foreground">{label}</p>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="font-display text-2xl font-bold tracking-tight">
              {typeof value === "number" ? formatCompact(value) : value}
            </span>
            {suffix && (
              <span className="text-sm font-medium text-muted-foreground">{suffix}</span>
            )}
          </div>
          {delta !== undefined && (
            <div className="mt-2 flex items-center gap-1.5">
              <Delta value={delta} />
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        {Icon && (
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              accents[accent]
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      {spark && <Sparkline data={spark} className="mt-4" />}
    </div>
  );
}

function Sparkline({ data, className }: { data: number[]; className?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100;
  const h = 28;
  const pts = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((d - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={cn("h-7 w-full text-primary/60", className)}
    >
      <polyline
        points={pts}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
