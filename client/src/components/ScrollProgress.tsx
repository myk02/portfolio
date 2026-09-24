import { motion, useScroll, useSpring } from "framer-motion";

/** Thin accent bar that fills as the user scrolls — global scroll feedback. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });
  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
