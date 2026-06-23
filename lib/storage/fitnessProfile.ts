export type FitnessProfileUnit = "metric" | "imperial";

export type FitnessProfile = {
  unit?: FitnessProfileUnit;

  heightCm?: number;
  weightKg?: number;

  heightIn?: number;
  weightLb?: number;

  age?: number;
  formulaOption?: "male" | "female";

  activityLevel?: "sedentary" | "light" | "moderate" | "very" | "extra";

  macroCalories?: number;
  macroGoal?: "fatLoss" | "maintain" | "muscleGain";

  proteinGoal?: "general" | "fatLoss" | "muscleGain" | "endurance";

  calorieGoal?: "lose" | "maintain" | "gain";

  mealsPerDay?: number;

  waterExerciseMinutes?: number;
  waterClimate?: "normal" | "hot";

  bodyFatNeckCm?: number;
  bodyFatWaistCm?: number;
  bodyFatHipCm?: number;

  bodyFatNeckIn?: number;
  bodyFatWaistIn?: number;
  bodyFatHipIn?: number;

  oneRepMaxWeight?: number;
  oneRepMaxReps?: number;

  weightLossCurrentWeightKg?: number;
  weightLossTargetWeightKg?: number;

  weightLossCurrentWeightLb?: number;
  weightLossTargetWeightLb?: number;

  weightLossDailyDeficit?: number;
  weightLossStartDate?: string;
};

const STORAGE_KEY = "fitcalclab_fitness_profile";

export function getFitnessProfile(): FitnessProfile {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return {};
    }

    const parsedValue = JSON.parse(rawValue);

    if (!parsedValue || typeof parsedValue !== "object") {
      return {};
    }

    return parsedValue as FitnessProfile;
  } catch {
    return {};
  }
}

export function setFitnessProfile(profile: FitnessProfile) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // localStorage unavailable, ignore safely
  }
}

export function updateFitnessProfile(partialProfile: FitnessProfile) {
  const currentProfile = getFitnessProfile();

  const nextProfile: FitnessProfile = {
    ...currentProfile,
    ...partialProfile,
  };

  setFitnessProfile(nextProfile);

  return nextProfile;
}

export function clearFitnessProfile() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage unavailable, ignore safely
  }
}