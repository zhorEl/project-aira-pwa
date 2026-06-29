export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-sidebar p-4">
      {/* Decorative backdrop */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.04]" />
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-sidebar-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-coffee-500/15 blur-3xl" />
      <div className="relative z-10 w-full max-w-md animate-slide-up">{children}</div>
    </div>
  );
}
