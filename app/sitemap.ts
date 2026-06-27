import type { MetadataRoute } from "next";

import { blogPosts } from "@/data/blogPosts";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  "/",
  "/calculators",
  "/bmi-calculator",
  "/bmr-calculator",
  "/tdee-calculator",
  "/macro-calculator",
  "/protein-calculator",
  "/water-intake-calculator",
  "/body-fat-calculator",
  "/ideal-weight-calculator",
  "/one-rep-max-calculator",
  "/calorie-calculator",
  "/weight-loss-timeline-calculator",
  "/blog",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const staticUrls = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));

  const blogUrls = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticUrls, ...blogUrls];
}

