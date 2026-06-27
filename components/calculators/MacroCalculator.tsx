"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Calculator, RotateCcw } from "lucide-react";

import {
  calculateMacros,
  type MacroGoal,
  type MacroResult,
} from "@/lib/calculations/macros";

import { CopyButton } from "@/components/common/CopyButton";
import { ResultCard } from "@/components/common/ResultCard";
import { SegmentedControl } from "@/components/common/SegmentedControl";
import {
  getFitnessProfile,
  updateFitnessProfile,
} from "@/lib/storage/fitnessProfile";
import { AnimatedNumberSliderField } from "@/components/common/AnimatedNumberSliderField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SmoothProgress } from "@/components/common/SmoothProgress";

export function MacroCalculator() {
  const [calories, setCalories] = useState("");
  const [goal, setGoal] = useState<MacroGoal>("maintain");
  const [mealsPerDay, setMealsPerDay] = useState("4");

  const [result, setResult] = useState<MacroResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
  const profile = getFitnessProfile();

  if (profile.macroCalories) {
    setCalories(String(profile.macroCalories));
  }

  if (profile.macroGoal) {
    setGoal(profile.macroGoal as MacroGoal);
  }

  if (profile.mealsPerDay) {
    setMealsPerDay(String(profile.mealsPerDay));
  }
}, []);

function handleCaloriesChange(value: string) {
  setCalories(value);

  const numericValue = Number(value);

  if (Number.isFinite(numericValue) && numericValue > 0) {
    updateFitnessProfile({
      macroCalories: numericValue,
    });
  }
}

function handleGoalChange(value: string) {
  const nextGoal = value as MacroGoal;

  setGoal(nextGoal);
  updateFitnessProfile({
    macroGoal: nextGoal,
  });
}

