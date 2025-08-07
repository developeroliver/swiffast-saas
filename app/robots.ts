import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/pricing"],
      disallow: ["/dashboard/", "/premium/", "/api/"],
    },
    sitemap: "https://www.swiftfast.me/sitemap.xml",
  };
}
