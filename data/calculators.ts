export type CalculatorIconName =
  | "scale"
  | "flame"
  | "activity"
  | "apple"
  | "beef"
  | "droplets"
  | "heartPulse"
  | "target"
  | "dumbbell"
  | "gauge"
  | "calculator";

export type CalculatorItem = {
  title: string;
  href: string;
  description: string;
  icon: CalculatorIconName;
  category: string;
  status: "live" | "soon";
};

export const calculators: CalculatorItem[] = [
  {
    title: "BMI Calculator",
    href: "/bmi-calculator",
    description: "Estimate your body mass index from your height and weight.",
    icon: "scale",
    category: "Body Metrics",
    status: "live",
  },
  {
    title: "BMR Calculator",
    href: "/bmr-calculator",
    description: "Estimate how many calories your body burns at rest.",
    icon: "flame",
    category: "Calories",
    status: "live",
  },
  {
    title: "TDEE Calculator",
    href: "/tdee-calculator",
    description: "Calculate your estimated daily calorie needs.",
    icon: "activity",
    category: "Calories",
    status: "live",
  },
  {
    title: "Macro Calculator",
    href: "/macro-calculator",
    description: "Split your calories into protein, carbs and fat targets.",
    icon: "apple",
    category: "Nutrition",
    status: "live",
  },
  {
    title: "Protein Calculator",
    href: "/protein-calculator",
    description: "Estimate your daily protein intake based on your goal.",
    icon: "beef",
    category: "Nutrition",
    status: "live",
  },
  {
    title: "Water Intake Calculator",
    href: "/water-intake-calculator",
    description: "Estimate your daily hydration target.",
    icon: "droplets",
    category: "Nutrition",
    status: "live",
  },
  {
    title: "Body Fat Calculator",
    href: "/body-fat-calculator",
    description: "Estimate body fat percentage using simple measurements.",
    icon: "heartPulse",
    category: "Body Metrics",
    status: "live",
  },
  {
    title: "Ideal Weight Calculator",
    href: "/ideal-weight-calculator",
    description: "Compare multiple formulas for estimated ideal weight.",
    icon: "target",
    category: "Body Metrics",
    status: "live",
  },
  {
    title: "One Rep Max Calculator",
    href: "/one-rep-max-calculator",
    description: "Estimate your one-rep max and training percentages.",
    icon: "dumbbell",
    category: "Training",
    status: "live",
  },
  {
    title: "Weight Loss Timeline",
    href: "/weight-loss-timeline-calculator",
    description: "Estimate how long it may take to reach your goal weight.",
    icon: "gauge",
    category: "Goal Planning",
    status: "live",
  },
  {
    title: "Calorie Calculator",
    href: "/calorie-calculator",
    description: "Estimate daily calories for losing, maintaining or gaining weight.",
    icon: "calculator",
    category: "Calories",
    status: "live",
  },
];