function handleMealsPerDayChange(value: string) {
  setMealsPerDay(value);

  const numericValue = Number(value);

  if (Number.isFinite(numericValue) && numericValue > 0) {
    updateFitnessProfile({
      mealsPerDay: numericValue,
    });
  }
}
``

  function handleCalculate() {
    setError("");

    try {
      const calculated = calculateMacros({
        calories: Number(calories),
        goal,
        mealsPerDay: Number(mealsPerDay),
      });

      setResult(calculated);
      updateFitnessProfile({
          macroCalories: Number(calories),
          macroGoal: goal,
          mealsPerDay: Number(mealsPerDay),
        });
    } catch {
      setResult(null);
      setError("Please enter valid calories and meals per day values.");
    }
  }

  function handleReset() {
    setCalories("");
    setGoal("maintain");
    setMealsPerDay("4");
    setResult(null);
    setError("");
  }

  const copyText = result
    ? `My macro result from FitCalcLab:
Daily calories: ${result.calories} kcal
Goal: ${result.goalLabel}

Daily macros:
Protein: ${result.proteinGrams}g (${result.proteinPercent}%)
Carbs: ${result.carbsGrams}g (${result.carbsPercent}%)
Fat: ${result.fatGrams}g (${result.fatPercent}%)

Per meal estimate (${result.mealsPerDay} meals/day):
Protein: ${result.proteinPerMeal}g
Carbs: ${result.carbsPerMeal}g
Fat: ${result.fatPerMeal}g`
    : "";

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_0.9fr]">
      {/* Sol Kolon: Girdi Formu */}
      <Card className="border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Enter your calorie target
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Use your TDEE result or enter your own calorie target to estimate
            protein, carbs and fat.
          </p>
        </div>

        <div className="grid gap-5">
          <AnimatedNumberSliderField
        id="macro-calories"
        label="Daily calories"
        value={calories}
        onChange={handleCaloriesChange}
        min={1000}
        max={5000}
        step={50}
        suffix="kcal"
        placeholder="Example: 2400"
      />

          <SegmentedControl
            id="macro-goal"
            label="Goal"
            value={goal}
            onChange={handleGoalChange}
            options={[
              {
                value: "fatLoss",
                label: "Fat loss",
                helper: "cut",
              },
              {
                value: "maintain",
                label: "Maintain",
                helper: "balance",
              },
              {
                value: "muscleGain",
                label: "Muscle gain",
                helper: "bulk",
              },
            ]}
          />

          <AnimatedNumberSliderField
          id="macro-meals"
          label="Meals per day"
          value={mealsPerDay}
          onChange={handleMealsPerDayChange}
          min={1}
          max={8}
          step={1}
          placeholder="Example: 4"
        />

          {error ? (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              onClick={handleCalculate}
              className="rounded-full bg-emerald-600 hover:bg-emerald-700"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calculate macros
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="rounded-full"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Sağ Kolon: Sonuçlar */}
      <div>
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid gap-4"
            >
              <ResultCard
                label="Daily calories"
                value={`${result.calories} kcal`}
                numericValue={result.calories}
                suffix=" kcal"
                description={`Goal: ${result.goalLabel}`}
                tone="emerald"
              />

              <div className="grid gap-4 sm:grid-cols-3">
                <ResultCard
                  label="Protein"
                  value={`${result.proteinGrams}g`}
                  numericValue={result.proteinGrams}
                  suffix="g"
                  description={`${result.proteinPercent}% of calories`}
                  tone="emerald"
                />

                <ResultCard
                  label="Carbs"
                  value={`${result.carbsGrams}g`}
                  numericValue={result.carbsGrams}
                  suffix="g"
                  description={`${result.carbsPercent}% of calories`}
                  tone="orange"
                />

                <ResultCard
                  label="Fat"
                  value={`${result.fatGrams}g`}
                  numericValue={result.fatGrams}
                  suffix="g"
                  description={`${result.fatPercent}% of calories`}
                  tone="slate"
                />
              </div>

              {/* Dağılım Kartı */}
              <Card className="border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                  Macro distribution
                </h3>

                <div className="mt-5 grid gap-4">
                  <div>
                    <div className="mb-2 flex justify-between text-sm text-slate-600">
                      <span>Protein</span>
                      <span>{result.proteinPercent}%</span>
                    </div>
                    <SmoothProgress value={result.proteinPercent} tone="primary" />
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-sm text-slate-600">
                      <span>Carbs</span>
                      <span>{result.carbsPercent}%</span>
                    </div>
                    <SmoothProgress value={result.carbsPercent} tone="warning" />
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-sm text-slate-600">
                      <span>Fat</span>
                      <span>{result.fatPercent}%</span>
                    </div>
                    <SmoothProgress value={result.fatPercent} tone="neutral" />
                  </div>
                </div>

                {result.description && (
                  <p className="mt-5 text-sm leading-6 text-slate-600">
                    {result.description}
                  </p>
                )}
              </Card>

              {/* Öğün Başına Tahmin Kartı */}
              <Card className="border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                  Per meal estimate
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  If you eat {result.mealsPerDay} meals per day, each meal would
                  average about{" "}
                  <strong>{result.proteinPerMeal}g protein</strong>,{" "}
                  <strong>{result.carbsPerMeal}g carbs</strong> and{" "}
                  <strong>{result.fatPerMeal}g fat</strong>.
                </p>
              </Card>

              {/* Paylaşım Kartı */}
              <Card className="border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                      Save or share your result
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Copy your macro result and save it to notes or use it in
                      your meal planning.
                    </p>
                  </div>

                  <CopyButton text={copyText} />
                </div>
              </Card>

              <Card className="border-orange-100 bg-orange-50 p-5 text-sm leading-6 text-orange-800">
                These numbers are estimates. Macro needs can vary depending on
                training, preferences, health status and personal goals.
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[360px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center"
            >
              <div>
                <p className="text-lg font-semibold text-slate-900">
                  Your result will appear here
                </p>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
                  Enter your calories and goal to see your macro split.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
