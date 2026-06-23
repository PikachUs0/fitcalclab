export type TdeeUnit = "metric" | "imperial";
export type TdeeFormulaOption = "male" | "female";
export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "very"
  | "extra";

export type TdeeInput = {
  unit: TdeeUnit;
  formulaOption: TdeeFormulaOption;
  height: number;
  weight: number;
  age: number;
  activityLevel: ActivityLevel;
};

export type TdeeResult = {
  bmr: number;
  tdee: number;
  mildWeightLoss: number;
  weightLoss: number;
  weightGain: number;
  activityLabel: string;
  description: string;
};

const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  extra: 1.9,
};

const activityLabels: Record<ActivityLevel, string> = {
  sedentary: "Sedentary",
  light: "Lightly active",
  moderate: "Moderately active",
  very: "Very active",
  extra: "Extra active",
};

export function calculateTDEE(input: TdeeInput): TdeeResult {
  const { unit, formulaOption, height, weight, age, activityLevel } = input;

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

  const multiplier = activityMultipliers[activityLevel];
  const tdee = bmr * multiplier;

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    mildWeightLoss: Math.round(tdee - 250),
    weightLoss: Math.round(tdee - 500),
    weightGain: Math.round(tdee + 300),
    activityLabel: activityLabels[activityLevel],
    description:
      "TDEE is an estimate of your total daily calorie needs after activity level is included.",
  };
}
