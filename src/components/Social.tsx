// Ícones de redes em traço fino (lucide v1 removeu os ícones de marca). Mesmo stroke do conjunto.
type P = { size?: number; strokeWidth?: number; className?: string; "aria-hidden"?: boolean | "true" | "false" };

const base = (size = 24, strokeWidth = 1.25) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function Instagram({ size, strokeWidth, className, ...rest }: P) {
  return (
    <svg {...base(size, strokeWidth)} className={className} {...rest}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function Facebook({ size, strokeWidth, className, ...rest }: P) {
  return (
    <svg {...base(size, strokeWidth)} className={className} {...rest}>
      <path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5L17 11h-3V8.5a.5.5 0 0 1 .5-.5Z" />
    </svg>
  );
}
