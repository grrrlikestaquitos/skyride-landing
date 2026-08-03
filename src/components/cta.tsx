import { BetaLink } from "@/components/beta-link";
import { Logo } from "@/components/logo";
import { beta, links, navLinks, site } from "@/lib/site";

/**
 * The join section. Distribution is TestFlight, which is an unfamiliar flow for
 * most people, so the steps are spelled out rather than left behind the button.
 */
export function JoinBeta() {
  return (
    <section id="beta" className="shell pb-20 lg:pb-28">
      <div className="relative overflow-hidden rounded-panel border border-line bg-card px-6 py-16 sm:px-12 lg:py-20">
        <div
          aria-hidden="true"
          className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-64"
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[2.75rem]">
            The {site.region} beta
            <br className="hidden sm:block" /> is open.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
            SkyRide installs through TestFlight, Apple&apos;s beta app. Riders
            and drivers use the same download.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <BetaLink className="btn btn-primary">
              Join the TestFlight beta
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M4 10h11M11 6l4 4-4 4" />
              </svg>
            </BetaLink>
            <a
              href={links.testFlightApp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Get TestFlight first
            </a>
          </div>
          <p className="mt-6 font-mono text-[0.6875rem] tracking-[0.06em] text-ink-faint uppercase">
            {beta.requirements}
          </p>
        </div>

        <ol className="relative mx-auto mt-14 grid max-w-4xl gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3">
          {beta.steps.map((item) => (
            <li key={item.step} className="bg-card-soft px-6 py-7">
              <span className="font-mono text-[0.6875rem] text-ink-faint tabular">
                {item.step}
              </span>
              <h3 className="mt-2 font-semibold tracking-[-0.01em] text-ink-strong">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg-soft">
      <div className="shell flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            {site.shortDescription}
          </p>
          <BetaLink className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-ink transition-opacity hover:opacity-80">
            Join the TestFlight beta
            <svg
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path d="M4 10h11M11 6l4 4-4 4" />
            </svg>
          </BetaLink>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-14 gap-y-3 sm:grid-cols-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-ink-muted transition-colors hover:text-ink-strong"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8125rem] text-ink-faint">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="font-mono text-[0.6875rem] tracking-[0.06em] text-ink-faint uppercase">
            Seattle, WA
          </p>
        </div>
      </div>
    </footer>
  );
}
