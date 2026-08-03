import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/*
  A Route Handler rather than the `opengraph-image` file convention: that
  convention serves the PNG from an extensionless path, and GitHub Pages derives
  Content-Type from the extension alone, so it would ship as
  application/octet-stream and social scrapers would refuse it. Naming the
  segment `opengraph-image.png` emits `out/opengraph-image.png` instead.

  Because this is not the file convention, the og:image tags are declared
  explicitly in app/layout.tsx — `OG_IMAGE` below is the shared contract.
*/

export const OG_IMAGE = {
  path: "/opengraph-image.png",
  alt: `${site.name} — ${site.tagline}`,
  width: 1200,
  height: 630,
} as const;

// Required by `output: "export"`: the PNG is rendered once at build time.
export const dynamic = "force-static";

/*
  Satori cannot fetch over the network, so the app icon is inlined as a data
  URI. Read at build time from the same `public/` asset the site header uses —
  the card and the site therefore always show the same mark.
*/
const APP_ICON = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", "icon-192.png"),
).toString("base64")}`;

/*
  Satori resolves neither CSS variables nor Tailwind classes, so the brand
  palette is inlined here. Keep these in sync with the dark tokens in
  globals.css if the brand ever shifts.
*/
const BG = "#0e1012";
const INK = "#ebedf0";
const MUTED = "#aaafb6";
const BRAND = "#6c86e8";
const LINE = "#2a2d31";

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: BG,
        padding: 72,
        position: "relative",
      }}
    >
      {/* Brand glow */}
      <div
        style={{
          position: "absolute",
          top: -260,
          left: 300,
          width: 700,
          height: 560,
          display: "flex",
          background: `radial-gradient(circle, ${BRAND}55 0%, ${BG}00 65%)`,
        }}
      />

      {/* Wordmark */}
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <img
          src={APP_ICON}
          alt=""
          width={56}
          height={56}
          style={{ borderRadius: 13 }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 600,
            color: INK,
            letterSpacing: -0.8,
          }}
        >
          {site.name}
        </div>
      </div>

      {/* Headline */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 82,
            fontWeight: 700,
            color: INK,
            letterSpacing: -3.2,
            lineHeight: 1.05,
          }}
        >
          Airport rides you book
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 82,
            fontWeight: 700,
            color: BRAND,
            letterSpacing: -3.2,
            lineHeight: 1.05,
          }}
        >
          before you pack.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 28,
            color: MUTED,
            maxWidth: 860,
            lineHeight: 1.4,
          }}
        >
          Scheduled airport trips for SeaTac and Paine Field. Fixed pickup time,
          fare quoted upfront.
        </div>
      </div>

      {/* Footer rail */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          paddingTop: 28,
          borderTop: `1px solid ${LINE}`,
          fontSize: 22,
          color: MUTED,
        }}
      >
        <div style={{ display: "flex" }}>SEA</div>
        <div style={{ display: "flex", color: LINE }}>/</div>
        <div style={{ display: "flex" }}>PAE</div>
        <div style={{ display: "flex", color: LINE }}>/</div>
        <div style={{ display: "flex" }}>No surge pricing</div>
      </div>
    </div>,
    { width: OG_IMAGE.width, height: OG_IMAGE.height },
  );
}
