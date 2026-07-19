interface TapeProps {
  className?: string;
  rotate?: number;
  color?: string;
}

export function Tape({ className = '', rotate = -4, color = 'rgba(243,234,217,0.55)' }: TapeProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute h-6 w-20 ${className}`}
      style={{
        backgroundColor: color,
        transform: `rotate(${rotate}deg)`,
        boxShadow: '0 1px 2px rgba(0,0,0,0.25)',
        backgroundImage:
          'repeating-linear-gradient(45deg, rgba(255,255,255,0.25) 0 2px, transparent 2px 6px)',
      }}
    />
  );
}
