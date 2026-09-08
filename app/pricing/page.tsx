import type { Metadata } from "next";
import { FaqItem } from "@/components/cards";
import { PageIntro, PageShell, Section } from "@/components/page-shell";
import { faqs, plan } from "@/components/site-content";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = {
  title: "Pricing",
  description: `One family plan: $${plan.monthly} a month or $${plan.yearly} a year, first ${plan.trialDays} days free from the first story.`,
  alternates: { canonical: "/pricing" },
};

const monthlyUrl = process.env.NEXT_PUBLIC_LEMONSQUEEZY_MONTHLY_URL?.trim();
const yearlyUrl = process.env.NEXT_PUBLIC_LEMONSQUEEZY_YEARLY_URL?.trim();

function PlanCard({ title, price, per, note, href }: { title: string; price: string; per: string; note: string; href?: string }) {
  return (
    <div className="rounded-xl2 border border-line bg-panel/80 p-7 shadow-sm">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-3 text-4xl font-bold tracking-tight">
        {price} <span className="text-base font-bold text-muted">{per}</span>
      </p>
      <p className="mt-2 text-sm text-muted">{note}</p>
      {href ? (
        <a href={href} className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-bold text-bg hover:bg-accent-2">
          Choose {title.toLowerCase()}
        </a>
      ) : (
        <p className="mt-6 rounded-full bg-panel px-5 py-3 text-center text-sm font-bold text-muted">Bought in the app, after the trial</p>
      )}
    </div>
  );
}

export default function Pricing() {
  const included = [
    `Up to ${plan.children} children, each with their own age, storyteller and library`,
    `Up to ${plan.cubes} cubes on one plan, for two bedrooms or two homes`,
    `${plan.newStoriesPerChildPerNight} new stories per child every night`,
    "Unlimited replays of every story ever told",
    "Stories that continue as series when a child asks what happened next",
    "The parent app: what was asked, what was told, one-tap deletion",
  ];
  return (
    <PageShell>
      <PageIntro
        eyebrow="Pricing"
        title="One plan. The whole family."
        lede={`The first ${plan.trialDays} days are free and start with the first story, not with the box arriving. If you stop, every story you already have stays.`}
      />
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <PlanCard title="Monthly" price={`$${plan.monthly}`} per="a month" note="Cancel any time from the app." href={monthlyUrl} />
          <PlanCard title="Yearly" price={`$${plan.yearly}`} per="a year" note="Two months free compared with monthly." href={yearlyUrl} />
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {included.map((line) => (
            <li key={line} className="flex gap-3 text-muted">
              <span aria-hidden="true" className="font-bold text-accent">✓</span>
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-sm text-muted">
          When a trial ends without a plan, the cube keeps working: replays and the stories it carries on board continue, and only new stories pause. The cube says &ldquo;ask a grown-up to keep the stories coming&rdquo; and nothing else changes.
        </p>
      </Section>
      <Section tone="raised">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">The cube</h2>
            <p className="mt-3 text-muted">
              The price of the cube itself will be announced when it ships. It is a one-time purchase, sold separately from the plan, with a 30-day return window.
            </p>
          </div>
          <div id="waitlist">
            <h3 className="text-xl font-bold">Tell me when it ships</h3>
            <p className="mt-2 mb-5 text-muted">One email, when there is a cube to buy.</p>
            <WaitlistForm />
          </div>
        </div>
      </Section>
      <Section>
        <h2 className="text-3xl font-bold tracking-tight">Plan questions</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {faqs.filter((f) => /plan|paying|delete|share/i.test(f.q)).map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
