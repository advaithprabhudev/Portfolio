import {
  createContext,
  useContext,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';

interface ScrollSceneContextValue {
  progress: MotionValue<number>;
  reducedMotion: boolean;
}

const ScrollSceneContext = createContext<ScrollSceneContextValue | null>(null);

interface ScrollSceneProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function ScrollScene({ children, className = '', ...props }: ScrollSceneProps) {
  const sceneRef = useRef<HTMLElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start end', 'end start'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    mass: 0.25,
  });

  return (
    <ScrollSceneContext.Provider value={{ progress, reducedMotion }}>
      <section ref={sceneRef} className={className} data-scroll-scene {...props}>
        {children}
      </section>
    </ScrollSceneContext.Provider>
  );
}

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  distance?: number;
  rotate?: number;
  scale?: number;
  style?: CSSProperties;
}

export function ParallaxLayer({
  children,
  className = '',
  distance = 36,
  rotate = 0,
  scale = 0,
  style,
}: ParallaxLayerProps) {
  const scene = useContext(ScrollSceneContext);
  if (!scene) {
    throw new Error('ParallaxLayer must be rendered inside ScrollScene.');
  }

  const y = useTransform(scene.progress, [0, 0.5, 1], [distance, 0, -distance]);
  const layerRotate = useTransform(scene.progress, [0, 0.5, 1], [rotate, 0, -rotate]);
  const layerScale = useTransform(scene.progress, [0, 0.5, 1], [1 - scale, 1, 1 - scale * 0.5]);
  const layerOpacity = useTransform(scene.progress, [0, 0.15, 0.85, 1], [0.4, 1, 1, 0.4]);

  return (
    <motion.div
      className={className}
      data-parallax-layer
      style={{
        ...style,
        y: scene.reducedMotion ? 0 : y,
        rotate: scene.reducedMotion ? 0 : layerRotate,
        scale: scene.reducedMotion ? 1 : layerScale,
        opacity: scene.reducedMotion ? 1 : layerOpacity,
        transformOrigin: 'center center',
      }}
    >
      {children}
    </motion.div>
  );
}
