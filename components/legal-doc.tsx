import { PageIntro, PageShell, Section } from "@/components/page-shell";

export function LegalDoc({
  title,
  effective,
  children,
}: {
  title: string;
  effective: string;
  children: React.ReactNode;
}) {
  return (
    <PageShell>
      <PageIntro eyebrow="The small print" title={title} lede={`Effective ${effective}. Java Mantra Corp, publisher of Talepuff.`} />
      <Section>
        <article className="prose-tp mx-auto max-w-3xl">{children}</article>
      </Section>
    </PageShell>
  );
}
