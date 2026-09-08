import Link from "next/link";
import { APP_SCHEME } from "@/components/site-content";
import { PageIntro, PageShell, Section } from "@/components/page-shell";

/**
 * The landing for the links in verification and password-reset emails. The email carries
 * a token; the app is what redeems it. On a phone with Talepuff installed the button opens
 * the app on the right screen; anywhere else the code is shown to type in.
 */
export function AppCodePage({
  kind,
  token,
}: {
  kind: "verify" | "reset";
  token: string;
}) {
  const copy =
    kind === "verify"
      ? {
          eyebrow: "Confirm your email",
          title: "Almost there",
          lede: "Open this on the phone with the Talepuff app, or type the code into the app under Settings › Account.",
          screen: "Confirm email",
        }
      : {
          eyebrow: "Reset your password",
          title: "Choose a new password in the app",
          lede: "Open this on the phone with the Talepuff app, or type the code into the app on the Forgot password screen.",
          screen: "Reset password",
        };
  const deepLink = token ? `${APP_SCHEME}${kind}?token=${encodeURIComponent(token)}` : "";
  return (
    <PageShell>
      <PageIntro eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />
      <Section>
        <div className="mx-auto max-w-md text-center">
          {token ? (
            <>
              <p className="text-sm font-semibold text-muted uppercase tracking-[0.2em]">Your code</p>
              <p className="mt-2 rounded-xl2 border border-line bg-panel px-4 py-5 font-mono text-2xl font-bold tracking-widest break-all">
                {token}
              </p>
              <a href={deepLink} className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-bg hover:bg-accent-2">
                Open in Talepuff
              </a>
              <p className="mt-4 text-sm text-muted">
                The button works on the phone that has the app. Elsewhere, type the code on the {copy.screen} screen. Codes expire, so use it today.
              </p>
            </>
          ) : (
            <p className="text-muted">
              This link has no code in it. Open the email again and tap the link, or ask the app to send a new one.
            </p>
          )}
          <p className="mt-8 text-sm text-muted">
            Not you? Ignore this page. Nothing changes until the code is used in the app. <Link href="/support" className="underline">Support</Link>
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
