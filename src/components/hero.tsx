import { BetaLink } from "@/components/beta-link";
import { PhoneMock } from "@/components/phone";
import { heroStats } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Decorative backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-glow absolute inset-x-0 top-0 h-[560px]" />
        <div className="grid-backdrop absolute inset-x-0 top-0 h-[560px]" />
      </div>

      <div className="shell relative pt-16 pb-16 lg:pt-24 lg:pb-24">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
          {/* Copy */}
          <div className="rise max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 py-1.5 pr-3.5 pl-2 backdrop-blur">
              <span className="rounded-full bg-brand/12 px-2 py-0.5 font-mono text-[0.625rem] tracking-[0.1em] text-brand-ink uppercase">
                Beta open
              </span>
              <span className="text-[0.8125rem] text-ink-muted">
                SEA &amp; Paine Field
              </span>
            </p>

            <h1 className="mt-6 text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.035em] text-ink-strong sm:text-6xl sm:leading-[1.03] lg:text-[4.25rem]">
              Airport rides you
              {/* Breaks are art-directed from `sm` up; below that the line
                  lengths are too tight and the text is left to balance. */}
              <br className="hidden sm:block" /> book before{" "}
              <br className="hidden sm:block" />
              <span className="text-brand">you pack.</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              Set your pickup when you book the flight, see the fare before you
              agree to it, and let a verified driver take it from there.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <BetaLink className="btn btn-primary">
                Join the iOS beta
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M4 10h11M11 6l4 4-4 4" />
                </svg>
              </BetaLink>
              <a href="#drivers" className="btn btn-ghost">
                Drive with us
              </a>
            </div>

            {/* The full TestFlight requirements live in the join section; the
                hero only needs the two facts that gate a decision here. */}
            <p className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[0.6875rem] tracking-[0.06em] text-ink-faint uppercase">
              <span>iPhone only</span>
              <span aria-hidden="true">·</span>
              <span>No surge pricing</span>
            </p>
          </div>

          {/* Device */}
          <div className="rise [animation-delay:120ms] lg:pl-4">
            <PhoneMock />
          </div>
        </div>

        {/* Stat strip */}
        <dl className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-3">
          {heroStats.map((stat) => (
            <div key={stat.label} className="bg-card px-6 py-7">
              <dt className="font-mono text-[0.6875rem] tracking-[0.1em] text-ink-faint uppercase">
                {stat.label}
              </dt>
              <dd className="tabular mt-2 text-3xl font-semibold tracking-[-0.03em] text-ink-strong">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
