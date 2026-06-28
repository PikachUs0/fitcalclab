import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/lib/site";
import { QuickAnswer } from "@/components/common/QuickAnswer";
import { CalculatorFaq } from "@/components/common/CalculatorFaq";
import { CalculatorJsonLd } from "@/components/seo/CalculatorJsonLd";
import { TdeeCalculator } from "@/components/calculators/TdeeCalculator";
import { CalculatorQuickNav } from "@/components/common/CalculatorQuickNav";
import { MotionSection } from "@/components/motion/MotionSection";
import { CalculatorInfoBox } from "@/components/common/CalculatorInfoBox";
import { RelatedGuideCard } from "@/components/common/RelatedGuideCard";

export const metadata: Metadata = {
  title: "TDEE Calculator - Calculate Your Total Daily Energy Expenditure",
  description:
    "Estimate your TDEE, the calories your body may burn in a full day, with FitCalcLab's free calculator. Supports metric and imperial units.",
  alternates: {
    canonical: "/tdee-calculator",
  },
  openGraph: {
    title: "TDEE Calculator - Calculate Your Total Daily Energy Expenditure",
    description:
      "Estimate your TDEE, the calories your body may burn in a full day, with FitCalcLab's free calculator. Supports metric and imperial units.",
    url: `${siteConfig.url}/tdee-calculator`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TDEE Calculator - Calculate Your Total Daily Energy Expenditure",
    description:
      "Estimate your TDEE, the calories your body may burn in a full day, with FitCalcLab's free calculator. Supports metric and imperial units.",
  },
};

const tdeeFaqItems = [
  {
    question: "What is TDEE?",
    answer:
      "TDEE stands for Total Daily Energy Expenditure. It estimates how many calories your body may burn in a full day after activity level is included.",
  },
  {
    question: "Is TDEE the same as BMR?",
    answer:
      "No. BMR estimates calories burned at rest, while TDEE includes activity level and daily movement to estimate total daily calorie needs.",
  },
  {
    question: "Which activity level should I choose?",
    answer:
      "Choose the activity level that best matches your average week. If you are unsure, it is usually better to choose a conservative activity level and adjust later based on progress.",
  },
  {
    question: "Can I use TDEE for weight loss?",
    answer:
      "TDEE can be used as a starting point for weight loss planning. A common approach is to eat below estimated maintenance calories, but real progress can vary by consistency, activity, sleep and individual factors.",
  },
];

export default function TdeeCalculatorPage() {
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
      name: "TDEE Calculator",
      href: "/tdee-calculator",
    },
  ]}
/>
<CalculatorJsonLd
  name="TDEE Calculator"
  description="A free web-based TDEE calculator that estimates total daily energy expenditure from age, height, weight and activity level."
  path="/tdee-calculator"
/>
      <MotionSection className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-emerald-700">Calories</p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
            TDEE Calculator
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Estimate your total daily energy expenditure based on your body
            details and activity level.
          </p>
        </div>

        <div className="mt-8">
          <CalculatorQuickNav currentHref="/tdee-calculator" />
        </div>
<QuickAnswer>
  <p>
    The TDEE Calculator estimates total daily energy expenditure by combining
    resting calorie needs with an activity level. TDEE is often used as a
    starting point for maintenance calories, fat loss calories or muscle gain
    calories.
  </p>
</QuickAnswer>

<div className="mt-6">
  <RelatedGuideCard
    title="BMR vs TDEE: What Is the Difference?"
    description="Learn how BMR and TDEE are different, why activity level matters, and how TDEE can estimate maintenance calories."
    href="/blog/bmr-vs-tdee"
  />
</div>

        <div className="mt-6">
          <TdeeCalculator />
        </div>

        <div className="mt-10">
  <CalculatorInfoBox
    title="How to understand your TDEE result"
    howToUse={[
      "Choose metric or imperial units.",
      "Select the formula option.",
      "Choose the activity level that best matches your week.",
      "Enter your age, height and weight.",
      "Click the calculate button to estimate your daily calories.",
    ]}
    resultMeaning="TDEE estimates how many calories your body may burn in a full day after activity level is included. It can be used as a starting point for maintenance, weight loss or muscle gain calorie targets."
  />
</div>

        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            What is TDEE?
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            TDEE stands for Total Daily Energy Expenditure. It estimates how
            many calories your body may burn in a full day after activity level
            is included.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-700">
            Formula: TDEE = BMR × activity multiplier
          </div>

          <div className="mt-6 rounded-2xl bg-orange-50 p-5 text-sm leading-6 text-orange-800">
            This calculator is for informational purposes only and is not
            medical advice.
          </div>
        </section>
        <div className="mt-10">
  <CalculatorFaq items={tdeeFaqItems} />
</div>
      </MotionSection>
    </main>
  );
}
