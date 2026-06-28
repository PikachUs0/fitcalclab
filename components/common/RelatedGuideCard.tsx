import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

type RelatedGuideCardProps = {
  title: string;
  description: string;
  href: string;
};

export function RelatedGuideCard({
  title,
  description,
  href,
}: RelatedGuideCardProps) {
  return (
    <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/40">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-700 ring-1 ring-emerald-200 dark:bg-slate-900 dark:text-emerald-300 dark:ring-emerald-800">
          <BookOpen className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
            Learn more about this result
          </p>

          <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-950 dark:text-white">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
            {description}
          </p>

          <Link
            href={href}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
          >
            Read guide
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}