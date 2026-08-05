/**
 * Single source of truth for site copy, links, and product facts.
 *
 * Product numbers below mirror the iOS app so the marketing page can't drift
 * from the product: pricing comes from `SkyRide/Reusable/TripPricing/TripPricing.swift`
 * and the served airports come from `SkyRide/Constants/AppLocations.swift`.
 */

// Drives canonical URLs, OG image resolution, sitemap.xml and robots.txt.
// Keep the `www.` host — it must match whichever hostname actually serves the
// site, or canonical tags will point somewhere the crawler was redirected from.
export const SITE_URL = "https://www.skyride.app";

export const site = {
  // Two words, matching the App Store / TestFlight listing ("Sky Ride —
  // Airport Ride Share"). The domain and the localStorage theme key stay
  // one-word; only the human-readable name is spaced.
  name: "Sky Ride",
  url: SITE_URL,
  region: "Puget Sound",
  tagline: "Airport rides you book before you pack.",
  description:
    "Scheduled airport rides across the Puget Sound. Lock in your pickup time and your fare days ahead, then watch your driver come to the curb.",
  shortDescription:
    "Scheduled airport rides for SeaTac and Paine Field. Fare quoted upfront, no surge.",
} as const;

export const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#riders", label: "Riders" },
  { href: "#drivers", label: "Drivers" },
  { href: "#pricing", label: "Pricing" },
  { href: "#coverage", label: "Coverage" },
] as const;

/**
 * Standalone pages, as opposed to the in-page anchors above. These are real
 * routes, so they resolve from anywhere — including from the iOS app, which
 * hard-links to both from its sign-in screen and its Settings screen.
 * `SkyRide/Constants/LegalLinks.swift` holds the app's copy of these URLs.
 */
export const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;

export const links = {
  /**
   * The public TestFlight group for the iOS beta. Every "join the beta" CTA on
   * the page points here — riders and drivers alike, because driver
   * verification happens inside the same build.
   */
  testFlight: "https://testflight.apple.com/join/5Y8t8qQU",
  /** Apple's TestFlight client, which testers need before the invite resolves. */
  testFlightApp: "https://apps.apple.com/us/app/testflight/id899247664",
  /** In-page anchor for the join section. */
  beta: "#beta",
  /** Swap for a real App Store URL once the app ships publicly. */
  appStore: null as string | null,
} as const;

export const beta = {
  /** Shown under the join buttons — what a tester needs before tapping. */
  requirements: "iPhone · TestFlight · Puget Sound",
  steps: [
    {
      step: "01",
      title: "Install TestFlight",
      body: "Apple's free beta app, from the App Store.",
    },
    {
      step: "02",
      title: "Open the invite",
      body: "Tap the join link from your iPhone and accept.",
    },
    {
      step: "03",
      title: "Book your first ride",
      body: "Sign in and schedule an airport run.",
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// Pricing — mirrors TripPricing.swift
// ---------------------------------------------------------------------------

export const pricing = {
  ratePerMile: 1.77,
  ratePerMinute: 0.35,
  minTrafficMultiplier: 1.0,
  maxTrafficMultiplier: 1.2,
  minimumFare: 8.0,
} as const;

/** A worked example so the fare math is legible, not just asserted. */
export const fareExample = {
  from: "Capitol Hill",
  to: "SEA",
  miles: 15,
  minutes: 30,
  traffic: 1.1,
} as const;

export function quoteFare({
  miles,
  minutes,
  traffic,
}: {
  miles: number;
  minutes: number;
  traffic: number;
}) {
  const clamped = Math.min(
    Math.max(traffic, pricing.minTrafficMultiplier),
    pricing.maxTrafficMultiplier,
  );
  const distanceCost = miles * pricing.ratePerMile;
  const timeCost = minutes * pricing.ratePerMinute * clamped;
  const total = Math.max(distanceCost + timeCost, pricing.minimumFare);
  return { distanceCost, timeCost, total, traffic: clamped };
}

export const usd = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

// ---------------------------------------------------------------------------
// Coverage — mirrors AppLocations.swift
// ---------------------------------------------------------------------------

export const airports = [
  {
    code: "SEA",
    name: "Seattle–Tacoma International",
    address: "17801 International Blvd, SeaTac, WA 98158",
    note: "All terminals, arrivals and departures.",
  },
  {
    code: "PAE",
    name: "Paine Field",
    address: "3220 100th St SW, Everett, WA 98204",
    note: "North-end pickups without the SEA drive.",
  },
] as const;

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

export const heroStats = [
  { value: "2", label: "Airports served" },
  { value: usd(pricing.minimumFare), label: "Minimum fare" },
  { value: "1.0–1.2×", label: "Traffic ceiling" },
  { value: "0", label: "Surge surprises" },
] as const;

export const riderSteps = [
  {
    step: "01",
    title: "Schedule it",
    body: "Pick your airport, your address and a pickup window — days ahead, not minutes before.",
  },
  {
    step: "02",
    title: "See the fare",
    body: "The full price appears before you confirm, and it doesn't move afterwards.",
  },
  {
    step: "03",
    title: "Meet your driver",
    body: "A verified driver claims the trip. Track them to the curb when the window opens.",
  },
] as const;

export const driverSteps = [
  {
    step: "01",
    title: "Get verified",
    body: "Licence, vehicle and safety checks, all in the app. Clear them once.",
  },
  {
    step: "02",
    title: "Browse the pool",
    body: "Every open airport trip, with distance, duration and payout shown upfront.",
  },
  {
    step: "03",
    title: "Claim what fits",
    body: "One tap and the run is yours. Build your week around the trips you want.",
  },
] as const;

export const riderFeatures = [
  {
    title: "Scheduled, not summoned",
    body: "Book your pickup window days ahead. Nothing to refresh at 4am.",
    icon: "calendar",
  },
  {
    title: "Fare quoted upfront",
    body: "You see the price before you confirm. No surge, no recalculation.",
    icon: "tag",
  },
  {
    title: "Live driver tracking",
    body: "Follow your driver to the curb once the trip is claimed.",
    icon: "map",
  },
  {
    title: "Seats and child seats",
    body: "Say who's riding when you book, and the right vehicle shows up.",
    icon: "passengers",
  },
  {
    title: "Plans can move",
    body: "Edit timing and details right up until the booking locks.",
    icon: "edit",
  },
  {
    title: "Rate every trip",
    body: "Your history and your drivers carry over, run after run.",
    icon: "star",
  },
] as const;

export const driverFeatures = [
  {
    title: "Open ride pool",
    body: "Scheduled airport trips in one shared list. No dispatcher deciding for you.",
    icon: "pool",
  },
  {
    title: "No double bookings",
    body: "One tap, one driver. A trip you claim stays yours.",
    icon: "lock",
  },
  {
    title: "Payout before you accept",
    body: "Distance, duration and fare on the card, before you commit.",
    icon: "wallet",
  },
  {
    title: "Plan a week ahead",
    body: "Every trip is scheduled, so you can fill Thursday on Monday.",
    icon: "clock",
  },
] as const;

export const tripLifecycle = [
  { state: "Scheduled", note: "Booked and priced" },
  { state: "Assigned", note: "Driver claimed it" },
  { state: "In progress", note: "On the way" },
  { state: "Completed", note: "Rated and filed" },
] as const;
