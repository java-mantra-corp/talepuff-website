"use client";

import { useState } from "react";
import { APP_SCHEME, SUPPORT_EMAIL } from "@/components/site-content";
import { PageIntro, PageShell, Section } from "@/components/page-shell";

/**
 * Setting a new password on the web, from the link in a reset email.
 *
 * WHY THIS EXISTS ON THE WEB AT ALL. The email link used to land on a page that only
 * showed the code and said "type it into the app". That serves a parent holding their
 * phone and nobody else — and the whole reason for the support chat is helping a parent
 * at their computer who is stuck. A forgotten password with no way through is a dead end,
 * and a forgotten password is the common case for a login set once at unboxing.
 *
 * The token came to the address and back, which the server treats as proof the address
 * is real: a completed reset also verifies the email. Confirming ends every session on
 * the account, so a lifted token or an old device is signed out by the same action.
 *
 * The "Open in Talepuff" button stays for a parent who does have the app — but the form
 * is the primary path now, not a fallback.
 */

const API = process.env.NEXT_PUBLIC_API_URL?.trim() || "https://api.talepuff.com";
const MIN_PASSWORD = 8;

type State = "editing" | "saving" | "done";

export function ResetForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [state, setState] = useState<State>("editing");
  const [error, setError] = useState("");

  const inputClass =
    "w-full rounded-full border border-line bg-white/5 px-5 py-3 text-text placeholder:text-muted/70 outline-none focus:border-accent focus:ring-2 focus:ring-accent/40";

  if (!token) {
    return (
      <PageShell>
        <PageIntro
          eyebrow="Reset your password"
          title="This link has no code"
          lede="Open the reset email again and tap the link, or ask for a new one from the chat."
        />
        <Section>
          <div className="mx-auto max-w-md text-center text-muted">
            <a href="/support" className="font-semibold text-accent underline">
              Go to support
            </a>
          </div>
        </Section>
      </PageShell>
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < MIN_PASSWORD) {
      setError(`A password needs at least ${MIN_PASSWORD} characters.`);
      return;
    }
    if (password !== confirm) {
      setError("Those two passwords do not match.");
      return;
    }
    setState("saving");
    try {
      const res = await fetch(`${API}/v1/parents/password-reset/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (res.ok) {
        setState("done");
        return;
      }
      if (res.status === 400) {
        // Unknown, already used, or expired. A reset code is single-use on purpose.
        setError(
          "That link has expired or was already used. Ask for a new one from the chat.",
        );
      } else if (res.status === 422) {
        const body = await res.json().catch(() => ({}));
        setError(typeof body.detail === "string" ? body.detail : "That password will not do.");
      } else {
        setError("Something went wrong. Try again in a moment.");
      }
      setState("editing");
    } catch {
      setError("We could not reach Talepuff just now.");
      setState("editing");
    }
  }

  if (state === "done") {
    return (
      <PageShell>
        <PageIntro
          eyebrow="Reset your password"
          title="Password changed"
          lede="Every device signed in to this account has been signed out, including any you did not know about. Sign in again with the new password."
        />
        <Section>
          <div className="mx-auto max-w-md text-center">
            <a
              href="/support"
              className="inline-block rounded-full bg-accent px-6 py-3 font-semibold text-bg hover:bg-accent-2"
            >
              Sign in on the chat
            </a>
            <p className="mt-4 text-sm text-muted">
              Or open the Talepuff app and sign in there.
            </p>
          </div>
        </Section>
      </PageShell>
    );
  }

  const deepLink = `${APP_SCHEME}reset?token=${encodeURIComponent(token)}`;

  return (
    <PageShell>
      <PageIntro
        eyebrow="Reset your password"
        title="Choose a new password"
        lede="Set it here, then sign in on the chat or in the app."
      />
      <Section>
        <div className="mx-auto max-w-md">
          <form onSubmit={submit} className="flex flex-col gap-3">
            <label className="sr-only" htmlFor="new-password">
              New password
            </label>
            <input
              id="new-password"
              type="password"
              required
              autoComplete="new-password"
              minLength={MIN_PASSWORD}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className={inputClass}
            />
            <label className="sr-only" htmlFor="confirm-password">
              Confirm new password
            </label>
            <input
              id="confirm-password"
              type="password"
              required
              autoComplete="new-password"
              minLength={MIN_PASSWORD}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Type it again"
              className={inputClass}
            />
            <button
              type="submit"
              disabled={state === "saving"}
              className="rounded-full bg-accent px-6 py-3 font-semibold text-bg transition hover:bg-accent-2 disabled:opacity-60"
            >
              {state === "saving" ? "Saving…" : "Set new password"}
            </button>
            {error ? (
              <p role="alert" className="text-sm text-accent">
                {error}
              </p>
            ) : null}
          </form>
          <p className="mt-6 text-center text-sm text-muted">
            At least {MIN_PASSWORD} characters. The link works for one hour and only once.
          </p>
          <div className="mt-6 border-t border-line pt-5 text-center">
            <a href={deepLink} className="text-sm text-muted underline hover:text-text">
              Have the app? Open it in Talepuff instead
            </a>
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            Not you? Ignore this &mdash; nothing changes until the code is used.{" "}
            <a className="underline" href={`mailto:${SUPPORT_EMAIL}?subject=Talepuff%20support`}>
              {SUPPORT_EMAIL}
            </a>
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
