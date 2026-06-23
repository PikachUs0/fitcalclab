import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/lib/site";
import { CalculatorFaq } from "@/components/common/CalculatorFaq";
import { CalculatorJsonLd } from "@/components/seo/CalculatorJsonLd";
import { BmrCalculator } from "@/components/calculators/BmrCalculator";
import { AdSlot } from "@/components/common/AdSlot";
import { CalculatorQuickNav } from "@/components/common/CalculatorQuickNav";
import { NextStepSection } from "@/components/common/NextStepSection";
import { RelatedTools } from "@/components/common/RelatedTools";
import { MotionSection } from "@/components/motion/MotionSection";
import { CalculatorInfoBox } from "@/components/common/CalculatorInfoBox";

export const metadata: Metadata = {
  title: "BMR Calculator - Calculate Your Basal Metabolic Rate",
  description:
    "Use the free FitCalcLab BMR calculator to estimate your basal metabolic rate from age, height and weight. Supports metric and imperial units.",
  alternates: {
    canonical: "/bmr-calculator",
  },
  openGraph: {
    title: "BMR Calculator - Calculate Your Basal Metabolic Rate",
    description:
      "Estimate your BMR, the calories your body may burn at rest, with FitCalcLab's free calculator. Supports metric and imperial units.",
    url: `${siteConfig.url}/bmr-calculator`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMR Calculator - Calculate Your Basal Metabolic Rate",
    description:
      "Estimate your BMR, the calories your body may burn at rest, with FitCalcLab's free calculator. Supports metric and imperial units.",
  },
};

const bmrFaqItems = [
  {
    question: "What is BMR?",
    answer:
      "BMR stands for Basal Metabolic Rate. It estimates how many calories the body may burn at rest before exercise or daily activity is included.",
  },
  {
    question: "Is BMR the same as TDEE?",
    answer:
      "No. BMR estimates resting calorie needs, while TDEE estimates total daily calorie needs after activity level is included.",
  },
  {
    question: "Which formula does this BMR calculator use?",
    answer:
      "This calculator uses the Mifflin-St Jeor equation, which estimates resting calories from age, height, weight and formula option.",
  },
  {
    question: "Can I use BMR for weight loss planning?",
    answer:
      "BMR can be a useful starting point, but daily calorie planning usually needs TDEE because TDEE includes activity level and daily movement.",
  },
];

export default function BmrCalculatorPage() {
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
      name: "BMR Calculator",
      href: "/bmr-calculator",
    },
  ]}
/>
<CalculatorJsonLd
  name="BMR Calculator"
  description="A free web-based BMR calculator that estimates basal metabolic rate from age, height, and weight using the Mifflin-St Jeor equation."
  path="/bmr-calculator"
/>

      <MotionSection className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-emerald-700">Calories</p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
            BMR Calculator
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Estimate how many calories your body may burn at rest using your
            age, height, weight and formula option.
          </p>
        </div>

        <div className="mt-8">
          <CalculatorQuickNav currentHref="/bmr-calculator" />
        </div>

        <div className="mt-6">
          <BmrCalculator />
        </div>

        <div className="mt-10">
          <NextStepSection
            title="Next, estimate your total daily calories"
            description="BMR estimates resting calories. TDEE adds your activity level to estimate your full daily calorie needs."
            href="/tdee-calculator"
            buttonLabel="Calculate TDEE"
          />
        </div>

        <div className="my-10">
          <AdSlot />
        </div>

        <div className="mb-10">
  <CalculatorInfoBox
    title="How to understand your BMR result"
    howToUse={[
      "Choose metric or imperial units.",
      "Select the formula option.",
      "Enter your age, height and weight.",
      "Click the calculate button to estimate your BMR.",
    ]}
    resultMeaning="BMR estimates how many calories your body may burn at rest. It does not include exercise, walking, work, training or daily movement. For total daily calories, use the TDEE Calculator after BMR."
  />
</div>


        <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            What is BMR?
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            BMR stands for Basal Metabolic Rate. It is an estimate of how many
            calories your body may burn while at rest, before adding exercise or
            daily movement.
          </p>

          <h2 className="mt-8 text-2xl font-semibold tracking-tight text-slate-950">
            BMR formula
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            This calculator uses the Mifflin-St Jeor equation. It uses age,
            height, weight and formula option to estimate resting calorie needs.
          </p>

          <div className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-5 font-mono text-sm text-slate-700">
            <p>Male formula: 10 × weight + 6.25 × height - 5 × age + 5</p>
            <p>Female formula: 10 × weight + 6.25 × height - 5 × age - 161</p>
          </div>

          <div className="mt-6 rounded-2xl bg-orange-50 p-5 text-sm leading-6 text-orange-800">
            This calculator is for informational purposes only and is not
            medical advice. For health-related decisions, consult a qualified
            professional.
          </div>
        </section>

        <div className="mt-12">
          <RelatedTools currentHref="/bmr-calculator" />
        </div>
        <div className="mt-10">
  <CalculatorFaq items={bmrFaqItems} />
</div>
      </MotionSection>
    </main>
  );
}