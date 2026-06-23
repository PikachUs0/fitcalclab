import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type NextStepSectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
};

export function NextStepSection({
  eyebrow = "Next step",
  title,
  description,
  href,
  buttonLabel,
}: NextStepSectionProps) {
  return (
    <Card className="relative overflow-hidden border-slate-200 bg-slate-950 p-6 text-white shadow-sm md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.16),transparent_32%)]" />

      <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-emerald-200 ring-1 ring-white/10">
            <Sparkles className="h-4 w-4" />
            {eyebrow}
          </div>

          <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-slate-300">
            {description}
          </p>
        </div>

        <Button
          asChild
          className="rounded-full bg-emerald-500 text-white hover:bg-emerald-400"
        >
          <Link href={href}>
            {buttonLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
