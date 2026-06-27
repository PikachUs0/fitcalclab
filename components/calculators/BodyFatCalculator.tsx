"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Calculator,
  RotateCcw,
  Ruler,
  Scale,
  UserRound,
} from "lucide-react";
import {
  calculateBodyFat,
  type BodyFatFormulaOption,
  type BodyFatResult,
  type BodyFatUnit,
} from "@/lib/calculations/bodyFat";
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
import { SmoothProgress } from "@/components/common/SmoothProgress";
export function BodyFatCalculator() {
  const [unit, setUnit] = useState<BodyFatUnit>("metric");
  const [formulaOption, setFormulaOption] =
    useState<BodyFatFormulaOption>("male");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");

  const [result, setResult] = useState<BodyFatResult | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
  const profile = getFitnessProfile();
  const savedUnit = (profile.unit ?? getPreferredUnit("metric")) as BodyFatUnit;

  setUnit(savedUnit);

  if (profile.formulaOption) {
    setFormulaOption(profile.formulaOption as BodyFatFormulaOption);
  }

  if (savedUnit === "metric") {
    setHeight(profile.heightCm ? String(profile.heightCm) : "");
    setWeight(profile.weightKg ? String(profile.weightKg) : "");
    setNeck(profile.bodyFatNeckCm ? String(profile.bodyFatNeckCm) : "");
    setWaist(profile.bodyFatWaistCm ? String(profile.bodyFatWaistCm) : "");
    setHip(profile.bodyFatHipCm ? String(profile.bodyFatHipCm) : "");
  } else {
    setHeight(profile.heightIn ? String(profile.heightIn) : "");
    setWeight(profile.weightLb ? String(profile.weightLb) : "");
    setNeck(profile.bodyFatNeckIn ? String(profile.bodyFatNeckIn) : "");
    setWaist(profile.bodyFatWaistIn ? String(profile.bodyFatWaistIn) : "");
    setHip(profile.bodyFatHipIn ? String(profile.bodyFatHipIn) : "");
  }
}, []);

function handleUnitChange(value: string) {
  const nextUnit = value as BodyFatUnit;
  const profile = getFitnessProfile();

  setUnit(nextUnit);
  setPreferredUnit(nextUnit as PreferredUnit);
  updateFitnessProfile({ unit: nextUnit });

  if (nextUnit === "metric") {
    setHeight(profile.heightCm ? String(profile.heightCm) : "");
    setWeight(profile.weightKg ? String(profile.weightKg) : "");
    setNeck(profile.bodyFatNeckCm ? String(profile.bodyFatNeckCm) : "");
    setWaist(profile.bodyFatWaistCm ? String(profile.bodyFatWaistCm) : "");
    setHip(profile.bodyFatHipCm ? String(profile.bodyFatHipCm) : "");
  } else {
    setHeight(profile.heightIn ? String(profile.heightIn) : "");
    setWeight(profile.weightLb ? String(profile.weightLb) : "");
    setNeck(profile.bodyFatNeckIn ? String(profile.bodyFatNeckIn) : "");
    setWaist(profile.bodyFatWaistIn ? String(profile.bodyFatWaistIn) : "");
    setHip(profile.bodyFatHipIn ? String(profile.bodyFatHipIn) : "");
  }
}

function handleFormulaOptionChange(value: string) {
  const nextFormulaOption = value as BodyFatFormulaOption;

  setFormulaOption(nextFormulaOption);
  updateFitnessProfile({
    formulaOption: nextFormulaOption,
  });
}

function handleHeightChange(value: string) {
  setHeight(value);

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return;
  }

  if (unit === "metric") {
    updateFitnessProfile({
      unit,
      heightCm: numericValue,
    });
  } else {
    updateFitnessProfile({
      unit,
      heightIn: numericValue,
    });
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

function handleNeckChange(value: string) {
  setNeck(value);

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return;
  }

  if (unit === "metric") {
    updateFitnessProfile({
      bodyFatNeckCm: numericValue,
    });
  } else {
    updateFitnessProfile({
      bodyFatNeckIn: numericValue,
    });
  }
}

function handleWaistChange(value: string) {
  setWaist(value);

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return;
  }

  if (unit === "metric") {
    updateFitnessProfile({
      bodyFatWaistCm: numericValue,
    });
  } else {
    updateFitnessProfile({
      bodyFatWaistIn: numericValue,
    });
  }
}

