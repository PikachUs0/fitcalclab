export type OneRepMaxInput = {
  weight: number;
  reps: number;
};

export type OneRepMaxResult = {
  oneRepMax: number;
  percentages: {
    percent: number;
    weight: number;
  }[];
  description: string;
};

export function calculateOneRepMax(input: OneRepMaxInput): OneRepMaxResult {
  const { weight, reps } = input;

  if (!weight || weight <= 0) {
    throw new Error("Weight must be greater than zero.");
  }

  if (!reps || reps <= 0) {
    throw new Error("Reps must be greater than zero.");
  }

  if (reps > 30) {
    throw new Error("Reps should be 30 or fewer for a useful estimate.");
  }

  const oneRepMax = weight * (1 + reps / 30);

  const percentageList = [95, 90, 85, 80, 75, 70, 65, 60];

  return {
    oneRepMax: Math.round(oneRepMax),
    percentages: percentageList.map((percent) => ({
      percent,
      weight: Math.round(oneRepMax * (percent / 100)),
    })),
    description:
      "This is an estimated one-rep max using the Epley formula. Real performance can vary based on technique, fatigue and exercise type.",
  };
}
