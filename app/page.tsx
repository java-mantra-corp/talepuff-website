import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { FaqItem, FeatureCard, StepCard } from "@/components/cards";
import { PageShell, Section } from "@/components/page-shell";
import { faqs, plan, promises, steps, storytellers } from "@/components/site-content";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-16 pb-20 sm:pt-24 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-bold tracking-wide text-amber-deep uppercase">A bedtime story cube</p>
            <h1 className="text-5xl font-extrabold tracking-tight text-ink sm:text-6xl">
              Press the button. Say what you&rsquo;d like. A storyteller begins.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-soft">
              Talepuff makes a new story for your child every night, in their own words and for their age, told by a
              voice they chose. No screen. A microphone that only listens when pressed. A library your family keeps.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/pricing#waitlist" className="rounded-full bg-amber px-6 py-3 font-extrabold text-white shadow-sm transition hover:bg-amber-deep">
                Join the waitlist
              </Link>
              <Link href="/how-it-works" className="rounded-full border border-ink/15 bg-white/60 px-6 py-3 font-extrabold text-ink transition hover:bg-white">
                How it works
              </Link>
            </div>
            <p className="mt-5 text-sm text-ink-soft">
              First {plan.trialDays} days free, from the first story. Then ${plan.monthly} a month for the whole family.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-[2rem] bg-ink p-10 shadow-2xl">
              <div className="flex items-center justify-center rounded-[1.5rem] bg-white/5 p-8 ring-1 ring-white/10">
                <BrandMark className="size-40 text-white" face="#1e2a4a" />
              </div>
              <p className="mt-6 text-center text-lg font-bold text-moon">&ldquo;A story about a dragon who is scared of the dark.&rdquo;</p>
              <p className="mt-2 text-center text-sm text-cream/70">Grandpa Oak clears his throat…</p>
            </div>
          </div>
        </div>
      </section>

      {/* Four steps */}
      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Bedtime, in four touches</h2>
            <p className="mt-3 text-ink-soft">
              The whole point is that a child can do it alone, in the dark, without reading anything.
            </p>
          </div>
          <ol className="space-y-6">
            {steps.map((s, i) => (
              <StepCard key={s.title} n={i + 1} title={s.title} body={s.body} />
            ))}
          </ol>
        </div>
      </Section>

      {/* Promises */}
      <Section>
        <h2 className="text-3xl font-extrabold tracking-tight">Made for parents who read the small print</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {promises.map((p) => (
            <FeatureCard key={p.title} title={p.title} body={p.body} />
          ))}
        </div>
        <p className="mt-6 text-sm text-ink-soft">
          The details, in plain words: <Link href="/privacy" className="font-bold text-amber-deep underline underline-offset-4">privacy for parents</Link>.
        </p>
      </Section>

      {/* Storytellers */}
      <Section tone="night">
        <h2 className="text-3xl font-extrabold tracking-tight">Five storytellers. Your child picks one by ear.</h2>
        <p className="mt-3 max-w-2xl text-cream/75">
          Hold the button and the cube auditions each voice with a few lines. Hold again to keep the one your child likes. Change it any time from the app.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {storytellers.map((s) => (
            <div key={s.name} className="rounded-xl2 bg-white/5 p-5 ring-1 ring-white/10">
              <div className="flex items-center gap-3">
                <BrandMark className="size-8 text-moon" face="#1e2a4a" />
                <h3 className="font-extrabold">{s.name}</h3>
              </div>
              <p className="mt-3 text-sm font-bold text-cream/80">{s.voice}</p>
              <p className="mt-1 text-sm text-cream/65">{s.likes}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Plan + waitlist */}
      <Section tone="sand">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">One plan for the whole family</h2>
            <p className="mt-3 text-ink-soft">
              ${plan.monthly} a month or ${plan.yearly} a year. Up to {plan.children} children and {plan.cubes} cubes, {plan.newStoriesPerChildPerNight} new stories per child every night, replays always free. The first {plan.trialDays} days are free from the first story, and if you stop, every story you already have stays.
            </p>
            <Link href="/pricing" className="mt-5 inline-block font-extrabold text-amber-deep underline underline-offset-4">
              See pricing
            </Link>
          </div>
          <div>
            <h3 className="text-xl font-extrabold">The cube is coming. Be first to know.</h3>
            <p className="mt-2 mb-5 text-ink-soft">One email when it ships. Nothing else, ever.</p>
            <WaitlistForm />
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <h2 className="text-3xl font-extrabold tracking-tight">Questions parents ask</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
