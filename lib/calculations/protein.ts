export type ProteinUnit = "metric" | "imperial";
export type ProteinGoal = "general" | "fatLoss" | "muscleGain" | "endurance";

export type ProteinInput = {
  unit: ProteinUnit;
  weight: number;
  goal: ProteinGoal;
  mealsPerDay: number;
};

export type ProteinResult = {
  minGrams: number;
  maxGrams: number;
  targetGrams: number;
  minPerMeal: number;
  maxPerMeal: number;
  targetPerMeal: number;
  goalLabel: string;
  description: string;
};

const proteinRanges: Record<
  ProteinGoal,
  {
    min: number;
    max: number;
    label: string;
    description: string;
  }
> = {
  general: {
    min: 0.8,
    max: 1.2,
    label: "General fitness",
    description:
      "A basic protein range for general health and active lifestyle support.",
  },
  fatLoss: {
    min: 1.6,
    max: 2.2,
    label: "Fat loss",
    description:
      "A higher protein range that may help preserve lean mass during a calorie deficit.",
  },
  muscleGain: {
    min: 1.6,
    max: 2.2,
    label: "Muscle gain",
    description:
      "A higher protein range commonly used for strength training and muscle gain goals.",
  },
  endurance: {
    min: 1.2,
    max: 1.8,
    label: "Endurance training",
    description:
      "A moderate to higher protein range for people doing regular endurance training.",
  },
};

export function calculateProtein(input: ProteinInput): ProteinResult {
  const { unit, weight, goal, mealsPerDay } = input;

  if (!weight || weight <= 0) {
    throw new Error("Weight must be greater than zero.");
  }

  if (!mealsPerDay || mealsPerDay <= 0) {
    throw new Error("Meals per day must be greater than zero.");
  }

  const weightKg = unit === "imperial" ? weight * 0.453592 : weight;
  const range = proteinRanges[goal];

  const minGrams = Math.round(weightKg * range.min);
  const maxGrams = Math.round(weightKg * range.max);
  const targetGrams = Math.round((minGrams + maxGrams) / 2);

  return {
    minGrams,
    maxGrams,
    targetGrams,
    minPerMeal: Math.round(minGrams / mealsPerDay),
    maxPerMeal: Math.round(maxGrams / mealsPerDay),
    targetPerMeal: Math.round(targetGrams / mealsPerDay),
    goalLabel: range.label,
    description: range.description,
  };
}
