import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, PageShell, Section } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Privacy for parents",
  description: "What the cube hears, what Talepuff keeps, for how long, and how to delete it. In plain words.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyForParents() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="For parents"
        title="What the cube hears, and what happens to it"
        lede="This page is the plain-words version. The legal version is the privacy policy, and the two say the same thing."
      />
      <Section>
        <div className="prose-tp mx-auto max-w-3xl">
          <h2>The microphone</h2>
          <p>
            The microphone is off until the button is pressed. After a press it records for eight seconds, sends that audio to Talepuff to be turned into words, and the audio is discarded. There is no wake word and nothing listens in between presses. The cube cannot be turned into a listening device by us or by anyone else, because the microphone is not wired to be on.
          </p>
          <h2>What we keep, and for how long</h2>
          <table>
            <thead>
              <tr>
                <th>What</th>
                <th>Kept</th>
                <th>Why</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>The recording of a request</td>
                <td>Never</td>
                <td>It is turned into words and discarded within seconds</td>
              </tr>
              <tr>
                <td>The words of a request</td>
                <td>30 days</td>
                <td>So &ldquo;the one from yesterday&rdquo; works, and so you can see what was asked</td>
              </tr>
              <tr>
                <td>Stories: text, title and narration</td>
                <td>For the life of your account</td>
                <td>They are your family&rsquo;s library. Stories not played for 12 months are tidied away, except favourites and the latest episode of a series</td>
              </tr>
              <tr>
                <td>Your child&rsquo;s profile: first name, age, storyteller</td>
                <td>Until you remove the child</td>
                <td>Every story is written for that age</td>
              </tr>
              <tr>
                <td>After you close the account</td>
                <td>90 days, then everything is deleted</td>
                <td>So a family that comes back finds its library</td>
              </tr>
            </tbody>
          </table>
          <h2>Consent, because it is your child</h2>
          <p>
            Before the first story you give consent in the app, once, with your account. You can withdraw it in the app at any time; the cube then declines new stories until consent is given again. This is how Talepuff meets the Children&rsquo;s Online Privacy Protection Act (COPPA) in the United States. We collect only what a story needs: a first name, an age and the request itself.
          </p>
          <h2>Who sees your child&rsquo;s words</h2>
          <p>
            The request is sent to an AI provider to be transcribed and to write the story, under a contract that forbids using it to train their models. No advertising company ever sees it. Nobody at Talepuff reads requests unless you ask us to look into a problem.
          </p>
          <h2>What is checked</h2>
          <p>
            Every request and every story passes five layers of checks before a word is spoken: on what was asked, on what was written, sentence by sentence as it is read, on the rules each storyteller keeps, and a last check on the voice itself. If a request should not be a story, the storyteller says so politely and offers something else. You can see the request in the app.
          </p>
          <h2>Deleting everything</h2>
          <p>
            Remove a child in the app and every story, title and request for that child is erased from our servers and from our backups within 30 days. Close your account and the rest goes the same way. You do not need to email anyone.
          </p>
          <p>
            Questions: <a href="mailto:hello@talepuff.com">hello@talepuff.com</a>. The legal text is at <Link href="/legal/privacy-policy">the privacy policy</Link>.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
