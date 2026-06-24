"use client";

import Link from "next/link";

const footerLinks = [
  {
    title: "Tools",
    links: [
      {
        label: "All calculators",
        href: "/calculators",
      },
      {
        label: "BMI Calculator",
        href: "/bmi-calculator",
      },
      {
        label: "TDEE Calculator",
        href: "/tdee-calculator",
      },
      {
        label: "Macro Calculator",
        href: "/macro-calculator",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "About",
        href: "/about",
      },
      {
        label: "Blog", // Blog linkini buraya düzenli bir şekilde ekledik
        href: "/blog",
      },
      {
        label: "Contact",
        href: "/contact",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        label: "Privacy Policy",
        href: "/privacy-policy",
      },
      {
        label: "Terms of Use",
        href: "/terms",
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_1.8fr]">
        {/* Sol Alan: Logo ve Açıklama */}
        <div className="flex flex-col items-start">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-sm font-bold text-white">
              FL
            </div>

            <div>
              <p className="font-semibold tracking-tight text-slate-950">
                FitCalcLab
              </p>
              <p className="text-sm text-slate-500">
                Fitness numbers made simple.
              </p>
            </div>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-600">
            Simple fitness calculators for calories, macros, hydration, body
            metrics and training estimates. Results are informational estimates
            and are not medical advice.
          </p>
        </div>

        {/* Sağ Alan: Link Grupları */}
        <div className="grid gap-8 sm:grid-cols-3">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold text-slate-950">
                {group.title}
              </h2>

              <ul className="mt-4 grid gap-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-emerald-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Alt Footer: Telif Hakkı ve Uyarı */}
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} FitCalcLab. All rights reserved.</p>
          <p>Calculator estimates for informational purposes only.</p>
        </div>
      </div>
    </footer>
  );
}