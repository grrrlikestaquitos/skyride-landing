import { fareExample, pricing, quoteFare, usd } from "@/lib/site";

const example = quoteFare(fareExample);

/** Time cost split into base and the traffic surcharge, so the receipt adds up. */
const baseTimeCost = fareExample.minutes * pricing.ratePerMinute;
const trafficSurcharge = example.timeCost - baseTimeCost;

const rules = [
  {
    label: "Distance rate",
    value: `${usd(pricing.ratePerMile)} / mi`,
    note: "Charged on the driven route, not a straight line.",
  },
  {
    label: "Time rate",
    value: `${usd(pricing.ratePerMinute)} / min`,
    note: "Estimated duration for your route at your pickup time.",
  },
  {
    label: "Traffic factor",
    value: `${pricing.minTrafficMultiplier.toFixed(1)}–${pricing.maxTrafficMultiplier.toFixed(1)}×`,
    note: "Applies to time only, and it's capped. There is no unbounded surge.",
  },
  {
    label: "Minimum fare",
    value: usd(pricing.minimumFare),
    note: "The floor for short runs.",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="shell py-20 lg:py-28">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Rules */}
        <div>
          <p className="eyebrow">
            <span className="h-px w-6 bg-line" />
            Pricing
          </p>
          <h2 className="mt-5 text-3xl leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[2.75rem]">
            The whole formula, in public.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Four numbers decide your fare, and none of them change after you
            book.
          </p>

          <dl className="mt-10 divide-y divide-line border-t border-line">
            {rules.map((rule) => (
              <div key={rule.label} className="py-5">
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="font-medium tracking-[-0.01em] text-ink-strong">
                    {rule.label}
                  </dt>
                  <dd className="tabular font-mono text-[0.9375rem] font-medium whitespace-nowrap text-brand-ink">
                    {rule.value}
                  </dd>
                </div>
                <p className="mt-1.5 max-w-md text-sm text-ink-muted">
                  {rule.note}
                </p>
              </div>
            ))}
          </dl>
        </div>

        {/* Worked example */}
        <div className="lg:pt-14">
          <figure className="card overflow-hidden">
            <figcaption className="flex items-center justify-between gap-4 border-b border-line px-7 py-5">
              <span className="eyebrow">Worked example</span>
              <span className="font-mono text-[0.6875rem] tracking-wide text-ink-faint">
                {fareExample.from} → {fareExample.to}
              </span>
            </figcaption>

            <div className="px-7 py-7">
              <ul className="space-y-4 font-mono text-[0.8125rem]">
                <LineItem
                  label={`${fareExample.miles} mi × ${usd(pricing.ratePerMile)}`}
                  value={usd(example.distanceCost)}
                />
                <LineItem
                  label={`${fareExample.minutes} min × ${usd(pricing.ratePerMinute)}`}
                  value={usd(baseTimeCost)}
                />
                <LineItem
                  label={`Traffic ×${example.traffic.toFixed(1)}`}
                  value={`+ ${usd(trafficSurcharge)}`}
                  muted
                />
              </ul>

              <div className="mt-7 flex items-end justify-between border-t border-line pt-6">
                <div>
                  <p className="font-mono text-[0.625rem] tracking-[0.12em] text-ink-faint uppercase">
                    Total, quoted at booking
                  </p>
                  <p className="tabular mt-1.5 text-[2.5rem] leading-none font-semibold tracking-[-0.03em] text-ink-strong">
                    {usd(example.total)}
                  </p>
                </div>
                <span className="rounded-full border border-success/30 bg-success/12 px-3 py-1 font-mono text-[0.625rem] tracking-wide text-success">
                  LOCKED
                </span>
              </div>
            </div>

            <p className="border-t border-line bg-bg-soft px-7 py-4 text-[0.8125rem] text-ink-muted">
              Illustrative route. Your quote comes from your actual route when
              you schedule.
            </p>
          </figure>
        </div>
      </div>
    </section>
  );
}

function LineItem({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <li className="flex items-baseline justify-between gap-4">
      <span className={muted ? "text-ink-faint" : "text-ink-muted"}>
        {label}
      </span>
      <span
        aria-hidden="true"
        className="mx-1 h-px min-w-6 flex-1 self-center bg-line"
      />
      <span
        className={`tabular ${muted ? "text-ink-muted" : "font-medium text-ink-strong"}`}
      >
        {value}
      </span>
    </li>
  );
}
