"use client";

import { motion, useScroll } from "framer";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed w-[100vw] shadow-lg h-1 bg-primary/80 top-20 z-10"
    />
  );
}
