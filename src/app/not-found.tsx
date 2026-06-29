import Link from "next/link";
import { MapPinOff, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <MapPinOff className="h-8 w-8" />
      </div>
      <h1 className="mt-6 font-display text-4xl font-bold">404</h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        We couldn&apos;t find that page. It may have been moved, or the link is off the map.
      </p>
      <Link
        href="/dashboard"
        className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-soft transition-colors hover:bg-primary/90"
      >
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>
    </div>
  );
}
