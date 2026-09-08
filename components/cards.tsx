import { BrandMark } from "@/components/brand-mark";

const panel = "rounded-xl2 border border-line bg-panel/80 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)]";

export function FeatureCard({ title, body }: { title: string; body: string }) {
  return (
    <div className={panel}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-muted">{body}</p>
    </div>
  );
}

export function StepCard({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <li className="flex gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-bold text-bg shadow-[0_0_20px_rgba(255,180,84,0.45)]">
        {n}
      </span>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-muted">{body}</p>
      </div>
    </li>
  );
}

export function StorytellerCard({ name, voice, likes }: { name: string; voice: string; likes: string }) {
  return (
    <div className={panel}>
      <div className="flex items-center gap-3">
        <BrandMark className="size-9 text-accent" face="#141b3a" />
        <h3 className="font-semibold">{name}</h3>
      </div>
      <p className="mt-3 text-sm font-medium text-text/90">{voice}</p>
      <p className="mt-1 text-sm text-muted">{likes}</p>
    </div>
  );
}

export function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-xl2 border border-line bg-panel/60 p-5 open:bg-panel">
      <summary className="cursor-pointer list-none text-base font-semibold marker:hidden">
        <span className="flex items-center justify-between gap-4">
          {q}
          <span aria-hidden="true" className="text-accent transition group-open:rotate-45">+</span>
        </span>
      </summary>
      <p className="mt-3 text-muted">{a}</p>
    </details>
  );
}
