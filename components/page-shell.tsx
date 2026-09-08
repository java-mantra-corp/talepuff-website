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

/** A centred column with the page's title and one line under it. */
export function PageIntro({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="mx-auto max-w-3xl px-6 pt-16 pb-10 text-center sm:pt-20">
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold tracking-wide text-amber-deep uppercase">{eyebrow}</p>
      ) : null}
      <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{title}</h1>
      {lede ? <p className="mt-4 text-lg text-ink-soft">{lede}</p> : null}
    </header>
  );
}

export function Section({
  children,
  className = "",
  tone = "cream",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "cream" | "sand" | "night";
}) {
  const tones = {
    cream: "bg-cream text-ink",
    sand: "bg-sand text-ink",
    night: "bg-ink text-cream",
  } as const;
  return (
    <section className={`${tones[tone]} ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">{children}</div>
    </section>
  );
}
