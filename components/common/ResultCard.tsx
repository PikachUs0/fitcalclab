"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Card } from "@/components/ui/card";

type ResultCardProps = {
  label: string;
  value: string;
  numericValue?: number;
  decimals?: number;
  suffix?: string;
  description?: string;
  tone?: "emerald" | "orange" | "slate" | "red" | "blue" | "teal";
  className?: string;
  children?: ReactNode;
};

const toneClasses = {
  emerald: {
    badge: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
  },
  orange: {
    badge: "bg-orange-100 text-orange-700",
    dot: "bg-orange-500",
  },
  slate: {
    badge: "bg-slate-100 text-slate-700",
    dot: "bg-slate-500",
  },
  red: {
    badge: "bg-red-100 text-red-700",
    dot: "bg-red-500",
  },
  blue: {
    badge: "bg-sky-100 text-sky-700",
    dot: "bg-sky-500",
  },
  teal: {
    badge: "bg-teal-100 text-teal-700",
    dot: "bg-teal-500",
  },
};

function formatNumber(value: number, decimals: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function AnimatedResultNumber({
  value,
  decimals = 0,
}: {
  value: number;
  decimals?: number;
}) {
  const safeValue = Number.isFinite(value) ? value : 0;

  const [displayValue, setDisplayValue] = useState(0);
  const previousValueRef = useRef(0);
  const hasAnimatedOnceRef = useRef(false);

  useEffect(() => {
    const isFirstAnimation = !hasAnimatedOnceRef.current;

    const startValue = isFirstAnimation ? 0 : previousValueRef.current;
    const endValue = safeValue;

    let animationFrameId = 0;
    let timeoutId = 0;

    const duration = isFirstAnimation ? 1100 : 850;
    const delay = isFirstAnimation ? 220 : 0;

    function easeOutCubic(progress: number) {
      return 1 - Math.pow(1 - progress, 3);
    }

    function startAnimation() {
      const startTime = performance.now();

      function update(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);

        const nextValue = startValue + (endValue - startValue) * easedProgress;

        setDisplayValue(nextValue);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(update);
        } else {
          setDisplayValue(endValue);
          previousValueRef.current = endValue;
          hasAnimatedOnceRef.current = true;
        }
      }

      animationFrameId = requestAnimationFrame(update);
    }

    setDisplayValue(startValue);

    timeoutId = window.setTimeout(() => {
      startAnimation();
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [safeValue]);

  return <span>{formatNumber(displayValue, decimals)}</span>;
}

export function ResultCard({
  label,
  value,
  numericValue,
  decimals = 0,
  suffix = "",
  description,
  tone = "emerald",
  className = "",
  children,
}: ResultCardProps) {
  const selectedTone = toneClasses[tone] ?? toneClasses.emerald;

  const shouldAnimate =
    typeof numericValue === "number" && Number.isFinite(numericValue);

  return (
    <Card
      className={`border p-5 shadow-sm ${className}`}
      style={{
        backgroundColor: "var(--fl-card)",
        borderColor: "var(--fl-border)",
        color: "var(--fl-text)",
      }}
    >
      <div className="relative">
  <p
    className="pr-24 text-sm font-medium"
    style={{
      color: "var(--fl-text-secondary)",
    }}
  >
    {label}
  </p>

  <p
    className="mt-2 text-3xl font-bold tracking-tight tabular-nums"
    style={{
      color: "var(--fl-text)",
    }}
  >
    {shouldAnimate ? (
      <>
        <AnimatedResultNumber value={numericValue} decimals={decimals} />
        {suffix ? <span>{suffix}</span> : null}
      </>
    ) : (
      value
    )}
  </p>

  <div
    className={`absolute right-0 top-0 inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${selectedTone.badge}`}
  >
    <span className={`h-2 w-2 rounded-full ${selectedTone.dot}`} />
    Result
  </div>
</div>

      {description ? (
        <p
          className="mt-3 text-sm leading-6"
          style={{
            color: "var(--fl-text-muted)",
          }}
        >
          {description}
        </p>
      ) : null}

      {children ? <div className="mt-4">{children}</div> : null}
    </Card>
  );
}