function handleHipChange(value: string) {
  setHip(value);

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return;
  }

  if (unit === "metric") {
    updateFitnessProfile({
      bodyFatHipCm: numericValue,
    });
  } else {
    updateFitnessProfile({
      bodyFatHipIn: numericValue,
    });
  }
}

  function handleCalculate() {
    setError("");

    try {
      const calculated = calculateBodyFat({
        unit,
        formulaOption,
        height: Number(height),
        weight: Number(weight),
        neck: Number(neck),
        waist: Number(waist),
        hip: hip ? Number(hip) : undefined,
      });

      setResult(calculated);
      if (unit === "metric") {
  updateFitnessProfile({
    unit,
    formulaOption,
    heightCm: Number(height),
    weightKg: Number(weight),
    bodyFatNeckCm: Number(neck),
    bodyFatWaistCm: Number(waist),
    bodyFatHipCm: hip ? Number(hip) : undefined,
  });
} else {
  updateFitnessProfile({
    unit,
    formulaOption,
    heightIn: Number(height),
    weightLb: Number(weight),
    bodyFatNeckIn: Number(neck),
    bodyFatWaistIn: Number(waist),
    bodyFatHipIn: hip ? Number(hip) : undefined,
  });
}
    } catch {
      setResult(null);
      setError("Please enter valid body measurements.");
    }
  }

  function handleReset() {
    setUnit("metric");
    setFormulaOption("male");
    setHeight("");
    setWeight("");
    setNeck("");
    setWaist("");
    setHip("");
    setResult(null);
    setError("");
  }

  const lengthUnit = unit === "metric" ? "cm" : "inches";
  const weightUnit = unit === "metric" ? "kg" : "lb";

  const progressValue = result
    ? Math.min(Math.max((result.bodyFatPercentage / 50) * 100, 0), 100)
    : 0;

  const copyText = result
    ? `My body fat result from FitCalcLab:
Estimated body fat: ${result.bodyFatPercentage}%
Category: ${result.category}
Estimated fat mass: ${result.fatMass} ${weightUnit}
Estimated lean mass: ${result.leanMass} ${weightUnit}

Formula option: ${
        formulaOption === "male" ? "Male formula" : "Female formula"
      }
Unit system: ${unit === "metric" ? "Metric" : "Imperial"}`
    : "";

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_0.9fr]">
      {/* Sol Kolon: Girdi Formu */}
      <Card className="border-slate-200 bg-white p-5 shadow-sm md:p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Enter your measurements
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
            Use body measurements to estimate body fat percentage.
          </p>
        </div>

        {/* Tüm girdi elemanlarını yapısal olarak sarmalayan dikey grid açılış etiketi eklendi */}
        <div className="grid gap-5">
          <SegmentedControl
        id="body-fat-unit"
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
        id="body-fat-formula-option"
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

          <AnimatedNumberSliderField
          id="body-fat-height"
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
            id="body-fat-weight"
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
            id="body-fat-neck"
            label="Neck"
            value={neck}
            onChange={handleNeckChange}
            min={unit === "metric" ? 25 : 10}
            max={unit === "metric" ? 60 : 24}
            step={unit === "metric" ? 1 : 0.5}
            suffix={unit === "metric" ? "cm" : "in"}
            decimals={unit === "metric" ? 0 : 1}
            placeholder={unit === "metric" ? "Example: 38" : "Example: 15"}
          />

          <AnimatedNumberSliderField
            id="body-fat-waist"
            label="Waist"
            value={waist}
            onChange={handleWaistChange}
            min={unit === "metric" ? 50 : 20}
            max={unit === "metric" ? 180 : 72}
            step={unit === "metric" ? 1 : 0.5}
            suffix={unit === "metric" ? "cm" : "in"}
            decimals={unit === "metric" ? 0 : 1}
            placeholder={unit === "metric" ? "Example: 84" : "Example: 33"}
          />

          {formulaOption === "female" ? (
            <AnimatedNumberSliderField
              id="body-fat-hip"
              label="Hip"
              value={hip}
              onChange={handleHipChange}
              min={unit === "metric" ? 60 : 24}
              max={unit === "metric" ? 180 : 72}
              step={unit === "metric" ? 1 : 0.5}
              suffix={unit === "metric" ? "cm" : "in"}
              decimals={unit === "metric" ? 0 : 1}
              placeholder={unit === "metric" ? "Example: 98" : "Example: 39"}
            />
          ) : null}

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
              Calculate body fat
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
        </div> {/* Alt ızgara kapanış divi başarıyla eşlendi */}
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
                label="Estimated body fat"
                value={`${result.bodyFatPercentage}%`}
                numericValue={result.bodyFatPercentage}
                suffix="%"
                decimals={1}
                description="Estimated body fat percentage."
                tone="emerald"
              />

              <Card className="border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Visual estimate
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
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%+</span>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {result.description}
                </p>
              </Card>

              <div className="grid gap-4 sm:grid-cols-2">
                <ResultCard
                  label="Estimated fat mass"
                  value={`${result.fatMass} ${weightUnit}`}
                  numericValue={result.fatMass}
                  suffix={` ${weightUnit}`}
                  decimals={1}
                  description="Approximate fat mass."
                  tone="orange"
                />

                <ResultCard
                  label="Estimated lean mass"
                  value={`${result.leanMass} ${weightUnit}`}
                  numericValue={result.leanMass}
                  suffix={` ${weightUnit}`}
                  decimals={1}
                  description="Approximate non-fat mass."
                  tone="slate"
                />
              </div>

              <Card className="border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                      Save or share your result
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                      Copy your body fat estimate and save it to notes or track
                      it over time.
                    </p>
                  </div>

                  <CopyButton text={copyText} />
                </div>
              </Card>

              <Card className="border-orange-100 bg-orange-50 p-5 text-sm leading-6 text-orange-800">
                Body fat estimates can vary based on measurement accuracy. This
                calculator is informational only and is not medical advice.
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
                  Enter your measurements to estimate body fat percentage.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
