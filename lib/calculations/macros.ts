export type MacroGoal = "fatLoss" | "maintain" | "muscleGain";

export type MacroInput = {
  calories: number;
  goal: MacroGoal;
  mealsPerDay: number;
};

export type MacroResult = {
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  proteinCalories: number;
  carbsCalories: number;
  fatCalories: number;
  proteinPercent: number;
  carbsPercent: number;
  fatPercent: number;
  mealsPerDay: number;
  proteinPerMeal: number;
  carbsPerMeal: number;
  fatPerMeal: number;
  goalLabel: string;
  description: string;
};

const macroSplits: Record<
  MacroGoal,
  {
    protein: number;
    carbs: number;
    fat: number;
    label: string;
    description: string;
  }
> = {
  fatLoss: {
    protein: 0.35,
    carbs: 0.35,
    fat: 0.3,
    label: "Fat loss",
    description:
      "A higher-protein split that may help preserve lean mass during a calorie deficit.",
  },
  maintain: {
    protein: 0.3,
    carbs: 0.4,
    fat: 0.3,
    label: "Maintain weight",
    description:
      "A balanced macro split for maintaining your current body weight.",
  },
  muscleGain: {
    protein: 0.3,
    carbs: 0.45,
    fat: 0.25,
    label: "Muscle gain",
    description:
      "A higher-carbohydrate split that may support training performance and muscle gain.",
  },
};

export function calculateMacros(input: MacroInput): MacroResult {
  const { calories, goal, mealsPerDay } = input;

  if (!calories || calories <= 0) {
    throw new Error("Calories must be greater than zero.");
  }

  if (!mealsPerDay || mealsPerDay <= 0) {
    throw new Error("Meals per day must be greater than zero.");
  }

  const split = macroSplits[goal];

  const proteinCalories = calories * split.protein;
  const carbsCalories = calories * split.carbs;
  const fatCalories = calories * split.fat;

  const proteinGrams = Math.round(proteinCalories / 4);
  const carbsGrams = Math.round(carbsCalories / 4);
  const fatGrams = Math.round(fatCalories / 9);

  return {
    calories: Math.round(calories),
    proteinGrams,
    carbsGrams,
    fatGrams,
    proteinCalories: Math.round(proteinCalories),
    carbsCalories: Math.round(carbsCalories),
    fatCalories: Math.round(fatCalories),
    proteinPercent: Math.round(split.protein * 100),
    carbsPercent: Math.round(split.carbs * 100),
    fatPercent: Math.round(split.fat * 100),
    mealsPerDay,
    proteinPerMeal: Math.round(proteinGrams / mealsPerDay),
    carbsPerMeal: Math.round(carbsGrams / mealsPerDay),
    fatPerMeal: Math.round(fatGrams / mealsPerDay),
    goalLabel: split.label,
    description: split.description,
  };
}
