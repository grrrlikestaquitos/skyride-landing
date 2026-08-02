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
  name: "SkyRide",
  url: SITE_URL,
  region: "Puget Sound",
  tagline: "Airport rides you book before you pack.",
  description:
    "SkyRide is scheduled-in-advance airport ground transport for the Puget Sound. Lock in your pickup time and your fare days ahead, then watch your driver come to the curb.",
  shortDescription:
    "Scheduled airport rides for SeaTac and Paine Field. Fixed pickup time, fare quoted upfront.",
} as const;

export const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#riders", label: "Riders" },
  { href: "#drivers", label: "Drivers" },
  { href: "#pricing", label: "Pricing" },
  { href: "#coverage", label: "Coverage" },
] as const;

/** Swap for a real App Store URL / waitlist form when they exist. */
export const links = {
  waitlist: "#waitlist",
  driverWaitlist: "#waitlist",
  appStore: null as string | null,
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
    title: "Set the flight, not the moment",
    body: "Pick your airport, your address and the pickup window. Schedule it the day you book the flight — SkyRide only does planned trips, so there is nothing to refresh at 4am.",
  },
  {
    step: "02",
    title: "See the fare before you commit",
    body: "The route is priced on the server the instant you schedule. Distance, time and a capped traffic factor — the number you agree to is the number you pay.",
  },
  {
    step: "03",
    title: "A driver claims it, then arrives",
    body: "Your trip enters the open pool and a verified driver claims it. You get the driver, the vehicle and live tracking as the pickup window opens.",
  },
] as const;

export const driverSteps = [
  {
    step: "01",
    title: "Get verified once",
    body: "Licence, vehicle and safety checks live in the app. Clear them once and the airport pool opens up.",
  },
  {
    step: "02",
    title: "Browse the open pool",
    body: "Every unclaimed airport trip, with distance, duration and payout shown before you commit. No blind pings, no accept-in-8-seconds roulette.",
  },
  {
    step: "03",
    title: "Claim what fits your day",
    body: "Claims are atomic — one tap, one driver, no double-booking. Build tomorrow around the trips you actually want.",
  },
] as const;

export const riderFeatures = [
  {
    title: "Scheduled, not summoned",
    body: "Every trip is booked ahead against a pickup window, so your ride is arranged long before the airport run starts.",
    icon: "calendar",
  },
  {
    title: "Fare quoted upfront",
    body: "Pricing is computed server-side from the route. No post-trip recalculation, no surge multiplier appearing at checkout.",
    icon: "tag",
  },
  {
    title: "Live driver tracking",
    body: "Once a driver claims your trip you can follow the approach on the map, with status moving from assigned to in progress to completed.",
    icon: "map",
  },
  {
    title: "Seats and child seats",
    body: "Declare passengers and child seats when you book, so the driver who claims the trip arrives with the right vehicle.",
    icon: "passengers",
  },
  {
    title: "Edit while it is still yours",
    body: "Change timing or details up to the point the booking locks. The app is explicit about what can still move and what cannot.",
    icon: "edit",
  },
  {
    title: "Rate every trip",
    body: "Trip history and driver ratings stay in the app, so repeat airport runs get better instead of starting from zero.",
    icon: "star",
  },
] as const;

export const driverFeatures = [
  {
    title: "Open ride pool",
    body: "No dispatcher deciding for you. Scheduled airport trips sit in a shared pool and you take the ones that fit.",
    icon: "pool",
  },
  {
    title: "Atomic claims",
    body: "The claim either succeeds or it does not. Two drivers can never end up assigned to the same trip.",
    icon: "lock",
  },
  {
    title: "Payout before you accept",
    body: "Distance, duration and fare are on the card. You decide with the full picture rather than after arrival.",
    icon: "wallet",
  },
  {
    title: "Plan a week ahead",
    body: "Because every trip is scheduled, you can fill Thursday on Monday instead of waiting for demand to appear.",
    icon: "clock",
  },
] as const;

export const tripLifecycle = [
  { state: "Scheduled", note: "Booked and priced" },
  { state: "Assigned", note: "Driver claimed it" },
  { state: "In progress", note: "On the way" },
  { state: "Completed", note: "Rated and filed" },
] as const;

export const stack = [
  { name: "SwiftUI", role: "Native iOS client" },
  { name: "Node · TypeScript", role: "Express API" },
  { name: "PostgreSQL", role: "Trips and identity" },
  { name: "Knex", role: "Migrations and queries" },
  { name: "MapKit", role: "Routing and tracking" },
  { name: "Sign in with Apple", role: "Verified auth" },
] as const;
