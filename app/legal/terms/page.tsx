import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal-doc";
import { plan } from "@/components/site-content";

export const metadata: Metadata = { title: "Terms of service", alternates: { canonical: "/legal/terms" } };

export default function Terms() {
  return (
    <LegalDoc title="Terms of service" effective="when the first cube ships (draft)">
      <p>These terms are the agreement between you and Java Mantra Corp for the Talepuff cube, the Talepuff app and the Talepuff service. Using any of them means you accept these terms.</p>
      <h2>1. Who can use Talepuff</h2>
      <p>An account is opened by an adult who is the parent or legal guardian of every child using it. You are responsible for the children who use cubes on your account and for the consent you give on their behalf.</p>
      <h2>2. The cube</h2>
      <p>The cube is sold as a one-time purchase and is yours. It needs the Talepuff service to tell new stories; without a plan it continues to replay stories already told and to tell the stories it carries on board.</p>
      <h2>3. The plan</h2>
      <p>
        The plan is ${plan.monthly} a month or ${plan.yearly} a year, for up to {plan.children} children and {plan.cubes} cubes, with {plan.newStoriesPerChildPerNight} new stories per child each night and unlimited replays. The first {plan.trialDays} days are free and begin with the first story told. Prices may change with 30 days&rsquo; notice by email; a change never applies before your next renewal. You can cancel at any time from the app and the plan runs to the end of the period you paid for.
      </p>
      <h2>4. Fair use</h2>
      <p>The nightly story limit exists so that the price can stay the same for everyone. We may pause an account that uses the service in ways it was not designed for, such as automated requests, and we will tell you if we do.</p>
      <h2>5. Content</h2>
      <p>Stories are generated for your child&rsquo;s request and are checked before they are spoken, but no automated check is perfect. If a story is not what you would want your child to hear, tell us and we will look into it. Stories are for your family&rsquo;s private use.</p>
      <h2>6. Your account</h2>
      <p>Keep your password to yourself. Tell us if you think someone else has used your account. We may close an account that breaks these terms; you may close yours at any time in the app.</p>
      <h2>7. Warranty and returns</h2>
      <p>The cube is covered for one year against defects in materials and workmanship. Returns are described in the returns policy.</p>
      <h2>8. Liability</h2>
      <p>To the extent the law allows, our liability to you is limited to what you paid us in the twelve months before the claim. Nothing in these terms limits liability that cannot be limited by law.</p>
      <h2>9. Changes and contact</h2>
      <p>We will email you before these terms change in a way that matters. Questions: <a href="mailto:hello@talepuff.com">hello@talepuff.com</a>.</p>
    </LegalDoc>
  );
}
