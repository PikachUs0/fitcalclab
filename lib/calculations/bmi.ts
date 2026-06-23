export type BmiUnit = "metric" | "imperial";

export type BmiInput = {
  unit: BmiUnit;
  height: number;
  weight: number;
};

export type BmiResult = {
  bmi: number;
  category: string;
  description: string;
  healthyWeightMin?: number;
  healthyWeightMax?: number;
};

export function calculateBMI(input: BmiInput): BmiResult {
  const { unit, height, weight } = input;

  if (!height || !weight || height <= 0 || weight <= 0) {
    throw new Error("Height and weight must be greater than zero.");
  }

  let bmi: number;

  if (unit === "metric") {
    const heightInMeters = height / 100;
    bmi = weight / (heightInMeters * heightInMeters);
  } else {
    bmi = (703 * weight) / (height * height);
  }

  const roundedBmi = Number(bmi.toFixed(1));

  let category = "";
  let description = "";

  if (roundedBmi < 18.5) {
    category = "Underweight";
    description =
      "Your BMI is below the normal range. BMI is only a simple estimate and does not directly measure body fat.";
  } else if (roundedBmi < 25) {
    category = "Normal weight";
    description =
      "Your BMI is within the commonly used normal range. Remember that BMI is only one basic health indicator.";
  } else if (roundedBmi < 30) {
    category = "Overweight";
    description =
      "Your BMI is above the normal range. BMI does not account for muscle mass or body composition.";
  } else {
    category = "Obesity range";
    description =
      "Your BMI is in the obesity range. This calculator is informational only and is not medical advice.";
  }

  let healthyWeightMin: number | undefined;
  let healthyWeightMax: number | undefined;

  if (unit === "metric") {
    const heightInMeters = height / 100;
    healthyWeightMin = Number((18.5 * heightInMeters * heightInMeters).toFixed(1));
    healthyWeightMax = Number((24.9 * heightInMeters * heightInMeters).toFixed(1));
  } else {
    healthyWeightMin = Number(((18.5 * height * height) / 703).toFixed(1));
    healthyWeightMax = Number(((24.9 * height * height) / 703).toFixed(1));
  }

  return {
    bmi: roundedBmi,
    category,
    description,
    healthyWeightMin,
    healthyWeightMax,
  };
}