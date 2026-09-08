import { BrandMark } from "@/components/brand-mark";

export function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl2 border border-sand bg-white/70 p-6 shadow-sm">
      <h3 className="text-lg font-extrabold text-ink">{title}</h3>
      <p className="mt-2 text-ink-soft">{body}</p>
    </div>
  );
}

export function StepCard({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <li className="flex gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber text-lg font-extrabold text-white">
        {n}
      </span>
      <div>
        <h3 className="text-lg font-extrabold text-ink">{title}</h3>
        <p className="mt-1 text-ink-soft">{body}</p>
      </div>
    </li>
  );
}

export function StorytellerCard({ name, voice, likes }: { name: string; voice: string; likes: string }) {
  return (
    <div className="rounded-xl2 bg-white/70 p-5 shadow-sm ring-1 ring-sand">
      <div className="flex items-center gap-3">
        <BrandMark className="size-9 text-amber" />
        <h3 className="font-extrabold text-ink">{name}</h3>
      </div>
      <p className="mt-3 text-sm font-bold text-ink-soft">{voice}</p>
      <p className="mt-1 text-sm text-ink-soft">{likes}</p>
    </div>
  );
}

export function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-xl2 border border-sand bg-white/70 p-5 open:shadow-sm">
      <summary className="cursor-pointer list-none text-base font-extrabold text-ink marker:hidden">
        <span className="flex items-center justify-between gap-4">
          {q}
          <span aria-hidden="true" className="text-amber transition group-open:rotate-45">+</span>
        </span>
      </summary>
      <p className="mt-3 text-ink-soft">{a}</p>
    </details>
  );
}
