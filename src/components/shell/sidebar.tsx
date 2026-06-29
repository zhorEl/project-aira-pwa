"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronRight, X } from "lucide-react";
import { navigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { TenantSwitcher } from "./tenant-switcher";

export function Sidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/dashboard">
            <Logo />
          </Link>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-sidebar-muted hover:bg-sidebar-border/60 hover:text-sidebar-foreground lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-3 pb-2">
          <TenantSwitcher />
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto scrollbar-thin px-3 py-3">
          {navigation.map((section) => (
            <div key={section.title}>
              <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-sidebar-muted">
                {section.title}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavLink
                    key={item.label}
                    item={item}
                    pathname={pathname}
                    onNavigate={onClose}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <div className="rounded-lg bg-sidebar-border/40 p-3">
            <p className="text-xs font-semibold text-sidebar-foreground">
              Crop Year 2026
            </p>
            <p className="mt-0.5 text-[11px] text-sidebar-muted">
              Data synced 4 min ago
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

function NavLink({
  item,
  pathname,
  onNavigate,
}: {
  item: (typeof navigation)[number]["items"][number];
  pathname: string;
  onNavigate: () => void;
}) {
  const Icon = item.icon;
  const base = item.href.split("/")[1];
  const isActive =
    pathname === item.href ||
    (base && pathname.startsWith(`/${base}`)) ||
    item.children?.some((c) => pathname === c.href);
  const [open, setOpen] = useState<boolean>(Boolean(isActive && item.children));

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            isActive
              ? "bg-sidebar-accent/15 text-sidebar-foreground"
              : "text-sidebar-muted hover:bg-sidebar-border/50 hover:text-sidebar-foreground"
          )}
        >
          <Icon className="h-[18px] w-[18px] shrink-0" />
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronRight
            className={cn(
              "h-4 w-4 shrink-0 transition-transform",
              open && "rotate-90"
            )}
          />
        </button>
        {open && (
          <div className="ml-[22px] mt-0.5 space-y-0.5 border-l border-sidebar-border pl-3">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onNavigate}
                className={cn(
                  "block rounded-md px-3 py-1.5 text-[13px] transition-colors",
                  pathname === child.href
                    ? "text-sidebar-accent font-medium"
                    : "text-sidebar-muted hover:text-sidebar-foreground"
                )}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-sidebar-accent text-white shadow-soft"
          : "text-sidebar-muted hover:bg-sidebar-border/50 hover:text-sidebar-foreground"
      )}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" />
      <span className="flex-1">{item.label}</span>
      {item.badge && (
        <span
          className={cn(
            "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
            isActive ? "bg-white/20" : "bg-sidebar-accent/20 text-sidebar-accent"
          )}
        >
          {item.badge}
        </span>
      )}
    </Link>
  );
}
