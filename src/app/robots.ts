import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/it", "/en"],
      disallow: ["/app", "/it/app", "/en/app"],
    },
    sitemap: "https://executebase.com/sitemap.xml",
    host: "https://executebase.com",
  }
}
