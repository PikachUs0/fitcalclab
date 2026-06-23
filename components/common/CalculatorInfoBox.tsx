import { Info, ListChecks, ShieldCheck } from "lucide-react";

type CalculatorInfoBoxProps = {
  title: string;
  howToUse: string[];
  resultMeaning: string;
  note?: string;
};

export function CalculatorInfoBox({
  title,
  howToUse,
  resultMeaning,
  note = "This calculator is for informational purposes only and is not medical advice.",
}: CalculatorInfoBoxProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <Info className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm font-medium text-emerald-700">
            Calculator guide
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
            {title}
          </h2>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-emerald-700" />

            <h3 className="font-semibold text-slate-950">
              How to use this calculator
            </h3>
          </div>

          <ol className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">
            {howToUse.map((item, index) => (
              <li key={item} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700">
                  {index + 1}
                </span>

                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-orange-700" />

            <h3 className="font-semibold text-slate-950">
              What the result means
            </h3>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            {resultMeaning}
          </p>

          <div className="mt-5 rounded-2xl bg-orange-50 p-4 text-sm leading-6 text-orange-800">
            {note}
          </div>
        </div>
      </div>
    </section>
  );
}