import type { Metadata } from "next";
import { AppCodePage } from "@/components/app-code";

export const metadata: Metadata = { title: "Confirm your email", robots: { index: false, follow: false } };

export default async function Verify({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = "" } = await searchParams;
  return <AppCodePage kind="verify" token={token.trim()} />;
}
