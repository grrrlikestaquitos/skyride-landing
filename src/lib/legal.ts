/**
 * Operator facts for the Privacy Policy and Terms of Service.
 *
 * The prose of both documents lives in `src/app/privacy/page.tsx` and
 * `src/app/terms/page.tsx`. What lives here is everything a lawyer or a change
 * of entity would touch: the company, the addresses readers are told to write
 * to, and the date the documents took effect. Keeping them in one const means
 * changing the contact address is one edit, not a search across two long pages.
 *
 * Product facts the documents cite are NOT duplicated here — and the fare rates
 * and the platform's take are no longer cited at all. Both are effective-dated,
 * per-jurisdiction rows on the server (`fare-rate-cards`, `platform-take-rules`),
 * so any figure written into a legal document is true for one market until
 * someone opens another one. This file used to carry a 20% take rate mirrored
 * from a server *fallback* constant while the rule actually in force was 10%,
 * which is the failure mode: a number copied here goes stale silently, and the
 * Terms overstated what SkyRide keeps from a driver's fare. The documents now
 * describe how rates are set and point at the app for what they are.
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
  effective: "August 6, 2026",
} as const;
