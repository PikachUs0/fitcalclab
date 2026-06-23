"use client";

import { motion } from "motion/react";

import { CountUpNumber } from "@/components/common/CountUpNumber";
import { Card } from "@/components/ui/card";

type ResultCardProps = {
  label: string;
  value: string;
  description?: string;
  tone?: "emerald" | "orange" | "slate";

  numericValue?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

const toneClasses = {
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  orange: "bg-orange-50 text-orange-700 border-orange-100",
  slate: "bg-slate-50 text-slate-700 border-slate-100",
};

export function ResultCard({
  label,
  value,
  description,
  tone = "emerald",
  numericValue,
  prefix = "",
  suffix = "",
  decimals = 0,
}: ResultCardProps) {
  const shouldAnimateNumber = typeof numericValue === "number";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Card className={`border p-5 ${toneClasses[tone]}`}>
        <p className="text-sm font-medium opacity-80">{label}</p>

        <p className="mt-2 text-3xl font-bold tracking-tight">
          {shouldAnimateNumber ? (
            <CountUpNumber
              value={numericValue}
              prefix={prefix}
              suffix={suffix}
              decimals={decimals}
            />
          ) : (
            value
          )}
        </p>

        {description ? (
          <p className="mt-2 text-sm leading-6 opacity-80">{description}</p>
        ) : null}
      </Card>
    </motion.div>
  );
}