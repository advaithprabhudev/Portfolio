import { Sigma, Infinity as InfinityIcon, GitBranch, TrendingUp, Binary, Braces } from 'lucide-react';

interface MarginDoodlesProps {
  tone?: 'onDark' | 'onLight';
  side?: 'left' | 'right';
  className?: string;
}

const GLYPHS = [
  { icon: Sigma, rotate: -8 },
  { icon: null, char: '∫', rotate: 6 },
  { icon: GitBranch, rotate: 5 },
  { icon: null, char: 'λ', rotate: -5 },
  { icon: TrendingUp, rotate: -6 },
  { icon: Binary, rotate: 7 },
  { icon: InfinityIcon, rotate: -4 },
  { icon: Braces, rotate: 4 },
];

export function MarginDoodles({ tone = 'onDark', side = 'left', className = '' }: MarginDoodlesProps) {
  const color = tone === 'onDark' ? 'rgba(243,234,217,0.22)' : 'rgba(23,20,15,0.18)';

  return (
    <div
      aria-hidden="true"
      className={`hidden md:flex absolute top-0 bottom-0 ${side === 'left' ? 'left-2' : 'right-2'} w-10 flex-col items-center justify-around py-10 ${className}`}
    >
      {GLYPHS.map((g, i) => (
        <span
          key={i}
          className="font-mono text-lg leading-none"
          style={{ color, transform: `rotate(${g.rotate}deg)` }}
        >
          {g.icon ? <g.icon size={20} strokeWidth={1.5} /> : g.char}
        </span>
      ))}
    </div>
  );
}
