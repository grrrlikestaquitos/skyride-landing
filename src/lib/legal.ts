/**
 * Operator facts for the Privacy Policy and Terms of Service.
 *
 * The prose of both documents lives in `src/app/privacy/page.tsx` and
 * `src/app/terms/page.tsx`. What lives here is everything a lawyer or a change
 * of entity would touch: the company, the addresses readers are told to write
 * to, and the date the documents took effect. Keeping them in one const means
 * changing the contact address is one edit, not a search across two long pages.
 *
 * Product facts the documents cite — the fare rates, the minimum fare, the
 * traffic ceiling, the airports — are NOT duplicated here. They come from
 * `site.ts`, which already mirrors `TripPricing.swift`, so the Terms cannot
 * quote a fare the app does not charge.
 */

export const legal = {
  entity: "Sky Ride LLC",
  entityLong: "Sky Ride LLC, a Delaware limited liability company",
  /** Governing law and arbitration seat for the Terms. */
  jurisdiction: "Delaware",
  privacyEmail: "privacy@skyride.app",
  legalEmail: "legal@skyride.app",
  /**
   * Both documents took effect together and are versioned together — revise
   * this date whenever either one changes materially, and say what changed in
   * the "Changes" section.
   */
  effective: "August 5, 2026",
  /**
   * The platform's cut of the fare, in basis points, mirroring the server's
   * `DEFAULT_TAKE_RATE_BASIS_POINTS` in `src/util/revenue-split.ts`.
   */
  takeRateBasisPoints: 2000,
} as const;

export const takeRatePercent = `${legal.takeRateBasisPoints / 100}%`;
