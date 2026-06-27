import type { Metadata } from "next";

import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { siteConfig } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default:
      "FitCalcLab - Fitness Calculators for Calories, Macros and Body Metrics",
    template: "%s | FitCalcLab",
  },

  description: siteConfig.description,

  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },

  applicationName: siteConfig.name,

  keywords: [
    "fitness calculator",
    "BMI calculator",
    "BMR calculator",
    "TDEE calculator",
    "macro calculator",
    "protein calculator",
    "water intake calculator",
    "body fat calculator",
    "ideal weight calculator",
    "one rep max calculator",
    "calorie calculator",
    "weight loss timeline calculator",
  ],

  authors: [
    {
      name: "FitCalcLab",
      url: siteConfig.url,
    },
  ],

  creator: "FitCalcLab",
  publisher: "FitCalcLab",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title:
      "FitCalcLab - Fitness Calculators for Calories, Macros and Body Metrics",
    description: siteConfig.description,
  },

  twitter: {
    card: "summary_large_image",
    title:
      "FitCalcLab - Fitness Calculators for Calories, Macros and Body Metrics",
    description: siteConfig.description,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <SiteJsonLd />

        <ThemeProvider>
          <ScrollProgress />
          <Header />
          {children}
          <Footer />
          <ThemeToggle />
        </ThemeProvider>

        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
      </body>
    </html>
  );
}
