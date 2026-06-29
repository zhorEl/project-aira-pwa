import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIRA Nexus — Proposal | Bukidnon Coffee Industry Pilot",
  description:
    "Proposal for AIRA Nexus, a map-first agricultural intelligence platform for the Bukidnon coffee industry.",
};

export default function ProposalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-background text-foreground">{children}</div>;
}
