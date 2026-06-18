"use client";

import { motion } from "framer-motion";

// `template.tsx` re-mounts on every navigation, so the content animates in each
// time the reader moves to a new lesson (while the outline layout persists).
export default function LessonTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
