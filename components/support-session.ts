/**
 * The parent's support session, shared by the chat widget and the /signin landing.
 *
 * ONE STORE, ON PURPOSE. The widget reads the session to know if a parent is signed in;
 * the magic-link landing writes it after redeeming a link. If those two kept separate
 * copies — even just separate storage keys — a magic link would appear to work and then
 * the chat would still show signed-out, the worst kind of bug because nothing errors. So
 * the keys, the read/write, and the in-memory value all live here and both import them.
 *
 * IN-MEMORY AS WELL AS IN sessionStorage, so a client-side navigation from /signin to
 * /support carries the session without a full reload: the module stays alive across the
 * route change and `putSession` has already updated the value the widget subscribes to.
 *
 * sessionStorage, NEVER localStorage: a session is a thirty-day credential for a whole
 * account, and sessionStorage dies with the tab, which matches a parent who is stuck in
 * one sitting. Every access is wrapped because it throws in private windows and with site
 * data blocked; the value then lives only in memory for the page view, which still works.
 */

const TOKEN_KEY = "talepuff.support.token";
const EXPIRY_KEY = "talepuff.support.expires";

let memoryToken: string | null = null;
let loaded = false;
const listeners = new Set<() => void>();

function readFromStorage(): string | null {
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
    return null;
  }
}

/** The current session token, or null. Reads storage once, then trusts memory. */
export function currentSession(): string | null {
  if (!loaded) {
    memoryToken = readFromStorage();
    loaded = true;
  }
  return memoryToken;
}

/** The server snapshot for useSyncExternalStore: always signed out on the server. */
export function noSessionOnTheServer(): null {
  return null;
}

export function subscribeToSession(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Set or clear the session everywhere at once: memory, storage, and every subscriber. */
export function putSession(token: string | null, expiresAt?: string) {
  memoryToken = token;
  loaded = true;
  try {
    if (token && expiresAt) {
      sessionStorage.setItem(TOKEN_KEY, token);
      sessionStorage.setItem(EXPIRY_KEY, expiresAt);
    } else {
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(EXPIRY_KEY);
    }
  } catch {
    /* Storage blocked: the value still lives in memory for this page view. */
  }
  for (const listener of listeners) listener();
}
