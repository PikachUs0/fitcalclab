import type { Metadata } from "next";

import { MotionSection } from "@/components/motion/MotionSection";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Read the FitCalcLab terms of use for calculator estimates, informational content, limitations and site usage.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Use",
    description:
      "Review the terms for using FitCalcLab fitness calculator tools and informational content.",
    url: `${siteConfig.url}/terms`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use",
    description:
      "Review the terms for using FitCalcLab fitness calculator tools.",
  },
};

export default function TermsPage() {
  return (
    <main className="bg-slate-50">
      <MotionSection className="mx-auto max-w-4xl px-4 py-14">
        <p className="text-sm font-medium text-emerald-700">Terms</p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
          Terms of Use
        </h1>

        <p className="mt-5 text-lg leading-8 text-slate-600">
          These Terms of Use explain the general conditions for using
          FitCalcLab. By using the website, users agree to use the calculators
          and content responsibly.
        </p>

        <p className="mt-3 text-sm text-slate-500">
          Last updated: June 23, 2026
        </p>

        <div className="mt-10 grid gap-5">
          <Card className="border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Informational estimates
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              FitCalcLab calculators provide estimates based on the values users
              enter and the formulas described on calculator pages. Results are
              intended for informational and educational purposes only.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              FitCalcLab results should not be treated as medical, nutrition,
              fitness, training or professional advice.
            </p>
          </Card>

          <Card className="border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              No professional advice
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Users should consult a qualified professional before making
              health, nutrition, exercise or training decisions based on
              calculator results, especially if users have health conditions,
              injuries or specific dietary needs.
            </p>
          </Card>

          <Card className="border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              User responsibility
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Users are responsible for entering accurate information and for
              interpreting results appropriately. Small changes in input values,
              formulas or assumptions can produce different results.
            </p>
          </Card>

          <Card className="border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Availability and changes
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              FitCalcLab may update, change, add or remove calculators, pages,
              formulas, features or content at any time. The website may also be
              temporarily unavailable due to maintenance, technical issues or
              hosting changes.
            </p>
          </Card>

          <Card className="border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              External services
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              FitCalcLab may use third-party services for hosting, analytics,
              performance measurement or advertising. These services may operate
              under their own terms and privacy policies.
            </p>
          </Card>

          <Card className="border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Contact
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              For questions about these Terms of Use, contact FitCalcLab at:
            </p>

            <a
              href="mailto:contact@fitcalclab.com"
              className="mt-3 inline-flex font-medium text-emerald-700 underline-offset-4 hover:underline"
            >
              contact@fitcalclab.com
            </a>
          </Card>
        </div>
      </MotionSection>
    </main>
  );
}
``