import Link from "next/link";
import { BrandLockup } from "@/components/brand-mark";
import { COMPANY, SUPPORT_EMAIL, legalLinks, nav } from "@/components/site-content";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <BrandLockup className="text-white" face="#1e2a4a" />
          <p className="mt-4 max-w-xs text-sm text-cream/75">
            A bedtime story cube for children. No screen, one button, a storyteller who knows their name.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-extrabold">Talepuff</p>
          <ul className="space-y-2 text-cream/80">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-white">
                {SUPPORT_EMAIL}
              </a>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-extrabold">The small print</p>
          <ul className="space-y-2 text-cream/80">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-6 py-5 text-xs text-cream/60">
          © {new Date().getFullYear()} {COMPANY}. Talepuff is a trademark of {COMPANY}. Not affiliated with any board game or card product of a similar name.
        </p>
      </div>
    </footer>
  );
}
