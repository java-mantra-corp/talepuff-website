"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { SUPPORT_EMAIL } from "@/components/site-content";

/**
 * The chat on the support page, talking to api.talepuff.com.
 *
 * SIGNED IN, ALWAYS. The agent answers questions about one family's cubes and plan, so
 * the family has to come from a session rather than from an address somebody typed —
 * otherwise "is bob@example.com a Talepuff customer" is answerable by anyone with this
 * page open. That is why there is a sign-in here at all.
 *
 * THE TOKEN LIVES IN sessionStorage, NEVER localStorage. It is a thirty-day credential
 * for a whole account; sessionStorage is scoped to this tab and dies when it closes,
 * which matches what this is for — a parent who is stuck, in one sitting. Signing out
 * revokes it at the server rather than only forgetting it here.
 *
 * EVERY FAILURE ENDS AT THE EMAIL ADDRESS. No agent configured, the service down, a
 * network that drops: each one says so plainly and offers the mailbox a person reads.
 * A chat that fails silently is worse than no chat, because the parent waits.
 */

const API = process.env.NEXT_PUBLIC_API_URL?.trim() || "https://api.talepuff.com";
/** Matches MAX_MESSAGE on the server, so the limit is felt here rather than as a 422. */
const MAX_MESSAGE = 2000;
const TOKEN_KEY = "talepuff.support.token";
const EXPIRY_KEY = "talepuff.support.expires";

type Said = { who: "you" | "talepuff"; text: string };

function readToken(): string | null {
  try {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const expires = sessionStorage.getItem(EXPIRY_KEY);
    if (!token || !expires) return null;
    if (Date.parse(expires) <= Date.now()) {
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(EXPIRY_KEY);
      return null;
    }
    return token;
  } catch {
    // Private browsing, or storage blocked. The chat still works for this page view.
    return null;
  }
}

function keepToken(token: string, expiresAt: string) {
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(EXPIRY_KEY, expiresAt);
  } catch {
    /* Not fatal: the token stays in memory for this page view. */
  }
}

function forgetToken() {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(EXPIRY_KEY);
  } catch {
    /* nothing to do */
  }
}

/**
 * The token as external state, so React reads it the one correct way.
 *
 * `sessionStorage` cannot be touched while rendering: the server has no such thing, and
 * a component that reads it during render hydrates into a mismatch. Reading it in an
 * effect and calling setState works but costs a second render pass on every mount, which
 * is what the linter objects to. `useSyncExternalStore` exists for precisely this — a
 * server snapshot of "signed out", the real value once the browser takes over.
 */
let memoryToken: string | null = null;
let loadedFromStorage = false;
const tokenListeners = new Set<() => void>();

function currentToken(): string | null {
  if (!loadedFromStorage) {
    memoryToken = readToken();
    loadedFromStorage = true;
  }
  return memoryToken;
}

function noTokenOnTheServer(): null {
  return null;
}

function subscribeToToken(listener: () => void) {
  tokenListeners.add(listener);
  return () => {
    tokenListeners.delete(listener);
  };
}

function putToken(token: string | null, expiresAt?: string) {
  memoryToken = token;
  loadedFromStorage = true;
  if (token && expiresAt) keepToken(token, expiresAt);
  else forgetToken();
  for (const listener of tokenListeners) listener();
}

const MAILTO = `mailto:${SUPPORT_EMAIL}?subject=Talepuff%20support`;

function EmailInstead({ lead }: { lead: string }) {
  return (
    <p className="text-sm text-muted">
      {lead}{" "}
      <a className="font-semibold text-accent underline" href={MAILTO}>
        {SUPPORT_EMAIL}
      </a>{" "}
      reaches a person.
    </p>
  );
}

