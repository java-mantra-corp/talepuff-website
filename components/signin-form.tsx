"use client";

import { useEffect, useRef, useState } from "react";
import { SUPPORT_EMAIL } from "@/components/site-content";
import { PageIntro, PageShell, Section } from "@/components/page-shell";
import { putSession } from "@/components/support-session";

/**
 * The landing for a magic sign-in link. It redeems the token for a session, stores it in
 * the shared support session, and points the parent at the chat — where the widget reads
 * the same session and is already signed in.
 *
 * REDEEMED ONCE. The link is single-use, so a double redeem (React re-running the effect,
 * or the parent refreshing) would fail the second time and look broken. A ref gates it to
 * exactly one attempt per mount, and a refresh after success lands on the success state
 * from memory rather than trying again.
 *
 * SAME-DEVICE BY DESIGN. Redeeming stores the session in THIS browser. A parent who opens
 * the link on their phone is signed in on the phone and chats there; one who opens it on
 * the desktop they asked from is signed in on the desktop. That is the whole model, and it
 * is why nothing here tries to reach back to the tab that requested the link.
 */

const API = process.env.NEXT_PUBLIC_API_URL?.trim() || "https://api.talepuff.com";

type State = "working" | "done" | "invalid" | "error";

export function SignInForm({ token }: { token: string }) {
  const [state, setState] = useState<State>(token ? "working" : "invalid");
  const attempted = useRef(false);

  useEffect(() => {
    if (!token || attempted.current) return;
    attempted.current = true;
    (async () => {
      try {
        const res = await fetch(`${API}/v1/parents/magic-link/consume`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        if (res.ok) {
          const body = await res.json();
          putSession(body.parent_token, body.expires_at);
          setState("done");
          return;
        }
        // 400: unknown, already used, or expired. Single-use links are meant to fail here.
        setState(res.status === 400 ? "invalid" : "error");
      } catch {
        setState("error");
      }
    })();
  }, [token]);

  if (state === "done") {
    return (
      <PageShell>
        <PageIntro
          eyebrow="Sign in"
          title="You're signed in"
          lede="Head to the chat and ask about your cube — you will not need to sign in again in this tab."
        />
        <Section>
          <div className="mx-auto max-w-md text-center">
            <a
              href="/support"
              className="inline-block rounded-full bg-accent px-6 py-3 font-semibold text-bg hover:bg-accent-2"
            >
              Go to the chat
            </a>
          </div>
        </Section>
      </PageShell>
    );
  }

  if (state === "invalid") {
    return (
      <PageShell>
        <PageIntro
          eyebrow="Sign in"
          title={token ? "This link has expired" : "This link has no code"}
          lede={
            token
              ? "A sign-in link works for fifteen minutes and only once. Ask for a fresh one from the chat."
              : "Open the sign-in email again and tap the link, or ask for a new one from the chat."
          }
        />
        <Section>
          <div className="mx-auto max-w-md text-center">
            <a
              href="/support"
              className="inline-block rounded-full bg-accent px-6 py-3 font-semibold text-bg hover:bg-accent-2"
            >
              Ask for a new link
            </a>
          </div>
        </Section>
      </PageShell>
    );
  }

  if (state === "error") {
    return (
      <PageShell>
        <PageIntro
          eyebrow="Sign in"
          title="We could not sign you in"
          lede="Something went wrong reaching Talepuff. Try the link again in a moment."
        />
        <Section>
          <div className="mx-auto max-w-md text-center">
            <p className="text-sm text-muted">
              If it keeps happening,{" "}
              <a className="font-semibold text-accent underline" href={`mailto:${SUPPORT_EMAIL}?subject=Talepuff%20support`}>
                {SUPPORT_EMAIL}
              </a>{" "}
              reaches a person.
            </p>
          </div>
        </Section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageIntro eyebrow="Sign in" title="Signing you in…" lede="One moment." />
      <Section>
        <div className="mx-auto max-w-md text-center text-muted" aria-live="polite">
          Redeeming your link.
        </div>
      </Section>
    </PageShell>
  );
}
