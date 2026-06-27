"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Activity,
  Calculator,
  Dumbbell,
  Flame,
  RotateCcw,
  Ruler,
  Scale,
} from "lucide-react";

import {
  calculateProtein,
  type ProteinGoal,
  type ProteinResult,
  type ProteinUnit,
} from "@/lib/calculations/protein";

import { CopyButton } from "@/components/common/CopyButton";
import { ResultCard } from "@/components/common/ResultCard";
import { SegmentedControl } from "@/components/common/SegmentedControl";
import {
  getFitnessProfile,
  updateFitnessProfile,
} from "@/lib/storage/fitnessProfile";
import {
  getPreferredUnit,
  setPreferredUnit,
  type PreferredUnit,
} from "@/lib/storage/preferredUnit";
import { AnimatedNumberSliderField } from "@/components/common/AnimatedNumberSliderField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ProteinCalculator() {
  const [unit, setUnit] = useState<ProteinUnit>("metric");
  const [goal, setGoal] = useState<ProteinGoal>("muscleGain");
  const [weight, setWeight] = useState("");
  const [mealsPerDay, setMealsPerDay] = useState("4");

  const [result, setResult] = useState<ProteinResult | null>(null);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  // İlk yüklemede local storage verilerini güvenli bir şekilde çekiyoruz
  useEffect(() => {
    const profile = getFitnessProfile();
    const savedUnit = (profile.unit ?? getPreferredUnit("metric")) as ProteinUnit;

    setUnit(savedUnit);

    if (savedUnit === "metric") {
      setWeight(profile.weightKg ? String(profile.weightKg) : "");
    } else {
      setWeight(profile.weightLb ? String(profile.weightLb) : "");
    }

    if (profile.proteinGoal) {
      setGoal(profile.proteinGoal as ProteinGoal);
    }

    if (profile.mealsPerDay) {
      setMealsPerDay(String(profile.mealsPerDay));
    }
    
    setMounted(true);
  }, []);

  function handleUnitChange(value: string) {
    const nextUnit = value as ProteinUnit;
    const profile = getFitnessProfile();

    setUnit(nextUnit);
    setPreferredUnit(nextUnit as PreferredUnit);
    updateFitnessProfile({ unit: nextUnit });

    if (nextUnit === "metric") {
      setWeight(profile.weightKg ? String(profile.weightKg) : "");
    } else {
      setWeight(profile.weightLb ? String(profile.weightLb) : "");
    }
  }

  function handleWeightChange(value: string) {
    setWeight(value);

    const numericValue = Number(value);
    if (!Number.isFinite(numericValue) || numericValue <= 0) return;

    if (unit === "metric") {
      updateFitnessProfile({ unit, weightKg: numericValue });
    } else {
      updateFitnessProfile({ unit, weightLb: numericValue });
    }
  }

  function handleGoalChange(value: string) {
    const nextGoal = value as ProteinGoal;
    setGoal(nextGoal);
    updateFitnessProfile({ proteinGoal: nextGoal });
  }

  function handleMealsPerDayChange(value: string) {
    setMealsPerDay(value);

    const numericValue = Number(value);
    if (Number.isFinite(numericValue) && numericValue > 0) {
      updateFitnessProfile({ mealsPerDay: numericValue });
    }
  }

  function handleCalculate() {
    setError("");

    try {
      const numericWeight = Number(weight);
      const numericMeals = Number(mealsPerDay);

      const calculated = calculateProtein({
        unit,
        goal,
        weight: numericWeight,
        mealsPerDay: numericMeals,
      });

      setResult(calculated);

      // Kırık olan profil güncelleme blokları temiz bir mantığa kavuşturuldu
      if (unit === "metric") {
        updateFitnessProfile({
          unit,
          proteinGoal: goal,
          mealsPerDay: numericMeals,
          weightKg: numericWeight,
        });
      } else {
        updateFitnessProfile({
          unit,
          proteinGoal: goal,
          mealsPerDay: numericMeals,
          weightLb: numericWeight,
        });
      }
    } catch {
      setResult(null);
      setError("Please enter valid weight and meals per day values.");
    }
  }

  function handleReset() {
    setUnit("metric");
    setGoal("muscleGain");
    setWeight("");
    setMealsPerDay("4");
    setResult(null);
    setError("");
  }

  // Hydration hatasını önlemek için mount olana kadar boş layout bırakıyoruz
  if (!mounted) {
    return <div className="min-h-[400px] animate-pulse rounded-3xl bg-slate-100" />;
  }

  const copyText = result
    ? `My protein result from FitCalcLab:
Daily protein target: ${result.targetGrams}g/day
Estimated range: ${result.minGrams} - ${result.maxGrams}g/day
Goal: ${result.goalLabel}

Per meal estimate (${mealsPerDay} meals/day):
Target per meal: ${result.targetPerMeal}g
Range per meal: ${result.minPerMeal} - ${result.maxPerMeal}g

Unit system: ${unit === "metric" ? "Metric" : "Imperial"}`
    : "";

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_0.9fr]">
      {/* Sol Kolon: Girdi Formu */}
      <Card className="border-slate-200 bg-white p-5 shadow-sm md:p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Enter your details
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
            Estimate your daily protein target based on weight and fitness goal.
          </p>
        </div>

        <div className="grid gap-5">
          <SegmentedControl
            id="protein-unit"
            label="Unit system"
            value={unit}
            onChange={handleUnitChange}
            options={[
              {
                value: "metric",
                label: "Metric",
                helper: "kg",
                icon: Ruler,
              },
              {
                value: "imperial",
                label: "Imperial",
                helper: "lb",
                icon: Scale,
              },
            ]}
          />

          <AnimatedNumberSliderField
            id="protein-weight"
            label="Weight"
            value={weight}
            onChange={handleWeightChange}
            min={unit === "metric" ? 30 : 66}
            max={unit === "metric" ? 250 : 550}
            step={1}
            suffix={unit === "metric" ? "kg" : "lb"}
            placeholder={unit === "metric" ? "Example: 75" : "Example: 165"}
          />

          <SegmentedControl
            id="protein-goal"
            label="Goal"
            value={goal}
            onChange={handleGoalChange}
            options={[
              {
                value: "general",
                label: "General",
                helper: "fitness",
                icon: Activity,
              },
              {
                value: "fatLoss",
                label: "Fat loss",
                helper: "cut",
                icon: Flame,
              },
              {
                value: "muscleGain",
                label: "Muscle gain",
                helper: "strength",
                icon: Dumbbell,
              },
              {
                value: "endurance",
                label: "Endurance",
                helper: "training",
                icon: Activity,
              },
            ]}
          />

          <AnimatedNumberSliderField
            id="protein-meals"
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
              Calculate protein
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
                label="Daily protein target"
                value={`${result.targetGrams}g/day`}
                numericValue={result.targetGrams}
                suffix="g/day"
                description={`Goal: ${result.goalLabel}`}
                tone="emerald"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <ResultCard
                  label="Estimated range"
                  value={`${result.minGrams} - ${result.maxGrams}g`}
                  numericValue={result.minGrams}
                  suffix="g"
                  description="Daily protein range."
                  tone="slate"
                />

                <ResultCard
                  label="Per meal target"
                  value={`${result.targetPerMeal}g`}
                  numericValue={result.targetPerMeal}
                  suffix="g"
                  description="Average per meal."
                  tone="orange"
                />
              </div>

              <Card className="border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                  Per meal range
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  If you eat {mealsPerDay} meals per day, your estimated protein
                  range is about <strong>{result.minPerMeal}g</strong> to{" "}
                  <strong>{result.maxPerMeal}g</strong> per meal.
                </p>
              </Card>

              <Card className="border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                      Save or share your result
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                      Copy your protein target and save it to notes or use it in
                      your meal planning.
                    </p>
                  </div>

                  <CopyButton text={copyText} />
                </div>
              </Card>

              <Card className="border-orange-100 bg-orange-50 p-5 text-sm leading-6 text-orange-800">
                {result.description} This calculator is informational only and
                is not medical advice.
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

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Enter your weight and goal to estimate your protein target.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
