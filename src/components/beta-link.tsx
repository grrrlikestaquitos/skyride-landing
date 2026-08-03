import { links } from "@/lib/site";

/**
 * Every CTA that sends someone into the TestFlight group.
 *
 * Centralised so the destination, the new-tab behaviour and `rel` stay
 * identical everywhere — the header, the hero, the drivers band and the join
 * section all render this rather than hand-rolling an anchor.
 */
export function BetaLink({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      href={links.testFlight}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={className}
    >
      {children}
    </a>
  );
}
