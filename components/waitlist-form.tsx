"use client";

import { useState } from "react";
import { SUPPORT_EMAIL } from "@/components/site-content";

type State = "idle" | "sending" | "done" | "failed" | "mailto";

/**
 * One field, one button. Posts to /api/waitlist, which emails the address to the support
 * inbox. Without SMTP configured the route answers 503 and the form shows a mailto link,
 * so the page never has a dead button.
 */
export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.status === 503) {
        setState("mailto");
        return;
      }
      setState(res.ok ? "done" : "failed");
    } catch {
      setState("failed");
    }
  }

  if (state === "done") {
    return (
      <p className="rounded-xl2 border border-line bg-panel p-5 font-semibold">
        You are on the list. We will write when cubes ship, and not before.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row" id="waitlist">
      <label className="sr-only" htmlFor="waitlist-email">
        Email address
      </label>
      <input
        id="waitlist-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="min-w-0 flex-1 rounded-full border border-line bg-white/5 px-5 py-3 text-text placeholder:text-muted/70 outline-none focus:border-accent focus:ring-2 focus:ring-accent/40"
      />
      <button
        type="submit"
        disabled={state === "sending"}
        className="rounded-full bg-accent px-6 py-3 font-semibold text-bg transition hover:bg-accent-2 disabled:opacity-60"
      >
        {state === "sending" ? "Adding…" : "Tell me when it ships"}
      </button>
      {state === "failed" ? (
        <p className="text-sm text-muted sm:basis-full">
          That did not go through. Try again, or email{" "}
          <a className="underline" href={`mailto:${SUPPORT_EMAIL}?subject=Waitlist`}>
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      ) : null}
      {state === "mailto" ? (
        <p className="text-sm text-muted sm:basis-full">
          The list is not open yet. Email{" "}
          <a className="underline" href={`mailto:${SUPPORT_EMAIL}?subject=Waitlist`}>
            {SUPPORT_EMAIL}
          </a>{" "}
          and we will add you by hand.
        </p>
      ) : null}
    </form>
  );
}
