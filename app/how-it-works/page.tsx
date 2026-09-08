import type { Metadata } from "next";
import { StepCard, StorytellerCard } from "@/components/cards";
import { PageIntro, PageShell, Section } from "@/components/page-shell";
import { steps, storytellers } from "@/components/site-content";

export const metadata: Metadata = {
  title: "How it works",
  description: "Setup in two minutes, bedtime in four touches, and what happens in between a request and a story.",
  alternates: { canonical: "/how-it-works" },
};

const setup = [
  { title: "Scan the card in the box", body: "The app reads the cube's serial and its one-time code. Nothing to type." },
  { title: "Plug the cube in", body: "In about half a minute its light pulses and it says it is ready to be set up." },
  { title: "Pick your Wi-Fi", body: "The app shows the networks the cube can see. Choose yours and type the password once. The cube keeps it; your phone does not." },
  { title: "Hand it over", body: "The cube says \"I'm online\", then asks your child their name. That is the whole setup." },
];

export default function HowItWorks() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="How it works"
        title="Two minutes to set up. Four touches at bedtime."
        lede="Everything a child does happens on the cube. Everything a parent decides happens in the app."
      />
      <Section tone="raised">
        <h2 className="text-3xl font-bold tracking-tight">Setup, once</h2>
        <ol className="mt-8 grid gap-8 sm:grid-cols-2">
          {setup.map((s, i) => (
            <StepCard key={s.title} n={i + 1} title={s.title} body={s.body} />
          ))}
        </ol>
        <p className="mt-8 text-sm text-muted">
          No email confirmation before the first story, no payment screen in the middle of setup. Those can wait for the morning.
        </p>
      </Section>
      <Section>
        <h2 className="text-3xl font-bold tracking-tight">Bedtime, every night</h2>
        <ol className="mt-8 grid gap-8 sm:grid-cols-2">
          {steps.map((s, i) => (
            <StepCard key={s.title} n={i + 1} title={s.title} body={s.body} />
          ))}
        </ol>
      </Section>
      <Section tone="raised">
        <h2 className="text-3xl font-bold tracking-tight">What happens in the two seconds before the story</h2>
        <div className="prose-tp mt-6 max-w-3xl">
          <p>
            The cube sends your child&rsquo;s eight seconds of speech to Talepuff&rsquo;s servers, where it is turned into words and the recording is discarded. The words are checked. A story is written for that request, for your child&rsquo;s age and in the storyteller&rsquo;s style, and it is checked again, sentence by sentence, before the voice reads it. The first sentence usually arrives in two to three seconds; the rest follows as it is spoken.
          </p>
          <p>
            Every story is kept in your family&rsquo;s library. Ask for &ldquo;the one about the dragon&rdquo; tomorrow and the cube plays it back, for free and instantly. Stories continue as series when a child asks &ldquo;what happened next&rdquo;.
          </p>
          <p>
            If the internet is down, the cube has a small set of stories on board and tells one of those, so bedtime never depends on your router.
          </p>
        </div>
      </Section>
      <Section>
        <h2 className="text-3xl font-bold tracking-tight">The storytellers</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {storytellers.map((s) => (
            <StorytellerCard key={s.name} {...s} />
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
