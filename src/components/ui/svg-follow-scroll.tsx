import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';

interface ScrollThreadProps {
  className?: string;
}

function ScrollThread({ className = '' }: ScrollThreadProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.2,
  });
  const drawProgress = useTransform(progress, [0, 1], [0.06, 1]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 6000"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M350 170 C350 520 285 720 335 980 C390 1260 690 1370 670 1700 C650 2020 435 2170 475 2500 C515 2820 755 2970 720 3300 C685 3620 455 3780 500 4110 C545 4430 760 4630 715 4950 C680 5210 590 5480 615 5850"
          stroke="var(--marker)"
          strokeWidth="4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{
            pathLength: reducedMotion ? 1 : drawProgress,
            opacity: reducedMotion ? 0.14 : 0.42,
          }}
        />
      </svg>
    </div>
  );
}

export { ScrollThread };
