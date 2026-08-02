import { site } from "@/lib/site";

/**
 * Brand mark: an ascending route line lifting off a ground node — the
 * curb-to-gate trip in one glyph.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="skyride-mark" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="var(--brand)" />
          <stop offset="100%" stopColor="var(--expressive)" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#skyride-mark)" />
      <path
        d="M7.5 21.5c4.4 0 8.2-1.6 11-4.4 2.8-2.8 4.3-6.2 4.4-10.1"
        stroke="var(--brand-contrast)"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <circle cx="7.5" cy="21.5" r="2.6" fill="var(--brand-contrast)" />
      <path
        d="M18.6 7h4.5v4.5"
        stroke="var(--brand-contrast)"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-8 w-8" />
      <span className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink-strong">
        {site.name}
      </span>
    </span>
  );
}
