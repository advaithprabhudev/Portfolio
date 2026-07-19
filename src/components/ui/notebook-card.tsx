import type { ReactNode } from 'react';

interface NotebookCardProps {
  children: ReactNode;
  className?: string;
  rotate?: number;
  ruled?: boolean;
}

export function NotebookCard({ children, className = '', rotate = -1.25, ruled = false }: NotebookCardProps) {
  return (
    <div
      className={`relative border-[1.5px] border-[var(--paper-text)] ${ruled ? '' : 'bg-grid-paper'} ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        backgroundColor: ruled ? 'var(--paper)' : undefined,
        backgroundImage: ruled
          ? 'linear-gradient(var(--rule-line) 1px, transparent 1px)'
          : undefined,
        backgroundSize: ruled ? '100% 28px' : undefined,
        boxShadow: '6px 6px 0 rgba(14,13,12,0.9), 6px 6px 0 1.5px var(--paper-text)',
        color: 'var(--paper-text)',
      }}
    >
      {children}
    </div>
  );
}
