import type { ReactNode } from "react";

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

export function ResultCard({
  label,
  value,
  numericValue,
  decimals,
  suffix,
  description,
  tone = "emerald",
  className = "",
  children,
}: ResultCardProps) {
  const selectedTone = toneClasses[tone] ?? toneClasses.emerald;

  return (
    <Card
      className={`border p-5 shadow-sm ${className}`}
      style={{
        backgroundColor: "var(--fl-card)",
        borderColor: "var(--fl-border)",
        color: "var(--fl-text)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className="text-sm font-medium"
            style={{
              color: "var(--fl-text-secondary)",
            }}
          >
            {label}
          </p>

          <p
            className="mt-2 text-3xl font-bold tracking-tight"
            style={{
              color: "var(--fl-text)",
            }}
          >
            {numericValue !== undefined
              ? numericValue.toFixed(decimals)
              : value}
            {suffix && (
              <span className="text-lg font-normal text-slate-500">
                {suffix}
              </span>
            )}
          </p>
        </div>

        <div
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${selectedTone.badge}`}
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
