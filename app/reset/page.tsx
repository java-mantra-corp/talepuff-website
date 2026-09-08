import type { Metadata } from "next";
import { AppCodePage } from "@/components/app-code";

export const metadata: Metadata = { title: "Reset your password", robots: { index: false, follow: false } };

export default async function Reset({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = "" } = await searchParams;
  return <AppCodePage kind="reset" token={token.trim()} />;
}
