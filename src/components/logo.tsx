import Image from "next/image";
import { site } from "@/lib/site";

/**
 * The real app icon, not a stand-in.
 *
 * `/icon-192.png` is the same asset the document already declares in its
 * `icons` metadata, so the browser has it either way — reusing it here costs no
 * extra request, and the site mark can never drift from the icon on the
 * home screen. Regenerate both together with the script noted in app/layout.tsx.
 *
 * The source PNG is a full square (iOS applies its own mask), so the squircle
 * is applied here: 22% of the width is close to Apple's continuous corner.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/icon-192.png"
      alt=""
      aria-hidden="true"
      width={192}
      height={192}
      priority
      className={`rounded-[22%] ${className}`}
    />
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-8 w-8" />
      <span className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink-strong">
        {site.name}
      </span>
    </span>
  );
}
