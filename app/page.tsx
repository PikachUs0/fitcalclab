import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { calculators } from "@/data/calculators";
import { CalculatorCard } from "@/components/common/CalculatorCard";
import { DashboardPreview } from "@/components/home/DashboardPreview";
import { MotionSection } from "@/components/motion/MotionSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  const popularCalculators = calculators.slice(0, 8);
  const liveCalculators = calculators.filter(
    (calculator) => calculator.status === "live"
  );

  return (
    <main className="bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
  <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.08fr_0.92fr] md:items-center md:py-24">
          <MotionSection>
            <div className="inline-flex rounded-full border border-emerald-200 bg-white px-3 py-1 text-sm font-medium text-emerald-700 shadow-sm dark:border-emerald-900 dark:bg-slate-900 dark:text-emerald-300">
              Fitness calculators, made simple
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl dark:text-white">
              Fitness calculators for calories, macros and body metrics.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Calculate BMI, BMR, TDEE, macros, protein, water intake and body
              metrics with clean, fast and privacy-friendly tools.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-emerald-600 hover:bg-emerald-700"
              >
                <Link href="/calculators">
                  Explore calculators
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link href="/bmi-calculator">Try BMI calculator</Link>
              </Button>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-slate-600 sm:grid-cols-3 dark:text-slate-300">
              {["No signup", "Metric & imperial", "Clear explanations"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    {item}
                  </div>
                )
              )}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Card className="border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-2xl font-bold text-slate-950">
                  {liveCalculators.length}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Live calculators
                </p>
              </Card>

              <Card className="border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-2xl font-bold text-slate-950">100%</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Browser-based</p>
              </Card>

              <Card className="border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="text-2xl font-bold text-slate-950">0</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Signup needed</p>
              </Card>
            </div>
          </MotionSection>

          <div className="hidden md:block">
  <DashboardPreview />
</div>
        </div>
      </section>

      

      <MotionSection className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-emerald-700">
              Popular calculators
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
              Start with your core fitness numbers
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
              Move from body metrics to calories, macros and training estimates
              with connected calculator pages.
            </p>
          </div>

          <Button asChild variant="outline" className="rounded-full">
            <Link href="/calculators">View all calculators</Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularCalculators.map((calculator) => (
            <CalculatorCard key={calculator.href} {...calculator} />
          ))}
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-6 rounded-[2rem] bg-slate-950 p-6 text-white md:grid-cols-[0.9fr_1.1fr] md:p-8">
          <div>
            <p className="text-sm font-medium text-emerald-300">
              Better calculator flow
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Keep users moving from one result to the next.
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              A user can start with BMI, continue with BMR and TDEE, then use
              macros, protein and water calculators to understand the next
              steps.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "BMI → BMR",
              "BMR → TDEE",
              "TDEE → Macros",
              "Macros → Protein",
            ].map((step) => (
              <div
                key={step}
                className="rounded-2xl bg-white/10 p-4 text-sm font-medium text-slate-100 ring-1 ring-white/10"
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </MotionSection>
    </main>
  );
}