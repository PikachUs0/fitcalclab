"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

type CountUpNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
};

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function formatNumber(value: number, decimals: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function CountUpNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1200,
  className = "",
}: CountUpNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();
    const startValue = 0;
    const endValue = Number.isFinite(value) ? value : 0;

    function update(currentTime: number) {
      const elapsedTime = currentTime - startTime;
      const rawProgress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOutCubic(rawProgress);

      const nextValue = startValue + (endValue - startValue) * easedProgress;

      setDisplayValue(nextValue);

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(update);
      }
    }

    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={className}
    >
      {prefix}
      {formatNumber(displayValue, decimals)}
      {suffix}
    </motion.span>
  );
}
