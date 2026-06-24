export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  relatedToolHref: string;
  relatedToolLabel: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-calculate-bmi",
    title: "How to Calculate BMI and What It Means",
    description:
      "Learn how BMI is calculated, what BMI categories mean, and when BMI should be interpreted with caution.",
    category: "Body Metrics",
    readingTime: "6 min read",
    publishedAt: "2026-06-24",
    relatedToolHref: "/bmi-calculator",
    relatedToolLabel: "BMI Calculator",
  },
  {
    slug: "bmr-vs-tdee",
    title: "BMR vs TDEE: What Is the Difference?",
    description:
      "Understand the difference between basal metabolic rate and total daily energy expenditure, and how both relate to calorie planning.",
    category: "Calories",
    readingTime: "7 min read",
    publishedAt: "2026-06-24",
    relatedToolHref: "/tdee-calculator",
    relatedToolLabel: "TDEE Calculator",
  },
  {
    slug: "how-many-calories-should-i-eat",
    title: "How Many Calories Should I Eat Per Day?",
    description:
      "A practical guide to maintenance calories, calorie deficits, calorie surpluses, and how to use calorie estimates wisely.",
    category: "Calories",
    readingTime: "8 min read",
    publishedAt: "2026-06-24",
    relatedToolHref: "/calorie-calculator",
    relatedToolLabel: "Calorie Calculator",
  },
  {
    slug: "macro-split-for-fat-loss",
    title: "Macro Split for Fat Loss, Maintenance and Muscle Gain",
    description:
      "Learn how protein, carbohydrates and fat can be split across different fitness goals and why macro targets are estimates.",
    category: "Nutrition",
    readingTime: "8 min read",
    publishedAt: "2026-06-24",
    relatedToolHref: "/macro-calculator",
    relatedToolLabel: "Macro Calculator",
  },
  {
    slug: "how-much-protein-per-day",
    title: "How Much Protein Do You Need Per Day?",
    description:
      "Understand daily protein needs, protein per meal, and how activity level and goals can affect protein targets.",
    category: "Nutrition",
    readingTime: "7 min read",
    publishedAt: "2026-06-24",
    relatedToolHref: "/protein-calculator",
    relatedToolLabel: "Protein Calculator",
  },
  {
    slug: "how-much-water-should-you-drink-per-day",
    title: "How Much Water Should You Drink Per Day?",
    description:
      "Learn what affects daily water needs, how exercise and climate change hydration targets, and how to use water intake estimates wisely.",
    category: "Nutrition",
    readingTime: "7 min read",
    publishedAt: "2026-06-24",
    relatedToolHref: "/water-intake-calculator",
    relatedToolLabel: "Water Intake Calculator",
  },
  {
    slug: "how-to-estimate-body-fat-percentage",
    title: "How to Estimate Body Fat Percentage",
    description:
      "Understand what body fat percentage means, how measurement-based estimates work, and why body fat results should be interpreted carefully.",
    category: "Body Metrics",
    readingTime: "8 min read",
    publishedAt: "2026-06-24",
    relatedToolHref: "/body-fat-calculator",
    relatedToolLabel: "Body Fat Calculator",
  },
  {
    slug: "ideal-weight-formulas-explained",
    title: "Ideal Weight Formulas Explained",
    description:
      "Learn how ideal weight formulas work, why different formulas give different results, and how to interpret estimated healthy weight ranges.",
    category: "Body Metrics",
    readingTime: "7 min read",
    publishedAt: "2026-06-24",
    relatedToolHref: "/ideal-weight-calculator",
    relatedToolLabel: "Ideal Weight Calculator",
  },
  {
    slug: "one-rep-max-guide",
    title: "One Rep Max Guide: Estimate Strength Safely",
    description:
      "Learn what one rep max means, how 1RM formulas estimate strength, and how training percentages can be used without testing a true max.",
    category: "Training",
    readingTime: "7 min read",
    publishedAt: "2026-06-24",
    relatedToolHref: "/one-rep-max-calculator",
    relatedToolLabel: "One Rep Max Calculator",
  },
  {
    slug: "weight-loss-timeline-explained",
    title: "Weight Loss Timeline Explained",
    description:
      "Understand how calorie deficits relate to estimated weight loss timelines and why real progress can differ from calculator predictions.",
    category: "Calories",
    readingTime: "8 min read",
    publishedAt: "2026-06-24",
    relatedToolHref: "/weight-loss-timeline-calculator",
    relatedToolLabel: "Weight Loss Timeline Calculator",
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}