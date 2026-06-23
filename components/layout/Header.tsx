"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  Activity,
  Calculator,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

import { calculators } from "@/data/calculators";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Calculators", href: "/calculators" },
  { label: "BMI", href: "/bmi-calculator" },
  { label: "TDEE", href: "/tdee-calculator" },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const liveCalculators = calculators
    .filter((calculator) => calculator.status === "live")
    .slice(0, 6);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm transition-transform group-hover:scale-105">
            <Activity className="h-5 w-5" />
          </div>

          <div className="leading-none">
            <span className="block text-lg font-semibold tracking-tight text-slate-950">
              FitCalcLab
            </span>
            <span className="hidden text-xs text-slate-500 sm:block">
              Fitness numbers made simple
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            asChild
            className="rounded-full bg-emerald-600 hover:bg-emerald-700"
          >
            <Link href="/calculators">Start calculating</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden"
          >
            <div className="mx-auto max-w-6xl px-4 py-4">
              <div className="grid gap-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {link.label}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  );
                })}
              </div>

              <div className="mt-5 rounded-3xl bg-slate-950 p-4 text-white">
                <div className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-emerald-300" />
                  <p className="text-sm font-medium text-emerald-300">
                    Live calculators
                  </p>
                </div>

                <div className="mt-3 grid gap-2">
                  {liveCalculators.map((calculator) => (
                    <Link
                      key={calculator.href}
                      href={calculator.href}
                      onClick={closeMenu}
                      className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-100 transition-colors hover:bg-white/10"
                    >
                      {calculator.title}
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>

              <Button
                asChild
                className="mt-4 w-full rounded-full bg-emerald-600 hover:bg-emerald-700"
              >
                <Link href="/calculators" onClick={closeMenu}>
                  Explore all calculators
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}