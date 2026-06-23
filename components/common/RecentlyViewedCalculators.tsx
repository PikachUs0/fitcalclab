"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Clock, X } from "lucide-react";

import { calculators } from "@/data/calculators";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const STORAGE_KEY = "fitcalclab_recent_calculators";

type RecentCalculator = {
  href: string;
  viewedAt: number;
};

function readRecentCalculators(): RecentCalculator[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter((item) => {
      return (
        typeof item === "object" &&
        item !== null &&
        typeof item.href === "string" &&
        typeof item.viewedAt === "number"
      );
    });
  } catch {
    return [];
  }
}

function clearRecentCalculators() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}

export function RecentlyViewedCalculators() {
  const [recentItems, setRecentItems] = useState<RecentCalculator[]>([]);

  useEffect(() => {
    setRecentItems(readRecentCalculators());
  }, []);

  const recentCalculators = useMemo(() => {
    return recentItems
      .map((recentItem) => {
        const calculator = calculators.find(
          (item) => item.href === recentItem.href
        );

        if (!calculator) {
          return null;
        }

        return {
          ...calculator,
          viewedAt: recentItem.viewedAt,
        };
      })
      .filter(Boolean)
      .slice(0, 4);
  }, [recentItems]);

  function handleClear() {
    clearRecentCalculators();
    setRecentItems([]);
  }

  if (recentCalculators.length === 0) {
    return null;
  }

  return (
    <Card className="border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
            <Clock className="h-4 w-4" />
            Recently viewed
          </div>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            Continue where you left off
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Quickly return to calculators you opened recently.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleClear}
          className="rounded-full"
        >
          <X className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {recentCalculators.map((calculator) => {
          if (!calculator) {
            return null;
          }

          return (
            <Link
              key={calculator.href}
              href={calculator.href}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-emerald-200 hover:bg-emerald-50"
            >
              <p className="text-sm font-medium text-emerald-700">
                {calculator.category}
              </p>

              <p className="mt-1 font-semibold text-slate-950">
                {calculator.title}
              </p>

              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                {calculator.description}
              </p>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}