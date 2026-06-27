import { CalculatorExplorer } from "@/components/calculators/CalculatorExplorer";
import { MotionSection } from "@/components/motion/MotionSection";

export default function CalculatorsPage() {
  return (
    <main className="bg-slate-50 text-slate-950 dark:bg-[#062f2d] dark:text-slate-50">
      <MotionSection className="mx-auto max-w-6xl px-4 py-14">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            Fitness tools
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl dark:text-white">
            All fitness calculators
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Search and explore calculators for body metrics, calories, macros,
            hydration and training numbers.
          </p>
        </div>

        <CalculatorExplorer />
      </MotionSection>
    </main>
  );
}
