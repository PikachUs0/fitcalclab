import { calculators } from "@/data/calculators";
import { CalculatorCard } from "@/components/common/CalculatorCard";

type RelatedToolsProps = {
  currentHref: string;
  limit?: number;
};

export function RelatedTools({ currentHref, limit = 3 }: RelatedToolsProps) {
  const related = calculators
    .filter((calculator) => calculator.href !== currentHref)
    .slice(0, limit);

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          Related calculators
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Continue with another fitness number to get a clearer picture.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {related.map((calculator) => (
          <CalculatorCard key={calculator.href} {...calculator} />
        ))}
      </div>
    </div>
  );
}
