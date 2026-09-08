import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function NotFound() {
  return (
    <PageShell>
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-4xl font-extrabold">That page wandered off.</h1>
        <p className="mt-4 text-ink-soft">Like the best stories, it may have gone somewhere better.</p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-amber px-6 py-3 font-extrabold text-white">
          Back to the start
        </Link>
      </div>
    </PageShell>
  );
}
