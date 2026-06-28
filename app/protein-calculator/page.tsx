import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/lib/site";
import { QuickAnswer } from "@/components/common/QuickAnswer";
import { CalculatorFaq } from "@/components/common/CalculatorFaq";
import { CalculatorJsonLd } from "@/components/seo/CalculatorJsonLd";
import { ProteinCalculator } from "@/components/calculators/ProteinCalculator";
import { CalculatorInfoBox } from "@/components/common/CalculatorInfoBox";
import { CalculatorQuickNav } from "@/components/common/CalculatorQuickNav";
import { MotionSection } from "@/components/motion/MotionSection";
import { RelatedGuideCard } from "@/components/common/RelatedGuideCard";

export const metadata: Metadata = {
  title: "Protein Calculator - Calculate Your Daily Protein Target",
  description:
    "Estimate your daily protein target based on your body weight and fitness goal with FitCalcLab's free calculator. Supports metric and imperial units.",
  alternates: {
    canonical: "/protein-calculator",
  },
  openGraph: {
    title: "Protein Calculator - Calculate Your Daily Protein Target",
    description:
      "Estimate your daily protein target based on your body weight and fitness goal with FitCalcLab's free calculator. Supports metric and imperial units.",
    url: `${siteConfig.url}/protein-calculator`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Protein Calculator - Calculate Your Daily Protein Target",
    description:
      "Estimate your daily protein target based on your body weight and fitness goal with FitCalcLab's free calculator. Supports metric and imperial units.",
  },
};

const proteinFaqItems = [
  {
    question: "How much protein do I need per day?",
    answer:
      "Daily protein needs can vary based on body weight, activity level, training goal and diet. This calculator gives an estimated protein target and range based on the values you enter.",
  },
  {
    question: "Is protein intake based on body weight?",
    answer:
      "Yes. This calculator uses body weight as the main input and adjusts the estimate based on the selected goal, such as general fitness, fat loss, muscle gain or endurance training.",
  },
  {
    question: "Should I use grams per meal?",
    answer:
      "The per-meal protein estimate can help divide your daily protein target across the day. It is optional, but it can make meal planning easier.",
  },
  {
    question: "Is this protein calculator medical advice?",
    answer:
      "No. The protein calculator provides informational estimates only. Individual needs can vary, especially for people with medical conditions or specific dietary requirements.",
  },
];

export default function ProteinCalculatorPage() {
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
      name: "Protein Calculator",
      href: "/protein-calculator",
    },
  ]}
/>
<CalculatorJsonLd
  name="Protein Calculator"
  description="A free web-based protein calculator that estimates daily protein target, protein range and per-meal protein needs from body weight and goal."
  path="/protein-calculator"
/>

      <MotionSection className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-emerald-700">Nutrition</p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
            Protein Intake Calculator
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Estimate your daily protein target based on your body weight and
            fitness goal.
          </p>
        </div>

        <div className="mt-8">
          <CalculatorQuickNav currentHref="/protein-calculator" />
        </div>

        <QuickAnswer>
  <p>
    The Protein Calculator estimates daily protein needs based on body weight
    and fitness goal. It can also help divide protein across meals, making daily
    targets easier to plan and follow.
  </p>
</QuickAnswer>

<div className="mt-6">
  <RelatedGuideCard
    title="How Much Protein Do You Need Per Day?"
    description="Learn how body weight, training level, goal and meals per day can affect daily protein targets."
    href="/blog/how-much-protein-per-day"
  />
</div>

        <div className="mt-6">
          <ProteinCalculator />
        </div>

        <div className="mt-10">
          <CalculatorInfoBox
            title="How to understand your protein result"
            howToUse={[
              "Choose metric or imperial units.",
              "Enter your body weight.",
              "Select the goal that best matches your training or nutrition plan.",
              "Enter how many meals you eat per day.",
              "Click the calculate button to estimate your daily protein range.",
            ]}
            resultMeaning="Protein results estimate a daily intake range based on body weight and goal. The per-meal target helps divide the total amount across the day, but individual needs can vary by training, diet and health context."
          />
        </div>

        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            Why protein matters
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Protein supports muscle repair, recovery and lean mass. The right
            amount can vary based on body weight, training and goal.
          </p>

          <div className="mt-6 rounded-2xl bg-orange-50 p-5 text-sm leading-6 text-orange-800">
            This calculator is for informational purposes only and is not
            medical advice.
          </div>
        </section>
        <div className="mt-10">
  <CalculatorFaq items={proteinFaqItems} />
</div>
      </MotionSection>
    </main>
  );
}
