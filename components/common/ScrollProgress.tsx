"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [showButton, setShowButton] = useState(false);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    function handleScroll() {
      setShowButton(window.scrollY > 500);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[100] h-1 w-full origin-left bg-emerald-500"
      />

      {showButton ? (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          whileHover={{ y: -3, scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-5 right-5 z-[90] flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white shadow-lg shadow-slate-900/20 ring-1 ring-white/10 transition-colors hover:bg-emerald-600"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      ) : null}
    </>
  );
}