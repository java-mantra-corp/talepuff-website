import type { Metadata } from "next";
import { StatusBoard } from "@/components/status-board";

export const metadata: Metadata = {
  title: "Status",
  description: "Whether the Talepuff service is up right now.",
  alternates: { canonical: "/status" },
};

export default function Status() {
  return <StatusBoard />;
}
