import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPostJsonLd } from "@/components/seo/BlogPostJsonLd";
import { blogPosts, getBlogPostBySlug } from "@/data/blogPosts";
import { siteConfig } from "@/lib/site";

type BlogArticle = {
  intro: string;
  sections: {
    heading: string;
    body: string;
  }[];
};

const articleContent: Record<string, BlogArticle> = {
  "how-to-calculate-bmi": {
    intro:
      "BMI, or Body Mass Index, is a simple estimate based on height and weight. It can be useful as a quick screening number, but it should not be treated as a complete picture of health or body composition.",
    sections: [
      {
        heading: "How BMI is calculated",
        body:
          "BMI is calculated by comparing body weight with height. In metric units, the common formula is weight in kilograms divided by height in meters squared. The result gives a single number that can be compared with common BMI categories.",
      },
      {
        heading: "What BMI can tell you",
        body:
          "BMI can help identify whether a person may fall into an underweight, normal, overweight or obesity category. It is useful for a quick estimate, especially when combined with other health and lifestyle context.",
      },
      {
        heading: "When BMI should be interpreted carefully",
        body:
          "BMI does not directly measure muscle mass, fat mass, bone density or fat distribution. Athletes, older adults and people with higher muscle mass may need more context than BMI alone can provide.",
      },
    ],
  },

  "bmr-vs-tdee": {
    intro:
      "BMR and TDEE are two important calorie estimates. BMR estimates calories burned at rest, while TDEE estimates total daily calories after activity level is included.",
    sections: [
      {
        heading: "What BMR means",
        body:
          "BMR stands for Basal Metabolic Rate. It estimates how many calories the body may burn at rest to support basic functions such as breathing, circulation and temperature regulation.",
      },
      {
        heading: "What TDEE means",
        body:
          "TDEE stands for Total Daily Energy Expenditure. It starts with a resting calorie estimate and adds daily movement, exercise and activity level to estimate total calorie needs.",
      },
      {
        heading: "Which number should you use?",
        body:
          "BMR is useful for understanding baseline energy needs, but TDEE is usually more practical for planning maintenance calories, fat loss calories or muscle gain calories.",
      },
    ],
  },

  "how-many-calories-should-i-eat": {
    intro:
      "Daily calorie needs depend on body size, age, activity level, goal and consistency. A calculator can provide a starting estimate, but real progress should be tracked over time.",
    sections: [
      {
        heading: "Maintenance calories",
        body:
          "Maintenance calories estimate how many calories a person may need to keep body weight relatively stable. This is often close to TDEE.",
      },
      {
        heading: "Calorie deficit",
        body:
          "A calorie deficit means eating below estimated maintenance calories. This is commonly used for fat loss, but the size of the deficit should be realistic and sustainable.",
      },
      {
        heading: "Calorie surplus",
        body:
          "A calorie surplus means eating above maintenance calories. This is commonly used for muscle gain, especially when combined with progressive strength training.",
      },
    ],
  },

  "macro-split-for-fat-loss": {
    intro:
      "Macros are protein, carbohydrates and fat. A macro split helps divide daily calories into nutrient targets based on a goal such as fat loss, maintenance or muscle gain.",
    sections: [
      {
        heading: "Protein",
        body:
          "Protein supports muscle repair, training recovery and satiety. Many macro plans start by setting a protein target first, then divide the remaining calories between carbs and fat.",
      },
      {
        heading: "Carbohydrates",
        body:
          "Carbohydrates are an important energy source for training and daily activity. The ideal amount can vary based on activity level, food preference and performance goals.",
      },
      {
        heading: "Fat",
        body:
          "Dietary fat supports essential functions and helps make meals satisfying. Very low-fat diets can be difficult to maintain, so balance matters.",
      },
    ],
  },

  "how-much-protein-per-day": {
    intro:
      "Protein needs vary by body weight, training level, goal and diet. A protein calculator can help estimate a daily target and a practical per-meal range.",
    sections: [
      {
        heading: "Protein and body weight",
        body:
          "Many protein estimates are based on body weight. A larger person or a person training regularly may need more total protein than a smaller sedentary person.",
      },
      {
        heading: "Protein for fat loss",
        body:
          "During fat loss, protein can help support fullness and preserve lean mass when combined with resistance training and an appropriate calorie deficit.",
      },
      {
        heading: "Protein per meal",
        body:
          "Dividing protein across meals can make daily targets easier to follow. The exact meal timing is less important than consistency across the day.",
      },
    ],
  },
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | FitCalcLab`,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      siteName: siteConfig.name,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | FitCalcLab`,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const article = articleContent[slug];

  if (!post || !article) {
    notFound();
  }

  return (
    <main className="bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
        <BlogPostJsonLd
            title={post.title}
            description={post.description}
            slug={post.slug}
            publishedAt={post.publishedAt}
            />
      <article className="mx-auto max-w-3xl px-4 py-14 md:py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to guides
        </Link>

        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              {post.category}
            </span>

            <span className="text-xs text-slate-500 dark:text-slate-400">
              {post.readingTime}
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl dark:text-white">
            {post.title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            {post.description}
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="leading-8 text-slate-700 dark:text-slate-300">
            {article.intro}
          </p>

          <div className="mt-8 space-y-8">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                  {section.heading}
                </h2>

                <p className="mt-3 leading-8 text-slate-700 dark:text-slate-300">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-emerald-50 p-5 dark:bg-emerald-950/40">
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
              Related calculator
            </p>

            <Link
              href={post.relatedToolHref}
              className="mt-3 inline-flex items-center gap-2 font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
            >
              Try the {post.relatedToolLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <p className="mt-8 text-sm leading-6 text-slate-500 dark:text-slate-400">
            This guide is for informational purposes only and is not medical
            advice. Calculator results are estimates and should be interpreted
            with personal context.
          </p>
        </div>
      </article>
    </main>
  );
}