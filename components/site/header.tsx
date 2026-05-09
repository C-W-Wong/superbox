import Link from "next/link";
import { Suspense } from "react";
import { Menu, ShoppingBag } from "lucide-react";
import { CartCount } from "./cart-count";
import { FreeShippingBar } from "./free-shipping-bar";

const NAV_LINKS = [
  { href: "/products/3-in-1-laser-measuring-tape-tool", label: "Shop" },
  { href: "/pages/track-your-order", label: "Track" },
];

export function Header() {
  return (
    <>
      <Suspense
        fallback={
          <div className="bg-primary text-primary-foreground">
            <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-1.5 text-center md:px-8">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
                Free shipping on bundles · 30-day money-back · Built for the job site
              </span>
            </div>
          </div>
        }
      >
        <FreeShippingBar />
      </Suspense>

      {/* Main header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-20 md:px-8">
          <Link
            href="/"
            className="group flex items-baseline gap-1"
            aria-label="SuperBox home"
          >
            <span
              className="text-2xl leading-none tracking-wide text-foreground md:text-3xl"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              SUPERBOX
            </span>
            <span className="block size-1.5 bg-primary" aria-hidden />
          </Link>

          <nav className="flex items-center gap-1">
            <ul className="hidden items-center gap-2 md:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex h-9 items-center px-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/cart"
              className="ml-1 inline-flex h-9 items-center gap-2 px-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:text-primary"
              aria-label="View cart"
            >
              <ShoppingBag className="size-4" strokeWidth={2} />
              <span className="hidden sm:inline">Cart</span>
              <Suspense fallback={null}>
                <CartCount />
              </Suspense>
            </Link>
            <button
              className="ml-1 inline-flex h-9 items-center justify-center px-2 text-foreground/70 transition-colors hover:text-primary md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" strokeWidth={2} />
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}
