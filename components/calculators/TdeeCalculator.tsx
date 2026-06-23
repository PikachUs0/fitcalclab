"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Calculator, RotateCcw, Ruler, Scale } from "lucide-react";

import {
  calculateTDEE,
  type ActivityLevel,
  type TdeeFormulaOption,
  type TdeeResult,
  type TdeeUnit,
} from "@/lib/calculations/tdee";

import {
  getPreferredUnit,
  setPreferredUnit,
  type PreferredUnit,
} from "@/lib/storage/preferredUnit";

import {
  getFitnessProfile,
  updateFitnessProfile,
} from "@/lib/storage/fitnessProfile";

import { AnimatedNumberSliderField } from "@/components/common/AnimatedNumberSliderField";
import { CopyButton } from "@/components/common/CopyButton";
import { ResultCard } from "@/components/common/ResultCard";
import { SegmentedControl } from "@/components/common/SegmentedControl";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function TdeeCalculator() {
  const [unit, setUnit] = useState<TdeeUnit>("metric");
  const [formulaOption, setFormulaOption] =
    useState<TdeeFormulaOption>("male");
  const [activityLevel, setActivityLevel] =
    useState<ActivityLevel>("moderate");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");

  const [result, setResult] = useState<TdeeResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const profile = getFitnessProfile();
    const savedUnit = (profile.unit ?? getPreferredUnit("metric")) as TdeeUnit;

    setUnit(savedUnit);

    if (profile.formulaOption) {
      setFormulaOption(profile.formulaOption as TdeeFormulaOption);
    }

    if (profile.activityLevel) {
      setActivityLevel(profile.activityLevel as ActivityLevel);
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
  }, []);

  function handleUnitChange(value: string) {
    const nextUnit = value as TdeeUnit;
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
    const nextFormulaOption = value as TdeeFormulaOption;

    setFormulaOption(nextFormulaOption);
    updateFitnessProfile({
      formulaOption: nextFormulaOption,
    });
  }

  function handleActivityLevelChange(value: string) {
    const nextActivityLevel = value as ActivityLevel;

    setActivityLevel(nextActivityLevel);
    updateFitnessProfile({
      activityLevel: nextActivityLevel,
    });
  }

  function handleCalculate() {
    setError("");

    try {
      const calculated = calculateTDEE({
        unit,
        formulaOption,
        activityLevel,
        height: Number(height),
        weight: Number(weight),
        age: Number(age),
      });

      setResult(calculated);

      if (unit === "metric") {
        updateFitnessProfile({
          unit,
          formulaOption,
          activityLevel,
          age: Number(age),
          heightCm: Number(height),
          weightKg: Number(weight),
        });
      } else {
        updateFitnessProfile({
          unit,
          formulaOption,
          activityLevel,
          age: Number(age),
          heightIn: Number(height),
          weightLb: Number(weight),
        });
      }
    } catch {
      setResult(null);
      setError("Please enter valid height, weight and age values.");
    }
  }

  function handleReset() {
    setHeight("");
    setWeight("");
    setAge("");
    setResult(null);
    setError("");
  }

  const copyText = result
    ? `My TDEE result from FitCalcLab:
Estimated TDEE: ${result.tdee} kcal/day
BMR: ${result.bmr} kcal/day
Activity level: ${result.activityLabel}
Mild weight loss: ${result.mildWeightLoss} kcal/day
Weight loss: ${result.weightLoss} kcal/day
Weight gain: ${result.weightGain} kcal/day
Formula option: ${formulaOption === "male" ? "Male formula" : "Female formula"}
Unit system: ${unit === "metric" ? "Metric" : "Imperial"}`
    : "";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <Card className="border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Enter your details
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Enter your body details and activity level to estimate your total
            daily calorie needs.
          </p>
        </div>

        <div className="grid gap-5">
          <SegmentedControl
            id="tdee-unit"
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
            id="tdee-formula-option"
            label="Formula option"
            value={formulaOption}
            onChange={handleFormulaOptionChange}
            options={[
              {
                value: "male",
                label: "Male",
                helper: "formula",
              },
              {
                value: "female",
                label: "Female",
                helper: "formula",
              },
            ]}
          />

          <SegmentedControl
            id="tdee-activity-level"
            label="Activity level"
            value={activityLevel}
            onChange={handleActivityLevelChange}
            options={[
              {
                value: "sedentary",
                label: "Sedentary",
                helper: "little exercise",
              },
              {
                value: "light",
                label: "Light",
                helper: "1-3 days",
              },
              {
                value: "moderate",
                label: "Moderate",
                helper: "3-5 days",
              },
              {
                value: "very",
                label: "Very active",
                helper: "6-7 days",
              },
              {
                value: "extra",
                label: "Extra active",
                helper: "hard training",
              },
            ]}
          />

          <AnimatedNumberSliderField
            id="tdee-age"
            label="Age"
            value={age}
            onChange={setAge}
            min={10}
            max={90}
            step={1}
            placeholder="Example: 25"
          />

          <AnimatedNumberSliderField
            id="tdee-height"
            label="Height"
            value={height}
            onChange={setHeight}
            min={unit === "metric" ? 120 : 48}
            max={unit === "metric" ? 230 : 90}
            step={1}
            suffix={unit === "metric" ? "cm" : "in"}
            placeholder={unit === "metric" ? "Example: 178" : "Example: 70"}
          />

          <AnimatedNumberSliderField
            id="tdee-weight"
            label="Weight"
            value={weight}
            onChange={setWeight}
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
              Calculate TDEE
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
                label="Estimated TDEE"
                value={`${result.tdee} kcal/day`}
                numericValue={result.tdee}
                suffix=" kcal/day"
                description={`Based on ${result.activityLabel.toLowerCase()} activity.`}
                tone="emerald"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <ResultCard
                  label="BMR"
                  value={`${result.bmr} kcal/day`}
                  numericValue={result.bmr}
                  suffix=" kcal/day"
                  description="Estimated calories at rest."
                  tone="slate"
                />

                <ResultCard
                  label="Mild weight loss"
                  value={`${result.mildWeightLoss} kcal/day`}
                  numericValue={result.mildWeightLoss}
                  suffix=" kcal/day"
                  description="About 250 kcal below maintenance."
                  tone="orange"
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
                  tone="slate"
                />
              </div>

              <Card className="border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                      Save or share your result
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Copy your TDEE result and use it as a starting point for
                      macros, protein and calorie planning.
                    </p>
                  </div>

                  <CopyButton text={copyText} />
                </div>
              </Card>

              <Card className="border-orange-100 bg-orange-50 p-5 text-sm leading-6 text-orange-800">
                These numbers are estimates. Real calorie needs can vary based
                on body composition, movement, training and lifestyle.
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
                  Enter your details to estimate your total daily calorie needs.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}