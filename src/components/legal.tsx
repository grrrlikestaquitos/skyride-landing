import type { ReactNode } from "react";
import { SiteFooter } from "@/components/cta";
import { SiteHeader } from "@/components/site-header";
import { legal } from "@/lib/legal";

/**
 * One numbered section of a legal document.
 *
 * Title and body travel together in a single array rather than being declared
 * once for the table of contents and again for the prose. Two lists would let
 * an added section quietly go missing from the contents, or an `id` drift out
 * of sync with its anchor — the classic way a long document rots.
 */
export type LegalSection = {
  /** Anchor target. Also the deep link, so keep these stable across revisions. */
  id: string;
  title: string;
  body: ReactNode;
};

export function LegalDocument({
  title,
  lead,
  summary,
  sections,
}: {
  title: string;
  lead: string;
  /** Optional plain-language précis, shown above the contents. */
  summary?: ReactNode;
  sections: readonly LegalSection[];
}) {
  return (
    <>
      {/* anchorBase="/" because the header and footer nav point at sections of
          the landing page, which do not exist in this document. */}
      <SiteHeader anchorBase="/" />

      <main id="main">
        <article className="shell py-16 lg:py-24">
          <header className="max-w-2xl">
            <p className="eyebrow">
              <span className="h-px w-6 bg-line" aria-hidden="true" />
              Legal
            </p>
            <h1 className="mt-5 text-4xl leading-[1.08] font-semibold tracking-[-0.035em] sm:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">{lead}</p>
            <p className="mt-7 font-mono text-[0.6875rem] tracking-[0.06em] text-ink-faint uppercase">
              Effective {legal.effective} · {legal.entity}
            </p>
          </header>

          {summary && (
            <aside className="card mt-14 max-w-2xl p-6 sm:p-8">
              <h2 className="eyebrow">In short</h2>
              <div className="legal mt-4">{summary}</div>
              <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink-faint">
                This summary is for orientation only. The numbered sections
                below are the terms that actually apply.
              </p>
            </aside>
          )}

          <nav aria-label="Contents" className="mt-14 max-w-2xl">
            <h2 className="eyebrow">Contents</h2>
            <ol className="mt-4 grid gap-x-10 gap-y-2 sm:grid-cols-2">
              {sections.map((section, index) => (
                <li key={section.id} className="flex gap-3">
                  <span className="font-mono text-[0.75rem] leading-6 text-ink-faint tabular">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#${section.id}`}
                    className="text-sm leading-6 text-ink-muted transition-colors hover:text-ink-strong"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="legal mt-16 max-w-2xl">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id}>
                <h2>
                  <span className="mr-2 font-mono text-[0.8125rem] text-ink-faint tabular">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>
                {section.body}
              </section>
            ))}
          </div>
        </article>
      </main>

      <SiteFooter anchorBase="/" />
    </>
  );
}

/** A `mailto:` for one of the addresses in `legal`, rendered as itself. */
export function Mail({ address }: { address: string }) {
  return <a href={`mailto:${address}`}>{address}</a>;
}
