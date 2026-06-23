import { Calculator } from "lucide-react";

const quickNavItems = [
  { label: "BMI", href: "/bmi-calculator" },
  { label: "BMR", href: "/bmr-calculator" },
  { label: "TDEE", href: "/tdee-calculator" },
  { label: "Macro", href: "/macro-calculator" },
  { label: "Protein", href: "/protein-calculator" },
  { label: "Water", href: "/water-intake-calculator" },
  { label: "Body Fat", href: "/body-fat-calculator" },
  { label: "Ideal Weight", href: "/ideal-weight-calculator" },
  { label: "1RM", href: "/one-rep-max-calculator" },
  { label: "Calories", href: "/calorie-calculator" },
  { label: "Timeline", href: "/weight-loss-timeline-calculator" },
];

type CalculatorQuickNavProps = {
  currentHref: string;
  className?: string;
};

export function CalculatorQuickNav({
  currentHref,
  className = "",
}: CalculatorQuickNavProps) {
  return (
    <nav
  className={`rounded-3xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}
>
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
          <Calculator className="h-4 w-4" />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-950">
            Calculator quick navigation
          </p>
          <p className="text-xs text-slate-500">
            Jump between related fitness tools.
          </p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {quickNavItems.map((item) => {
          const isActive = item.href === currentHref;

          return (
            <a
              key={item.href}
              href={item.href}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}