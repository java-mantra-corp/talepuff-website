import type { Metadata } from "next";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { FaqItem, FeatureCard, StepCard } from "@/components/cards";
import { Button, PageShell, Section } from "@/components/page-shell";
import { faqs, plan, promises, steps, storytellers } from "@/components/site-content";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = { alternates: { canonical: "/" } };

function Cube() {
  return (
    <div className="cube-scene" aria-hidden="true">
      <div className="cube">
        <div className="face face-top">
          <div className="ring">
            <BrandMark className="size-16 text-accent" face="#262d6e" />
          </div>
        </div>
        <div className="face face-back" />
        <div className="face face-bottom" />
        <div className="face face-left" />
        <div className="face face-right" />
        <div className="face face-front" />
      </div>
      <div className="cube-shadow" />
    </div>
  );
}

export default function Home() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="sky">
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-accent uppercase">A bedtime story cube</p>
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
              Press. Wish.
              <br />
              <span className="text-accent">Story.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
              Your child presses the top, says what they would like, and a storyteller begins. A new story every night, made for their age, with no screen and a microphone that only listens when pressed.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/pricing#waitlist">Join the waitlist</Button>
              <Button href="/how-it-works" variant="ghost">
                How it works
              </Button>
            </div>
            <p className="mt-5 text-sm text-muted">
              First {plan.trialDays} days free, from the first story. Then ${plan.monthly} a month for the whole family.
            </p>
          </div>
          <div className="relative">
            <Cube />
            <p className="mt-2 text-center text-lg font-medium text-text/90">&ldquo;A story about a dragon who is scared of the dark.&rdquo;</p>
            <p className="mt-1 text-center text-sm text-muted">Grandpa Oak clears his throat…</p>
          </div>
        </div>
      </section>

      {/* Four steps */}
      <Section tone="raised">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Bedtime, in four touches</h2>
            <p className="mt-4 text-lg text-muted">The whole point is that a child can do it alone, in the dark, without reading anything.</p>
          </div>
          <ol className="space-y-7">
            {steps.map((s, i) => (
              <StepCard key={s.title} n={i + 1} title={s.title} body={s.body} />
            ))}
          </ol>
        </div>
      </Section>

      {/* Promises */}
      <Section>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Made for parents who read the small print</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {promises.map((p) => (
            <FeatureCard key={p.title} title={p.title} body={p.body} />
          ))}
        </div>
        <p className="mt-8 text-muted">
          The details, in plain words:{" "}
          <Link href="/privacy" className="font-semibold text-accent underline underline-offset-4">
            privacy for parents
          </Link>
          .
        </p>
      </Section>

      {/* Storytellers */}
      <Section tone="raised">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Five storytellers. Your child picks one by ear.</h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Hold the button and the cube auditions each voice with a few lines. Hold again to keep the one your child likes. Change it any time from the app.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {storytellers.map((s) => (
            <div key={s.name} className="rounded-xl2 border border-line bg-bg/60 p-5">
              <div className="flex items-center gap-3">
                <BrandMark className="size-8 text-accent" face="#0b1026" />
                <h3 className="font-semibold">{s.name}</h3>
              </div>
              <p className="mt-3 text-sm font-medium text-text/90">{s.voice}</p>
              <p className="mt-1 text-sm text-muted">{s.likes}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Plan + waitlist */}
      <Section>
        <div className="grid gap-10 rounded-xl2 border border-line bg-panel/60 p-8 sm:p-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">One plan for the whole family</h2>
            <p className="mt-4 text-muted">
              ${plan.monthly} a month or ${plan.yearly} a year. Up to {plan.children} children and {plan.cubes} cubes, {plan.newStoriesPerChildPerNight} new stories per child every night, replays always free. The first {plan.trialDays} days are free from the first story, and if you stop, every story you already have stays.
            </p>
            <Link href="/pricing" className="mt-5 inline-block font-semibold text-accent underline underline-offset-4">
              See pricing
            </Link>
          </div>
          <div>
            <h3 className="text-xl font-semibold">The cube is coming. Be first to know.</h3>
            <p className="mt-2 mb-5 text-muted">One email when it ships. Nothing else, ever.</p>
            <WaitlistForm />
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="raised">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Questions parents ask</h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
