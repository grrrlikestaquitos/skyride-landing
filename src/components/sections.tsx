import { BetaLink } from "@/components/beta-link";
import { Icon, type IconName } from "@/components/icons";
import {
  airports,
  driverFeatures,
  driverSteps,
  riderFeatures,
  riderSteps,
  tripLifecycle,
} from "@/lib/site";

/* -------------------------------------------------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  body,
  tone = "default",
}: {
  eyebrow: string;
  title: React.ReactNode;
  body?: string;
  tone?: "default" | "invert";
}) {
  return (
    <div className="max-w-2xl">
      <p className={`eyebrow ${tone === "invert" ? "!text-white/55" : ""}`}>
        <span
          className={`h-px w-6 ${tone === "invert" ? "bg-white/25" : "bg-line"}`}
        />
        {eyebrow}
      </p>
      <h2
        className={`mt-5 text-3xl leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[2.75rem] ${
          tone === "invert" ? "!text-white" : ""
        }`}
      >
        {title}
      </h2>
      {body && (
        <p
          className={`mt-5 text-lg leading-relaxed ${
            tone === "invert" ? "text-white/65" : "text-ink-muted"
          }`}
        >
          {body}
        </p>
      )}
    </div>
  );
}

function StepList({
  steps,
  tone = "default",
}: {
  steps: readonly { step: string; title: string; body: string }[];
  tone?: "default" | "invert";
}) {
  const invert = tone === "invert";
  return (
    <ol className="space-y-8">
      {steps.map((item) => (
        <li key={item.step} className="flex gap-5">
          <span
            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border font-mono text-[0.6875rem] ${
              invert
                ? "border-white/15 bg-white/8 text-white/70"
                : "border-line bg-card text-ink-muted"
            }`}
          >
            {item.step}
          </span>
          <div>
            <h3
              className={`text-[1.0625rem] font-semibold tracking-[-0.015em] ${
                invert ? "!text-white" : ""
              }`}
            >
              {item.title}
            </h3>
            <p
              className={`mt-2 leading-relaxed ${
                invert ? "text-white/60" : "text-ink-muted"
              }`}
            >
              {item.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* -------------------------------------------------------------------------- */

export function HowItWorks() {
  return (
    <section id="how-it-works" className="shell py-20 lg:py-28">
      <SectionHeading
        eyebrow="How it works"
        title="Planned trips, not a scramble for a car."
        body="Riders schedule ahead. Drivers claim from a shared pool. Nothing is left to whoever happens to be nearby at 4am."
      />

      <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <h3 className="eyebrow mb-8">For riders</h3>
          <StepList steps={riderSteps} />
        </div>
        <div className="lg:border-l lg:border-line lg:pl-20">
          <h3 className="eyebrow mb-8">For drivers</h3>
          <StepList steps={driverSteps} />
        </div>
      </div>

      {/* Trip lifecycle */}
      <div className="mt-20 overflow-hidden rounded-panel border border-line bg-card">
        <div className="border-b border-line px-6 py-4 sm:px-8">
          <p className="eyebrow">Every trip, one path</p>
        </div>
        <ol className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
          {tripLifecycle.map((phase, index) => (
            <li key={phase.state} className="bg-card px-6 py-6 sm:px-8">
              <span className="font-mono text-[0.6875rem] text-ink-faint tabular">
                0{index + 1}
              </span>
              <p className="mt-2 font-semibold tracking-[-0.01em] text-ink-strong">
                {phase.state}
              </p>
              <p className="mt-1 text-sm text-ink-muted">{phase.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function Riders() {
  return (
    <section
      id="riders"
      className="border-y border-line bg-bg-soft py-20 lg:py-28"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="For riders"
          title="Know the time. Know the price. Then stop thinking about it."
          body="The trip you book on Sunday is the trip that shows up on Thursday."
        />

        <ul className="mt-16 grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {riderFeatures.map((feature) => (
            <li key={feature.title} className="group bg-card p-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand-ink transition-colors group-hover:bg-brand/16">
                <Icon name={feature.icon as IconName} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-[1.0625rem] font-semibold tracking-[-0.015em]">
                {feature.title}
              </h3>
              <p className="mt-2.5 leading-relaxed text-ink-muted">
                {feature.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Deliberately dark in both themes — a contrast band that separates the rider
 * story from the driver story.
 */
export function Drivers() {
  return (
    <section id="drivers" className="shell py-20 lg:py-28">
      <div className="relative overflow-hidden rounded-panel bg-[#101216] px-6 py-16 sm:px-12 lg:px-16 lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 85% 0%, color-mix(in oklab, #6c86e8 26%, transparent), transparent 70%)",
          }}
        />

        <div className="relative grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              tone="invert"
              eyebrow="For drivers"
              title="An open pool, not a dispatcher."
              body="Every airport trip shows its distance, duration, payout and what it pays per hour. Take the ones that fit your day."
            />
            <BetaLink className="btn mt-9 inline-flex bg-white text-[#101216] hover:bg-white/90">
              Join the beta to drive
            </BetaLink>
          </div>

          <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {driverFeatures.map((feature) => (
              <li key={feature.title}>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 bg-white/8 text-white/80">
                  <Icon
                    name={feature.icon as IconName}
                    className="h-[18px] w-[18px]"
                  />
                </span>
                <h3 className="mt-4 font-semibold tracking-[-0.01em] !text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {feature.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function Coverage() {
  return (
    <section
      id="coverage"
      className="border-y border-line bg-bg-soft py-20 lg:py-28"
    >
      <div className="shell">
        <SectionHeading
          eyebrow="Coverage"
          title="Two airports, done properly."
          body="Narrow on purpose. An airport run is its own problem, and we'd rather solve it well."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {airports.map((airport) => (
            <article key={airport.code} className="card p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-3xl font-semibold tracking-[-0.02em] text-brand-ink">
                    {airport.code}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold tracking-[-0.015em]">
                    {airport.name}
                  </h3>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand-ink">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M10.5 19.5 12 21l1.5-1.5V15l7-3.5V9.5L13.5 12V6.5L15.5 5V3L12 4.5 8.5 3v2l2 1.5V12L3.5 9.5v2L10.5 15v4.5Z" />
                  </svg>
                </span>
              </div>
              <p className="mt-5 text-sm text-ink-muted">{airport.address}</p>
              <p className="mt-4 border-t border-line pt-4 text-sm text-ink">
                {airport.note}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

