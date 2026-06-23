"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react"; // Projenize göre 'framer-motion' da kullanılabilir
import { Calculator, RotateCcw } from "lucide-react";

import {
  calculateOneRepMax,
  type OneRepMaxResult,
} from "@/lib/calculations/oneRepMax";

import { CopyButton } from "@/components/common/CopyButton";
import { ResultCard } from "@/components/common/ResultCard";
import {
  getFitnessProfile,
  updateFitnessProfile,
} from "@/lib/storage/fitnessProfile";
import { AnimatedNumberSliderField } from "@/components/common/AnimatedNumberSliderField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function OneRepMaxCalculator() {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  const [result, setResult] = useState<OneRepMaxResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
  const profile = getFitnessProfile();

  if (profile.oneRepMaxWeight) {
    setWeight(String(profile.oneRepMaxWeight));
  }

  if (profile.oneRepMaxReps) {
    setReps(String(profile.oneRepMaxReps));
  }
}, []);

function handleWeightChange(value: string) {
  setWeight(value);

  const numericValue = Number(value);

  if (Number.isFinite(numericValue) && numericValue > 0) {
    updateFitnessProfile({
      oneRepMaxWeight: numericValue,
    });
  }
}

function handleRepsChange(value: string) {
  setReps(value);

  const numericValue = Number(value);

  if (Number.isFinite(numericValue) && numericValue > 0) {
    updateFitnessProfile({
      oneRepMaxReps: numericValue,
    });
  }
}

  function handleCalculate() {
    setError("");

    try {
      const calculated = calculateOneRepMax({
        weight: Number(weight),
        reps: Number(reps),
      });

      setResult(calculated);
      updateFitnessProfile({
  oneRepMaxWeight: Number(weight),
  oneRepMaxReps: Number(reps),
});
    } catch {
      setResult(null);
      setError("Please enter valid weight and reps. Reps should be 30 or fewer.");
    }
  }

  function handleReset() {
    setWeight("");
    setReps("");
    setResult(null);
    setError("");
  }

  const copyText = result
    ? `My one-rep max result from FitCalcLab:
Estimated one-rep max: ${result.oneRepMax}

Input:
Weight lifted: ${weight}
Reps completed: ${reps}

Training percentages:
${result.percentages
  .map((item) => `${item.percent}%: ${item.weight}`)
  .join("\n")}`
    : "";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      {/* Sol Kolon: Girdi Formu */}
      <Card className="border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950">
            Enter your lift
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Estimate your one-rep max from a weight you lifted for multiple reps.
          </p>
        </div>

        {/* Giriş alanlarını düzgünce sarmalamak için alt ızgara (grid) kapsayıcısı eklendi */}
        <div className="grid gap-5">
          <AnimatedNumberSliderField
            id="one-rep-max-weight"
            label="Weight lifted"
            value={weight}
            onChange={handleWeightChange}
            min={1}
            max={400}
            step={1}
            placeholder="Example: 100"
          />

          <AnimatedNumberSliderField
            id="one-rep-max-reps"
            label="Reps completed"
            value={reps}
            onChange={handleRepsChange}
            min={1}
            max={30}
            step={1}
            placeholder="Example: 5"
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
              Calculate 1RM
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
        </div> {/* grid gap-5 div kapanışı senkronize edildi */}
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
                label="Estimated one-rep max"
                value={`${result.oneRepMax}`}
                numericValue={result.oneRepMax}
                description="Estimated maximum weight for one rep."
                tone="emerald"
              />

              <Card className="border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                  Training percentages
                </h3>

                <div className="mt-4 grid gap-3 text-sm text-slate-700">
                  {result.percentages.map((item) => (
                    <div
                      key={item.percent}
                      className="flex justify-between rounded-2xl bg-slate-50 p-3"
                    >
                      <span>{item.percent}%</span>
                      <strong>{item.weight}</strong>
                    </div>
                  ))}
                </div>

                {result.description && (
                  <p className="mt-5 text-sm leading-6 text-slate-600">
                    {result.description}
                  </p>
                )}
              </Card>

              <Card className="border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                      Save or share your result
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Copy your estimated one-rep max and training percentages.
                    </p>
                  </div>

                  <CopyButton text={copyText} />
                </div>
              </Card>

              <Card className="border-orange-100 bg-orange-50 p-5 text-sm leading-6 text-orange-800">
                This is only an estimate. Do not attempt maximum lifts without
                proper technique, preparation and safety.
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
                  Enter a lift and reps to estimate your one-rep max.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}