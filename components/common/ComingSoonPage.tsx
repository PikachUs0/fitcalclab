import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

import { MotionSection } from "@/components/motion/MotionSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ComingSoonPageProps = {
  title: string;
  description: string;
  category?: string;
};

export function ComingSoonPage({
  title,
  description,
  category = "Fitness calculator",
}: ComingSoonPageProps) {
  return (
    <main className="min-h-[70vh] bg-slate-50">
      <MotionSection className="mx-auto max-w-4xl px-4 py-16">
        <Card className="overflow-hidden border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <Sparkles className="h-6 w-6" />
          </div>

          <p className="mt-6 text-sm font-medium text-emerald-700">
            {category}
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            {title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            {description}
          </p>

          <div className="mt-8 rounded-3xl bg-slate-50 p-5 text-sm leading-6 text-slate-600">
            This calculator is being prepared. For now, you can try the BMI
            Calculator or browse all fitness calculators.
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="rounded-full bg-emerald-600 hover:bg-emerald-700"
            >
              <Link href="/bmi-calculator">Try BMI Calculator</Link>
            </Button>

            <Button asChild variant="outline" className="rounded-full">
              <Link href="/calculators">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to calculators
              </Link>
            </Button>
          </div>
        </Card>
      </MotionSection>
    </main>
  );
}

