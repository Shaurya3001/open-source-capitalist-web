"use client";

import { motion, useScroll } from "framer-motion";

/** Thin top bar that fills as the reader scrolls the page. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-accent"
      aria-hidden
    />
  );
}
