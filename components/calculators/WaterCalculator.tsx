"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Calculator,
  Droplets,
  Flame,
  RotateCcw,
  Ruler,
  Scale,
} from "lucide-react";

import {
  calculateWater,
  type Climate,
  type WaterResult,
  type WaterUnit,
} from "@/lib/calculations/water";
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

export function WaterCalculator() {
  const [unit, setUnit] = useState<WaterUnit>("metric");
  const [climate, setClimate] = useState<Climate>("normal");
  const [weight, setWeight] = useState("");
  const [exerciseMinutes, setExerciseMinutes] = useState("0");

  const [result, setResult] = useState<WaterResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
  const profile = getFitnessProfile();
  const savedUnit = (profile.unit ?? getPreferredUnit("metric")) as WaterUnit;

  setUnit(savedUnit);

  if (savedUnit === "metric") {
    setWeight(profile.weightKg ? String(profile.weightKg) : "");
  } else {
    setWeight(profile.weightLb ? String(profile.weightLb) : "");
  }

  if (profile.waterExerciseMinutes !== undefined) {
    setExerciseMinutes(String(profile.waterExerciseMinutes));
  }

  if (profile.waterClimate) {
    setClimate(profile.waterClimate as Climate);
  }
}, []);

function handleUnitChange(value: string) {
  const nextUnit = value as WaterUnit;
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

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return;
  }

  if (unit === "metric") {
    updateFitnessProfile({
      unit,
      weightKg: numericValue,
    });
  } else {
    updateFitnessProfile({
      unit,
      weightLb: numericValue,
    });
  }
}

function handleExerciseMinutesChange(value: string) {
  setExerciseMinutes(value);

  const numericValue = Number(value);

  if (Number.isFinite(numericValue) && numericValue >= 0) {
    updateFitnessProfile({
      waterExerciseMinutes: numericValue,
    });
  }
}

function handleClimateChange(value: string) {
  const nextClimate = value as Climate;

  setClimate(nextClimate);
  updateFitnessProfile({
    waterClimate: nextClimate,
  });
}

  function handleCalculate() {
    setError("");

    try {
      const calculated = calculateWater({
        unit,
        climate,
        weight: Number(weight),
        exerciseMinutes: Number(exerciseMinutes),
      });

      setResult(calculated);
      if (unit === "metric") {
  updateFitnessProfile({
    unit,
    weightKg: Number(weight),
    waterExerciseMinutes: Number(exerciseMinutes),
    waterClimate: climate,
  });
} else {
  updateFitnessProfile({
    unit,
    weightLb: Number(weight),
    waterExerciseMinutes: Number(exerciseMinutes),
    waterClimate: climate,
  });
}
    } catch {
      setResult(null);
      setError("Please enter valid weight and exercise minutes values.");
    }
  }

  function handleReset() {
    setUnit("metric");
    setClimate("normal");
    setWeight("");
    setExerciseMinutes("0");
    setResult(null);
    setError("");
  }

  const copyText = result
    ? `My water intake result from FitCalcLab:
Daily water estimate: ${result.liters} L/day
Total: ${result.ml} ml
Ounces: ${result.ounces} oz
Cups: ${result.cups} cups

Breakdown:
Base estimate: ${result.baseMl} ml
Exercise extra: ${result.exerciseExtraMl} ml
Climate extra: ${result.climateExtraMl} ml

Unit system: ${unit === "metric" ? "Metric" : "Imperial"}
Climate: ${climate === "hot" ? "Hot climate / sweating more" : "Normal climate"}
Exercise minutes: ${exerciseMinutes} minutes/day`
    : "";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      {/* Sol Kolon: Input Formu */}
      <Card className="border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Enter your details
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Estimate daily water intake based on body weight, exercise and
            climate.
          </p>
        </div>

        {/* Form elemanlarını düzgün hizalamak için grid kapsayıcı div eklendi */}
        <div className="grid gap-5">
          <SegmentedControl
  id="water-unit"
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
            id="water-weight"
            label="Weight"
            value={weight}
            onChange={handleWeightChange}
            min={unit === "metric" ? 30 : 66}
            max={unit === "metric" ? 250 : 550}
            step={1}
            suffix={unit === "metric" ? "kg" : "lb"}
            placeholder={unit === "metric" ? "Example: 75" : "Example: 165"}
          />

          <AnimatedNumberSliderField
            id="water-exercise"
            label="Exercise minutes per day"
            value={exerciseMinutes}
            onChange={handleExerciseMinutesChange}
            min={0}
            max={180}
            step={5}
            suffix="min"
            placeholder="Example: 45"
          />

          <SegmentedControl
          id="water-climate"
          label="Climate"
          value={climate}
          onChange={handleClimateChange}

            options={[
              {
                value: "normal",
                label: "Normal",
                helper: "climate",
                icon: Droplets,
              },
              {
                value: "hot",
                label: "Hot",
                helper: "sweating",
                icon: Flame,
              },
            ]}
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
              Calculate water
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
        </div> {/* grid gap-5 kapanış divi başarıyla eşlendi */}
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
              {/* Sonuç Kartları Grubu */}
              <div className="grid gap-4">
                <ResultCard
                  label="Daily water estimate"
                  value={`${result.liters} L/day`}
                  numericValue={result.liters}
                  suffix=" L/day"
                  decimals={1}
                  description={`${result.ml} ml total estimate.`}
                  tone="emerald"
                />

                <ResultCard
                  label="In ounces"
                  value={`${result.ounces} oz`}
                  numericValue={result.ounces}
                  suffix=" oz"
                  description="Approximate fluid ounces."
                  tone="slate"
                />

                <ResultCard
                  label="In cups"
                  value={`${result.cups} cups`}
                  numericValue={result.cups}
                  suffix=" cups"
                  description="Based on 250 ml cups."
                  tone="orange"
                />
              </div>

              {/* Detay/Kırılım Kartı */}
              <Card className="border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                  Breakdown
                </h3>
                <div className="mt-3 grid gap-2 text-sm leading-6 text-slate-600">
                  <p>Base estimate: {result.baseMl} ml</p>
                  <p>Exercise extra: {result.exerciseExtraMl} ml</p>
                  <p>Climate extra: {result.climateExtraMl} ml</p>
                </div>
              </Card>

              {/* Paylaşma Kartı */}
              <Card className="border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                      Save or share your result
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Copy your daily water estimate and save it to notes or use
                      it in your hydration plan.
                    </p>
                  </div>
                  <CopyButton text={copyText} />
                </div>
              </Card>

              {/* Tıbbi Uyarı Notu */}
              <Card className="border-orange-100 bg-orange-50 p-5 text-sm leading-6 text-orange-800">
                {result.description && `${result.description} `}Hydration needs can vary. This is not medical advice.
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
                  Enter your details to estimate your daily water intake.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}