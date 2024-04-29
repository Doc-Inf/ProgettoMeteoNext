"use client";
import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function AnimationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const inViewRef = useInView(ref, { once: false });
  const anim = useAnimation();
  useEffect(() => {
    if (inViewRef) anim.start("visible");
  }, [inViewRef]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { scale: 0, y: 75 },
        visible: { scale: 1, y: 0 },
      }}
      initial="hidden"
      animate={anim}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
