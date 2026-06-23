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
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      whileHover={{ y: -6, scale: 1.012 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className="h-full"
    >
      <Link
        href={href}
        onClick={() => saveRecentlyViewedCalculator(href)}
        className="group block h-full"
      >
        <Card
          className={`relative h-full overflow-hidden border p-5 shadow-sm transition-all duration-300 ${
            isLive
              ? "border-emerald-200 bg-white hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100/70"
              : "border-slate-200 bg-white/80 hover:border-slate-300 hover:shadow-md"
          }`}
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-emerald-300 to-orange-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="flex items-start justify-between gap-4">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 transition-transform duration-300 group-hover:scale-105 ${
                isLive
                  ? "bg-emerald-100 text-emerald-700 ring-emerald-200"
                  : "bg-slate-100 text-slate-600 ring-slate-200"
              }`}
            >
              <Icon className="h-5 w-5" />
            </div>

            <Badge
              variant={isLive ? "default" : "secondary"}
              className={
                isLive
                  ? "bg-emerald-600 text-white hover:bg-emerald-600"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-100"
              }
            >
              {isLive ? "Live" : "Soon"}
            </Badge>
          </div>

          <div className="mt-5">
            <p
              className={`text-sm font-medium ${
                isLive ? "text-emerald-700" : "text-slate-500"
              }`}
            >
              {category}
            </p>

            <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-950">
              {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {description}
            </p>
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm font-medium text-slate-700">
            {isLive ? "Calculate now" : "Preview tool"}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}