import type { MetadataRoute } from "next";
import { SITE_URL, legalLinks } from "@/lib/site";

// Required by `output: "export"` — `new Date()` below would otherwise make the
// route request-time. Here it resolves to the build timestamp, which is what
// `lastModified` should mean for a statically published site anyway.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    // Legal pages: crawlable and canonical, but they are not what anyone is
    // searching for, so they sit well below the landing page.
    ...legalLinks.map((link) => ({
      url: `${SITE_URL}${link.href}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
    // Listed here rather than added to `legalLinks`, which drives the footer's
    // legal nav: this is an instruction page, not a term, and that nav's own
    // comment is specifically about the two documents App Review looks for.
    // It is reached by direct link from the Wallet app — see the note at the
    // top of its page.tsx — so crawlable is all it needs to be.
    {
      url: `${SITE_URL}/payments`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];
}
