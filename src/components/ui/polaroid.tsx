interface PolaroidProps {
  src: string;
  alt: string;
  caption?: string;
  rotate?: number;
  className?: string;
}

export function Polaroid({ src, alt, caption, rotate = 3, className = '' }: PolaroidProps) {
  return (
    <div
      className={`bg-[var(--paper)] p-3 pb-6 border-[1.5px] border-[var(--paper-text)] ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        boxShadow: '4px 4px 0 rgba(14,13,12,0.85)',
      }}
    >
      <img src={src} alt={alt} className="h-40 w-40 object-cover grayscale contrast-110" />
      {caption ? (
        <p className="mt-2 text-center text-[10px] font-mono uppercase tracking-wider text-[var(--paper-text)]/70">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
