"use client";

import { Search, SlidersHorizontal, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Toolbar({
  searchPlaceholder = "Search…",
  onSearch,
  filters,
  actions,
  showExport = true,
  className,
}: {
  searchPlaceholder?: string;
  onSearch?: (v: string) => void;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  showExport?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", className)}>
      <div className="relative max-w-sm flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          className="pl-9"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        {filters}
        <Button variant="outline" size="sm" className="hidden sm:inline-flex">
          <SlidersHorizontal /> Filters
        </Button>
        {showExport && (
          <Button variant="outline" size="sm">
            <Download /> Export
          </Button>
        )}
        {actions}
      </div>
    </div>
  );
}
