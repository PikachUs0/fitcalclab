"use client";

import { motion } from "motion/react";

type SmoothProgressProps = {
  value: number;
  tone?: "primary" | "warning" | "neutral";
  className?: string;
};

const barColors = {
  primary: "var(--fl-primary)",
  warning: "var(--fl-warning)",
  neutral: "var(--fl-text-secondary)",
};

export function SmoothProgress({
  value,
  tone = "primary",
  className = "",
}: SmoothProgressProps) {
  const safeValue = Math.min(Math.max(value, 0), 100);

  return (
    <div
      className={`h-3 w-full overflow-hidden rounded-full ${className}`}
      style={{
        backgroundColor: "var(--fl-bg-soft)",
      }}
    >
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: `${safeValue}%` }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 18,
          mass: 0.9,
        }}
        className="h-full rounded-full"
        style={{
          backgroundColor: barColors[tone],
        }}
      />
    </div>
  );
}