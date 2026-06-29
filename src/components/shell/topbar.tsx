"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  Settings,
  LogOut,
  User,
  LifeBuoy,
  Command,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown, DropdownItem, DropdownLabel, DropdownSeparator } from "@/components/ui/dropdown";
import { Badge } from "@/components/ui/badge";
import { alerts } from "@/lib/mock-data";
import { relativeTime } from "@/lib/utils";
import { CommandPalette } from "./command-palette";

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl lg:px-6">
      <button
        onClick={onMenu}
        className="rounded-md p-2 text-muted-foreground hover:bg-accent lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <button
        onClick={() => setPaletteOpen(true)}
        className="group flex h-9 max-w-md flex-1 items-center gap-2 rounded-lg border border-input bg-muted/40 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search farmers, farms, coops…</span>
        <kbd className="hidden items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-flex">
          <Command className="h-3 w-3" />K
        </kbd>
      </button>

      <div className="ml-auto flex items-center gap-1">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Toggle theme"
        >
          <Sun className="h-[18px] w-[18px] dark:hidden" />
          <Moon className="hidden h-[18px] w-[18px] dark:block" />
        </button>

        <Dropdown
          className="w-80"
          trigger={
            <button className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
              </span>
            </button>
          }
        >
          <div className="flex items-center justify-between px-2.5 py-2">
            <span className="text-sm font-semibold">Alerts</span>
            <Badge variant="destructive">{alerts.length} new</Badge>
          </div>
          <DropdownSeparator />
          <div className="max-h-80 overflow-y-auto scrollbar-thin">
            {alerts.map((a) => (
              <div
                key={a.id}
                className="flex gap-2.5 rounded-md px-2.5 py-2 hover:bg-accent"
              >
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                    a.severity === "critical"
                      ? "bg-destructive"
                      : a.severity === "warning"
                        ? "bg-warning"
                        : "bg-info"
                  }`}
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-tight">{a.title}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                    {a.description}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {a.module} · {relativeTime(a.time)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <DropdownSeparator />
          <DropdownItem onClick={() => router.push("/monitoring")}>
            View all alerts
          </DropdownItem>
        </Dropdown>

        <Dropdown
          trigger={
            <button className="ml-1 flex items-center gap-2 rounded-lg p-1 pr-2 transition-colors hover:bg-accent">
              <Avatar name="Elena Marquez" src="https://i.pravatar.cc/80?img=47" size="md" />
              <div className="hidden text-left sm:block">
                <p className="text-sm font-medium leading-tight">Elena Marquez</p>
                <p className="text-[11px] text-muted-foreground">Super Admin</p>
              </div>
            </button>
          }
        >
          <DropdownLabel>elena@aira.gov.ph</DropdownLabel>
          <DropdownSeparator />
          <DropdownItem>
            <User /> Profile
          </DropdownItem>
          <Link href="/settings">
            <DropdownItem>
              <Settings /> Settings
            </DropdownItem>
          </Link>
          <DropdownItem>
            <LifeBuoy /> Help & support
          </DropdownItem>
          <DropdownSeparator />
          <Link href="/login">
            <DropdownItem destructive>
              <LogOut /> Sign out
            </DropdownItem>
          </Link>
        </Dropdown>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </header>
  );
}
