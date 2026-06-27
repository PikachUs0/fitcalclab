import { ArrowRight, Route } from "lucide-react";

const flowItems = [
  {
    step: "01",
    title: "BMI",
    description: "Start with a simple body mass index estimate.",
    href: "/bmi-calculator",
  },
  {
    step: "02",
    title: "BMR",
    description: "Estimate calories your body may burn at rest.",
    href: "/bmr-calculator",
  },
  {
    step: "03",
    title: "TDEE",
    description: "Add activity level to estimate daily calorie needs.",
    href: "/tdee-calculator",
  },
  {
    step: "04",
    title: "Macros",
    description: "Split calories into protein, carbs and fat.",
    href: "/macro-calculator",
  },
  {
    step: "05",
    title: "Protein",
    description: "Estimate a daily protein target for your goal.",
    href: "/protein-calculator",
  },
  {
    step: "06",
    title: "Water",
    description: "Estimate daily hydration needs.",
    href: "/water-intake-calculator",
  },
];

export function RecommendedFlow() {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <Route className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm font-medium text-emerald-700">
            Recommended flow
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
            Not sure where to start?
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700 dark:text-slate-300">
            Follow this simple order to move from basic body metrics to daily
            calories, macros and hydration targets.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {flowItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group rounded-3xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-emerald-200 hover:bg-emerald-50/50 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-wide text-emerald-700">
                  STEP {item.step}
                </p>

                <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
                  {item.title}
                </h3>
              </div>

              <ArrowRight className="mt-1 h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-600" />
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
              {item.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
