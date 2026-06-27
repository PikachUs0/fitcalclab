"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Calculator } from "lucide-react";

type CalculatorQuickNavProps = {
  currentHref: string;
  className?: string;
};

const calculatorLinks = [
  {
    label: "BMI",
    href: "/bmi-calculator",
  },
  {
    label: "BMR",
    href: "/bmr-calculator",
  },
  {
    label: "TDEE",
    href: "/tdee-calculator",
  },
  {
    label: "Macro",
    href: "/macro-calculator",
  },
  {
    label: "Protein",
    href: "/protein-calculator",
  },
  {
    label: "Water",
    href: "/water-intake-calculator",
  },
  {
    label: "Body Fat",
    href: "/body-fat-calculator",
  },
  {
    label: "Ideal Weight",
    href: "/ideal-weight-calculator",
  },
  {
    label: "1RM",
    href: "/one-rep-max-calculator",
  },
  {
    label: "Calories",
    href: "/calorie-calculator",
  },
  {
    label: "Timeline",
    href: "/weight-loss-timeline-calculator",
  },
];

export function CalculatorQuickNav({
  currentHref,
  className = "",
}: CalculatorQuickNavProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const activeItemRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const activeItem = activeItemRef.current;

    if (!scrollContainer || !activeItem) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const targetLeft =
        activeItem.offsetLeft -
        scrollContainer.clientWidth / 2 +
        activeItem.clientWidth / 2;

      scrollContainer.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: "auto",
      });
    }, 80);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [currentHref]);

  return (
    <nav
      className={`rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
      aria-label="Calculator quick navigation"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          <Calculator className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Calculator quick navigation
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Jump between related fitness tools.
          </p>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="mt-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {calculatorLinks.map((link) => {
          const isActive = link.href === currentHref;

          return (
            <Link
              key={link.href}
              href={link.href}
              ref={isActive ? activeItemRef : null}
              aria-current={isActive ? "page" : undefined}
              className={`shrink-0 rounded-full border px-5 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "border-emerald-600 bg-emerald-600 text-white dark:border-emerald-500 dark:bg-emerald-500 dark:text-slate-950"
                  : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-emerald-500 dark:hover:text-emerald-300"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
