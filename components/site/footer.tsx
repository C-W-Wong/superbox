import Link from "next/link";
import { NewsletterForm } from "./newsletter-form";

const SHOP_LINKS = [
  { href: "/products/3-in-1-laser-measuring-tape-tool", label: "The 3-in-1 Tool" },
  { href: "/cart", label: "Cart" },
];

const SUPPORT_LINKS = [
  { href: "/pages/track-your-order", label: "Track your order" },
  { href: "/policies/shipping-policy", label: "Shipping" },
  { href: "/policies/refund-policy", label: "Returns" },
];

const LEGAL_LINKS = [
  { href: "/policies/privacy-policy", label: "Privacy" },
  { href: "/policies/terms-of-service", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      {/* Yellow strip */}
      <div className="hazard-stripe h-2" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12 md:gap-8">
          <div className="col-span-2 md:col-span-5">
            <div
              className="text-4xl leading-none tracking-wide text-foreground md:text-5xl"
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              SUPERBOX<span className="text-primary">.</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              One tool. Three tasks. Built for contractors and DIY-ers who
              don&rsquo;t have time to measure twice.
            </p>

            <div className="mt-8 max-w-sm">
              <NewsletterForm variant="footer" />
            </div>

            <p className="mt-8 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/60">
              Ships to US · CA · UK · AU · NZ
            </p>
          </div>

          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="Support" links={SUPPORT_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>

        <div className="mt-16 flex flex-col items-start gap-3 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            © {new Date().getFullYear()} SuperBox · Built for precision
          </p>
          <a
            href="mailto:info@superboxbrand.com"
            className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
          >
            info@superboxbrand.com
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="md:col-span-2 md:col-start-auto">
      <h3 className="border-b-2 border-primary pb-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
        {title}
      </h3>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
