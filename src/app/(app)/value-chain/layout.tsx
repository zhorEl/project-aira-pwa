"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { valueChainTabs } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export default function ValueChainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      <PageHeader
        title="Value Chain"
        description="Downstream actors connecting farms and cooperatives to markets."
        breadcrumb={[{ label: "Registry" }, { label: "Value Chain" }]}
        actions={<Button><Plus /> Add actor</Button>}
      />

      <div className="mb-4 flex gap-1 overflow-x-auto scrollbar-thin border-b border-border">
        {valueChainTabs.map((t) => {
          const active = pathname === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={cn(
                "whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
            </Link>
          );
        })}
      </div>

      {children}
    </div>
  );
}
