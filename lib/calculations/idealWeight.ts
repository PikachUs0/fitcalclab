export type IdealWeightUnit = "metric" | "imperial";
export type IdealWeightFormulaOption = "male" | "female";

export type IdealWeightInput = {
  unit: IdealWeightUnit;
  formulaOption: IdealWeightFormulaOption;
  height: number;
};

export type IdealWeightResult = {
  devine: number;
  robinson: number;
  miller: number;
  hamwi: number;
  average: number;
  rangeMin: number;
  rangeMax: number;
  description: string;
};

function cmToInches(cm: number) {
  return cm / 2.54;
}

function kgToLb(kg: number) {
  return kg * 2.20462;
}

export function calculateIdealWeight(input: IdealWeightInput): IdealWeightResult {
  const { unit, formulaOption, height } = input;

  if (!height || height <= 0) {
    throw new Error("Height must be greater than zero.");
  }

  const heightInches = unit === "metric" ? cmToInches(height) : height;
  const inchesOverFiveFeet = Math.max(heightInches - 60, 0);

  const isMaleFormula = formulaOption === "male";

  let devineKg: number;
  let robinsonKg: number;
  let millerKg: number;
  let hamwiKg: number;

  if (isMaleFormula) {
    devineKg = 50 + 2.3 * inchesOverFiveFeet;
    robinsonKg = 52 + 1.9 * inchesOverFiveFeet;
    millerKg = 56.2 + 1.41 * inchesOverFiveFeet;
    hamwiKg = 48 + 2.7 * inchesOverFiveFeet;
  } else {
    devineKg = 45.5 + 2.3 * inchesOverFiveFeet;
    robinsonKg = 49 + 1.7 * inchesOverFiveFeet;
    millerKg = 53.1 + 1.36 * inchesOverFiveFeet;
    hamwiKg = 45.5 + 2.2 * inchesOverFiveFeet;
  }

  const valuesKg = [devineKg, robinsonKg, millerKg, hamwiKg];
  const averageKg = valuesKg.reduce((sum, value) => sum + value, 0) / valuesKg.length;

  const outputValues =
    unit === "metric"
      ? valuesKg
      : valuesKg.map((value) => kgToLb(value));

  const outputAverage = unit === "metric" ? averageKg : kgToLb(averageKg);

  return {
    devine: Number(outputValues[0].toFixed(1)),
    robinson: Number(outputValues[1].toFixed(1)),
    miller: Number(outputValues[2].toFixed(1)),
    hamwi: Number(outputValues[3].toFixed(1)),
    average: Number(outputAverage.toFixed(1)),
    rangeMin: Number(Math.min(...outputValues).toFixed(1)),
    rangeMax: Number(Math.max(...outputValues).toFixed(1)),
    description:
      "This calculator compares multiple commonly used ideal weight formulas and gives an estimated range.",
  };
}
