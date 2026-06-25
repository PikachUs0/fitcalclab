import { Sparkles } from "lucide-react";

type QuickAnswerProps = {
  title?: string;
  children: React.ReactNode;
};

export function QuickAnswer({
  title = "Quick answer",
  children,
}: QuickAnswerProps) {
  return (
    <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/40">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-700 ring-1 ring-emerald-200 dark:bg-slate-900 dark:text-emerald-300 dark:ring-emerald-800">
          <Sparkles className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            {title}
          </h2>

          <div className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
