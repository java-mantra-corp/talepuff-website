import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.talepuff.com";
  return { rules: { userAgent: "*", allow: "/", disallow: ["/verify", "/reset", "/api/"] }, sitemap: `${base}/sitemap.xml` };
}
