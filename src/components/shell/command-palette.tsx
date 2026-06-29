"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, CornerDownLeft } from "lucide-react";
import { navigation } from "@/lib/navigation";
import { farmers, farms, cooperatives } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface Item {
  label: string;
  sub: string;
  href: string;
  group: string;
}

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const items: Item[] = [
    ...navigation.flatMap((s) =>
      s.items.map((i) => ({
        label: i.label,
        sub: s.title,
        href: i.href,
        group: "Navigate",
      }))
    ),
    ...farmers.slice(0, 6).map((f) => ({
      label: f.name,
      sub: `Farmer · ${f.municipality}`,
      href: `/farmers/${f.id}`,
      group: "Farmers",
    })),
    ...farms.slice(0, 6).map((f) => ({
      label: f.name,
      sub: `Farm · ${f.variety}`,
      href: `/farms/${f.id}`,
      group: "Farms",
    })),
    ...cooperatives.slice(0, 5).map((c) => ({
      label: c.name,
      sub: `Cooperative · ${c.municipality}`,
      href: `/cooperatives/${c.id}`,
      group: "Cooperatives",
    })),
  ];

  const filtered = query
    ? items.filter((i) =>
        (i.label + i.sub).toLowerCase().includes(query.toLowerCase())
      )
    : items.slice(0, 8);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        open ? onClose() : window.dispatchEvent(new CustomEvent("open-palette"));
      }
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      }
      if (e.key === "Enter" && filtered[active]) {
        router.push(filtered[active].href);
        onClose();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, filtered, active, onClose, router]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActive(0);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 backdrop-blur-sm pt-[12vh]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-popover shadow-elevated animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Search across the platform…"
            className="h-14 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto scrollbar-thin p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No results for “{query}”
            </p>
          )}
          {filtered.map((item, i) => (
            <button
              key={item.href + i}
              onMouseEnter={() => setActive(i)}
              onClick={() => {
                router.push(item.href);
                onClose();
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                active === i ? "bg-accent" : ""
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.label}</p>
                <p className="truncate text-xs text-muted-foreground">{item.sub}</p>
              </div>
              <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                {item.group}
              </span>
              {active === i && (
                <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
