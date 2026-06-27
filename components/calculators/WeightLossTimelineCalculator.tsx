"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Calculator, RotateCcw, Ruler, Scale } from "lucide-react";
import {
  calculateWeightLossTimeline,
  type WeightLossTimelineResult,
  type WeightLossUnit,
} from "@/lib/calculations/weightLossTimeline";

import { CopyButton } from "@/components/common/CopyButton";
import { ResultCard } from "@/components/common/ResultCard";
import { SegmentedControl } from "@/components/common/SegmentedControl";
import { AnimatedNumberSliderField } from "@/components/common/AnimatedNumberSliderField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getFitnessProfile,
  updateFitnessProfile,
} from "@/lib/storage/fitnessProfile";

import {
  getPreferredUnit,
  setPreferredUnit,
  type PreferredUnit,
} from "@/lib/storage/preferredUnit";

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

export function WeightLossTimelineCalculator() {
  const [unit, setUnit] = useState<WeightLossUnit>("metric");
  const [currentWeight, setCurrentWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [dailyDeficit, setDailyDeficit] = useState("500");
  const [startDate, setStartDate] = useState(getTodayDate());

  const [result, setResult] = useState<WeightLossTimelineResult | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
  const profile = getFitnessProfile();
  const savedUnit = (profile.unit ?? getPreferredUnit("metric")) as WeightLossUnit;

  setUnit(savedUnit);

  if (savedUnit === "metric") {
    const savedCurrentWeight =
      profile.weightLossCurrentWeightKg ?? profile.weightKg;

    setCurrentWeight(
      savedCurrentWeight ? String(savedCurrentWeight) : ""
    );

    setTargetWeight(
      profile.weightLossTargetWeightKg
        ? String(profile.weightLossTargetWeightKg)
        : ""
    );
  } else {
    const savedCurrentWeight =
      profile.weightLossCurrentWeightLb ?? profile.weightLb;

    setCurrentWeight(
      savedCurrentWeight ? String(savedCurrentWeight) : ""
    );

    setTargetWeight(
      profile.weightLossTargetWeightLb
        ? String(profile.weightLossTargetWeightLb)
        : ""
    );
  }

  if (profile.weightLossDailyDeficit) {
    setDailyDeficit(String(profile.weightLossDailyDeficit));
  }

  if (profile.weightLossStartDate) {
    setStartDate(profile.weightLossStartDate);
  }
}, []);

function handleUnitChange(value: string) {
  const nextUnit = value as WeightLossUnit;
  const profile = getFitnessProfile();

  setUnit(nextUnit);
  setPreferredUnit(nextUnit as PreferredUnit);
  updateFitnessProfile({ unit: nextUnit });

  if (nextUnit === "metric") {
    const savedCurrentWeight =
      profile.weightLossCurrentWeightKg ?? profile.weightKg;

    setCurrentWeight(
      savedCurrentWeight ? String(savedCurrentWeight) : ""
    );

    setTargetWeight(
      profile.weightLossTargetWeightKg
        ? String(profile.weightLossTargetWeightKg)
        : ""
    );
  } else {
    const savedCurrentWeight =
      profile.weightLossCurrentWeightLb ?? profile.weightLb;

    setCurrentWeight(
      savedCurrentWeight ? String(savedCurrentWeight) : ""
    );

    setTargetWeight(
      profile.weightLossTargetWeightLb
        ? String(profile.weightLossTargetWeightLb)
        : ""
    );
  }
}

function handleCurrentWeightChange(value: string) {
  setCurrentWeight(value);

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return;
  }

  if (unit === "metric") {
    updateFitnessProfile({
      unit,
      weightKg: numericValue,
      weightLossCurrentWeightKg: numericValue,
    });
  } else {
    updateFitnessProfile({
      unit,
      weightLb: numericValue,
      weightLossCurrentWeightLb: numericValue,
    });
  }
}

function handleTargetWeightChange(value: string) {
  setTargetWeight(value);

  const numericValue = Number(value);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return;
  }

  if (unit === "metric") {
    updateFitnessProfile({
      weightLossTargetWeightKg: numericValue,
    });
  } else {
    updateFitnessProfile({
      weightLossTargetWeightLb: numericValue,
    });
  }
}

function handleDailyDeficitChange(value: string) {
  setDailyDeficit(value);

  const numericValue = Number(value);

  if (Number.isFinite(numericValue) && numericValue > 0) {
    updateFitnessProfile({
      weightLossDailyDeficit: numericValue,
    });
  }
}

