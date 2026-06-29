import Link from "next/link";
import { ShieldAlert, ArrowLeft, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="rounded-2xl border border-sidebar-border bg-card p-8 text-center shadow-elevated">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/12 text-destructive">
        <ShieldAlert className="h-8 w-8" />
      </div>
      <h1 className="mt-6 font-display text-2xl font-bold">Access denied</h1>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        Your current role and ABAC policy don't grant access to this resource. If you
        believe this is an error, contact your tenant administrator.
      </p>
      <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-xs text-muted-foreground">
        <span className="font-mono">policy.deny</span> · resource not in scope
      </div>
      <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Link href="/dashboard">
          <Button variant="outline" className="w-full sm:w-auto">
            <ArrowLeft /> Back to dashboard
          </Button>
        </Link>
        <Button className="w-full sm:w-auto">
          <LifeBuoy /> Request access
        </Button>
      </div>
    </div>
  );
}
