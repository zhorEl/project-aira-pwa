import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertTriangle, XCircle } from "lucide-react";
import type { VerificationStatus } from "@/lib/types";

const map: Record<
  VerificationStatus,
  { label: string; variant: "success" | "warning" | "destructive" | "info"; icon: typeof CheckCircle2 }
> = {
  verified: { label: "Verified", variant: "success", icon: CheckCircle2 },
  pending: { label: "Pending", variant: "warning", icon: Clock },
  flagged: { label: "Flagged", variant: "info", icon: AlertTriangle },
  rejected: { label: "Rejected", variant: "destructive", icon: XCircle },
};

export function StatusBadge({ status }: { status: VerificationStatus }) {
  const s = map[status];
  const Icon = s.icon;
  return (
    <Badge variant={s.variant}>
      <Icon className="h-3 w-3" />
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