function handleStartDateChange(value: string) {
  setStartDate(value);

  if (value) {
    updateFitnessProfile({
      weightLossStartDate: value,
    });
  }
}

  function handleCalculate() {
    setError("");

    try {
      const calculated = calculateWeightLossTimeline({
        unit,
        currentWeight: Number(currentWeight),
        targetWeight: Number(targetWeight),
        dailyDeficit: Number(dailyDeficit),
        startDate,
      });

      setResult(calculated);
      if (unit === "metric") {
  updateFitnessProfile({
    unit,
    weightKg: Number(currentWeight),
    weightLossCurrentWeightKg: Number(currentWeight),
    weightLossTargetWeightKg: Number(targetWeight),
    weightLossDailyDeficit: Number(dailyDeficit),
    weightLossStartDate: startDate,
  });
} else {
  updateFitnessProfile({
    unit,
    weightLb: Number(currentWeight),
    weightLossCurrentWeightLb: Number(currentWeight),
    weightLossTargetWeightLb: Number(targetWeight),
    weightLossDailyDeficit: Number(dailyDeficit),
    weightLossStartDate: startDate,
  });
}
    } catch {
      setResult(null);
      setError(
        "Please enter valid values. Target weight must be lower than current weight."
      );
    }
  }

  function handleReset() {
    setUnit("metric");
    setCurrentWeight("");
    setTargetWeight("");
    setDailyDeficit("500");
    setStartDate(getTodayDate());
    setResult(null);
    setError("");
  }

  const unitLabel = unit === "metric" ? "kg" : "lb";

  const copyText = result
    ? `My weight loss timeline result from FitCalcLab:
Weight to lose: ${result.weightToLose} ${result.unitLabel}
Total deficit needed: ${result.totalDeficitNeeded} kcal
Estimated time: ${result.estimatedDays} days (${result.estimatedWeeks} weeks)
Estimated target date: ${result.estimatedTargetDate}

Input:
Current weight: ${currentWeight} ${unitLabel}
Target weight: ${targetWeight} ${unitLabel}
Daily calorie deficit: ${dailyDeficit} kcal/day
Start date: ${startDate}`
    : "";

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_0.9fr]">
      {/* Sol Kolon: Girdi Formu */}
      <Card className="border-slate-200 bg-white p-5 shadow-sm md:p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Enter your goal
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
            Estimate how long it may take to reach your target weight based on a
            daily calorie deficit.
          </p>
        </div>

        {/* Tüm girdileri dikey düzende nizamlı tutacak alt ızgara (grid) eklendi */}
        <div className="grid gap-5">
          <SegmentedControl
                id="weight-loss-unit"
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
            id="weight-loss-current-weight"
            label="Current weight"
            value={currentWeight}
            onChange={handleCurrentWeightChange}
            min={unit === "metric" ? 30 : 66}
            max={unit === "metric" ? 250 : 550}
            step={1}
            suffix={unitLabel}
            placeholder={unit === "metric" ? "Example: 85" : "Example: 187"}
          />

          <AnimatedNumberSliderField
            id="weight-loss-target-weight"
            label="Target weight"
            value={targetWeight}
            onChange={handleTargetWeightChange}
            min={unit === "metric" ? 30 : 66}
            max={unit === "metric" ? 250 : 550}
            step={1}
            suffix={unitLabel}
            placeholder={unit === "metric" ? "Example: 75" : "Example: 165"}
          />

          <AnimatedNumberSliderField
            id="weight-loss-daily-deficit"
            label="Daily calorie deficit"
            value={dailyDeficit}
            onChange={handleDailyDeficitChange}
            min={100}
            max={1200}
            step={25}
            suffix="kcal"
            placeholder="Example: 500"
          />

          <div className="grid gap-2">
            <Label htmlFor="startDate">Start date</Label>
            <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(event) => handleStartDateChange(event.target.value)}
            />
          </div>

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
              Calculate timeline
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
                label="Estimated timeline"
                value={`${result.estimatedWeeks} weeks`}
                numericValue={result.estimatedWeeks}
                suffix=" weeks"
                decimals={1}
                description={`${result.estimatedDays} days estimated.`}
                tone="emerald"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <ResultCard
                  label="Weight to lose"
                  value={`${result.weightToLose} ${result.unitLabel}`}
                  numericValue={result.weightToLose}
                  suffix={` ${result.unitLabel}`}
                  decimals={1}
                  description="Difference between current and target weight."
                  tone="slate"
                />

                <ResultCard
                  label="Target date"
                  value={result.estimatedTargetDate}
                  description="Estimated date based on your deficit."
                  tone="orange"
                />
              </div>

              <Card className="border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                  Calorie deficit needed
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Estimated total deficit needed:{" "}
                  <strong>{result.totalDeficitNeeded} kcal</strong>.
                </p>

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
                      Copy your estimated timeline and save it to notes.
                    </p>
                  </div>

                  <CopyButton text={copyText} />
                </div>
              </Card>

              <Card className="border-orange-100 bg-orange-50 p-5 text-sm leading-6 text-orange-800">
                This timeline is only an estimate. Weight changes can vary due
                to water weight, consistency, activity, sleep and other factors.
                This is not medical advice.
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
                  Enter your current weight, target weight and calorie deficit
                  to estimate your timeline.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
