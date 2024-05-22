import { MetadataRoute } from "next"

// import appConfig from "@/config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/TODO"],
    },
    // sitemap: `${appConfig.siteUrl}/sitemap.xml`,
  }
}
