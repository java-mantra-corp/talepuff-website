"use client";

import { useEffect, useState } from "react";
import { SUPPORT_EMAIL } from "@/components/site-content";
import { PageIntro, PageShell, Section } from "@/components/page-shell";

/**
 * A plain "is it us?" page, so a parent whose cube is quiet can tell in one glance whether
 * the service is up before they start unplugging things. It reads the same /health the
 * uptime check reads and says one of three honest things: everything is fine, something is
 * degraded, or we cannot even be reached.
 *
 * NO INTERNAL DETAIL. The health endpoint names circuits and dependencies; this page does
 * not repeat them. A parent needs "up" or "not up", not the plumbing, and the plumbing is
 * nobody else's business on a public page.
 */

const API = process.env.NEXT_PUBLIC_API_URL?.trim() || "https://api.talepuff.com";

type Health = { status?: string; database?: string; open_circuits?: string[] };
type Board =
  | { state: "checking" }
  | { state: "ok" }
  | { state: "degraded" }
  | { state: "unreachable" };

function classify(h: Health): "ok" | "degraded" {
  const healthy =
    h.status === "ok" && h.database === "ok" && (h.open_circuits?.length ?? 0) === 0;
  return healthy ? "ok" : "degraded";
}

export function StatusBoard() {
  const [board, setBoard] = useState<Board>({ state: "checking" });
  const [checkedAt, setCheckedAt] = useState<string>("");

  useEffect(() => {
    let live = true;
    async function check() {
      try {
        const res = await fetch(`${API}/health`, { cache: "no-store" });
        if (!live) return;
        if (!res.ok) {
          setBoard({ state: "degraded" });
        } else {
          const body = (await res.json()) as Health;
          setBoard({ state: classify(body) });
        }
      } catch {
        if (live) setBoard({ state: "unreachable" });
      } finally {
        if (live) setCheckedAt(new Date().toLocaleTimeString());
      }
    }
    check();
    // Re-check while the page is open, so a parent watching sees it recover.
    const timer = setInterval(check, 30_000);
    return () => {
      live = false;
      clearInterval(timer);
    };
  }, []);

  const copy = {
    checking: { dot: "#b3b6d6", title: "Checking…", lede: "One moment while we look." },
    ok: {
      dot: "#4ccf9f",
      title: "All systems normal",
      lede: "Talepuff is up and telling stories. If your cube is quiet, it is almost always the house Wi-Fi changing — set the cube up again from the app.",
    },
    degraded: {
      dot: "#ffb454",
      title: "We're looking into a problem",
      lede: "Something on our side is not fully healthy and our team is on it. Your stories may be slow or unavailable for a short while. Nothing is wrong with your cube.",
    },
    unreachable: {
      dot: "#ff8a80",
      title: "We can't reach Talepuff right now",
      lede: "We could not get an answer from the service. This is usually brief — try again in a few minutes.",
    },
  }[board.state];

  return (
    <PageShell>
      <PageIntro eyebrow="Status" title="Is Talepuff working?" />
      <Section>
        <div className="mx-auto max-w-xl">
          <div
            className="flex items-center gap-4 rounded-xl2 border border-line bg-panel p-6"
            role="status"
            aria-live="polite"
          >
            <span
              className="inline-block h-4 w-4 shrink-0 rounded-full"
              style={{ background: copy.dot }}
              aria-hidden="true"
            />
            <div>
              <h2 className="text-xl font-bold">{copy.title}</h2>
              <p className="mt-1 text-sm text-muted">{copy.lede}</p>
            </div>
          </div>
          {checkedAt ? (
            <p className="mt-3 text-center text-xs text-muted">
              Checked at {checkedAt}. This page re-checks every 30 seconds.
            </p>
          ) : null}
          <p className="mt-8 text-center text-sm text-muted">
            Still stuck?{" "}
            <a className="font-semibold text-accent underline" href="/support">
              Ask on the chat
            </a>{" "}
            or email{" "}
            <a className="underline" href={`mailto:${SUPPORT_EMAIL}?subject=Talepuff%20status`}>
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
