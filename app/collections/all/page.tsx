import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/lib/shopify";
import { formatPrice } from "@/lib/money";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Shop — SuperBox",
  description: "The SuperBox 3-in-1 Laser Measuring Tape Tool.",
};

const PRODUCT_HANDLE = "3-in-1-laser-measuring-tape-tool";
const DISPLAY = "var(--font-bebas)";

function priceCents(amount: string | null | undefined): number {
  if (!amount) return 0;
  return Math.round(parseFloat(amount) * 100);
}

export default async function CollectionPage() {
  const product = await getProduct(PRODUCT_HANDLE);
  if (!product) return null;

  const heroImage = product.images[0];
  const cents = priceCents(product.priceRange.minVariantPrice.amount);
  const wasCents = priceCents(
    product.compareAtPriceRange.minVariantPrice.amount
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <header className="mb-10">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          1 product · 3 bundles
        </p>
        <h1
          className="mt-2 text-5xl leading-[0.9] tracking-tight text-foreground md:text-7xl"
          style={{ fontFamily: DISPLAY }}
        >
          SHOP <span className="text-primary">SUPERBOX.</span>
        </h1>
      </header>

      <Link
        href={`/products/${product.handle}`}
        className="group block overflow-hidden border border-border bg-card transition-colors hover:border-primary"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden bg-muted">
            {heroImage && (
              <Image
                src={heroImage.url}
                alt={heroImage.altText ?? product.title}
                width={heroImage.width}
                height={heroImage.height}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            )}
          </div>
          <div className="flex flex-col justify-between p-8 md:p-10">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                Bestseller · 4.7/5 · 912 reviews
              </p>
              <h2
                className="mt-3 text-3xl leading-[0.95] tracking-tight text-foreground md:text-5xl"
                style={{ fontFamily: DISPLAY }}
              >
                {product.title.toUpperCase()}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                Laser rangefinder, steel tape, and 90° cross-line laser. One
                tool, every measurement.
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-2 font-mono text-[11px] tabular-nums text-foreground/60">
                <li>60m laser range</li>
                <li>±0.5mm accuracy</li>
                <li>5m steel tape</li>
                <li>90° cross-line</li>
              </ul>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-3xl tabular-nums text-foreground md:text-4xl"
                  style={{ fontFamily: DISPLAY }}
                >
                  {formatPrice(cents)}
                </span>
                {wasCents > cents && (
                  <span className="font-mono text-sm text-foreground/40 line-through tabular-nums">
                    {formatPrice(wasCents)}
                  </span>
                )}
              </div>
              <span className="inline-flex items-center gap-1.5 bg-primary px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary-foreground transition-colors group-hover:bg-primary/90">
                Shop now <ArrowRight className="size-3" strokeWidth={3} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
