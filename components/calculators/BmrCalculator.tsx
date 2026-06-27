"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Calculator, RotateCcw , Ruler, Scale} from "lucide-react";

import {
  calculateBMR,
  type BmrFormulaOption,
  type BmrResult,
  type BmrUnit,
} from "@/lib/calculations/bmr";


import {
  getPreferredUnit,
  setPreferredUnit,
  type PreferredUnit,
} from "@/lib/storage/preferredUnit";

import { SegmentedControl } from "@/components/common/SegmentedControl";
import { CopyButton } from "@/components/common/CopyButton";
import { ResultCard } from "@/components/common/ResultCard";
import { AnimatedNumberSliderField } from "@/components/common/AnimatedNumberSliderField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getFitnessProfile,
  updateFitnessProfile,
} from "@/lib/storage/fitnessProfile";




export function BmrCalculator() {
  const [unit, setUnit] = useState<BmrUnit>("metric");
  const [formulaOption, setFormulaOption] =
    useState<BmrFormulaOption>("male");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");

  const [result, setResult] = useState<BmrResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
  const profile = getFitnessProfile();
  const savedUnit = (profile.unit ?? getPreferredUnit("metric")) as BmrUnit;

  setUnit(savedUnit);

  if (profile.formulaOption) {
    setFormulaOption(profile.formulaOption as BmrFormulaOption);
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
  const nextUnit = value as BmrUnit;
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
  const nextFormulaOption = value as BmrFormulaOption;

  setFormulaOption(nextFormulaOption);
  updateFitnessProfile({
    formulaOption: nextFormulaOption,
  });
}


  function handleCalculate() {
    setError("");

    try {
      const calculated = calculateBMR({
        unit,
        formulaOption,
        height: Number(height),
        weight: Number(weight),
        age: Number(age),
      });

      setResult(calculated);
      if (unit === "metric") {
  updateFitnessProfile({
    unit,
    formulaOption,
    age: Number(age),
    heightCm: Number(height),
    weightKg: Number(weight),
  });
} else {
  updateFitnessProfile({
    unit,
    formulaOption,
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
    ? `My BMR result from FitCalcLab:
Estimated BMR: ${result.bmr} kcal/day
Formula option: ${formulaOption === "male" ? "Male formula" : "Female formula"}
Unit system: ${unit === "metric" ? "Metric" : "Imperial"}`
    : "";

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_0.9fr]">
      <Card className="border-slate-200 bg-white p-5 shadow-sm md:p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Enter your details
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
            Choose your unit system and enter your basic body details to
            estimate your BMR.
          </p>
        </div>

        <div className="grid gap-5">
         <SegmentedControl
  id="bmr-unit"
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
          id="bmr-formula-option"
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

         <AnimatedNumberSliderField
              id="bmr-age"
              label="Age"
              value={age}
              onChange={setAge}
              min={10}
              max={90}
              step={1}
              placeholder="Example: 25"
            />

         <AnimatedNumberSliderField
            id="bmr-height"
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
              id="bmr-weight"
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
              Calculate BMR
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
                  label="Estimated BMR"
                  value={`${result.bmr} kcal/day`}
                  numericValue={result.bmr}
                  suffix=" kcal/day"
                  description="Approximate calories burned at rest."
                  tone="emerald"
                />

              <Card className="border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                  What this means
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {result.description}
                </p>
              </Card>

              <Card className="border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                      Save or share your result
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                      Copy your estimated BMR and save it to notes or use it as
                      a starting point for TDEE.
                    </p>
                  </div>

                  <CopyButton text={copyText} />
                </div>
              </Card>

              <Card className="border-orange-100 bg-orange-50 p-5 text-sm leading-6 text-orange-800">
                BMR is only an estimate. It does not include activity, exercise
                or daily movement. For total daily calories, use the TDEE
                Calculator next.
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex min-h-[360px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center"
            >
              <div>
                <p className="text-lg font-semibold text-slate-900">
                  Your result will appear here
                </p>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Enter your details to estimate your basal metabolic rate.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
