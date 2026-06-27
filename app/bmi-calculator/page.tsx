import { BmiCalculator } from "@/components/calculators/BmiCalculator";
import type { Metadata } from "next";
import { QuickAnswer } from "@/components/common/QuickAnswer";
import { CalculatorFaq } from "@/components/common/CalculatorFaq";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/lib/site";
import { CalculatorJsonLd } from "@/components/seo/CalculatorJsonLd";
import { AdSlot } from "@/components/common/AdSlot";
import { NextStepSection } from "@/components/common/NextStepSection";
import { RelatedTools } from "@/components/common/RelatedTools";
import { CalculatorQuickNav } from "@/components/common/CalculatorQuickNav";
import { MotionSection } from "@/components/motion/MotionSection";
import { CalculatorInfoBox } from "@/components/common/CalculatorInfoBox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "BMI Calculator - Calculate Your Body Mass Index",
  description:
    "Use the free FitCalcLab BMI calculator to estimate your body mass index from height and weight. Supports metric and imperial units.",
  alternates: {
    canonical: "/bmi-calculator",
  },
  openGraph: {
    title: "BMI Calculator - Calculate Your Body Mass Index",
    description:
      "Estimate your BMI, category and normal weight range with a fast metric and imperial BMI calculator.",
    url: `${siteConfig.url}/bmi-calculator`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMI Calculator - Calculate Your Body Mass Index",
    description:
      "Estimate your BMI, category and normal weight range with FitCalcLab.",
  },
};

const bmiFaqItems = [
  {
    question: "What is BMI?",
    answer:
      "BMI stands for Body Mass Index. It is a simple estimate that compares body weight with height to create a general body size category.",
  },
  {
    question: "Is BMI accurate for everyone?",
    answer:
      "BMI can be useful as a quick screening number, but it does not directly measure body fat, muscle mass, fitness level or overall health.",
  },
  {
    question: "What units does this BMI calculator support?",
    answer:
      "The FitCalcLab BMI calculator supports metric units such as centimeters and kilograms, as well as imperial units such as inches and pounds.",
  },
  {
    question: "What does the normal weight range mean?",
    answer:
      "The normal weight range is estimated from the commonly used BMI range of 18.5 to 24.9. It is an estimate and should not be treated as medical advice.",
  },
];

export default function BmiCalculatorPage() {
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
      name: "BMI Calculator",
      href: "/bmi-calculator",
    },
  ]}
/>
<CalculatorJsonLd
  name="BMI Calculator"
  description="A free web-based BMI calculator that estimates body mass index from height and weight using metric or imperial units."
  path="/bmi-calculator"
/>
      <MotionSection className="mx-auto max-w-6xl px-4 py-12">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-emerald-700">Body metrics</p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
            BMI Calculator
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Use this simple BMI calculator to estimate your body mass index from
            your height and weight. Supports both metric and imperial units.
          </p>
        </div>

        <div className="mt-8">
          <CalculatorQuickNav currentHref="/bmi-calculator" />
        </div>
        <QuickAnswer>
  <p>
    The BMI Calculator estimates body mass index by comparing body weight with
    height. BMI is useful as a quick screening estimate, but it does not directly
    measure body fat, muscle mass or overall health.
  </p>
</QuickAnswer>

        <div className="mt-8">
          <BmiCalculator />
        </div>

        <div className="mt-10">
          <NextStepSection
            title="Next, estimate your resting calories"
            description="BMI gives you a basic body metric. BMR helps estimate how many calories your body may burn at rest."
            href="/bmr-calculator"
            buttonLabel="Calculate BMR"
          />
        </div>

        <div className="my-10">
          <AdSlot />
        </div>

        <div className="mb-10">
  <CalculatorInfoBox
    title="How to read your BMI result"
    howToUse={[
      "Choose metric or imperial units.",
      "Enter your height and weight.",
      "Click the calculate button to see your BMI score.",
      "Review the category and estimated normal weight range.",
    ]}
    resultMeaning="BMI is a simple estimate based on height and weight. It can be useful as a quick screening number, but it does not directly measure body fat, muscle mass or overall health."
  />
</div>

        <section className="grid gap-8 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              BMI formula
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              BMI stands for Body Mass Index. In metric units, BMI is calculated
              as weight in kilograms divided by height in meters squared.
            </p>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4 font-mono text-sm text-slate-700">
              BMI = weight / height²
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Example calculation
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              If someone weighs 75 kg and is 180 cm tall, the height is 1.8
              meters. The BMI calculation is 75 / 1.8², which equals about 23.1.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Frequently asked questions
            </h2>

            <Accordion type="single" collapsible className="mt-4">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is BMI a medical diagnosis?</AccordionTrigger>
                <AccordionContent>
                  No. BMI is a simple estimate based on height and weight. It is
                  not medical advice and does not directly measure body fat.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Does BMI work for athletes?</AccordionTrigger>
                <AccordionContent>
                  BMI can be less useful for athletes because it does not
                  distinguish between muscle mass and fat mass.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Can I use pounds and inches?</AccordionTrigger>
                <AccordionContent>
                  Yes. Choose the imperial unit option to calculate BMI using
                  inches and pounds.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="rounded-2xl bg-orange-50 p-5 text-sm leading-6 text-orange-800">
            This calculator is for informational purposes only and is not
            medical advice. For health-related decisions, consult a qualified
            professional.
          </div>
        </section>

        <div className="mt-12">
          <RelatedTools currentHref="/bmi-calculator" />
        </div>
        <div className="mt-10">
  <CalculatorFaq items={bmiFaqItems} />
</div>
      </MotionSection>
    </main>
  );
}

