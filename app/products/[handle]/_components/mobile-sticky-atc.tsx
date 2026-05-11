"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight } from "lucide-react";
import { addLineAction } from "@/lib/cart-actions";
import { type BundleId, getBundle } from "@/lib/bundles";
import { formatPrice, priceCents } from "@/lib/money";
import { DISPLAY } from "@/lib/fonts";
import type { ShopifyProduct } from "@/lib/shopify";

// Renamed component but kept filename to avoid surgical-noise import churn.
// Sentinel id "buy-box-end" must be rendered by ProductPDP below the inline BuyBox.
export function MobileStickyATC({
  product,
  variantId,
  bundleId,
}: {
  product: ShopifyProduct;
  variantId: string;
  bundleId: BundleId;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("buy-box-end");
    if (!sentinel) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, []);

  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const bundle = getBundle(bundleId);
  const unitCents = priceCents(variant.price.amount);
  const wasUnitCents = priceCents(variant.compareAtPrice?.amount);
  const totalCents = unitCents * bundle.quantity;
  const totalWasCents = (wasUnitCents || unitCents) * bundle.quantity;
  const savingsCents = totalWasCents - totalCents;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t-2 border-primary bg-background shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.25)] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      role="region"
      aria-label="Sticky add to cart"
    >
      <form
        action={addLineAction}
        className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:gap-6 md:px-8 md:py-3.5"
      >
        <input type="hidden" name="merchandiseId" value={variantId} />
        <input type="hidden" name="quantity" value={bundle.quantity} />

        {/* Desktop only: product title prefix */}
        <p className="hidden min-w-0 truncate font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground md:block md:max-w-[36%] md:flex-1">
          {product.title}
        </p>

        {/* Bundle eyebrow + price + savings */}
        <div className="min-w-0 flex-1 md:flex md:flex-initial md:items-baseline md:gap-3">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
            {bundle.label}
          </p>
          <div className="mt-0.5 flex items-baseline gap-2 md:mt-0">
            <span
              className="text-2xl leading-none tabular-nums text-foreground md:text-xl"
              style={{ fontFamily: DISPLAY }}
            >
              {formatPrice(totalCents)}
            </span>
            {savingsCents > 0 && (
              <span className="bg-primary px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tabular-nums tracking-widest text-primary-foreground">
                Save {formatPrice(savingsCents)}
              </span>
            )}
          </div>
        </div>

        <StickyATCButton />
      </form>
    </div>
  );
}

function StickyATCButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group flex h-12 shrink-0 items-center justify-center gap-2 bg-primary px-5 font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition-all hover:bg-primary/90 active:translate-y-px disabled:opacity-60 md:px-7"
    >
      {pending ? (
        "Adding..."
      ) : (
        <>
          Add to cart
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-1"
            strokeWidth={3}
          />
        </>
      )}
    </button>
  );
}
