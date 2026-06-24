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
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}