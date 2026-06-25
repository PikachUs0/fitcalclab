"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { calculators } from "@/data/calculators";
import { CalculatorCard } from "@/components/common/CalculatorCard";
import { Input } from "@/components/ui/input";

const categories = [
  "All",
  "Body Metrics",
  "Calories",
  "Nutrition",
  "Training",
  "Goal Planning",
];

export function CalculatorExplorer() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCalculators = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return calculators.filter((calculator) => {
      const matchesCategory =
        activeCategory === "All" || calculator.category === activeCategory;

      const searchableText = [
        calculator.title,
        calculator.description,
        calculator.category,
        calculator.status,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedQuery.length === 0 ||
        searchableText.includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const liveCount = calculators.filter(
    (calculator) => calculator.status === "live"
  ).length;

  return (
    <section className="mt-10">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm md:p-5">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search calculators..."
              className="h-12 rounded-full border-slate-200 bg-slate-50 pl-11"
            />
          </div>

          <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            {liveCount} live calculators
          </div>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {filteredCalculators.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCalculators.map((calculator) => (
            <CalculatorCard
  key={`${activeCategory}-${calculator.href}`}
  {...calculator}
/>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="text-lg font-semibold text-slate-950">
            No calculator found
          </p>

          <p className="mt-2 text-sm text-slate-600">
            Try another search term or category.
          </p>
        </div>
      )}
    </section>
  );
}