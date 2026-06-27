import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/lib/site";
import { QuickAnswer } from "@/components/common/QuickAnswer";
import { CalculatorFaq } from "@/components/common/CalculatorFaq";
import { CalculatorJsonLd } from "@/components/seo/CalculatorJsonLd";
import { WeightLossTimelineCalculator } from "@/components/calculators/WeightLossTimelineCalculator";
import { CalculatorInfoBox } from "@/components/common/CalculatorInfoBox";
import { CalculatorQuickNav } from "@/components/common/CalculatorQuickNav";
import { MotionSection } from "@/components/motion/MotionSection";

export const metadata: Metadata = {
  title: "Weight Loss Timeline Calculator - Plan Your Weight Loss Journey",
  description:
    "Plan your weight loss journey with our free timeline calculator. Estimate how long it may take to reach your target weight based on a daily calorie deficit.",
  alternates: {
    canonical: "/weight-loss-timeline-calculator",
  },
  openGraph: {
    title: "Weight Loss Timeline Calculator - Plan Your Weight Loss Journey",
    description:
      "Plan your weight loss journey with our free timeline calculator. Estimate how long it may take to reach your target weight based on a daily calorie deficit.",
    url: `${siteConfig.url}/weight-loss-timeline-calculator`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weight Loss Timeline Calculator - Plan Your Weight Loss Journey",
    description:
      "Plan your weight loss journey with our free timeline calculator. Estimate how long it may take to reach your target weight based on a daily calorie deficit.",
  },
};

const weightLossTimelineFaqItems = [
  {
    question: "How does the weight loss timeline calculator work?",
    answer:
      "The calculator estimates the difference between current weight and target weight, then compares that with the selected daily calorie deficit to estimate a timeline.",
  },
  {
    question: "Is the estimated target date exact?",
    answer:
      "No. The estimated target date is only a projection. Real progress can vary because of water weight changes, consistency, activity level, sleep, stress, metabolism and other factors.",
  },
  {
    question: "What daily calorie deficit should I choose?",
    answer:
      "A smaller deficit may be easier to maintain, while a larger deficit can be harder to sustain. The calculator provides an estimate, but calorie targets should be adjusted carefully over time.",
  },
  {
    question: "Why does progress slow down sometimes?",
    answer:
      "Weight loss progress can slow down because body weight, calorie needs, water retention, activity and consistency can change over time. A timeline calculator should be used as a planning estimate, not a guarantee.",
  },
];

export default function WeightLossTimelineCalculatorPage() {
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
            name: "Weight Loss Timeline Calculator",
            href: "/weight-loss-timeline-calculator",
          },
        ]}
      />
      <CalculatorJsonLd
  name="Weight Loss Timeline Calculator"
  description="A free web-based weight loss timeline calculator that estimates time to reach a target weight based on current weight, target weight, calorie deficit and start date."
  path="/weight-loss-timeline-calculator"
/>
      <MotionSection className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-emerald-700">Goal planning</p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
            Weight Loss Timeline Calculator
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Estimate how long it may take to reach your target weight based on a
            daily calorie deficit.
          </p>
        </div>

        <div className="mt-8">
          {/* Hatalı prop birleşimi ve eksik etiket kapanışı düzeltildi */}
          <CalculatorQuickNav 
            currentHref="/weight-loss-timeline-calculator" 
            className="mt-6" 
          />
          <QuickAnswer>
  <p>
    The Weight Loss Timeline Calculator estimates how long it may take to reach
    a target weight based on current weight, target weight and calorie deficit.
    Real progress can vary because weight loss is not perfectly linear.
  </p>
</QuickAnswer>
          <WeightLossTimelineCalculator />
        </div>

        <div className="mt-10">
          <CalculatorInfoBox
            title="How to understand your weight loss timeline"
            howToUse={[
              "Choose metric or imperial units.",
              "Enter your current weight.",
              "Enter your target weight.",
              "Enter your estimated daily calorie deficit.",
              "Choose your start date.",
              "Click the calculate button to estimate your timeline.",
            ]}
            resultMeaning="The timeline result estimates how long it may take to reach your target weight if the daily calorie deficit stays consistent. Real progress can vary due to water weight, consistency, sleep, activity, metabolism and other factors."
          />
        </div>

        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            How this calculator works
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            This calculator estimates a timeline using the difference between
            current weight and target weight, then compares that against a daily
            calorie deficit.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-700">
            Approximate conversion: 1 kg of body fat is often estimated around
            7,700 kcal, and 1 lb around 3,500 kcal.
          </div>

          <div className="mt-6 rounded-2xl bg-orange-50 p-5 text-sm leading-6 text-orange-800">
            This calculator is for informational purposes only and is not
            medical advice.
          </div>
        </section>
        <div className="mt-10">
  <CalculatorFaq items={weightLossTimelineFaqItems} />
</div>
      </MotionSection>
    </main>
  );
}
