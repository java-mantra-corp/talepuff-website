import Link from "next/link";
import { BrandLockup } from "@/components/brand-mark";
import { COMPANY, SUPPORT_EMAIL, legalLinks, nav } from "@/components/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <BrandLockup className="text-text" face="#0b1026" />
          <p className="mt-4 max-w-xs text-sm text-muted">
            A bedtime story cube for children. No screen, one button, a storyteller who knows their name.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold">Talepuff</p>
          <ul className="space-y-2 text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-text">{item.label}</Link>
              </li>
            ))}
            <li>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-text">{SUPPORT_EMAIL}</a>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-semibold">The small print</p>
          <ul className="space-y-2 text-muted">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-text">{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-6 py-5 text-xs text-muted/80">
          © {new Date().getFullYear()} {COMPANY}. Talepuff is a trademark of {COMPANY}. Not affiliated with any board game or card product of a similar name.
        </p>
      </div>
    </footer>
  );
}
