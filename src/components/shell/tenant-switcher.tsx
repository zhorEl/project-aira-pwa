"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Layers } from "lucide-react";
import { tenants } from "@/lib/mock-data";
import { Dropdown, DropdownItem, DropdownLabel, DropdownSeparator } from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";

export function TenantSwitcher() {
  const [active, setActive] = useState(tenants[0]);

  return (
    <Dropdown
      align="start"
      className="w-[15rem]"
      trigger={
        <button className="flex w-full items-center gap-2.5 rounded-lg border border-sidebar-border bg-sidebar-border/30 px-3 py-2 text-left transition-colors hover:bg-sidebar-border/60">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-sidebar-accent/20 text-sidebar-accent">
            <Layers className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-sidebar-foreground">
              {active.name}
            </p>
            <p className="truncate text-[11px] text-sidebar-muted">
              {active.plan} · {active.region}
            </p>
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-sidebar-muted" />
        </button>
      }
    >
      <DropdownLabel>Switch tenant</DropdownLabel>
      {tenants.map((t) => (
        <DropdownItem key={t.id} onClick={() => setActive(t)}>
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-primary">
            <Layers className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-popover-foreground">{t.name}</p>
            <p className="truncate text-xs text-muted-foreground">{t.plan}</p>
          </div>
          <Check
            className={cn(
              "h-4 w-4 text-primary",
              active.id === t.id ? "opacity-100" : "opacity-0"
            )}
          />
        </DropdownItem>
      ))}
      <DropdownSeparator />
      <DropdownItem>
        <Layers /> Manage tenants
      </DropdownItem>
    </Dropdown>
  );
}
