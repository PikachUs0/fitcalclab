import type { Metadata } from "next";
import { QuickAnswer } from "@/components/common/QuickAnswer";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/lib/site";
import { CalculatorFaq } from "@/components/common/CalculatorFaq";
import { CalculatorJsonLd } from "@/components/seo/CalculatorJsonLd";
import { BodyFatCalculator } from "@/components/calculators/BodyFatCalculator";
import { CalculatorInfoBox } from "@/components/common/CalculatorInfoBox";
import { CalculatorQuickNav } from "@/components/common/CalculatorQuickNav";
import { MotionSection } from "@/components/motion/MotionSection";

export const metadata: Metadata = {
  title: "Body Fat Calculator - Estimate Your Body Composition",
  description:
    "Estimate your body fat percentage using height, weight and simple body measurements with FitCalcLab's free calculator. Supports metric and imperial units.",
  alternates: {
    canonical: "/body-fat-calculator",
  },
  openGraph: {
    title: "Body Fat Calculator - Estimate Your Body Composition",
    description:
      "Estimate your body fat percentage using height, weight and simple body measurements with FitCalcLab's free calculator. Supports metric and imperial units.",
    url: `${siteConfig.url}/body-fat-calculator`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Body Fat Calculator - Estimate Your Body Composition",
    description:
      "Estimate your body fat percentage using height, weight and simple body measurements with FitCalcLab's free calculator. Supports metric and imperial units.",
  },
};

const bodyFatFaqItems = [
  {
    question: "How does the body fat calculator estimate body fat?",
    answer:
      "This body fat calculator uses body measurements such as height, weight, neck, waist and hip measurements to estimate body fat percentage. The result is an estimate and can vary based on measurement accuracy.",
  },
  {
    question: "Is body fat percentage more useful than BMI?",
    answer:
      "Body fat percentage can provide more detail about body composition than BMI because it estimates fat mass and lean mass. However, both numbers are estimates and should be interpreted carefully.",
  },
  {
    question: "Why do neck, waist and hip measurements matter?",
    answer:
      "Tape measurements are used in common body fat estimation formulas because they can roughly reflect body shape and fat distribution. Consistent measuring technique is important for more reliable tracking.",
  },
  {
    question: "Is this body fat calculator medical advice?",
    answer:
      "No. This calculator provides informational estimates only. It does not replace professional body composition testing or advice from a qualified health professional.",
  },
];

export default function BodyFatCalculatorPage() {
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
      name: "Body Fat Calculator",
      href: "/body-fat-calculator",
    },
  ]}
/>
<CalculatorJsonLd
  name="Body Fat Calculator"
  description="A free web-based body fat calculator that estimates body fat percentage, fat mass and lean mass from height, weight and body measurements."
  path="/body-fat-calculator"
/>
      <MotionSection className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-emerald-700">Body metrics</p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
            Body Fat Calculator
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Estimate body fat percentage using height, weight and simple body
            measurements.
          </p>
        </div>

        <div className="mt-8">
          <CalculatorQuickNav currentHref="/body-fat-calculator" />
        </div>

<QuickAnswer>
  <p>
    The Body Fat Calculator estimates body fat percentage from body
    measurements. The result can give more context than weight alone, but it is
    still an estimate and depends on consistent measurement technique.
  </p>
</QuickAnswer>
        <div className="mt-6">
          <BodyFatCalculator />
        </div>

        <div className="mt-10">
          <CalculatorInfoBox
            title="How to understand your body fat result"
            howToUse={[
              "Choose metric or imperial units.",
              "Select the formula option.",
              "Enter your height, weight, neck and waist measurements.",
              "If required, enter hip measurement as well.",
              "Click the calculate button to estimate body fat percentage.",
            ]}
            resultMeaning="The body fat result is an estimate based on tape measurements. It can be useful for tracking general changes over time, but it does not replace professional body composition testing and can vary based on measurement accuracy."
          />
        </div>

        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            How this calculator works
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            This calculator uses a tape-measurement method to estimate body fat
            percentage. It uses height, neck and waist measurements. One formula
            option also uses hip measurement.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-700">
            Measurement accuracy matters. For the most consistent results, use
            the same measuring method each time.
          </div>

          <div className="mt-6 rounded-2xl bg-orange-50 p-5 text-sm leading-6 text-orange-800">
            This calculator is for informational purposes only and is not
            medical advice.
          </div>
        </section>
        <div className="mt-10">
  <CalculatorFaq items={bodyFatFaqItems} />
</div>
      </MotionSection>
    </main>
  );
}