import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/lib/site";
import { QuickAnswer } from "@/components/common/QuickAnswer";
import { CalculatorFaq } from "@/components/common/CalculatorFaq";
import { CalculatorJsonLd } from "@/components/seo/CalculatorJsonLd";
import { CalorieCalculator } from "@/components/calculators/CalorieCalculator";
import { CalculatorInfoBox } from "@/components/common/CalculatorInfoBox";
import { CalculatorQuickNav } from "@/components/common/CalculatorQuickNav";
import { MotionSection } from "@/components/motion/MotionSection";

export const metadata: Metadata = {
  title: "Calorie Calculator - Estimate Your Daily Calorie Needs",
  description:
    "Estimate daily calories for losing weight, maintaining weight or gaining weight with FitCalcLab's free calculator. Supports metric and imperial units.",
  alternates: {
    canonical: "/calorie-calculator",
  },
  openGraph: {
    title: "Calorie Calculator - Estimate Your Daily Calorie Needs",
    description:
      "Estimate daily calories for losing weight, maintaining weight or gaining weight with FitCalcLab's free calculator. Supports metric and imperial units.",
    url: `${siteConfig.url}/calorie-calculator`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calorie Calculator - Estimate Your Daily Calorie Needs",
    description:
      "Estimate daily calories for losing weight, maintaining weight or gaining weight with FitCalcLab's free calculator. Supports metric and imperial units.",
  },
};

const calorieFaqItems = [
  {
    question: "What does a calorie calculator estimate?",
    answer:
      "A calorie calculator estimates daily calorie needs based on body details, formula option, activity level and goal. It can estimate maintenance calories and goal-based calorie targets.",
  },
  {
    question: "What is the difference between BMR and maintenance calories?",
    answer:
      "BMR estimates calories burned at rest. Maintenance calories estimate total daily calories after activity level is included. Maintenance calories are usually closer to what a person may need to maintain current weight.",
  },
  {
    question: "How should I choose my calorie goal?",
    answer:
      "Choose lose weight if you want a calorie deficit, maintain weight if you want to keep weight stable, or gain weight if you want a calorie surplus. These targets are estimates and may need adjustment over time.",
  },
  {
    question: "Are calorie calculator results exact?",
    answer:
      "No. Calorie calculator results are estimates. Real calorie needs can vary based on body composition, daily movement, training, sleep, consistency and individual differences.",
  },
];

export default function CalorieCalculatorPage() {
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
        name: "Calorie Calculator",
        href: "/calorie-calculator",
      },
    ]}
  />

  <CalculatorJsonLd
  name="Calorie Calculator"
  description="A free web-based calorie calculator that estimates maintenance calories, goal calories and BMR from body details, activity level and goal."
  path="/calorie-calculator"
/>

      <MotionSection className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-emerald-700">Calories</p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
            Calorie Calculator
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Estimate daily calories for losing weight, maintaining weight or
            gaining weight.
          </p>
        </div>

        <div className="mt-8">
          {/* Hatalı birleşik yazım ve eksik etiket kapanışı düzeltildi */}
          <CalculatorQuickNav 
            currentHref="/calorie-calculator" 
            className="mt-6" 
          />

           <QuickAnswer>
  <p>
    The Calorie Calculator estimates daily calorie needs for maintenance, fat
    loss or weight gain. The result is a starting estimate and should be adjusted
    based on real progress over time.
  </p>
</QuickAnswer>
          <CalorieCalculator />
        </div>

       

        <div className="mt-10">
          <CalculatorInfoBox
            title="How to understand your calorie result"
            howToUse={[
              "Choose metric or imperial units.",
              "Select the formula option.",
              "Choose your activity level.",
              "Select your goal: lose, maintain or gain weight.",
              "Enter your age, height and weight.",
              "Click the calculate button to estimate your daily calorie target.",
            ]}
            resultMeaning="The calorie result estimates your maintenance calories first, then adjusts the number based on your selected goal. This can be used as a starting point for macro planning, weight loss planning or muscle gain planning."
          />
        </div>

        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            How this calculator works
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            This calculator estimates BMR first, then multiplies it by an
            activity factor to estimate maintenance calories. It then adjusts
            calories based on your selected goal.
          </p>

          <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-700">
            Maintenance calories are an estimate of how many calories you may
            need to maintain your current weight. Goal calories are adjusted
            from maintenance based on whether you want to lose, maintain or gain
            weight.
          </div>

          <div className="mt-6 rounded-2xl bg-orange-50 p-5 text-sm leading-6 text-orange-800">
            This calculator is for informational purposes only and is not
            medical advice.
          </div>
        </section>
        <div className="mt-10">
  <CalculatorFaq items={calorieFaqItems} />
</div>
      </MotionSection>
    </main>
  );
}
