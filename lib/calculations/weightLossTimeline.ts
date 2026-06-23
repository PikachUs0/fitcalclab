export type WeightLossUnit = "metric" | "imperial";

export type WeightLossTimelineInput = {
  unit: WeightLossUnit;
  currentWeight: number;
  targetWeight: number;
  dailyDeficit: number;
  startDate: string;
};

export type WeightLossTimelineResult = {
  weightToLose: number;
  totalDeficitNeeded: number;
  estimatedDays: number;
  estimatedWeeks: number;
  estimatedTargetDate: string;
  unitLabel: string;
  description: string;
};

const CALORIES_PER_KG = 7700;
const CALORIES_PER_LB = 3500;

function addDaysToDate(dateString: string, days: number) {
  const date = dateString ? new Date(dateString) : new Date();

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid start date.");
  }

  date.setDate(date.getDate() + days);

  return date.toISOString().slice(0, 10);
}

export function calculateWeightLossTimeline(
  input: WeightLossTimelineInput
): WeightLossTimelineResult {
  const { unit, currentWeight, targetWeight, dailyDeficit, startDate } = input;

  if (!currentWeight || !targetWeight || !dailyDeficit) {
    throw new Error("Current weight, target weight and daily deficit are required.");
  }

  if (currentWeight <= 0 || targetWeight <= 0 || dailyDeficit <= 0) {
    throw new Error("All values must be greater than zero.");
  }

  if (targetWeight >= currentWeight) {
    throw new Error("Target weight must be lower than current weight.");
  }

  const weightToLose = currentWeight - targetWeight;
  const caloriesPerUnit = unit === "metric" ? CALORIES_PER_KG : CALORIES_PER_LB;

  const totalDeficitNeeded = weightToLose * caloriesPerUnit;
  const estimatedDays = Math.ceil(totalDeficitNeeded / dailyDeficit);
  const estimatedWeeks = Number((estimatedDays / 7).toFixed(1));
  const estimatedTargetDate = addDaysToDate(startDate, estimatedDays);

  return {
    weightToLose: Number(weightToLose.toFixed(1)),
    totalDeficitNeeded: Math.round(totalDeficitNeeded),
    estimatedDays,
    estimatedWeeks,
    estimatedTargetDate,
    unitLabel: unit === "metric" ? "kg" : "lb",
    description:
      "This is a simple estimate based on a consistent daily calorie deficit. Real progress can vary due to water weight, adherence, activity, metabolism and other factors.",
  };
}