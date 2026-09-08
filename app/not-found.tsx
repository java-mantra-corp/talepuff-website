import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function NotFound() {
  return (
    <PageShell>
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-4xl font-bold">That page wandered off.</h1>
        <p className="mt-4 text-muted">Like the best stories, it may have gone somewhere better.</p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-accent px-6 py-3 font-bold text-bg">
          Back to the start
        </Link>
      </div>
    </PageShell>
  );
}
