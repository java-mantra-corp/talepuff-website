import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

export function PageIntro({ eyebrow, title, lede }: { eyebrow?: string; title: string; lede?: string }) {
  return (
    <header className="sky">
      <div className="mx-auto max-w-3xl px-6 pt-20 pb-14 text-center sm:pt-28">
        {eyebrow ? <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-accent uppercase">{eyebrow}</p> : null}
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">{title}</h1>
        {lede ? <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">{lede}</p> : null}
      </div>
    </header>
  );
}

/** Two shades of night: the page itself, and a raised band for alternate sections. */
export function Section({
  children,
  className = "",
  tone = "base",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "base" | "raised";
}) {
  return (
    <section className={`${tone === "raised" ? "bg-panel/60" : "bg-bg"} ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">{children}</div>
    </section>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base = "inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition";
  const styles =
    variant === "primary"
      ? "bg-accent text-bg shadow-[0_0_30px_rgba(255,180,84,0.35)] hover:bg-accent-2"
      : "border border-line bg-white/5 text-text hover:bg-white/10";
  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
}
