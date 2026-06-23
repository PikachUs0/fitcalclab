import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { CalculatorJsonLd } from "@/components/seo/CalculatorJsonLd";
import { siteConfig } from "@/lib/site";
import { CalculatorFaq } from "@/components/common/CalculatorFaq";
import { MacroCalculator } from "@/components/calculators/MacroCalculator";
import { MotionSection } from "@/components/motion/MotionSection";
import { CalculatorQuickNav } from "@/components/common/CalculatorQuickNav";
import { CalculatorInfoBox } from "@/components/common/CalculatorInfoBox";

export const metadata: Metadata = {
  title: "Macro Calculator - Calculate Your Daily Macronutrient Targets",
  description:
    "Estimate your daily protein, carbohydrates, and fat intake based on your calorie target and fitness goal with FitCalcLab's free calculator. Supports metric and imperial units.",
  alternates: {
    canonical: "/macro-calculator",
  },
  openGraph: {
    title: "Macro Calculator - Calculate Your Daily Macronutrient Targets",
    description:
      "Estimate your daily protein, carbohydrates, and fat intake based on your calorie target and fitness goal with FitCalcLab's free calculator. Supports metric and imperial units.",
    url: `${siteConfig.url}/macro-calculator`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Macro Calculator - Calculate Your Daily Macronutrient Targets",
    description:
      "Estimate your daily protein, carbohydrates, and fat intake based on your calorie target and fitness goal with FitCalcLab's free calculator. Supports metric and imperial units.",
  },
};

const macroFaqItems = [
  {
    question: "What are macros?",
    answer:
      "Macros, or macronutrients, are protein, carbohydrates and fat. These nutrients provide calories and are commonly used to plan meals around a daily calorie target.",
  },
  {
    question: "How does this macro calculator split calories?",
    answer:
      "This calculator splits your daily calories into protein, carbohydrates and fat based on the selected goal. It also estimates average per-meal targets.",
  },
  {
    question: "Which macro goal should I choose?",
    answer:
      "Choose fat loss if you are planning around a calorie deficit, maintain if you want a balanced split, or muscle gain if you are planning around a calorie surplus and training.",
  },
  {
    question: "Are macro targets exact?",
    answer:
      "Macro targets are estimates. Your ideal split can vary based on training, food preferences, body size, health context and long-term consistency.",
  },
];

export default function MacroCalculatorPage() {
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
      name: "Macro Calculator",
      href: "/macro-calculator",
    },
  ]}
/>
<CalculatorJsonLd
  name="Macro Calculator"
  description="A free web-based macro calculator that estimates daily protein, carbohydrates, and fat intake based on calorie target and fitness goal."
  path="/macro-calculator"
/>
      <MotionSection className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-emerald-700">Nutrition</p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
            Macro Calculator
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Estimate daily protein, carbohydrates and fat based on your calorie
            target and fitness goal.
          </p>
        </div>

       <div className="mt-8">
  <CalculatorQuickNav currentHref="/macro-calculator" />
</div>

<div className="mt-6">
  <MacroCalculator />
</div>

<div className="mt-10">
  <CalculatorInfoBox
    title="How to understand your macro result"
    howToUse={[
      "Enter your daily calorie target.",
      "Choose your goal: fat loss, maintenance or muscle gain.",
      "Enter how many meals you eat per day.",
      "Click the calculate button to see your protein, carbs and fat targets.",
    ]}
    resultMeaning="Macro results split your daily calories into protein, carbohydrates and fat. This can help you plan meals around a calorie target, but your ideal macro split can vary based on training, preferences and personal needs."
  />
</div>

      
        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            What are macros?
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Macros, or macronutrients, are the nutrients that provide energy:
            protein, carbohydrates and fat. This calculator splits your daily
            calories into estimated macro targets.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-700">
            Protein and carbohydrates provide about 4 calories per gram. Fat
            provides about 9 calories per gram.
          </div>

          <div className="mt-6 rounded-2xl bg-orange-50 p-5 text-sm leading-6 text-orange-800">
            This calculator is for informational purposes only and is not
            medical advice.
          </div>
        </section>
        <div className="mt-10">
  <CalculatorFaq items={macroFaqItems} />
</div>
      </MotionSection>
    </main>
  );
}
