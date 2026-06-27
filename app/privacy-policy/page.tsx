import type { Metadata } from "next";

import { MotionSection } from "@/components/motion/MotionSection";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the FitCalcLab privacy policy to learn how calculator preferences, local browser storage, cookies and analytics may be handled.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy",
    description:
      "Learn how FitCalcLab handles calculator preferences, local browser storage, cookies and analytics.",
    url: `${siteConfig.url}/privacy-policy`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy",
    description:
      "Learn how FitCalcLab handles calculator preferences and privacy.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-slate-50">
      <MotionSection className="mx-auto max-w-4xl px-4 py-14">
        <p className="text-sm font-medium text-emerald-700">Privacy</p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
          Privacy Policy
        </h1>

        <p className="mt-5 text-lg leading-8 text-slate-600">
          This Privacy Policy explains how FitCalcLab handles information when
          users access and use the website. FitCalcLab is designed to provide
          simple fitness calculator tools without requiring user accounts.
        </p>

        <p className="mt-3 text-sm text-slate-500">
          Last updated: June 23, 2026
        </p>

        <div className="mt-10 grid gap-5">
          <Card className="border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Information users enter
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              FitCalcLab calculators may ask users to enter values such as age,
              height, weight, activity level, fitness goal, body measurements,
              calorie targets or training numbers. These values are used to
              calculate estimates directly in the browser.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              FitCalcLab does not require users to create an account to use the
              calculators.
            </p>
          </Card>

          <Card className="border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Local browser storage
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              FitCalcLab may save calculator preferences and recently entered
              values in the user&apos;s browser using local storage. This can
              include unit system, height, weight, age, formula option, activity
              level and calculator-specific preferences.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              This information is stored on the user&apos;s own device and is
              used to make the calculators easier to use. Users can clear saved
              browser data through their browser settings.
            </p>
          </Card>

          <Card className="border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Cookies, analytics and advertising
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              FitCalcLab may use cookies or similar technologies for basic site
              functionality, analytics, performance measurement or advertising
              if these services are enabled.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              Third-party services, such as analytics providers or advertising
              networks, may collect information according to their own privacy
              policies. Users can manage cookies and tracking preferences from
              their browser settings.
            </p>
          </Card>

          <Card className="border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              How information is used
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Information entered into calculators is used to generate fitness,
              nutrition, hydration, body metric or training estimates. Locally
              saved preferences may be used to prefill calculator fields and
              improve the user experience.
            </p>
          </Card>

          <Card className="border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Informational use only
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              FitCalcLab provides calculator estimates for informational and
              educational purposes only. Results are not medical, nutrition,
              fitness or professional advice.
            </p>
          </Card>

          <Card className="border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Contact
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              For privacy-related questions or feedback, contact FitCalcLab at:
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
