"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

type AnimatedNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: AnimatedNumberProps) {
  const motionValue = useMotionValue(0);

  const springValue = useSpring(motionValue, {
    stiffness: 90,
    damping: 22,
    mass: 0.8,
  });

  const displayValue = useTransform(springValue, (latest) => {
    const formatted = latest.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  return <motion.span className={className}>{displayValue}</motion.span>;
}
