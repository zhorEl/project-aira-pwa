"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/shell/logo";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 700);
  }

  return (
    <div className="rounded-2xl border border-sidebar-border bg-card p-8 shadow-elevated">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="rounded-xl bg-sidebar p-3">
          <Logo />
        </div>
        <h1 className="mt-5 font-display text-xl font-bold">
          {sent ? "Check your email" : "Reset your password"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {sent
            ? "We sent a recovery link to your inbox."
            : "Enter your email and we'll send you a reset link."}
        </p>
      </div>

      {sent ? (
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/12 text-success">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <p className="text-sm text-muted-foreground">
            If an account exists, a password reset link is on its way. The link expires in 30 minutes.
          </p>
          <Link href="/login" className="w-full">
            <Button variant="outline" className="w-full">
              <ArrowLeft /> Back to sign in
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" type="email" placeholder="you@aira.gov.ph" className="pl-9" required />
            </div>
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Send reset link"}
          </Button>
          <Link href="/login" className="block">
            <Button variant="ghost" className="w-full" type="button">
              <ArrowLeft /> Back to sign in
            </Button>
          </Link>
        </form>
      )}
    </div>
  );
}
