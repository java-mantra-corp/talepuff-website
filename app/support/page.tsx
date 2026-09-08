import type { Metadata } from "next";
import { FaqItem } from "@/components/cards";
import { PageIntro, PageShell, Section } from "@/components/page-shell";
import { SUPPORT_EMAIL, faqs } from "@/components/site-content";

export const metadata: Metadata = {
  title: "Support",
  description: "Help with setup, Wi-Fi, the button, the app and your plan.",
  alternates: { canonical: "/support" },
};

const fixes = [
  {
    title: "The light pulses but nothing happens when I press",
    body: "A pulsing light means the cube is waiting to be set up. Open the app, tap Add a cube, and follow the steps. If it was set up before, it may have been removed from the account or moved to a new router; setting it up again takes two minutes.",
  },
  {
    title: "The cube says it cannot reach the internet",
    body: "Its light shows a steady colour for this. Check the Wi-Fi password in the app by setting the cube up again, and check that the router is not asking for a login page, which the cube cannot fill in.",
  },
  {
    title: "It heard something else than what my child said",
    body: "Speak after the chime, within eight seconds, from within a metre or so. Background noise from a television is the usual cause. The app shows what was heard.",
  },
  {
    title: "I want a different voice",
    body: "Hold the button on the cube to audition storytellers, or change it in the app under the child's profile. The change takes effect on the next story.",
  },
  {
    title: "Nothing plays at all",
    body: "Turn the cube off and on. If the light never comes on, try the other USB-C cable from the box and a wall adapter rather than a laptop port.",
  },
];

export default function Support() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Support"
        title="Help, quickly"
        lede={`Most things are one screen away in the app. For everything else, ${SUPPORT_EMAIL} reaches a person.`}
      />
      <Section>
        <h2 className="text-3xl font-extrabold tracking-tight">When something is wrong</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {fixes.map((f) => (
            <FaqItem key={f.title} q={f.title} a={f.body} />
          ))}
        </div>
      </Section>
      <Section tone="sand">
        <h2 className="text-3xl font-extrabold tracking-tight">Questions parents ask</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </Section>
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold">Still stuck?</h2>
          <p className="mt-2 text-ink-soft">Email us with the cube&rsquo;s serial from the card in the box. We answer within a day.</p>
          <a href={`mailto:${SUPPORT_EMAIL}?subject=Talepuff%20support`} className="mt-6 inline-block rounded-full bg-amber px-6 py-3 font-extrabold text-white hover:bg-amber-deep">
            {SUPPORT_EMAIL}
          </a>
        </div>
      </Section>
    </PageShell>
  );
}
