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
  calculateIdealWeight,
  type IdealWeightFormulaOption,
  type IdealWeightResult,
  type IdealWeightUnit,
} from "@/lib/calculations/idealWeight";
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

export function IdealWeightCalculator() {
  const [unit, setUnit] = useState<IdealWeightUnit>("metric");
  const [formulaOption, setFormulaOption] =
    useState<IdealWeightFormulaOption>("male");
  const [height, setHeight] = useState("");

  const [result, setResult] = useState<IdealWeightResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
  const profile = getFitnessProfile();
  const savedUnit = (profile.unit ?? getPreferredUnit("metric")) as IdealWeightUnit;

  setUnit(savedUnit);

  if (profile.formulaOption) {
    setFormulaOption(profile.formulaOption as IdealWeightFormulaOption);
  }

  if (savedUnit === "metric") {
    setHeight(profile.heightCm ? String(profile.heightCm) : "");
  } else {
    setHeight(profile.heightIn ? String(profile.heightIn) : "");
  }
}, []);

function handleUnitChange(value: string) {
  const nextUnit = value as IdealWeightUnit;
  const profile = getFitnessProfile();

  setUnit(nextUnit);
  setPreferredUnit(nextUnit as PreferredUnit);
  updateFitnessProfile({ unit: nextUnit });

  if (nextUnit === "metric") {
    setHeight(profile.heightCm ? String(profile.heightCm) : "");
  } else {
    setHeight(profile.heightIn ? String(profile.heightIn) : "");
  }
}

function handleFormulaOptionChange(value: string) {
  const nextFormulaOption = value as IdealWeightFormulaOption;

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

  function handleCalculate() {
    setError("");

    try {
      const calculated = calculateIdealWeight({
        unit,
        formulaOption,
        height: Number(height),
      });

      setResult(calculated);
      if (unit === "metric") {
  updateFitnessProfile({
    unit,
    formulaOption,
    heightCm: Number(height),
  });
} else {
  updateFitnessProfile({
    unit,
    formulaOption,
    heightIn: Number(height),
  });
}
    } catch {
      setResult(null);
      setError("Please enter a valid height value.");
    }
  }

  function handleReset() {
    setUnit("metric");
    setFormulaOption("male");
    setHeight("");
    setResult(null);
    setError("");
  }

  const unitLabel = unit === "metric" ? "kg" : "lb";

  const copyText = result
    ? `My ideal weight result from FitCalcLab:
Estimated average: ${result.average} ${unitLabel}
Estimated range: ${result.rangeMin} - ${result.rangeMax} ${unitLabel}

Formula comparison:
Devine: ${result.devine} ${unitLabel}
Robinson: ${result.robinson} ${unitLabel}
Miller: ${result.miller} ${unitLabel}
Hamwi: ${result.hamwi} ${unitLabel}

Formula option: ${
        formulaOption === "male" ? "Male formula" : "Female formula"
      }
Unit system: ${unit === "metric" ? "Metric" : "Imperial"}
Height: ${height} ${unit === "metric" ? "cm" : "inches"}`
    : "";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      {/* Sol Kolon: Girdi Formu */}
      <Card className="border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Enter your height
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Compare multiple formulas for an estimated ideal weight range.
          </p>
        </div>

        {/* Tüm form elemanlarını nizamlı tutacak dikey grid kapsayıcı eklendi */}
        <div className="grid gap-5">
          <SegmentedControl
        id="ideal-weight-unit"
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
          id="ideal-weight-formula-option"
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
            id="ideal-weight-height"
            label="Height"
            value={height}
            onChange={handleHeightChange}
            min={unit === "metric" ? 120 : 48}
            max={unit === "metric" ? 230 : 90}
            step={1}
            suffix={unit === "metric" ? "cm" : "in"}
            placeholder={unit === "metric" ? "Example: 178" : "Example: 70"}
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
              Calculate ideal weight
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
                label="Estimated average"
                value={`${result.average} ${unitLabel}`}
                numericValue={result.average}
                suffix={` ${unitLabel}`}
                decimals={1}
                description="Average of multiple formulas."
                tone="emerald"
              />

              <ResultCard
                label="Estimated range"
                value={`${result.rangeMin} - ${result.rangeMax} ${unitLabel}`}
                description="Range across the formulas below."
                tone="slate"
              />

              <Card className="border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                  Formula comparison
                </h3>

                <div className="mt-4 grid gap-3 text-sm text-slate-700">
                  <div className="flex justify-between rounded-2xl bg-slate-50 p-3">
                    <span>Devine</span>
                    <strong>
                      {result.devine} {unitLabel}
                    </strong>
                  </div>

                  <div className="flex justify-between rounded-2xl bg-slate-50 p-3">
                    <span>Robinson</span>
                    <strong>
                      {result.robinson} {unitLabel}
                    </strong>
                  </div>

                  <div className="flex justify-between rounded-2xl bg-slate-50 p-3">
                    <span>Miller</span>
                    <strong>
                      {result.miller} {unitLabel}
                    </strong>
                  </div>

                  <div className="flex justify-between rounded-2xl bg-slate-50 p-3">
                    <span>Hamwi</span>
                    <strong>
                      {result.hamwi} {unitLabel}
                    </strong>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-slate-600">
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
                      Copy your ideal weight estimate and formula comparison.
                    </p>
                  </div>

                  <CopyButton text={copyText} />
                </div>
              </Card>

              <Card className="border-orange-100 bg-orange-50 p-5 text-sm leading-6 text-orange-800">
                Ideal weight formulas are estimates and do not measure health,
                body composition or fitness level. This is not medical advice.
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
                  Enter your height to compare estimated ideal weight formulas.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}