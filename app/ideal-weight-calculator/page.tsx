import type { Metadata } from "next";
import { QuickAnswer } from "@/components/common/QuickAnswer";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/lib/site";
import { CalculatorFaq } from "@/components/common/CalculatorFaq";
import { CalculatorJsonLd } from "@/components/seo/CalculatorJsonLd";

import { IdealWeightCalculator } from "@/components/calculators/IdealWeightCalculator";
import { CalculatorInfoBox } from "@/components/common/CalculatorInfoBox";
import { CalculatorQuickNav } from "@/components/common/CalculatorQuickNav";
import { MotionSection } from "@/components/motion/MotionSection";

export const metadata: Metadata = {
  title: "Ideal Weight Calculator - Estimate Your Ideal Body Weight",
  description:
    "Compare multiple formulas to estimate an ideal weight range based on your height with FitCalcLab's free calculator. Supports metric and imperial units.",
  alternates: {
    canonical: "/ideal-weight-calculator",
  },
  openGraph: {
    title: "Ideal Weight Calculator - Estimate Your Ideal Body Weight",
    description:
      "Compare multiple formulas to estimate an ideal weight range based on your height with FitCalcLab's free calculator. Supports metric and imperial units.",
    url: `${siteConfig.url}/ideal-weight-calculator`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ideal Weight Calculator - Estimate Your Ideal Body Weight",
    description:
      "Compare multiple formulas to estimate an ideal weight range based on your height with FitCalcLab's free calculator. Supports metric and imperial units.",
  },
};

const idealWeightFaqItems = [
  {
    question: "What is an ideal weight calculator?",
    answer:
      "An ideal weight calculator estimates a possible weight range based mainly on height and formula option. It compares common formulas to show a range instead of relying on a single number.",
  },
  {
    question: "Which formulas are used for ideal weight?",
    answer:
      "This calculator compares several common ideal weight formulas, including Devine, Robinson, Miller and Hamwi. Different formulas can produce different results.",
  },
  {
    question: "Should I target the exact ideal weight number?",
    answer:
      "No. The ideal weight result should be treated as a general estimate, not as a strict target. Health, fitness, body composition and personal goals can vary widely.",
  },
  {
    question: "Is ideal weight the same as healthy weight?",
    answer:
      "Not exactly. Ideal weight formulas are simple estimates based mostly on height and formula option. A healthy weight can depend on body composition, lifestyle, medical context and individual goals.",
  },
];

export default function IdealWeightCalculatorPage() {
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
      name: "Ideal Weight Calculator",
      href: "/ideal-weight-calculator",
    },
  ]}
/>
<CalculatorJsonLd
  name="Ideal Weight Calculator"
  description="A free web-based ideal weight calculator that compares common formulas to estimate a healthy weight range from height and formula option."
  path="/ideal-weight-calculator"
/>
      <MotionSection className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-emerald-700">Body metrics</p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
            Ideal Weight Calculator
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Compare multiple formulas to estimate an ideal weight range based on
            your height.
          </p>
        </div>

        <div className="mt-8">
          <CalculatorQuickNav currentHref="/ideal-weight-calculator" />
        </div>

        <QuickAnswer>
  <p>
    The Ideal Weight Calculator compares common formula estimates for body
    weight based mainly on height. Ideal weight results are general references,
    not exact targets, and should be interpreted with body composition and
    personal context.
  </p>
</QuickAnswer>

        <div className="mt-6">
          <IdealWeightCalculator />
        </div>

        <div className="mt-10">
          <CalculatorInfoBox
            title="How to understand your ideal weight result"
            howToUse={[
              "Choose metric or imperial units.",
              "Select the formula option.",
              "Enter your height.",
              "Click the calculate button to compare multiple ideal weight formulas.",
              "Review the average estimate and the formula comparison table.",
            ]}
            resultMeaning="The ideal weight result compares several common formulas and shows an estimated range. These formulas are simple estimates based mainly on height and formula option. They do not measure health, fitness level, body composition or personal goals."
          />
        </div>

        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            How this calculator works
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            This calculator compares several commonly used ideal weight formulas,
            including Devine, Robinson, Miller and Hamwi. Instead of showing
            only one number, it gives a range and an average estimate.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-700">
            Different formulas can produce different results, so the range is
            usually more useful than a single fixed number.
          </div>

          <div className="mt-6 rounded-2xl bg-orange-50 p-5 text-sm leading-6 text-orange-800">
            This calculator is for informational purposes only and is not
            medical advice.
          </div>
        </section>
        <div className="mt-10">
  <CalculatorFaq items={idealWeightFaqItems} />
</div>
      </MotionSection>
    </main>
  );
}