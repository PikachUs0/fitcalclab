export type CalorieUnit = "metric" | "imperial";
export type CalorieFormulaOption = "male" | "female";
export type CalorieActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "very"
  | "extra";
export type CalorieGoal = "lose" | "maintain" | "gain";

export type CalorieInput = {
  unit: CalorieUnit;
  formulaOption: CalorieFormulaOption;
  height: number;
  weight: number;
  age: number;
  activityLevel: CalorieActivityLevel;
  goal: CalorieGoal;
};

export type CalorieResult = {
  bmr: number;
  maintenanceCalories: number;
  goalCalories: number;
  mildWeightLoss: number;
  weightLoss: number;
  weightGain: number;
  activityLabel: string;
  goalLabel: string;
  description: string;
};

const activityMultipliers: Record<CalorieActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  extra: 1.9,
};

const activityLabels: Record<CalorieActivityLevel, string> = {
  sedentary: "Sedentary",
  light: "Lightly active",
  moderate: "Moderately active",
  very: "Very active",
  extra: "Extra active",
};

const goalLabels: Record<CalorieGoal, string> = {
  lose: "Lose weight",
  maintain: "Maintain weight",
  gain: "Gain weight",
};

export function calculateCalories(input: CalorieInput): CalorieResult {
  const { unit, formulaOption, height, weight, age, activityLevel, goal } = input;

  if (!height || !weight || !age || height <= 0 || weight <= 0 || age <= 0) {
    throw new Error("Height, weight and age must be greater than zero.");
  }

  let heightCm = height;
  let weightKg = weight;

  if (unit === "imperial") {
    heightCm = height * 2.54;
    weightKg = weight * 0.453592;
  }

  let bmr: number;

  if (formulaOption === "male") {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  const maintenanceCalories = bmr * activityMultipliers[activityLevel];

  let goalCalories = maintenanceCalories;

  if (goal === "lose") {
    goalCalories = maintenanceCalories - 500;
  }

  if (goal === "gain") {
    goalCalories = maintenanceCalories + 300;
  }

  return {
    bmr: Math.round(bmr),
    maintenanceCalories: Math.round(maintenanceCalories),
    goalCalories: Math.round(goalCalories),
    mildWeightLoss: Math.round(maintenanceCalories - 250),
    weightLoss: Math.round(maintenanceCalories - 500),
    weightGain: Math.round(maintenanceCalories + 300),
    activityLabel: activityLabels[activityLevel],
    goalLabel: goalLabels[goal],
    description:
      "This calculator estimates daily calories using BMR and activity level. Real needs can vary based on body composition, movement and lifestyle.",
  };
}