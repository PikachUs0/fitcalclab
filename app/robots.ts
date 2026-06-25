import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },

      // OpenAI / ChatGPT visibility
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },

      // Anthropic / Claude visibility
      {
        userAgent: "Claude-SearchBot",
        allow: "/",
      },
      {
        userAgent: "Claude-User",
        allow: "/",
      },

      // Perplexity visibility
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },

      // Google search visibility
      {
        userAgent: "Googlebot",
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}