export type BodyFatUnit = "metric" | "imperial";
export type BodyFatFormulaOption = "male" | "female";

export type BodyFatInput = {
  unit: BodyFatUnit;
  formulaOption: BodyFatFormulaOption;
  height: number;
  weight: number;
  neck: number;
  waist: number;
  hip?: number;
};

export type BodyFatResult = {
  bodyFatPercentage: number;
  fatMass: number;
  leanMass: number;
  category: string;
  description: string;
};

function toInches(value: number, unit: BodyFatUnit) {
  return unit === "metric" ? value / 2.54 : value;
}

function toOutputWeight(valueKg: number, unit: BodyFatUnit) {
  return unit === "metric" ? valueKg : valueKg * 2.20462;
}

function toKg(weight: number, unit: BodyFatUnit) {
  return unit === "metric" ? weight : weight * 0.453592;
}

function getBodyFatCategory(value: number, formulaOption: BodyFatFormulaOption) {
  if (formulaOption === "male") {
    if (value < 6) return "Essential fat range";
    if (value < 14) return "Athletic range";
    if (value < 18) return "Fitness range";
    if (value < 25) return "Average range";
    return "Higher range";
  }

  if (value < 14) return "Essential fat range";
  if (value < 21) return "Athletic range";
  if (value < 25) return "Fitness range";
  if (value < 32) return "Average range";
  return "Higher range";
}

export function calculateBodyFat(input: BodyFatInput): BodyFatResult {
  const { unit, formulaOption, height, weight, neck, waist, hip } = input;

  if (!height || !weight || !neck || !waist) {
    throw new Error("Height, weight, neck and waist are required.");
  }

  if (height <= 0 || weight <= 0 || neck <= 0 || waist <= 0) {
    throw new Error("All values must be greater than zero.");
  }

  const heightIn = toInches(height, unit);
  const neckIn = toInches(neck, unit);
  const waistIn = toInches(waist, unit);

  let bodyFat: number;

  if (formulaOption === "male") {
    if (waistIn <= neckIn) {
      throw new Error("Waist must be greater than neck.");
    }

    bodyFat =
      86.01 * Math.log10(waistIn - neckIn) -
      70.041 * Math.log10(heightIn) +
      36.76;
  } else {
    if (!hip || hip <= 0) {
      throw new Error("Hip measurement is required for this formula option.");
    }

    const hipIn = toInches(hip, unit);

    if (waistIn + hipIn <= neckIn) {
      throw new Error("Waist plus hip must be greater than neck.");
    }

    bodyFat =
      163.205 * Math.log10(waistIn + hipIn - neckIn) -
      97.684 * Math.log10(heightIn) -
      78.387;
  }

  const roundedBodyFat = Number(bodyFat.toFixed(1));

  if (!Number.isFinite(roundedBodyFat) || roundedBodyFat <= 0) {
    throw new Error("Measurements produced an invalid estimate.");
  }

  const weightKg = toKg(weight, unit);
  const fatMassKg = weightKg * (roundedBodyFat / 100);
  const leanMassKg = weightKg - fatMassKg;

  const fatMass = Number(toOutputWeight(fatMassKg, unit).toFixed(1));
  const leanMass = Number(toOutputWeight(leanMassKg, unit).toFixed(1));

  return {
    bodyFatPercentage: roundedBodyFat,
    fatMass,
    leanMass,
    category: getBodyFatCategory(roundedBodyFat, formulaOption),
    description:
      "This is an estimated body fat percentage using a tape-measurement method. It does not replace professional body composition testing.",
  };
}
