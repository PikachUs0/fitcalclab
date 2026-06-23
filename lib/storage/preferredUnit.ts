export type PreferredUnit = "metric" | "imperial";

const STORAGE_KEY = "fitcalclab_preferred_unit";

export function getPreferredUnit(defaultValue: PreferredUnit = "metric") {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (storedValue === "metric" || storedValue === "imperial") {
      return storedValue;
    }

    return defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setPreferredUnit(value: PreferredUnit) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // localStorage unavailable, ignore safely
  }
}