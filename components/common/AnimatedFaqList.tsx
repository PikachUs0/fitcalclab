"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type FaqItem = {
  question: string;
  answer: string;
};

type AnimatedFaqListProps = {
  items: FaqItem[];
};

export function AnimatedFaqList({ items }: AnimatedFaqListProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  function toggleItem(index: number) {
    setOpenItems((currentItems) =>
      currentItems.includes(index)
        ? currentItems.filter((item) => item !== index)
        : [...currentItems, index]
    );
  }

  return (
    <div className="mt-6 grid gap-3">
      {items.map((item, index) => {
        const isOpen = openItems.includes(index);
        const contentId = `faq-answer-${index}`;

        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
          >
            <button
              type="button"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
            >
              <span className="text-sm font-semibold text-slate-950">
                {item.question}
              </span>

              <motion.span
                animate={{
                  rotate: isOpen ? 45 : 0,
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-lg leading-none text-emerald-700"
                aria-hidden="true"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={contentId}
                  key="content"
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  transition={{
                    height: {
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    opacity: {
                      duration: 0.24,
                      ease: "easeOut",
                    },
                  }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 text-sm leading-6 text-slate-600">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}