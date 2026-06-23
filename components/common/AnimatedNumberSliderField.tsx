"use client";

import { motion } from "motion/react";

import { SlidingNumber } from "@/components/common/SlidingNumber";
import { Label } from "@/components/ui/label";

type AnimatedNumberSliderFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  decimals?: number;
  placeholder?: string;
};

export function AnimatedNumberSliderField({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix = "",
  decimals = 0,
}: AnimatedNumberSliderFieldProps) {
  const numericValue = value.trim() === "" ? min : Number(value);
  const safeValue = Number.isFinite(numericValue) ? numericValue : min;

  function handleSliderChange(nextValue: string) {
    onChange(nextValue);
  }

  return (
    <motion.div
  layout
  className="grid gap-4 rounded-[1.75rem] border p-5 shadow-sm"
  style={{
    backgroundColor: "var(--fl-card)",
    borderColor: "var(--fl-border)",
    color: "var(--fl-text)",
  }}
  transition={{
    type: "spring",
    stiffness: 260,
    damping: 22,
  }}
>
      <div className="flex items-center justify-between gap-4">
        <Label
          htmlFor={id}
          className="text-sm font-medium"
          style={{
            color: "var(--fl-text)",
          }}
        >
          {label}
        </Label>
      </div>

      <div className="flex justify-center">
        <motion.div
          key={`${id}-${safeValue}`}
          initial={{ scale: 0.96, opacity: 0.85 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.28,
            ease: "easeOut",
          }}
          className="inline-flex min-w-24 items-center justify-center rounded-full border px-6 py-3 font-mono text-xl font-bold leading-none shadow-sm"
          style={{
  backgroundColor: "var(--fl-card-elevated)",
  borderColor: "color-mix(in srgb, var(--fl-primary) 32%, transparent)",
  color: "var(--fl-primary)",
  boxShadow: "0 12px 28px rgba(0, 0, 0, 0.16)",
}}
        >
          <SlidingNumber value={safeValue} decimals={decimals} />
          {suffix ? <span className="ml-1 text-base">{suffix}</span> : null}
        </motion.div>
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={safeValue}
        onChange={(event) => handleSliderChange(event.target.value)}
        className="h-2 w-full cursor-pointer"
        style={{
          accentColor: "var(--fl-primary)",
        }}
      />

      <div
        className="flex justify-between text-xs"
        style={{
          color: "var(--fl-text-muted)",
        }}
      >
        <span>
          {min}
          {suffix}
        </span>

        <span>
          {max}
          {suffix}
        </span>
      </div>
    </motion.div>
  );
}