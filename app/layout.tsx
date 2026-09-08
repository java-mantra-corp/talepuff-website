import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.talepuff.com";
const TITLE = "Talepuff | A bedtime story cube. No screen.";
const DESCRIPTION =
  "Press the button, say what you'd like, and a storyteller begins. Talepuff makes a new bedtime story for your child every night, checked before it is spoken, with no screen and a microphone that only listens when pressed.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Talepuff" },
  description: DESCRIPTION,
  applicationName: "Talepuff",
  authors: [{ name: "Java Mantra Corp", url: "https://javamantra.com" }],
  creator: "Java Mantra Corp",
  publisher: "Java Mantra Corp",
  keywords: ["bedtime stories", "story cube", "screen-free", "kids", "storyteller", "Talepuff"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Talepuff",
    locale: "en_US",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Talepuff, a bedtime story cube" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full scroll-smooth antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
