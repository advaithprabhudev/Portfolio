import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { useLayoutEffect, useRef, useState, type RefObject } from 'react';

interface ScrollThreadProps {
  className?: string;
  originRef?: RefObject<HTMLElement | null>;
}

const VIEWBOX_WIDTH = 1200;
const VIEWBOX_HEIGHT = 6000;

// Point pairs from the original hand-tuned path, starting at [350, 170].
const PATH_POINTS: Array<[number, number]> = [
  [350, 170],
  [350, 520], [285, 720], [335, 980],
  [390, 1260], [690, 1370], [670, 1700],
  [650, 2020], [435, 2170], [475, 2500],
  [515, 2820], [755, 2970], [720, 3300],
  [685, 3620], [455, 3780], [500, 4110],
  [545, 4430], [760, 4630], [715, 4950],
  [680, 5210], [590, 5480], [615, 5850],
];

function buildPath(dx: number, dy: number) {
  const [start, ...rest] = PATH_POINTS.map(([x, y]) => [x + dx, y + dy]);
  let d = `M${start[0]} ${start[1]}`;
  for (let i = 0; i < rest.length; i += 3) {
    const [c1, c2, c3] = [rest[i], rest[i + 1], rest[i + 2]];
    d += ` C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${c3[0]} ${c3[1]}`;
  }
  return d;
}

function ScrollThread({ className = '', originRef }: ScrollThreadProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const [offset, setOffset] = useState({ dx: 0, dy: 0 });
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

  useLayoutEffect(() => {
    function measure() {
      if (!ref.current || !originRef?.current) return;
      const container = ref.current.getBoundingClientRect();
      const target = originRef.current.getBoundingClientRect();
      if (container.width === 0 || container.height === 0) return;
      const x = ((target.left + target.width / 2 - container.left) / container.width) * VIEWBOX_WIDTH;
      const y = ((target.top + target.height / 2 - container.top) / container.height) * VIEWBOX_HEIGHT;
      setOffset({ dx: x - PATH_POINTS[0][0], dy: y - PATH_POINTS[0][1] });
    }
    measure();
    document.fonts?.ready?.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [originRef]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d={buildPath(offset.dx, offset.dy)}
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
