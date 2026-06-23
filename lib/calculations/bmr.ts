export type BmrUnit = "metric" | "imperial";
export type BmrFormulaOption = "male" | "female";

export type BmrInput = {
  unit: BmrUnit;
  formulaOption: BmrFormulaOption;
  height: number;
  weight: number;
  age: number;
};

export type BmrResult = {
  bmr: number;
  description: string;
};

export function calculateBMR(input: BmrInput): BmrResult {
  const { unit, formulaOption, height, weight, age } = input;

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

  const roundedBmr = Math.round(bmr);

  return {
    bmr: roundedBmr,
    description:
      "This is an estimated basal metabolic rate using the Mifflin-St Jeor equation. It represents an approximate number of calories your body may burn at rest.",
  };
}