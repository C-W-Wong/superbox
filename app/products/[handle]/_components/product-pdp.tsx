"use client";

import { useState } from "react";
import Link from "next/link";
import type { ShopifyProduct } from "@/lib/shopify";
import { type BundleId } from "@/lib/bundles";
import { BuyBox } from "./buy-box";
import { FAQSection } from "./faq-section";
import { MobileStickyATC } from "./mobile-sticky-atc";
import { PDPComparison } from "./pdp-comparison";
import { PDPHowItWorks } from "./pdp-how-it-works";
import { PDPLifestyle } from "./pdp-lifestyle";
import { PDPTestimonials } from "./pdp-testimonials";
import { ProductDescription } from "./product-description";
import { ProductGallery } from "./product-gallery";
import { SpecsSheet } from "./specs-sheet";
import { TrustStrip } from "./trust-strip";

export function ProductPDP({ product }: { product: ShopifyProduct }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [bundleId, setBundleId] = useState<BundleId>("single");

  return (
    <>
      <div className="bg-background">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8 md:py-12">
          <nav className="mb-6 hidden items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/60 md:flex">
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link
              href="/products/3-in-1-laser-measuring-tape-tool"
              className="transition-colors hover:text-primary"
            >
              Shop
            </Link>
            <span aria-hidden>/</span>
            <span className="text-primary">3-in-1 Laser Tape</span>
          </nav>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <div className="min-w-0">
              <ProductGallery product={product} variantId={variantId} />
            </div>
            <div className="min-w-0 md:pt-2">
              <BuyBox
                product={product}
                variantId={variantId}
                onVariantChange={setVariantId}
                bundleId={bundleId}
                onBundleChange={setBundleId}
              />
              <div id="buy-box-end" aria-hidden="true" />
              <TrustStrip />
              <div className="mt-6">
                <SpecsSheet />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductDescription html={product.descriptionHtml} />
      <PDPHowItWorks />
      <PDPLifestyle />
      <PDPComparison />
      <PDPTestimonials />
      <FAQSection />
      <MobileStickyATC
        product={product}
        variantId={variantId}
        bundleId={bundleId}
      />
    </>
  );
}
