import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);

  return (
    <div className="col-start-1 col-end-[-1] overflow-hidden">
      <motion.div
        style={{ scaleX: scaleX }}
        className="h-1 origin-left bg-emerald-400 dark:bg-emerald-700"
      />
    </div>
  );
}
