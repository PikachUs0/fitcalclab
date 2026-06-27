import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Calculator } from "lucide-react";

import { blogPosts } from "@/data/blogPosts";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fitness Guides and Calculator Articles",
  description:
    "Read practical fitness guides about BMI, BMR, TDEE, calories, macros, protein and body metrics.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Fitness Guides and Calculator Articles | FitCalcLab",
    description:
      "Read practical fitness guides about BMI, BMR, TDEE, calories, macros, protein and body metrics.",
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitness Guides and Calculator Articles | FitCalcLab",
    description:
      "Read practical fitness guides about BMI, BMR, TDEE, calories, macros, protein and body metrics.",
  },
};

export default function BlogPage() {
  return (
    <main className="bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-sm font-medium text-emerald-700 shadow-sm dark:border-emerald-900 dark:bg-slate-900 dark:text-emerald-300">
            <BookOpen className="h-4 w-4" />
            Fitness guides
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl dark:text-white">
            Practical fitness guides for better calculator results.
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Learn how to understand BMI, BMR, TDEE, calories, macros and
            protein targets. These guides explain the numbers behind the
            calculators in simple language.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-700"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  {post.category}
                </span>

                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {post.readingTime}
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                <Link href={`/blog/${post.slug}`} className="hover:text-emerald-700 dark:hover:text-emerald-300">
                  {post.title}
                </Link>
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300 dark:text-slate-300">
                {post.description}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
                >
                  Read guide
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href={post.relatedToolHref}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Calculator className="h-4 w-4" />
                  {post.relatedToolLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
