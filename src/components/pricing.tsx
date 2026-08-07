import { SectionHeading } from "@/components/sections";
import { noCharges, pricingPoints } from "@/lib/site";

/**
 * Pricing without rates.
 *
 * This section used to print the fare formula and a worked receipt. It doesn't
 * any more, and `src/lib/site.ts` explains why at `pricingPoints`: the rates are
 * per-city server data, so a number here is a snapshot of one market that goes
 * stale without anyone noticing. What's left is the part that's true in every
 * market — you see the whole price before you agree to it.
 */
export function Pricing() {
  return (
    <section id="pricing" className="shell py-20 lg:py-28">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        {/* What decides the price */}
        <div>
          <SectionHeading
            eyebrow="Pricing"
            title="One price, settled before you book."
            body="Your fare is worked out from your own route and shown in full while you can still walk away. After that it's fixed."
          />

          <dl className="mt-10 divide-y divide-line border-t border-line">
            {pricingPoints.map((point) => (
              <div key={point.title} className="py-5">
                <dt className="font-medium tracking-[-0.01em] text-ink-strong">
                  {point.title}
                </dt>
                <dd className="mt-1.5 max-w-md text-sm text-ink-muted">
                  {point.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The absences — everything a rider braces for and won't be charged */}
        <div className="lg:pt-14">
          <figure className="card overflow-hidden">
            <figcaption className="flex items-center justify-between gap-4 border-b border-line px-7 py-5">
              <span className="eyebrow">What we don&rsquo;t charge</span>
              <span className="font-mono text-[0.6875rem] tracking-wide text-ink-faint">
                Every trip
              </span>
            </figcaption>

            <div className="px-7 py-7">
              <ul className="space-y-4 font-mono text-[0.8125rem]">
                {noCharges.map((charge) => (
                  <LineItem key={charge} label={charge} />
                ))}
              </ul>

              <div className="mt-7 flex items-end justify-between gap-4 border-t border-line pt-6">
                <div>
                  <p className="font-mono text-[0.625rem] tracking-[0.12em] text-ink-faint uppercase">
                    Quoted at booking
                  </p>
                  <p className="mt-1.5 text-[1.375rem] leading-tight font-semibold tracking-[-0.02em] text-ink-strong">
                    The fare and the tax.
                    <br />
                    Nothing after that.
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-success/30 bg-success/12 px-3 py-1 font-mono text-[0.625rem] tracking-wide text-success">
                  LOCKED
                </span>
              </div>
            </div>

            <p className="border-t border-line bg-bg-soft px-7 py-4 text-[0.8125rem] text-ink-muted">
              Editing a trip re-prices it, and the app shows you the new total
              before you save. A claimed trip is fixed.
            </p>
          </figure>
        </div>
      </div>
    </section>
  );
}

/**
 * A row whose value is an absence. The dash carries the meaning visually, so it
 * is hidden from assistive tech and the label does the work instead — "Surge
 * multiplier —" read aloud is a sentence fragment, not a statement.
 */
function LineItem({ label }: { label: string }) {
  return (
    <li className="flex items-baseline justify-between gap-4">
      <span className="text-ink-muted">{label}</span>
      <span
        aria-hidden="true"
        className="mx-1 h-px min-w-6 flex-1 self-center bg-line"
      />
      <span className="text-ink-faint" aria-hidden="true">
        &mdash;
      </span>
      <span className="sr-only">not charged</span>
    </li>
  );
}
