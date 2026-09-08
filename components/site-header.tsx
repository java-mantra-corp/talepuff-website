import Link from "next/link";
import { BrandLockup } from "@/components/brand-mark";
import { nav } from "@/components/site-content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-sand/80 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="text-amber" aria-label="Talepuff home">
          <BrandLockup className="text-ink" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-bold text-ink-soft sm:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-ink">
              {item.label}
            </Link>
          ))}
          <Link
            href="/pricing#waitlist"
            className="rounded-full bg-amber px-4 py-2 text-sm font-extrabold text-white shadow-sm transition hover:bg-amber-deep"
          >
            Join the waitlist
          </Link>
        </nav>
        <Link
          href="/pricing#waitlist"
          className="rounded-full bg-amber px-4 py-2 text-sm font-extrabold text-white sm:hidden"
        >
          Waitlist
        </Link>
      </div>
      <nav aria-label="Main, small screens" className="flex gap-5 overflow-x-auto px-6 pb-3 text-sm font-bold text-ink-soft sm:hidden">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
