"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Activity,
  Apple,
  ArrowRight,
  Beef,
  Calculator,
  Droplets,
  Dumbbell,
  Flame,
  Gauge,
  HeartPulse,
  Scale,
  Target,
  type LucideIcon,
} from "lucide-react";

import type { CalculatorIconName } from "@/data/calculators";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type CalculatorCardProps = {
  title: string;
  description: string;
  href: string;
  category: string;
  status?: "live" | "soon";
  icon: CalculatorIconName;
};

type RecentCalculator = {
  href: string;
  viewedAt: number;
};

const STORAGE_KEY = "fitcalclab_recent_calculators";

const iconMap: Record<CalculatorIconName, LucideIcon> = {
  scale: Scale,
  flame: Flame,
  activity: Activity,
  apple: Apple,
  beef: Beef,
  droplets: Droplets,
  heartPulse: HeartPulse,
  target: Target,
  dumbbell: Dumbbell,
  gauge: Gauge,
  calculator: Calculator,
};

function saveRecentlyViewedCalculator(href: string) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    const currentItems: RecentCalculator[] = rawValue
      ? JSON.parse(rawValue)
      : [];

    const nextItems = [
      {
        href,
        viewedAt: Date.now(),
      },
      ...currentItems.filter((item) => item.href !== href),
    ].slice(0, 6);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
  } catch {
    // If localStorage fails, ignore silently.
  }
}

export function CalculatorCard({
  title,
  description,
  href,
  category,
  status = "soon",
  icon,
}: CalculatorCardProps) {
  const isLive = status === "live";
  const Icon = iconMap[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{
        duration: 0.40,
        ease: "easeOut",
      }}
      className="h-full"
    >
      <Link
        href={href}
        onClick={() => saveRecentlyViewedCalculator(href)}
        className="group block h-full"
      >
        <Card
          className={`relative h-full overflow-hidden border p-5 shadow-sm transition-colors duration-200 ${
            isLive
              ? "border-emerald-200 bg-white hover:border-emerald-300 dark:border-emerald-900 dark:bg-slate-900 dark:hover:border-emerald-700"
              : "border-slate-200 bg-white/80 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
          }`}
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-300 to-orange-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

          <div className="flex items-start justify-between gap-4">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 transition-colors duration-200 ${
                isLive
                  ? "bg-emerald-100 text-emerald-700 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-800"
                  : "bg-slate-100 text-slate-600 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700"
              }`}
            >
              <Icon className="h-5 w-5" />
            </div>

            <Badge
              variant={isLive ? "default" : "secondary"}
              className={
                isLive
                  ? "bg-emerald-600 text-white hover:bg-emerald-600 dark:bg-emerald-500 dark:text-slate-950 dark:hover:bg-emerald-500"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
              }
            >
              {isLive ? "Live" : "Soon"}
            </Badge>
          </div>

          <div className="mt-5">
            {/* DÜZELTÝLEN KISIM: className niteliði ve þablon dizisi (template literal) doðru þekilde eklendi */}
            <p
              className={`text-xs font-semibold uppercase tracking-wider ${
                isLive
                  ? "text-emerald-700 dark:text-emerald-300"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {category}
            </p>

            <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
              {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {description}
            </p>
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            {isLive ? "Calculate now" : "Preview tool"}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
