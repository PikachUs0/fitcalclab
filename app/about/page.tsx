import type { Metadata } from "next";

import { MotionSection } from "@/components/motion/MotionSection";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About FitCalcLab",
  description:
    "Learn about FitCalcLab, a simple fitness calculator website for BMI, BMR, TDEE, macros, protein, water intake and body metrics.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About FitCalcLab",
    description:
      "FitCalcLab provides simple, privacy-friendly fitness calculators for calories, macros, hydration, body metrics and training estimates.",
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About FitCalcLab",
    description:
      "Learn about FitCalcLab and its simple fitness calculator tools.",
  },
};

export default function AboutPage() {
  return (
    <main className="bg-slate-50">
      <MotionSection className="mx-auto max-w-4xl px-4 py-14">
        <p className="text-sm font-medium text-emerald-700">About</p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
          About FitCalcLab
        </h1>

        <p className="mt-5 text-lg leading-8 text-slate-600">
          FitCalcLab is a collection of simple fitness calculators designed to
          help people estimate useful numbers such as BMI, BMR, TDEE, macros,
          protein intake, water intake, body fat percentage and training
          estimates.
        </p>

        <div className="mt-10 grid gap-5">
          <Card className="border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Our goal
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              The goal of FitCalcLab is to make fitness numbers easier to
              understand. Instead of complicated spreadsheets or unclear
              formulas, each calculator is built to be fast, clean and easy to
              use on both desktop and mobile devices.
            </p>
          </Card>

          <Card className="border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Privacy-friendly by design
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              FitCalcLab does not require an account to use its calculators.
              Some preferences and calculator values may be saved locally in
              the browser to make the tools easier to use, but this information
              stays on the user&apos;s device.
            </p>
          </Card>

          <Card className="border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Informational estimates
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              The calculators provide estimates for educational and
              informational purposes. Fitness and nutrition needs can vary from
              person to person, so results should be used as a starting point,
              not as medical advice.
            </p>
          </Card>
        </div>
      </MotionSection>
    </main>
  );
}