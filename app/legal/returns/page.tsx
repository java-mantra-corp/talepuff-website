import type { Metadata } from "next";
import { LegalDoc } from "@/components/legal-doc";

export const metadata: Metadata = { title: "Returns", alternates: { canonical: "/legal/returns" } };

export default function Returns() {
  return (
    <LegalDoc title="Returns and refunds" effective="when the first cube ships (draft)">
      <h2>The cube</h2>
      <p>
        If Talepuff is not right for your family, send the cube back within 30 days of delivery for a full refund of the cube&rsquo;s price. Email <a href="mailto:hello@talepuff.com">hello@talepuff.com</a> with your order number; we send a prepaid label within one business day. The cube should come back with its cable and card, in any condition short of damage.
      </p>
      <h2>The plan</h2>
      <p>
        The first 14 days are free, so there is nothing to refund during the trial. A monthly plan can be cancelled at any time and runs to the end of the month paid for. A yearly plan cancelled within 30 days of the first payment is refunded in full; after that it runs to the end of the year paid for.
      </p>
      <h2>A cube that stops working</h2>
      <p>Within the first year we replace a defective cube at no cost. Your library and your child&rsquo;s profile move to the new cube when you set it up.</p>
    </LegalDoc>
  );
}
