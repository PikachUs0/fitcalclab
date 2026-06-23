"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

type SegmentedControlOption = {
  value: string;
  label: string;
  helper?: string;
  icon?: LucideIcon;
};

type SegmentedControlProps = {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SegmentedControlOption[];
};

export function SegmentedControl({
  id,
  label,
  value,
  onChange,
  options,
}: SegmentedControlProps) {
  return (
    <div className="grid gap-2">
      {label ? (
        <p
          className="text-sm font-medium"
          style={{
            color: "var(--fl-text)",
          }}
        >
          {label}
        </p>
      ) : null}

      <div
        role="radiogroup"
        aria-label={label}
        className="flex gap-2 overflow-x-auto rounded-full border p-1"
        style={{
          backgroundColor: "var(--fl-bg-soft)",
          borderColor: "var(--fl-border)",
        }}
      >
        {options.map((option) => {
          const isActive = option.value === value;
          const Icon = option.icon;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(option.value)}
              className="relative flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors"
              style={{
                color: isActive ? "#ffffff" : "var(--fl-text-secondary)",
              }}
            >
              {isActive ? (
                <motion.span
                  layoutId={`${id}-active-pill`}
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundColor: "var(--fl-primary)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 34,
                  }}
                />
              ) : null}

              <span className="relative z-10 flex items-center gap-2">
                {Icon ? <Icon className="h-4 w-4" /> : null}

                <span>{option.label}</span>

                {option.helper ? (
                  <span
                    className="hidden text-xs opacity-80 sm:inline"
                    style={{
                      color: isActive ? "#ffffff" : "var(--fl-text-muted)",
                    }}
                  >
                    {option.helper}
                  </span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}