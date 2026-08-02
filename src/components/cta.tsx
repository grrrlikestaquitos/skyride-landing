import { Logo } from "@/components/logo";
import { links, navLinks, site } from "@/lib/site";

export function CallToAction() {
  return (
    <section id="waitlist" className="shell pb-20 lg:pb-28">
      <div className="relative overflow-hidden rounded-panel border border-line bg-card px-6 py-16 text-center sm:px-12 lg:py-20">
        <div
          aria-hidden="true"
          className="hero-glow pointer-events-none absolute inset-x-0 top-0 h-64"
        />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[2.75rem]">
            Your next airport run is
            <br className="hidden sm:block" /> already schedulable.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
            SkyRide is rolling out across the {site.region}. Join the list and
            we&apos;ll get you on the iOS beta as we open each area.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={links.waitlist} className="btn btn-primary">
              Get early access
            </a>
            <a href={links.driverWaitlist} className="btn btn-ghost">
              Apply to drive
            </a>
          </div>
          <p className="mt-6 font-mono text-[0.6875rem] tracking-[0.06em] text-ink-faint uppercase">
            iOS first · Android under evaluation
          </p>
        </div>
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
