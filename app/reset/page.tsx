import type { Metadata } from "next";
import { ResetForm } from "@/components/reset-form";

export const metadata: Metadata = {
  title: "Reset your password",
  robots: { index: false, follow: false },
};

export default async function Reset({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = "" } = await searchParams;
  return <ResetForm token={token.trim()} />;
}
