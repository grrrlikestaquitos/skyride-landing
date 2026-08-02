import type { SVGProps } from "react";

/**
 * Line icons drawn on a 24px grid at 1.6 stroke, echoing the SF Symbols
 * weight used in the iOS app.
 */

type IconName =
  | "calendar"
  | "tag"
  | "map"
  | "passengers"
  | "edit"
  | "star"
  | "pool"
  | "lock"
  | "wallet"
  | "clock";

const paths: Record<IconName, React.ReactNode> = {
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  tag: (
    <>
      <path d="M12.6 3H21v8.4a2 2 0 0 1-.6 1.4l-7 7a2 2 0 0 1-2.8 0l-5.4-5.4a2 2 0 0 1 0-2.8l7-7A2 2 0 0 1 12.6 3Z" />
      <circle cx="16.5" cy="7.5" r="1.4" />
    </>
  ),
  map: (
    <>
      <path d="m9 4-6 3v13l6-3 6 3 6-3V4l-6 3-6-3Z" />
      <path d="M9 4v13M15 7v13" />
    </>
  ),
  passengers: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.8 20a6.2 6.2 0 0 1 12.4 0" />
      <path d="M16.2 5.4a3.2 3.2 0 0 1 0 5.2" />
      <path d="M17.6 14.4A6.2 6.2 0 0 1 21.2 20" />
    </>
  ),
  edit: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
    </>
  ),
  star: (
    <path d="m12 3.5 2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.8L12 3.5Z" />
  ),
  pool: (
    <>
      <rect x="3" y="4" width="18" height="5" rx="2" />
      <rect x="3" y="12.5" width="18" height="5" rx="2" />
      <path d="M7 21h10" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="3" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  wallet: (
    <>
      <path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2" />
      <rect x="3" y="7" width="18" height="13" rx="3" />
      <circle cx="16.5" cy="13.5" r="1.3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </>
  ),
};

export function Icon({
  name,
  ...props
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

export type { IconName };
