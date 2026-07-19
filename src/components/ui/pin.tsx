interface PinProps {
  className?: string;
}

export function Pin({ className = '' }: PinProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`absolute h-5 w-5 ${className}`}
      style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.4))' }}
    >
      <circle cx="12" cy="10" r="7" fill="var(--marker)" stroke="var(--marker-deep)" strokeWidth="1.5" />
      <circle cx="9.5" cy="7.5" r="1.6" fill="rgba(255,255,255,0.55)" />
      <path d="M12 16.5 L12 22" stroke="var(--marker-deep)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
