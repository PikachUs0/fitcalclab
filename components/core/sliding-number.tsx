"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type SlidingNumberProps = {
  value: number;
  decimals?: number;
  className?: string;
};

function formatNumber(value: number, decimals: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function SlidingNumber({
  value,
  decimals = 0,
  className = "",
}: SlidingNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let animationFrameId: number;

    const startValue = displayValue;
    const endValue = Number.isFinite(value) ? value : 0;
    const startTime = performance.now();
    const duration = 850;

    function easeOutCubic(progress: number) {
      return 1 - Math.pow(1 - progress, 3);
    }

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
  }, [value]);

  const formattedValue = Number.isFinite(displayValue)
    ? formatNumber(displayValue, decimals)
    : "0";

  return (
    <span className={`inline-flex overflow-hidden tabular-nums ${className}`}>
      {formattedValue.split("").map((character, index) => (
        <span
          key={`${character}-${index}`}
          className="relative inline-block h-[1em] min-w-[0.55em] overflow-hidden align-bottom"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={`${character}-${index}-${formattedValue}`}
              initial={{ y: "115%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-115%", opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute left-0 top-0"
            >
              {character}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}