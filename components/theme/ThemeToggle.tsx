"use client";

import { AnimatePresence, motion } from "motion/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Toggle } from "@/components/ui/toggle";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  function handleToggle() {
    const nextTheme = isDark ? "light" : "dark";
    const root = document.documentElement;

    root.classList.add("theme-transitioning");

    const applyTheme = () => {
      setTheme(nextTheme);
    };

    if ("startViewTransition" in document) {
      document.startViewTransition(applyTheme);
    } else {
      applyTheme();
    }

    window.setTimeout(() => {
      root.classList.remove("theme-transitioning");
    }, 700);
  }

  return (
    <Toggle
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      pressed={isDark}
      onPressedChange={handleToggle}
      variant="outline"
      className="fixed bottom-5 left-5 z-[90] flex size-11 items-center justify-center rounded-full border p-0 shadow-lg transition-transform hover:scale-105 data-[state=on]:bg-transparent data-[state=on]:hover:bg-transparent"
      style={{
        backgroundColor: "var(--fl-card)",
        borderColor: "var(--fl-border)",
        color: "var(--fl-text)",
        boxShadow: "var(--fl-shadow)",
      }}
    >
      <span className="relative flex h-5 w-5 items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: -90, scale: 0.4, y: 8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1, y: 0 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.4, y: -8 }}
              transition={{
                duration: 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute"
            >
              <MoonIcon className="h-5 w-5" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: 90, scale: 0.4, y: -8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1, y: 0 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.4, y: 8 }}
              transition={{
                duration: 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute"
            >
              <SunIcon className="h-5 w-5" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </Toggle>
  );
}