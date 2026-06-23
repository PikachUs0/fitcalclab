import { HelpCircle } from "lucide-react";

import { AnimatedFaqList } from "@/components/common/AnimatedFaqList";

type FaqItem = {
  question: string;
  answer: string;
};

type CalculatorFaqProps = {
  title?: string;
  items: FaqItem[];
};

export function CalculatorFaq({
  title = "Frequently asked questions",
  items,
}: CalculatorFaqProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <HelpCircle className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm font-medium text-emerald-700">
            Helpful answers
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
            {title}
          </h2>
        </div>
      </div>

      <AnimatedFaqList items={items} />
    </section>
  );
}