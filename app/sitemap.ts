import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.talepuff.com";
  const now = new Date();
  return ["", "/how-it-works", "/pricing", "/privacy", "/support", "/legal/terms", "/legal/privacy-policy", "/legal/returns"].map(
    (path) => ({ url: `${base}${path}`, lastModified: now }),
  );
}
