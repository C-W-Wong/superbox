"use client";

import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { addLineAction } from "@/lib/cart-actions";
import { type BundleId, getBundle } from "@/lib/bundles";
import { formatPrice, priceCents } from "@/lib/money";
import { DISPLAY } from "@/lib/fonts";
import { FALLBACK_AVG } from "@/lib/reviews";
import type { ShopifyProduct } from "@/lib/shopify";

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
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > 600);
  });

  if (!mounted) return null;

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
      className={`fixed bottom-0 left-0 right-0 z-40 border-t-2 border-primary bg-background shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.25)] transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      role="region"
      aria-label="Sticky add to cart"
    >
      <form action={addLineAction} className="px-4 pb-3 pt-3">
        <input type="hidden" name="merchandiseId" value={variantId} />
        <input type="hidden" name="quantity" value={bundle.quantity} />

        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <Star
                className="size-3 fill-primary text-primary"
                strokeWidth={1.5}
              />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-foreground">
                {FALLBACK_AVG.toFixed(1)}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/55">
                · {bundle.label}
                {bundle.freeShipping && " · Free ship"}
              </span>
            </div>
            <div className="mt-0.5 flex items-baseline gap-2">
              <span
                className="text-3xl leading-none tabular-nums text-foreground"
                style={{ fontFamily: DISPLAY }}
              >
                {formatPrice(totalCents)}
              </span>
              {savingsCents > 0 && (
                <>
                  <span className="font-mono text-[11px] tabular-nums text-foreground/40 line-through">
                    {formatPrice(totalWasCents)}
                  </span>
                  <span className="bg-primary px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-primary-foreground">
                    −{formatPrice(savingsCents)}
                  </span>
                </>
              )}
            </div>
          </div>
          <StickyATCButton />
        </div>
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
      className="group flex h-14 shrink-0 items-center justify-center gap-2 bg-primary px-5 font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition-all active:translate-y-px disabled:opacity-60"
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