export function SupportChat() {
  const token = useSyncExternalStore(subscribeToToken, currentToken, noTokenOnTheServer);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [signInError, setSignInError] = useState("");

  const [said, setSaid] = useState<Said[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [chatError, setChatError] = useState("");
  const [unavailable, setUnavailable] = useState(false);
  const [waitingOnAHuman, setWaitingOnAHuman] = useState(false);
  const conversationId = useRef<string | null>(null);
  const thread = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Keep the newest turn in view without stealing focus from the box.
    thread.current?.scrollTo({ top: thread.current.scrollHeight, behavior: "smooth" });
  }, [said, sending]);

  const signOut = useCallback(async () => {
    const current = token;
    putToken(null);
    setSaid([]);
    setWaitingOnAHuman(false);
    conversationId.current = null;
    if (!current) return;
    try {
      // Revoked at the server, not merely dropped here: a forgotten token is still a
      // working token for thirty days.
      await fetch(`${API}/v1/parents/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${current}` },
      });
    } catch {
      /* Already signed out as far as this browser is concerned. */
    }
  }, [token]);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setSignInError("");
    setSigningIn(true);
    try {
      const res = await fetch(`${API}/v1/parents/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account_email: email, password }),
      });
      if (res.status === 429) {
        const after = Number(res.headers.get("Retry-After") || 60);
        setSignInError(`Too many attempts. Try again in ${after} seconds.`);
        return;
      }
      if (!res.ok) {
        setSignInError("That email and password do not match.");
        return;
      }
      const body = await res.json();
      putToken(body.parent_token, body.expires_at);
      // The password is never kept, not even in component state.
      setPassword("");
    } catch {
      setSignInError("We could not reach Talepuff just now.");
    } finally {
      setSigningIn(false);
    }
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const message = draft.trim();
    if (!message || sending || !token) return;
    setChatError("");
    setSending(true);
    setSaid((previous) => [...previous, { who: "you", text: message }]);
    setDraft("");
    try {
      const res = await fetch(`${API}/v1/support/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          message,
          conversation_id: conversationId.current ?? undefined,
        }),
      });
      if (res.status === 401) {
        // Expired or revoked while the page was open. Say so rather than failing oddly,
        // and give the message back so it does not have to be typed twice.
        putToken(null);
        setDraft(message);
        setSaid((previous) => previous.slice(0, -1));
        setSignInError("That session ended. Sign in again and your message is still here.");
        return;
      }
      if (res.status === 503) {
        setUnavailable(true);
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setChatError(
          typeof body.detail === "string" ? body.detail : "That did not go through.",
        );
        return;
      }
      const body = await res.json();
      conversationId.current = body.conversation_id;
      setWaitingOnAHuman(Boolean(body.waiting_on_a_human));
      setSaid((previous) => [...previous, { who: "talepuff", text: body.reply }]);
    } catch {
      setChatError("We could not reach Talepuff just now.");
    } finally {
      setSending(false);
    }
  }

  if (unavailable) {
    return (
      <div className="rounded-xl2 border border-line bg-panel p-6">
        <h3 className="text-xl font-bold">The chat is not open yet</h3>
        <p className="mt-2 text-muted">
          We have not switched it on. Nothing is wrong with your cube.
        </p>
        <div className="mt-4">
          <EmailInstead lead="In the meantime," />
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="rounded-xl2 border border-line bg-panel p-6">
        <h3 className="text-xl font-bold">Ask about your cube</h3>
        <p className="mt-2 text-sm text-muted">
          Sign in with the same email and password you use in the app, and we can look at
          your own cubes and plan while we answer. We never see what your child asked for
          &mdash; that is yours, and no part of this chat can reach it.
        </p>
        <form onSubmit={signIn} className="mt-5 flex flex-col gap-3">
          <label className="sr-only" htmlFor="support-email">
            Email address
          </label>
          <input
            id="support-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="rounded-full border border-line bg-white/5 px-5 py-3 text-text placeholder:text-muted/70 outline-none focus:border-accent focus:ring-2 focus:ring-accent/40"
          />
          <label className="sr-only" htmlFor="support-password">
            Password
          </label>
          <input
            id="support-password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Your password"
            className="rounded-full border border-line bg-white/5 px-5 py-3 text-text placeholder:text-muted/70 outline-none focus:border-accent focus:ring-2 focus:ring-accent/40"
          />
          <button
            type="submit"
            disabled={signingIn}
            className="rounded-full bg-accent px-6 py-3 font-semibold text-bg transition hover:bg-accent-2 disabled:opacity-60"
          >
            {signingIn ? "Signing in…" : "Sign in and ask"}
          </button>
          {signInError ? (
            <p role="alert" className="text-sm text-accent">
              {signInError}
            </p>
          ) : null}
        </form>
        <div className="mt-5 border-t border-line pt-4">
          <EmailInstead lead="Would rather not sign in?" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl2 border border-line bg-panel p-6">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-xl font-bold">Ask about your cube</h3>
        <button
          onClick={signOut}
          className="text-sm text-muted underline hover:text-text"
          type="button"
        >
          Sign out
        </button>
      </div>

      <div
        ref={thread}
        className="mt-4 max-h-96 overflow-y-auto"
        aria-live="polite"
        aria-atomic="false"
      >
        {said.length === 0 ? (
          <p className="text-sm text-muted">
            Tell us what is happening. We can check whether your cube has reached us, how
            your plan stands, and send a fresh verification email. Anything that changes
            money or removes a cube goes to a person first &mdash; we will say so, and
            they will come back to you.
          </p>
        ) : null}
        <ul className="flex flex-col gap-3">
          {said.map((turn, index) => (
            <li
              key={index}
              className={
                turn.who === "you"
                  ? "self-end max-w-[85%] rounded-xl2 rounded-br-md bg-accent/15 px-4 py-3"
                  : "self-start max-w-[85%] rounded-xl2 rounded-bl-md bg-panel-2 px-4 py-3"
              }
            >
              <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                {turn.who === "you" ? "You" : "Talepuff"}
              </p>
              <p className="mt-1 whitespace-pre-wrap">{turn.text}</p>
            </li>
          ))}
          {sending ? (
            <li className="self-start rounded-xl2 bg-panel-2 px-4 py-3 text-muted">
              Looking…
            </li>
          ) : null}
        </ul>
      </div>

      {waitingOnAHuman ? (
        <p className="mt-4 rounded-xl2 border border-line bg-white/5 px-4 py-3 text-sm">
          A person has this now. They will reply by email, so there is nothing more to do
          here.
        </p>
      ) : null}

      <form onSubmit={send} className="mt-4 flex flex-col gap-2">
        <label className="sr-only" htmlFor="support-message">
          Your message
        </label>
        <textarea
          id="support-message"
          rows={3}
          required
          maxLength={MAX_MESSAGE}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="The cube stopped talking after we moved house…"
          className="rounded-xl2 border border-line bg-white/5 px-5 py-3 text-text placeholder:text-muted/70 outline-none focus:border-accent focus:ring-2 focus:ring-accent/40"
        />
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-muted">
            {draft.length > MAX_MESSAGE - 200 ? `${MAX_MESSAGE - draft.length} characters left` : ""}
          </span>
          <button
            type="submit"
            disabled={sending || !draft.trim()}
            className="rounded-full bg-accent px-6 py-3 font-semibold text-bg transition hover:bg-accent-2 disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send"}
          </button>
        </div>
        {chatError ? (
          <p role="alert" className="text-sm text-accent">
            {chatError} <EmailInstead lead="If it keeps happening," />
          </p>
        ) : null}
      </form>
    </div>
  );
}
