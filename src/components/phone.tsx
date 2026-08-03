import { fareExample, quoteFare, site, usd } from "@/lib/site";

const fare = quoteFare(fareExample);

/**
 * A rendition of the app's scheduled-trip screen. Everything is drawn with the
 * shared design tokens, so the mock re-themes with the rest of the page and
 * never goes stale the way a screenshot would.
 */
export function PhoneMock() {
  return (
    <div
      role="img"
      aria-label={`The ${site.name} app showing a scheduled trip to SEA with the driver en route and the fare quoted upfront.`}
      className="relative mx-auto w-[300px] select-none sm:w-[330px]"
    >
      {/* Device shell */}
      <div className="relative rounded-[2.75rem] border border-line bg-card p-2.5 shadow-[0_2px_8px_hsl(var(--shadow-color)/0.16),0_40px_80px_-32px_hsl(var(--shadow-color)/0.45)]">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-bg-soft">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-3.5 pb-1.5">
            <span className="font-mono text-[0.6875rem] font-medium text-ink-strong">
              9:41
            </span>
            <div className="absolute left-1/2 top-2.5 h-6 w-24 -translate-x-1/2 rounded-full bg-ink-strong/90" />
            <div className="flex items-center gap-1 text-ink-strong">
              <svg
                viewBox="0 0 18 12"
                className="h-2.5 w-4"
                fill="currentColor"
                aria-hidden="true"
              >
                <rect x="0" y="8" width="3" height="4" rx="1" />
                <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
                <rect x="10" y="3" width="3" height="9" rx="1" />
                <rect
                  x="15"
                  y="0.5"
                  width="3"
                  height="11.5"
                  rx="1"
                  opacity="0.35"
                />
              </svg>
              <svg
                viewBox="0 0 26 12"
                className="h-2.5 w-5"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="0.6"
                  y="0.6"
                  width="21"
                  height="10.8"
                  rx="3"
                  stroke="currentColor"
                  strokeOpacity="0.4"
                  strokeWidth="1.2"
                />
                <rect
                  x="2.4"
                  y="2.4"
                  width="14"
                  height="7.2"
                  rx="1.8"
                  fill="currentColor"
                />
                <path
                  d="M23.4 4.2v3.6c1-.4 1.6-1 1.6-1.8s-.6-1.4-1.6-1.8Z"
                  fill="currentColor"
                  fillOpacity="0.4"
                />
              </svg>
            </div>
          </div>

          {/* Map */}
          <div className="relative h-[188px] overflow-hidden bg-bg">
            <MapArt />
            <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-line bg-card/90 px-2.5 py-1 backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              <span className="font-mono text-[0.625rem] tracking-wide text-ink-strong">
                DRIVER 6 MIN AWAY
              </span>
            </div>
          </div>

          {/* Trip sheet */}
          <div className="-mt-5 rounded-t-[1.5rem] border-t border-line bg-card px-5 pt-4 pb-6">
            <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-line" />

            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[0.625rem] tracking-[0.12em] text-ink-faint uppercase">
                  Scheduled pickup
                </p>
                <p className="mt-1 text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink-strong">
                  Tomorrow, 5:40 AM
                </p>
              </div>
              <span className="rounded-full border border-success/30 bg-success/12 px-2.5 py-1 font-mono text-[0.625rem] tracking-wide text-success">
                ASSIGNED
              </span>
            </div>

            {/* Route */}
            <div className="mt-4 flex gap-3">
              <div className="flex flex-col items-center pt-1.5">
                <span className="h-2 w-2 rounded-full border-2 border-brand" />
                <span className="my-1 w-px flex-1 bg-line" />
                <span className="h-2 w-2 rounded-[3px] bg-brand" />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <p className="text-[0.8125rem] font-medium text-ink-strong">
                    {fareExample.from}
                  </p>
                  <p className="text-[0.6875rem] text-ink-muted">
                    1521 12th Ave, Seattle
                  </p>
                </div>
                <div>
                  <p className="text-[0.8125rem] font-medium text-ink-strong">
                    SEA · Main Terminal
                  </p>
                  <p className="text-[0.6875rem] text-ink-muted">
                    Departures, Door 6
                  </p>
                </div>
              </div>
            </div>

            <div className="my-4 h-px bg-line" />

            <div className="flex items-end justify-between">
              <div>
                <p className="font-mono text-[0.625rem] tracking-[0.12em] text-ink-faint uppercase">
                  Fare, locked
                </p>
                <p className="tabular mt-0.5 text-2xl font-semibold tracking-[-0.02em] text-ink-strong">
                  {usd(fare.total)}
                </p>
              </div>
              <p className="tabular text-[0.6875rem] text-ink-muted">
                {fareExample.miles} mi · {fareExample.minutes} min
              </p>
            </div>

            {/* Driver */}
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-bg-soft p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/15 font-mono text-[0.6875rem] font-medium text-brand-ink">
                MR
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.8125rem] font-medium text-ink-strong">
                  Marcus R.
                </p>
                <p className="truncate text-[0.6875rem] text-ink-muted">
                  Silver Toyota Sienna · 7RQV429
                </p>
              </div>
              <div className="flex items-center gap-1 text-ink-strong">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3 w-3 fill-current"
                  aria-hidden="true"
                >
                  <path d="m12 3.5 2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.8L12 3.5Z" />
                </svg>
                <span className="tabular text-[0.75rem] font-medium">4.9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Abstract street grid with the trip's route drawn over it. */
function MapArt() {
  return (
    <svg
      viewBox="0 0 330 188"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="map-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--bg-soft)" />
          <stop offset="100%" stopColor="var(--bg)" />
        </linearGradient>
      </defs>

      <rect width="330" height="188" fill="url(#map-fade)" />

      {/* Streets */}
      <g stroke="var(--line)" strokeWidth="1">
        <path d="M-10 42h350M-10 96h350M-10 150h350" />
        <path d="M46 -10v210M118 -10v210M196 -10v210M268 -10v210" />
      </g>
      <g stroke="var(--line)" strokeWidth="6" strokeOpacity="0.5">
        <path d="M-10 122h350" />
      </g>

      {/* Route */}
      <path
        d="M62 152c34 0 46-14 52-34 7-24 20-38 52-40 30-2 44-12 58-34"
        stroke="var(--brand)"
        strokeOpacity="0.25"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M62 152c34 0 46-14 52-34 7-24 20-38 52-40 30-2 44-12 58-34"
        stroke="var(--brand)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Endpoints */}
      <circle cx="62" cy="152" r="7" fill="var(--brand)" fillOpacity="0.22" />
      <circle cx="62" cy="152" r="3.5" fill="var(--brand)" />
      <g transform="translate(224 44)">
        <circle r="11" fill="var(--brand)" />
        <path
          d="M-5 1.2 5-3.4M-1.6-3.2 5-3.4l-.2 6.6"
          stroke="var(--brand-contrast)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
