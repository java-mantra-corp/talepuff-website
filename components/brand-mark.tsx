import type { SVGProps } from "react";

/**
 * The Talepuff mark: a sleeping cloud with a sliver of moon. Drawn as one silhouette in
 * `currentColor`, with the face and the moon's shadow in `face`, so the same component is
 * amber on cream by day and white on night blue in the footer. Keep it as vector: this is
 * the shape that goes on the top of the cube.
 */
export function BrandMark({
  face = "var(--cream)",
  title = "Talepuff",
  ...props
}: SVGProps<SVGSVGElement> & { face?: string; title?: string }) {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label={title} {...props}>
      <g fill="currentColor">
        <rect x="10" y="34" width="44" height="14" rx="7" />
        <circle cx="22" cy="32" r="11" />
        <circle cx="34" cy="26" r="14" />
        <circle cx="46" cy="34" r="10" />
        <circle cx="54" cy="13" r="6" />
      </g>
      {/* the moon's dark side */}
      <circle cx="57.2" cy="10.2" r="5.4" fill={face} />
      {/* closed eyes and a small smile */}
      <g fill="none" stroke={face} strokeWidth="2.6" strokeLinecap="round">
        <path d="M23.5 28.5q3.5 3.4 7 0" />
        <path d="M35.5 28.5q3.5 3.4 7 0" />
        <path d="M27 36.5q6 5.5 12 0" />
      </g>
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-extrabold tracking-tight ${className}`} aria-hidden="true">
      talepuff
    </span>
  );
}

/** Mark plus wordmark, the lock-up used in the header and the footer. */
export function BrandLockup({
  className = "",
  markClassName = "size-8",
  face,
}: {
  className?: string;
  markClassName?: string;
  face?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <BrandMark className={markClassName} face={face} />
      <Wordmark className="text-2xl leading-none" />
    </span>
  );
}
