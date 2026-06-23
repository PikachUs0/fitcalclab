"use client";

import { motion } from "motion/react";
import { Activity, Droplets, Flame, Scale, Target } from "lucide-react";

import { AnimatedNumber } from "@/components/common/AnimatedNumber";
import { Card } from "@/components/ui/card";

const metrics = [
  {
    label: "BMI",
    value: 23.8,
    suffix: "",
    decimals: 1,
    icon: Scale,
    tone: "emerald",
  },
  {
    label: "TDEE",
    value: 2420,
    suffix: " kcal",
    decimals: 0,
    icon: Flame,
    tone: "orange",
  },
  {
    label: "Protein",
    value: 150,
    suffix: "g",
    decimals: 0,
    icon: Activity,
    tone: "emerald",
  },
  {
    label: "Water",
    value: 3.1,
    suffix: " L",
    decimals: 1,
    icon: Droplets,
    tone: "slate",
  },
];

const toneClasses = {
  emerald: "bg-emerald-500/15 text-emerald-200 ring-emerald-400/20",
  orange: "bg-orange-500/15 text-orange-200 ring-orange-400/20",
  slate: "bg-white/10 text-slate-200 ring-white/10",
};

export function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="relative overflow-hidden border-slate-200 bg-white/90 p-3 shadow-2xl backdrop-blur">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.14),transparent_30%)]" />

        <div className="relative rounded-[1.6rem] bg-slate-950 p-5 text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-emerald-300">
                Fitness profile preview
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Your daily numbers
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-emerald-200 ring-1 ring-white/10">
              <Target className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;

              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.12 + index * 0.08,
                    duration: 0.45,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-slate-300">{metric.label}</p>

                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-xl ring-1 ${
                        toneClasses[metric.tone as keyof typeof toneClasses]
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <p className="mt-3 text-2xl font-bold tracking-tight">
                    <AnimatedNumber
                      value={metric.value}
                      suffix={metric.suffix}
                      decimals={metric.decimals}
                    />
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.45, ease: "easeOut" }}
            className="mt-4 rounded-2xl bg-emerald-500/15 p-4 ring-1 ring-emerald-400/20"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-emerald-200">
                  Goal timeline
                </p>
                <p className="mt-1 text-sm text-emerald-50/80">
                  Move from BMI to BMR, TDEE, macros and protein targets.
                </p>
              </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "68%" }}
                transition={{ delay: 0.75, duration: 0.9, ease: "easeOut" }}
                className="h-full rounded-full bg-emerald-400"
              />
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}