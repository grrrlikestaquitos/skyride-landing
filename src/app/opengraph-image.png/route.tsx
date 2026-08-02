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
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(135deg, ${BRAND} 0%, #b6a3d4 100%)`,
          }}
        >
          <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
            <path
              d="M7.5 21.5c4.4 0 8.2-1.6 11-4.4 2.8-2.8 4.3-6.2 4.4-10.1"
              stroke={BG}
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <circle cx="7.5" cy="21.5" r="2.8" fill={BG} />
            <path
              d="M18.6 7h4.5v4.5"
              stroke={BG}
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
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
