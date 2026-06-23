import type { Metadata } from "next";

import { Mail } from "lucide-react";

import { MotionSection } from "@/components/motion/MotionSection";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact FitCalcLab",
  description:
    "Contact FitCalcLab for questions, feedback or suggestions about fitness calculators and site improvements.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact FitCalcLab",
    description:
      "Get in touch with FitCalcLab for questions, feedback or calculator suggestions.",
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact FitCalcLab",
    description:
      "Contact FitCalcLab for questions, feedback or calculator suggestions.",
  },
};

export default function ContactPage() {
  return (
    <main className="bg-slate-50">
      <MotionSection className="mx-auto max-w-4xl px-4 py-14">
        <p className="text-sm font-medium text-emerald-700">Contact</p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
          Contact FitCalcLab
        </h1>

        <p className="mt-5 text-lg leading-8 text-slate-600">
          Have a question, suggestion or feedback about FitCalcLab? You can
          contact us by email.
        </p>

        <Card className="mt-10 border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Mail className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                Email
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                For general questions, corrections or calculator suggestions,
                email us at:
              </p>

              <a
                href="mailto:contact@fitcalclab.com"
                className="mt-4 inline-flex rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
              >
                contact@fitcalclab.com
              </a>
            </div>
          </div>
        </Card>

        <Card className="mt-6 border-orange-100 bg-orange-50 p-5 text-sm leading-6 text-orange-800">
          FitCalcLab provides calculator estimates for informational purposes
          only. We cannot provide medical, nutrition or training advice for
          individual situations.
        </Card>
      </MotionSection>
    </main>
  );
}