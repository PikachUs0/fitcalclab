import type { Metadata } from "next";
import { QuickAnswer } from "@/components/common/QuickAnswer";
import { CalculatorFaq } from "@/components/common/CalculatorFaq";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/lib/site";
import { WaterCalculator } from "@/components/calculators/WaterCalculator";
import { CalculatorInfoBox } from "@/components/common/CalculatorInfoBox";
import { CalculatorQuickNav } from "@/components/common/CalculatorQuickNav";
import { MotionSection } from "@/components/motion/MotionSection";
import { CalculatorJsonLd } from "@/components/seo/CalculatorJsonLd";
export const metadata: Metadata = {
  title: "Water Intake Calculator - Calculate Your Daily Hydration Needs",
  description:
    "Estimate your daily water intake based on body weight, exercise duration and climate with FitCalcLab's free calculator. Supports metric and imperial units.",
  alternates: {
    canonical: "/water-intake-calculator",
  },
  openGraph: {
    title: "Water Intake Calculator - Calculate Your Daily Hydration Needs",
    description:
      "Estimate your daily water intake based on body weight, exercise duration and climate with FitCalcLab's free calculator. Supports metric and imperial units.",
    url: `${siteConfig.url}/water-intake-calculator`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Water Intake Calculator - Calculate Your Daily Hydration Needs",
    description:
      "Estimate your daily water intake based on body weight, exercise duration and climate with FitCalcLab's free calculator. Supports metric and imperial units.",
  },
};

const waterFaqItems = [
  {
    question: "How much water should I drink per day?",
    answer:
      "Daily water needs vary based on body weight, activity, climate, diet and individual factors. This calculator gives a simple hydration estimate based on weight, exercise minutes and climate.",
  },
  {
    question: "Does exercise increase water needs?",
    answer:
      "Yes. Exercise can increase fluid needs because the body may lose more water through sweating and breathing. This calculator adds extra water based on exercise minutes.",
  },
  {
    question: "Does hot climate affect water intake?",
    answer:
      "Hot climate or heavy sweating can increase hydration needs. Selecting the hot climate option increases the estimated daily water target.",
  },
  {
    question: "Is this water intake estimate exact?",
    answer:
      "No. The result is a general estimate. Hydration needs can vary by sweat rate, diet, body size, activity, health context and environment.",
  },
];

export default function WaterIntakeCalculatorPage() {
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
      name: "Water Intake Calculator",
      href: "/water-intake-calculator",
    },
  ]}
/>
<CalculatorJsonLd
  name="Water Intake Calculator"
  description="A free web-based water intake calculator that estimates daily hydration needs from body weight, exercise minutes and climate."
  path="/water-intake-calculator"
/>
      <MotionSection className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-emerald-700">Nutrition</p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
            Water Intake Calculator
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Estimate your daily water intake based on body weight, exercise
            duration and climate.
          </p>
        </div>

        <div className="mt-8">
          <CalculatorQuickNav currentHref="/water-intake-calculator" />
        </div>

        <QuickAnswer>
  <p>
    The Water Intake Calculator estimates daily hydration needs based on body
    weight, exercise time and climate. Water needs can change with heat,
    sweating, activity level and daily routine.
  </p>
</QuickAnswer>

        <div className="mt-6">
          <WaterCalculator />
        </div>

        <div className="mt-10">
          <CalculatorInfoBox
            title="How to understand your water intake result"
            howToUse={[
              "Choose metric or imperial units.",
              "Enter your body weight.",
              "Enter your daily exercise duration in minutes.",
              "Select normal or hot climate depending on your environment.",
              "Click the calculate button to estimate your daily water intake.",
            ]}
            resultMeaning="The water intake result gives a simple daily hydration estimate based on body weight, exercise duration and climate. It can be useful as a general hydration target, but individual needs can vary based on sweating, diet, health status and activity."
          />
        </div>

        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            How this estimate works
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            This calculator starts with a body-weight based estimate, then adds
            extra water for exercise and hot climate conditions.
          </p>

          <div className="mt-6 rounded-2xl bg-orange-50 p-5 text-sm leading-6 text-orange-800">
            This calculator is for informational purposes only and is not
            medical advice.
          </div>
        </section>
        <div className="mt-10">
  <CalculatorFaq items={waterFaqItems} />
</div>
      </MotionSection>
    </main>
  );
}
