import { cn } from "@/lib/utils";

export function Logo({
  collapsed,
  className,
}: {
  collapsed?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sidebar-accent shadow-glow">
        <svg viewBox="0 0 64 64" className="h-6 w-6">
          <path d="M32 14c-8 6-12 12-12 19a12 12 0 0024 0c0-7-4-13-12-19z" fill="#dff0cf" />
          <path d="M32 18v26" stroke="#234017" strokeWidth="3" strokeLinecap="round" />
          <path
            d="M32 30c-3-2-6-2-9-1M32 36c3-2 6-2 9-1M32 24c-2-1.5-4-1.5-6-1"
            stroke="#234017"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {!collapsed && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-bold tracking-tight text-sidebar-foreground">
            AIRA Nexus
          </span>
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-sidebar-muted">
            Coffee Intelligence
          </span>
        </div>
      )}
    </div>
  );
}
