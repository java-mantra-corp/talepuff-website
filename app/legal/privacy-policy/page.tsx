import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal-doc";

export const metadata: Metadata = { title: "Privacy policy", alternates: { canonical: "/legal/privacy-policy" } };

export default function PrivacyPolicy() {
  return (
    <LegalDoc title="Privacy policy" effective="when the first cube ships (draft)">
      <p>
        This policy explains what Java Mantra Corp (&ldquo;Talepuff&rdquo;, &ldquo;we&rdquo;) collects when you use the Talepuff cube, the Talepuff app and talepuff.com, why, and what you can do about it. The plain-words summary for parents is at /privacy and is part of this policy.
      </p>
      <h2>1. Who this is for</h2>
      <p>
        Talepuff is bought and set up by a parent or guardian (&ldquo;you&rdquo;). It is used by children. We know that, and we treat every request made through a cube as a child&rsquo;s data.
      </p>
      <h2>2. What we collect</h2>
      <ul>
        <li><strong>Account:</strong> your email address and a password we store only as a hash.</li>
        <li><strong>Child profile:</strong> a first name or nickname, an age, a time zone and a chosen storyteller. We never ask for a surname, a photo, a birthday or a location.</li>
        <li><strong>Requests:</strong> the words a child says after pressing the button, produced by transcribing up to eight seconds of audio. The audio itself is discarded after transcription and is never stored.</li>
        <li><strong>Stories:</strong> the text, title and narration we generate in response, kept as your family&rsquo;s library.</li>
        <li><strong>Device data:</strong> the cube&rsquo;s serial, firmware version and when it was last online.</li>
        <li><strong>Payment:</strong> handled by our payment provider; we receive the plan status and the last four digits of a card, never the number.</li>
        <li><strong>Website:</strong> if you join the waitlist, your email address. We use privacy-respecting analytics without cookies.</li>
      </ul>
      <h2>3. Children&rsquo;s privacy (COPPA)</h2>
      <p>
        Before the first story can be told, we obtain a parent&rsquo;s verifiable consent in the app, tied to the parent&rsquo;s account and payment method. We collect from a child only what a story needs: the request, a first name and an age. We do not show advertising, we do not build profiles for marketing, and we do not sell or rent children&rsquo;s data to anyone. A parent can review what was collected, withdraw consent and delete it at any time in the app. Requests about children&rsquo;s data: <a href="mailto:hello@talepuff.com">hello@talepuff.com</a>.
      </p>
      <h2>4. How we use it</h2>
      <ul>
        <li>To transcribe a request and write and narrate a story for that request and age.</li>
        <li>To keep your family&rsquo;s library and replay stories.</li>
        <li>To run safety checks on requests and stories.</li>
        <li>To run your account, your plan and support.</li>
      </ul>
      <h2>5. Who we share it with</h2>
      <p>
        Requests and story text are processed by an AI service provider under terms that forbid using them to train models. Narration audio is stored with a cloud storage provider. Payments are processed by our payment provider. Each is bound by contract to use the data only to provide the service to us. We share data with nobody else, except where the law requires.
      </p>
      <h2>6. How long we keep it</h2>
      <ul>
        <li>Request audio: not kept.</li>
        <li>Request words: 30 days.</li>
        <li>Stories: for the life of your account; stories not played for 12 months may be removed, except favourites and the latest episode of a series.</li>
        <li>Account and child profiles: until you delete them.</li>
        <li>After an account is closed: 90 days, then deletion.</li>
        <li>Billing records: as long as tax law requires.</li>
      </ul>
      <h2>7. Your choices</h2>
      <p>
        In the app you can see each child&rsquo;s requests and stories, change or remove a child, withdraw consent, and close the account. Deletion reaches our backups within 30 days. You can also email us to exercise any right you have under the laws of your state or country, including access, correction and deletion.
      </p>
      <h2>8. Security</h2>
      <p>
        All traffic between the cube, the app and our servers is encrypted. The cube holds only a token for its own account, never an API key or a password. Passwords are hashed. Our staff do not read requests unless you ask us to investigate a problem.
      </p>
      <h2>9. Changes</h2>
      <p>We will email account holders before any change that affects children&rsquo;s data, and we will never make a change that reduces a child&rsquo;s protection retroactively.</p>
      <h2>10. Contact</h2>
      <p>Java Mantra Corp, <a href="mailto:hello@talepuff.com">hello@talepuff.com</a>.</p>
    </LegalDoc>
  );
}
