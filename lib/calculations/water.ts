export type WaterUnit = "metric" | "imperial";
export type Climate = "normal" | "hot";

export type WaterInput = {
  unit: WaterUnit;
  weight: number;
  exerciseMinutes: number;
  climate: Climate;
};

export type WaterResult = {
  ml: number;
  liters: number;
  ounces: number;
  cups: number;
  baseMl: number;
  exerciseExtraMl: number;
  climateExtraMl: number;
  description: string;
};

export function calculateWater(input: WaterInput): WaterResult {
  const { unit, weight, exerciseMinutes, climate } = input;

  if (!weight || weight <= 0) {
    throw new Error("Weight must be greater than zero.");
  }

  if (exerciseMinutes < 0) {
    throw new Error("Exercise minutes cannot be negative.");
  }

  const weightKg = unit === "imperial" ? weight * 0.453592 : weight;

  const baseMl = weightKg * 35;
  const exerciseExtraMl = exerciseMinutes * 12;
  const beforeClimate = baseMl + exerciseExtraMl;
  const climateExtraMl = climate === "hot" ? beforeClimate * 0.1 : 0;

  const totalMl = Math.round(beforeClimate + climateExtraMl);

  return {
    ml: totalMl,
    liters: Number((totalMl / 1000).toFixed(1)),
    ounces: Math.round(totalMl / 29.5735),
    cups: Number((totalMl / 250).toFixed(1)),
    baseMl: Math.round(baseMl),
    exerciseExtraMl: Math.round(exerciseExtraMl),
    climateExtraMl: Math.round(climateExtraMl),
    description:
      "This is a simple hydration estimate based on body weight, exercise duration and climate.",
  };
}
