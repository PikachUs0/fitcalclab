"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion"; // Veya projenizde yüklüyse "motion/react" olarak bırakabilirsiniz
import { Apple, Beef, Flame, Wheat } from "lucide-react";

import { SlidingNumber } from "@/components/core/sliding-number";
import { Card } from "@/components/ui/card";

export function CalorieTargetSlider() {
  const [calories, setCalories] = useState(2400);

  const macros = useMemo(() => {
    const proteinCalories = calories * 0.3;
    const carbsCalories = calories * 0.4;
    const fatCalories = calories * 0.3;

    return {
      protein: Math.round(proteinCalories / 4),
      carbs: Math.round(carbsCalories / 4),
      fat: Math.round(fatCalories / 9),
    };
  }, [calories]);

  return (
    <Card className="overflow-hidden border-slate-200 bg-white p-5 shadow-sm md:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="grid gap-6 md:grid-cols-[0.95fr_1.05fr] md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
            <Flame className="h-4 w-4" />
            Interactive calorie target
          </div>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
            Adjust daily calories and watch macros update.
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Move the slider to preview how protein, carbs and fat targets can
            change with your daily calorie goal.
          </p>

          <div className="mt-6">
            <label
              htmlFor="calorie-slider"
              className="text-sm font-medium text-slate-700"
            >
              Daily calorie target
            </label>

            <input
              id="calorie-slider"
              type="range"
              min={1200}
              max={4500}
              step={50}
              value={calories}
              onChange={(event) => setCalories(Number(event.target.value))}
              className="mt-3 w-full accent-emerald-600"
            />

            <div className="mt-2 flex justify-between text-xs text-slate-500">
              <span>1,200 kcal</span>
              <span>4,500 kcal</span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-[1.75rem] bg-slate-950 p-5 text-white"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">Daily target</p>

              <p className="mt-2 text-4xl font-bold tracking-tight">
                <SlidingNumber value={calories} />{" "}
                <span className="text-xl text-slate-400">kcal</span>
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20">
              <Apple className="h-6 w-6" />
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
              <div className="flex items-center gap-2 text-sm text-emerald-200">
                <Beef className="h-4 w-4" />
                Protein
              </div>

              <p className="mt-3 text-2xl font-bold">
                <SlidingNumber value={macros.protein} />g
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
              <div className="flex items-center gap-2 text-sm text-orange-200">
                <Wheat className="h-4 w-4" />
                Carbs
              </div>

              <p className="mt-3 text-2xl font-bold">
                <SlidingNumber value={macros.carbs} />g
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Flame className="h-4 w-4" />
                Fat
              </div>

              <p className="mt-3 text-2xl font-bold">
                <SlidingNumber value={macros.fat} />g
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-400">
            Example split: 30% protein, 40% carbs, 30% fat. This preview is for
            demonstration only and is not medical advice.
          </p>
        </motion.div>
      </div>
    </Card>
  );
}
