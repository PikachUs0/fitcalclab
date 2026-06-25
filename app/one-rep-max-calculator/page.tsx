import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/lib/site";
import { QuickAnswer } from "@/components/common/QuickAnswer";
import { CalculatorFaq } from "@/components/common/CalculatorFaq";
import { CalculatorJsonLd } from "@/components/seo/CalculatorJsonLd";

import { OneRepMaxCalculator } from "@/components/calculators/OneRepMaxCalculator";
import { CalculatorInfoBox } from "@/components/common/CalculatorInfoBox";
import { CalculatorQuickNav } from "@/components/common/CalculatorQuickNav";
import { MotionSection } from "@/components/motion/MotionSection";

export const metadata: Metadata = {
  title: "One Rep Max Calculator - Estimate Your Maximum Lifting Capacity",
  description:
    "Estimate your one-rep max and training percentages from a weight you can lift for multiple reps with FitCalcLab's free calculator. Supports metric and imperial units.",
  alternates: {
    canonical: "/one-rep-max-calculator",
  },
  openGraph: {
    title: "One Rep Max Calculator - Estimate Your Maximum Lifting Capacity",
    description:
      "Estimate your one-rep max and training percentages from a weight you can lift for multiple reps with FitCalcLab's free calculator. Supports metric and imperial units.",
    url: `${siteConfig.url}/one-rep-max-calculator`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "One Rep Max Calculator - Estimate Your Maximum Lifting Capacity",
    description:
      "Estimate your one-rep max and training percentages from a weight you can lift for multiple reps with FitCalcLab's free calculator. Supports metric and imperial units.",
  },
};

const oneRepMaxFaqItems = [
  {
    question: "What is a one-rep max?",
    answer:
      "A one-rep max, or 1RM, is an estimate of the maximum weight you may be able to lift for one complete repetition of an exercise.",
  },
  {
    question: "How does this 1RM calculator estimate my max?",
    answer:
      "This calculator estimates one-rep max from the weight lifted and the number of reps completed. It uses a common estimation formula, so the result should be treated as an estimate rather than an exact maximum.",
  },
  {
    question: "Should I test my true one-rep max?",
    answer:
      "A true one-rep max attempt can be demanding and may increase injury risk if done without proper technique, warm-up, recovery and safety setup. Many people use estimated 1RM instead for planning training loads.",
  },
  {
    question: "What are training percentages?",
    answer:
      "Training percentages are estimated working weights based on your one-rep max. They can help plan lighter, moderate or heavier sets without testing a true maximum every time.",
  },
];

export default function OneRepMaxCalculatorPage() {
  return (
    <main className="bg-slate-50">
      <BreadcrumbJsonLd
  items={[
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Calculators",
      href: "/calculators",
    },
    {
      name: "One Rep Max Calculator",
      href: "/one-rep-max-calculator",
    },
  ]}
/>


<CalculatorJsonLd
    name="One Rep Max Calculator"
    description="A free web-based one rep max calculator that estimates 1RM and training percentage weights from weight lifted and reps completed."
    path="/one-rep-max-calculator"
  />

      <MotionSection className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-emerald-700">Training</p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
            One Rep Max Calculator
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Estimate your one-rep max and training percentages from a weight you
            can lift for multiple reps.
          </p>
        </div>

        <div className="mt-8">
          {/* Hatalı prop yazımı ve eksik etiket kapanışı düzeltildi */}
          <CalculatorQuickNav 
            currentHref="/one-rep-max-calculator" 
            className="mt-6" 
          />

          <QuickAnswer>
  <p>
    The One Rep Max Calculator estimates maximum strength from a weight lifted
    for multiple reps. It can help plan training percentages without requiring a
    true max attempt.
  </p>
</QuickAnswer>

          <OneRepMaxCalculator />
        </div>

        <div className="mt-10">
          <CalculatorInfoBox
            title="How to understand your one-rep max result"
            howToUse={[
              "Enter the weight you lifted.",
              "Enter how many reps you completed with that weight.",
              "Click the calculate button to estimate your one-rep max.",
              "Review the training percentage table for estimated working weights.",
            ]}
            resultMeaning="The one-rep max result estimates the maximum weight you may be able to lift for one repetition. The percentage table can help estimate training loads, but real performance can vary based on exercise type, technique, fatigue and recovery."
            note="This calculator is for informational purposes only. Do not attempt maximum lifts without proper technique, preparation and safety."
          />
        </div>

        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            What is one-rep max?
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            One-rep max, or 1RM, is an estimate of the maximum weight you may be
            able to lift for one complete repetition. This calculator uses a
            common estimation formula based on a submaximal lift.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-700">
            Formula used: 1RM = weight × (1 + reps / 30)
          </div>

          <div className="mt-6 rounded-2xl bg-orange-50 p-5 text-sm leading-6 text-orange-800">
            This calculator is for informational purposes only. Train safely and
            avoid max attempts without proper preparation.
          </div>
        </section>
        <div className="mt-10">
  <CalculatorFaq items={oneRepMaxFaqItems} />
</div>
      </MotionSection>
    </main>
  );
}