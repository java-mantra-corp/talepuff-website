import Link from "next/link";
import { BrandLockup } from "@/components/brand-mark";
import { nav } from "@/components/site-content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" aria-label="Talepuff home" className="text-accent">
          <BrandLockup className="text-text" face="#0b1026" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-8 text-sm font-medium text-muted sm:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-text">
              {item.label}
            </Link>
          ))}
          <Link href="/pricing#waitlist" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-bg transition hover:bg-accent-2">
            Join the waitlist
          </Link>
        </nav>
        <Link href="/pricing#waitlist" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-bg sm:hidden">
          Waitlist
        </Link>
      </div>
      <nav aria-label="Main, small screens" className="flex gap-6 overflow-x-auto px-6 pb-3 text-sm font-medium text-muted sm:hidden">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
