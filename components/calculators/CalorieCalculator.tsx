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
  Target,
  UserRound,
  Zap,
} from "lucide-react";

import {
  calculateCalories,
  type CalorieActivityLevel,
  type CalorieFormulaOption,
  type CalorieGoal,
  type CalorieResult,
  type CalorieUnit,
} from "@/lib/calculations/calorie";

import {
  getFitnessProfile,
  updateFitnessProfile,
} from "@/lib/storage/fitnessProfile";

import {
  getPreferredUnit,
  setPreferredUnit,
  type PreferredUnit,
} from "@/lib/storage/preferredUnit";

import { CopyButton } from "@/components/common/CopyButton";
import { ResultCard } from "@/components/common/ResultCard";
import { SegmentedControl } from "@/components/common/SegmentedControl";
import { AnimatedNumberSliderField } from "@/components/common/AnimatedNumberSliderField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CalorieCalculator() {
  const [unit, setUnit] = useState<CalorieUnit>("metric");
  const [formulaOption, setFormulaOption] =
    useState<CalorieFormulaOption>("male");
  const [activityLevel, setActivityLevel] =
    useState<CalorieActivityLevel>("moderate");
  const [goal, setGoal] = useState<CalorieGoal>("maintain");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");

  const [result, setResult] = useState<CalorieResult | null>(null);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const profile = getFitnessProfile();
    const savedUnit = (profile.unit ?? getPreferredUnit("metric")) as CalorieUnit;

    setUnit(savedUnit);

    if (profile.formulaOption) {
      setFormulaOption(profile.formulaOption as CalorieFormulaOption);
    }

    if (profile.activityLevel) {
      setActivityLevel(profile.activityLevel as CalorieActivityLevel);
    }

    if (profile.calorieGoal) {
      setGoal(profile.calorieGoal as CalorieGoal);
    }

    if (profile.age) {
      setAge(String(profile.age));
    }

    if (savedUnit === "metric") {
      setHeight(profile.heightCm ? String(profile.heightCm) : "");
      setWeight(profile.weightKg ? String(profile.weightKg) : "");
    } else {
      setHeight(profile.heightIn ? String(profile.heightIn) : "");
      setWeight(profile.weightLb ? String(profile.weightLb) : "");
    }

    setMounted(true);
  }, []);

  function handleUnitChange(value: string) {
    const nextUnit = value as CalorieUnit;
    const profile = getFitnessProfile();

    setUnit(nextUnit);
    setPreferredUnit(nextUnit as PreferredUnit);
    updateFitnessProfile({ unit: nextUnit });

    if (nextUnit === "metric") {
      setHeight(profile.heightCm ? String(profile.heightCm) : "");
      setWeight(profile.weightKg ? String(profile.weightKg) : "");
    } else {
      setHeight(profile.heightIn ? String(profile.heightIn) : "");
      setWeight(profile.weightLb ? String(profile.weightLb) : "");
    }
  }

  function handleFormulaOptionChange(value: string) {
    const nextFormulaOption = value as CalorieFormulaOption;
    setFormulaOption(nextFormulaOption);
    updateFitnessProfile({ formulaOption: nextFormulaOption });
  }

  function handleActivityLevelChange(value: string) {
    const nextActivityLevel = value as CalorieActivityLevel;
    setActivityLevel(nextActivityLevel);
    updateFitnessProfile({ activityLevel: nextActivityLevel });
  }

  function handleGoalChange(value: string) {
    const nextGoal = value as CalorieGoal;
    setGoal(nextGoal);
    updateFitnessProfile({ calorieGoal: nextGoal });
  }

  function handleAgeChange(value: string) {
    setAge(value);
    const numericValue = Number(value);
    if (Number.isFinite(numericValue) && numericValue > 0) {
      updateFitnessProfile({ age: numericValue });
    }
  }

  function handleHeightChange(value: string) {
    setHeight(value);
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue) || numericValue <= 0) return;

    if (unit === "metric") {
      updateFitnessProfile({ unit, heightCm: numericValue });
    } else {
      updateFitnessProfile({ unit, heightIn: numericValue });
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

  function handleCalculate() {
    setError("");

    try {
      const numericHeight = Number(height);
      const numericWeight = Number(weight);
      const numericAge = Number(age);

      const calculated = calculateCalories({
        unit,
        formulaOption,
        activityLevel,
        goal,
        height: numericHeight,
        weight: numericWeight,
        age: numericAge,
      });

      setResult(calculated);

      // Karışık if-else yapısı temiz bir depolama mantığına dönüştürüldü
      if (unit === "metric") {
        updateFitnessProfile({
          unit,
          formulaOption,
          activityLevel,
          calorieGoal: goal,
          age: numericAge,
          heightCm: numericHeight,
          weightKg: numericWeight,
        });
      } else {
        updateFitnessProfile({
          unit,
          formulaOption,
          activityLevel,
          calorieGoal: goal,
          age: numericAge,
          heightIn: numericHeight,
          weightLb: numericWeight,
        });
      }
    } catch {
      setResult(null);
      setError("Please enter valid height, weight and age values.");
    }
  }

  function handleReset() {
    setUnit("metric");
    setFormulaOption("male");
    setActivityLevel("moderate");
    setGoal("maintain");
    setHeight("");
    setWeight("");
    setAge("");
    setResult(null);
    setError("");
  }

  if (!mounted) {
    return <div className="min-h-[400px] animate-pulse rounded-3xl bg-slate-100" />;
  }

  const copyText = result
    ? `My calorie result from FitCalcLab:
Goal: ${result.goalLabel}
Goal calories: ${result.goalCalories} kcal/day
Maintenance calories: ${result.maintenanceCalories} kcal/day
BMR: ${result.bmr} kcal/day

Other estimates:
Mild weight loss: ${result.mildWeightLoss} kcal/day
Weight loss: ${result.weightLoss} kcal/day
Weight gain: ${result.weightGain} kcal/day

Activity level: ${result.activityLabel}
Formula option: ${formulaOption === "male" ? "Male formula" : "Female formula"}
Unit system: ${unit === "metric" ? "Metric" : "Imperial"}`
    : "";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      {/* Sol Kolon: Girdi Formu */}
      <Card className="border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Enter your details
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Estimate daily calories based on your body details, activity level
            and goal.
          </p>
        </div>

        <div className="grid gap-5">
          <SegmentedControl
            id="calorie-unit"
            label="Unit system"
            value={unit}
            onChange={handleUnitChange}
            options={[
              {
                value: "metric",
                label: "Metric",
                helper: "cm / kg",
                icon: Ruler,
              },
              {
                value: "imperial",
                label: "Imperial",
                helper: "in / lb",
                icon: Scale,
              },
            ]}
          />

          <SegmentedControl
            id="calorie-formula-option"
            label="Formula option"
            value={formulaOption}
            onChange={handleFormulaOptionChange}
            options={[
              {
                value: "male",
                label: "Male",
                helper: "formula",
                icon: UserRound,
              },
              {
                value: "female",
                label: "Female",
                helper: "formula",
                icon: UserRound,
              },
            ]}
          />

          <SegmentedControl
            id="calorie-activity-level"
            label="Activity level"
            value={activityLevel}
            onChange={handleActivityLevelChange}
            options={[
              {
                value: "sedentary",
                label: "Sedentary",
                helper: "little exercise",
                icon: Activity,
              },
              {
                value: "light",
                label: "Light",
                helper: "1-3 days",
                icon: Activity,
              },
              {
                value: "moderate",
                label: "Moderate",
                helper: "3-5 days",
                icon: Zap,
              },
              {
                value: "very",
                label: "Very active",
                helper: "6-7 days",
                icon: Flame,
              },
              {
                value: "extra",
                label: "Extra active",
                helper: "hard training",
                icon: Dumbbell,
              },
            ]}
          />

          <SegmentedControl
            id="calorie-goal"
            label="Goal"
            value={goal}
            onChange={handleGoalChange}
            options={[
              {
                value: "lose",
                label: "Lose",
                helper: "deficit",
                icon: Flame,
              },
              {
                value: "maintain",
                label: "Maintain",
                helper: "balance",
                icon: Target,
              },
              {
                value: "gain",
                label: "Gain",
                helper: "surplus",
                icon: Dumbbell,
              },
            ]}
          />

          <AnimatedNumberSliderField
            id="age"
            label="Age"
            value={age}
            onChange={handleAgeChange}
            min={10}
            max={90}
            step={1}
            placeholder="Example: 25"
          />

          <AnimatedNumberSliderField
            id="height"
            label="Height"
            value={height}
            onChange={handleHeightChange}
            min={unit === "metric" ? 120 : 48}
            max={unit === "metric" ? 230 : 90}
            step={1}
            suffix={unit === "metric" ? "cm" : "in"}
            placeholder={unit === "metric" ? "Example: 178" : "Example: 70"}
          />

          <AnimatedNumberSliderField
            id="weight"
            label="Weight"
            value={weight}
            onChange={handleWeightChange}
            min={unit === "metric" ? 30 : 66}
            max={unit === "metric" ? 250 : 550}
            step={1}
            suffix={unit === "metric" ? "kg" : "lb"}
            placeholder={unit === "metric" ? "Example: 75" : "Example: 165"}
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
              Calculate calories
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

      {/* Sağ Kolon: Sonuç Alanı */}
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
                label="Goal calories"
                value={`${result.goalCalories} kcal/day`}
                numericValue={result.goalCalories}
                suffix=" kcal/day"
                description={`Goal: ${result.goalLabel}`}
                tone="emerald"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <ResultCard
                  label="Maintenance"
                  value={`${result.maintenanceCalories} kcal/day`}
                  numericValue={result.maintenanceCalories}
                  suffix=" kcal/day"
                  description="Estimated calories to maintain weight."
                  tone="slate"
                />

                <ResultCard
                  label="BMR"
                  value={`${result.bmr} kcal/day`}
                  numericValue={result.bmr}
                  suffix=" kcal/day"
                  description="Estimated calories at rest."
                  tone="slate"
                />

                <ResultCard
                  label="Weight loss"
                  value={`${result.weightLoss} kcal/day`}
                  numericValue={result.weightLoss}
                  suffix=" kcal/day"
                  description="About 500 kcal below maintenance."
                  tone="orange"
                />

                <ResultCard
                  label="Weight gain"
                  value={`${result.weightGain} kcal/day`}
                  numericValue={result.weightGain}
                  suffix=" kcal/day"
                  description="About 300 kcal above maintenance."
                  tone="orange"
                />
              </div>

              <Card className="border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm leading-6 text-slate-600">
                  {result.description}
                </p>
              </Card>

              <Card className="border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                      Save or share your result
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Copy your calorie estimate and use it for macros or meal
                      planning.
                    </p>
                  </div>

                  <CopyButton text={copyText} />
                </div>
              </Card>

              <Card className="border-orange-100 bg-orange-50 p-5 text-sm leading-6 text-orange-800">
                These numbers are estimates. Real calorie needs can vary based
                on movement, body composition, sleep and lifestyle. This is not
                medical advice.
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
                  Enter your details to estimate your daily calorie target.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}