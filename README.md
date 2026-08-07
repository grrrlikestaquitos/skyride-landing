# Sky Ride — landing page

Marketing site for Sky Ride, a scheduled-in-advance airport ride service for the
Puget Sound (SeaTac and Paine Field).

Built with Next.js 16 (App Router) and Tailwind CSS v4, published as a fully
static export to GitHub Pages at **https://www.skyride.app**.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build   # static export into out/
```

To preview exactly what gets deployed, serve the export rather than using
`next start` (which this site does not use):

```bash
npm run build && npx serve out
```

## How it's put together

**`src/lib/site.ts` is the single source of truth for copy and product facts.**
The served airports, feature lists and nav links all live there.

**This site publishes no rates, and that is deliberate — please don't add them
back.** It used to: the pricing section printed the per-mile and per-minute
rates, the capped traffic band, the minimum fare and a worked receipt, mirrored
from the iOS app's `TripPricing.swift`. That mirror is gone in both directions.
`TripPricing.swift` was deleted — the app now fetches pricing config from the
server and holds no formula, because a client must never be positioned to derive
what a driver is owed. And a fare rate is no longer one number: rates are
effective-dated rows in `fare-rate-cards`, resolved per jurisdiction from the
pickup, so Seattle's card is not Washington's card is not the national baseline.

The published figures had already gone wrong. They were the national card, which
is the one no Puget Sound rider is ever priced against, and the worked example —
Capitol Hill → SEA, priced at $38.10 under a `LOCKED` badge — really costs about
$53 on Seattle's card before its 10.55% tax. The Terms had the same problem from
the other side, citing a 20% platform fee copied from a server *fallback*
constant while the rule in force was 10%, overstating what SkyRide keeps from a
driver's fare.

So the rule is: **describe the mechanism, quote no rate.** `pricingPoints` in
`site.ts` carries the mechanism, the app quotes the price, and neither can go
stale. The same applies to the Terms — see the header comment in
`src/app/terms/page.tsx`.

**Design tokens mirror the iOS app.** The palette in `src/app/globals.css` is
lifted from the app's `Colors.xcassets` so both surfaces render the same brand
in light and dark. Two values are deliberately adjusted for the web, and are
commented as such: the app's secondary text colour only reaches 2.96:1 on the
light background and the raw brand blue reaches 4.38:1, both short of WCAG AA
for body text.

Theme is driven by a `data-theme` attribute on `<html>`, set by a small
render-blocking script in `src/app/layout.tsx` so the page never flashes the
wrong palette. `prefers-color-scheme` is the no-JS fallback.

**The legal pages are load-bearing for the app, not just for SEO.** `/privacy`
and `/terms` are the destinations the iOS app links to from its sign-in screen
and its Settings screen (`SkyRide/Constants/LegalLinks.swift`), and App Review
follows both. The deploy workflow asserts `privacy.html` and `terms.html` exist
in the export for that reason — a build that dropped them would ship a dead link
inside the app.

Their prose lives in the page files; `src/lib/legal.ts` holds only what a change
of entity or contact address would touch. Sections are declared as one array of
`{ id, title, body }` and rendered by `LegalDocument`, so the table of contents
cannot drift out of sync with the document. Because both pages render the shared
header and footer, those take an `anchorBase` prop — the nav points at sections
of the landing page, which do not exist here, so on a subpage the hashes are
prefixed with `/`.

**No scroll-triggered reveal animations.** They were tried and removed: they
leave everything below the fold at `opacity: 0` until the scroll timeline
advances, which breaks deep links, find-in-page and printing.

## Static export constraints

`next.config.ts` sets `output: "export"`, because GitHub Pages serves static
files with no Node runtime. That rules out Route Handlers that read the request,
Server Actions, redirects/rewrites/headers, ISR, and dynamic routes without
`generateStaticParams`. Metadata routes (`robots.ts`, `sitemap.ts`, the OG
image) each need `export const dynamic = "force-static"`.

The Open Graph image is a Route Handler at `src/app/opengraph-image.png/route.tsx`
rather than Next's `opengraph-image` file convention. The convention serves the
PNG from an extensionless path, and GitHub Pages derives `Content-Type` from the
file extension alone — it would ship as `application/octet-stream` and social
scrapers would reject it.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which lints, builds,
verifies the expected artifacts exist, and publishes `out/` to GitHub Pages.

The custom domain is pinned by `public/CNAME`. `public/.nojekyll` keeps Pages
from treating the `_next/` directory as a Jekyll internal. Changing the domain
means updating `SITE_URL` in `src/lib/site.ts` as well — it drives the canonical
URL, Open Graph tags, `sitemap.xml` and `robots.txt`.
