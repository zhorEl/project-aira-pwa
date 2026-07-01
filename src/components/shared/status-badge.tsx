import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertTriangle, XCircle } from "lucide-react";
import type { VerificationStatus } from "@/lib/types";

// Mapped onto the Stitch verification pipeline spectrum
// (draft → submitted → verified → official). A leading dot marks
// "live" verified/official states per the Stitch component spec.
const map: Record<
  VerificationStatus,
  {
    label: string;
    variant: "verified" | "submitted" | "destructive" | "draft";
    icon: typeof CheckCircle2;
    dot?: boolean;
  }
> = {
  verified: { label: "Verified", variant: "verified", icon: CheckCircle2, dot: true },
  pending: { label: "Submitted", variant: "submitted", icon: Clock },
  flagged: { label: "Flagged", variant: "draft", icon: AlertTriangle },
  rejected: { label: "Rejected", variant: "destructive", icon: XCircle },
};

export function StatusBadge({ status }: { status: VerificationStatus }) {
  const s = map[status];
  const Icon = s.icon;
  return (
    <Badge variant={s.variant}>
      {s.dot ? (
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      ) : (
        <Icon className="h-3 w-3" />
      )}
      {s.label}
    </Badge>
  );
}

export function GenericStatusBadge({ status }: { status: string }) {
  const variant =
    status === "Active"
      ? "success"
      : status === "Suspended" || status === "Inactive"
        ? "destructive"
        : status === "Pending" || status === "Invited" || status === "Probationary"
          ? "warning"
          : "muted";
  return <Badge variant={variant as never}>{status}</Badge>;
}
