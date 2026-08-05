"use client";

import { useEffect, useState } from "react";
import { BetaLink } from "@/components/beta-link";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks, site } from "@/lib/site";

/**
 * @param anchorBase Prefixed onto every `#section` link. Empty on the landing
 * page, where the targets are in the same document and the browser can smooth
 * scroll to them. `"/"` on a standalone page like /privacy, where those
 * targets do not exist and a bare hash would go nowhere.
 */
export function SiteHeader({ anchorBase = "" }: { anchorBase?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the mobile sheet from being orphaned when the viewport grows past it.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-b border-line bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a
          href={anchorBase || "#top"}
          className="rounded-lg"
          aria-label={`${site.name} home`}
        >
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={`${anchorBase}${link.href}`}
                  className="text-sm text-ink-muted transition-colors hover:text-ink-strong"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <BetaLink className="btn btn-primary hidden md:inline-flex">
            Join the beta
          </BetaLink>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-card text-ink-muted md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              className="h-[18px] w-[18px]"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="m6 6 12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-line bg-bg md:hidden"
        >
          <ul className="shell flex flex-col py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={`${anchorBase}${link.href}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-[0.9375rem] text-ink-muted transition-colors hover:text-ink-strong"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-3 pb-1">
              <BetaLink
                onClick={() => setMenuOpen(false)}
                className="btn btn-primary w-full"
              >
                Join the beta
              </BetaLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
