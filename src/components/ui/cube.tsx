import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';

// Ported from https://framer.com/m/Cube-W1Vo.js@nm5q0BPGEA4F67TjJNP8
// (Framer's `addPropertyControls`/canvas-only bits stripped). Originally scroll-driven;
// now click-driven — each click spins the cube to a random orientation.

interface CubeProps {
  size?: number;
  perspective?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  cubeColor?: string;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  smoothness?: number;
  scale?: number;
  cubePadding?: number;
  faceColorFront?: string;
  faceColorBack?: string;
  faceColorRight?: string;
  faceColorLeft?: string;
  faceColorTop?: string;
  faceColorBottom?: string;
  faceShuffle?: number;
  style?: CSSProperties;
  /** Degrees spun per click, picked randomly within this range (direction random too). */
  minSpin?: number;
  maxSpin?: number;
  /** Random tilt range (deg) assigned to the whole cube on each click. */
  tiltRange?: number;
}

interface AnimatedState {
  progress: number;
  tiltX: number;
  tiltY: number;
  tiltZ: number;
}

function randRange(range: number) {
  return (Math.random() * 2 - 1) * range;
}

export function Cube({
  size = 100,
  perspective = 800,
  rotateX = -24,
  rotateY = 24,
  rotateZ = 0,
  cubeColor = '#ffffff',
  borderRadius = 8,
  borderColor = '#000000',
  borderWidth = 1,
  smoothness = 0.12,
  scale = 1,
  cubePadding = 2,
  faceColorFront = '#ffffff',
  faceColorBack = '#ffffff',
  faceColorRight = '#ffffff',
  faceColorLeft = '#ffffff',
  faceColorTop = '#ffffff',
  faceColorBottom = '#ffffff',
  faceShuffle = 0,
  style,
  minSpin = 180,
  maxSpin = 720,
  tiltRange = 32,
}: CubeProps) {
  const targetRef = useRef<AnimatedState>({ progress: 0, tiltX: rotateX, tiltY: rotateY, tiltZ: rotateZ });
  const currentRef = useRef<AnimatedState>({ progress: 0, tiltX: rotateX, tiltY: rotateY, tiltZ: rotateZ });
  const [current, setCurrent] = useState<AnimatedState>(currentRef.current);

  useEffect(() => {
    let frame: number;
    function tick() {
      const next: AnimatedState = {
        progress: currentRef.current.progress + (targetRef.current.progress - currentRef.current.progress) * smoothness,
        tiltX: currentRef.current.tiltX + (targetRef.current.tiltX - currentRef.current.tiltX) * smoothness,
        tiltY: currentRef.current.tiltY + (targetRef.current.tiltY - currentRef.current.tiltY) * smoothness,
        tiltZ: currentRef.current.tiltZ + (targetRef.current.tiltZ - currentRef.current.tiltZ) * smoothness,
      };
      currentRef.current = next;
      setCurrent(next);
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [smoothness]);

  function spinToRandomPosition() {
    const dir = Math.random() < 0.5 ? -1 : 1;
    const spin = minSpin + Math.random() * (maxSpin - minSpin);
    targetRef.current = {
      progress: targetRef.current.progress + dir * spin,
      tiltX: randRange(tiltRange),
      tiltY: randRange(tiltRange),
      tiltZ: randRange(tiltRange / 2),
    };
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      spinToRandomPosition();
    }
  }

  const rotX = current.tiltX;
  const rotY = current.tiltY;
  const rotZ = current.tiltZ;

  const mainSize = size;
  const cubeSize = 100;
  const offset = 102 + cubePadding;
  const half = mainSize / 2;
  const cubeHalf = cubeSize / 2;

  const positions: Array<{ x: number; y: number; z: number }> = [];
  for (let z = -1; z <= 1; z++) {
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        positions.push({ x: x * offset, y: y * offset, z: z * offset });
      }
    }
  }

  const faceOrder = [faceColorFront, faceColorBack, faceColorRight, faceColorLeft, faceColorTop, faceColorBottom];
  function getShuffledFaceColor(faceIdx: number) {
    const n = faceOrder.length;
    const shift = Math.floor(faceShuffle * n);
    return faceOrder[(faceIdx + shift) % n];
  }

  const yStacks: Array<Array<{ x: number; y: number; z: number }>> = [];
  for (let y = -1; y <= 1; y++) {
    const stack: Array<{ x: number; y: number; z: number }> = [];
    for (let x = -1; x <= 1; x++) {
      for (let z = -1; z <= 1; z++) stack.push({ x: x * offset, y: y * offset, z: z * offset });
    }
    yStacks.push(stack);
  }

  const xStacks: Array<Array<{ x: number; y: number; z: number }>> = [];
  for (let x = -1; x <= 1; x++) {
    const stack: Array<{ x: number; y: number; z: number }> = [];
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) stack.push({ x: x * offset, y: y * offset, z: z * offset });
    }
    xStacks.push(stack);
  }

  const phase2 = Math.floor(Math.abs(current.progress) / 360) % 3;
  const activeStacks = phase2 === 0 ? null : phase2 === 1 ? yStacks : xStacks;
  const axis = phase2 === 0 ? 'Z' : phase2 === 1 ? 'Y' : 'X';

  function renderFace(pos: { x: number; y: number; z: number }, idx: number) {
    const gridX = Math.round(pos.x / offset);
    const gridY = Math.round(pos.y / offset);
    const gridZ = Math.round(pos.z / offset);
    const background = (() => {
      if (idx === 0 && gridZ === 1) return getShuffledFaceColor(0);
      if (idx === 1 && gridZ === -1) return getShuffledFaceColor(1);
      if (idx === 2 && gridX === 1) return getShuffledFaceColor(2);
      if (idx === 3 && gridX === -1) return getShuffledFaceColor(3);
      if (idx === 4 && gridY === -1) return getShuffledFaceColor(4);
      if (idx === 5 && gridY === 1) return getShuffledFaceColor(5);
      return cubeColor;
    })();
    const faceTransforms = [
      `rotateY(0deg) translateZ(${cubeHalf}px)`,
      `rotateY(180deg) translateZ(${cubeHalf}px)`,
      `rotateY(90deg) translateZ(${cubeHalf}px)`,
      `rotateY(-90deg) translateZ(${cubeHalf}px)`,
      `rotateX(90deg) translateZ(${cubeHalf}px)`,
      `rotateX(-90deg) translateZ(${cubeHalf}px)`,
    ];
    return (
      <div
        key={idx}
        style={{
          position: 'absolute',
          width: cubeSize,
          height: cubeSize,
          background,
          borderRadius,
          border: `${borderWidth}px solid ${borderColor}`,
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backfaceVisibility: 'hidden',
          transform: faceTransforms[idx],
        }}
      />
    );
  }

  function renderCube(pos: { x: number; y: number; z: number }, idx: number) {
    return (
      <div
        key={idx}
        style={{
          width: cubeSize,
          height: cubeSize,
          position: 'absolute',
          left: half - cubeHalf + pos.x,
          top: half - cubeHalf + pos.y,
          transformStyle: 'preserve-3d',
          transform: `translateZ(${pos.z}px)`,
          pointerEvents: 'none',
        }}
      >
        {[0, 1, 2, 3, 4, 5].map(i => renderFace(pos, i))}
      </div>
    );
  }

  function renderStack(stackIdx: number, stackPositions: Array<{ x: number; y: number; z: number }>) {
    const rotateDeg = current.progress * (stackIdx - 1);
    const stackTransform =
      axis === 'Z' ? `rotateZ(${rotateDeg}deg)` : axis === 'Y' ? `rotateY(${rotateDeg}deg)` : `rotateX(${rotateDeg}deg)`;
    return (
      <div
        key={stackIdx}
        style={{
          width: mainSize,
          height: mainSize,
          position: 'absolute',
          top: 0,
          left: 0,
          transformStyle: 'preserve-3d',
          transform: stackTransform,
        }}
      >
        {stackPositions.map((pos, idx) => renderCube(pos, idx))}
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Spin the cube to a random position"
      onClick={spinToRandomPosition}
      onKeyDown={handleKeyDown}
      style={{
        ...style,
        width: mainSize,
        height: mainSize,
        perspective,
        perspectiveOrigin: '50% 50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'visible',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          width: mainSize,
          height: mainSize,
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `scale(${scale}) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
        }}
      >
        {phase2 === 0
          ? [0, 1, 2].map(stackIdx => renderStack(stackIdx, positions.slice(stackIdx * 9, stackIdx * 9 + 9)))
          : [0, 1, 2].map(stackIdx => renderStack(stackIdx, activeStacks![stackIdx]))}
      </div>
    </div>
  );
}
