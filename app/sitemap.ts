import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

const routes = [
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
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/calculators" ? 0.9 : 0.8,
  }));
}
