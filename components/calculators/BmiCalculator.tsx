"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Calculator, RotateCcw, Ruler, Scale } from "lucide-react";
import { SegmentedControl } from "@/components/common/SegmentedControl";

import {
  calculateBMI,
  type BmiResult,
  type BmiUnit,
} from "@/lib/calculations/bmi";

import {
  getPreferredUnit,
  setPreferredUnit,
  type PreferredUnit,
} from "@/lib/storage/preferredUnit";

import {
  getFitnessProfile,
  updateFitnessProfile,
} from "@/lib/storage/fitnessProfile";

import { CopyButton } from "@/components/common/CopyButton";
import { ResultCard } from "@/components/common/ResultCard";
import { AnimatedNumberSliderField } from "@/components/common/AnimatedNumberSliderField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SmoothProgress } from "@/components/common/SmoothProgress";
export function BmiCalculator() {
  const [unit, setUnit] = useState<BmiUnit>("metric");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [result, setResult] = useState<BmiResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
  const profile = getFitnessProfile();
  const savedUnit = (profile.unit ?? getPreferredUnit("metric")) as BmiUnit;

  setUnit(savedUnit);

  if (savedUnit === "metric") {
    setHeight(profile.heightCm ? String(profile.heightCm) : "");
    setWeight(profile.weightKg ? String(profile.weightKg) : "");
  } else {
    setHeight(profile.heightIn ? String(profile.heightIn) : "");
    setWeight(profile.weightLb ? String(profile.weightLb) : "");
  }
}, []);

  function handleUnitChange(value: string) {
  const nextUnit = value as BmiUnit;
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

  function handleCalculate() {
  setError("");

  try {
    const calculated = calculateBMI({
      unit,
      height: Number(height),
      weight: Number(weight),
    });

    setResult(calculated);

    if (unit === "metric") {
      updateFitnessProfile({
        unit,
        heightCm: Number(height),
        weightKg: Number(weight),
      });
    } else {
      updateFitnessProfile({
        unit,
        heightIn: Number(height),
        weightLb: Number(weight),
      });
    }
  } catch {
    setResult(null);
    setError("Please enter valid height and weight values.");
  }
}

  function handleReset() {
    setHeight("");
    setWeight("");
    setResult(null);
    setError("");
  }

  const progressValue = result
    ? Math.min(Math.max((result.bmi / 40) * 100, 0), 100)
    : 0;

  const resultText = result
    ? `My BMI result from FitCalcLab:
BMI: ${result.bmi}
Category: ${result.category}
Estimated normal weight range: ${result.healthyWeightMin} - ${
        result.healthyWeightMax
      } ${unit === "metric" ? "kg" : "lb"}`
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
            Choose your unit system, then enter your height and weight.
          </p>
        </div>

        {/* Giriş elemanlarını estetik olarak sarmalamak için grid yapısı açıldı */}
        <div className="grid gap-5">
          <SegmentedControl
            id="bmi-unit"
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

          <AnimatedNumberSliderField
            id="bmi-height"
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
            id="bmi-weight"
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
              Calculate BMI
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
        </div> {/* Kapsayıcı hiyerarşisi düzeltildi */}
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
                label="Your BMI"
                value={String(result.bmi)}
                numericValue={result.bmi}
                decimals={1}
                description={result.category}
                tone="emerald"
              />

              <Card className="border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Category
                    </p>
                    <p className="mt-1 text-xl font-semibold text-slate-950">
                      {result.category}
                    </p>
                  </div>

                  <div className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                    Estimate
                  </div>
                </div>

                <div className="mt-5">
                  <SmoothProgress value={progressValue} tone="primary" />
                  <div className="mt-2 flex justify-between text-xs text-slate-500">
                    <span>18.5</span>
                    <span>25</span>
                    <span>30+</span>
                  </div>
                </div>

                {result.description && (
                  <p className="mt-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {result.description}
                  </p>
                )}
              </Card>

              <ResultCard
                label="Estimated normal weight range"
                value={`${result.healthyWeightMin} - ${
                  result.healthyWeightMax
                } ${unit === "metric" ? "kg" : "lb"}`}
                description="Based on the commonly used BMI range of 18.5 to 24.9."
                tone="slate"
              />

              <Card className="border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                      Save or share your result
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                      Copy your BMI result and save it to notes or share it
                      with your coach.
                    </p>
                  </div>

                  <CopyButton text={resultText} />
                </div>
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
                  Enter your height and weight to see your BMI score, category
                  and estimated normal weight range.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
