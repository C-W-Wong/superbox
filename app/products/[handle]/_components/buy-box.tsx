"use client";

import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ShopifyProduct, ShopifyVariant } from "@/lib/shopify";
import {
  BUNDLES,
  type Bundle,
  type BundleId,
  getBundle,
} from "@/lib/bundles";
import { addLineAction, expressCheckoutAction } from "@/lib/cart-actions";
import { formatPrice, priceCents } from "@/lib/money";
import { DISPLAY } from "@/lib/fonts";
import { FALLBACK_AVG, FALLBACK_COUNT } from "@/lib/reviews";
import { SocialProofWidget } from "./social-proof";
import { Zap } from "lucide-react";

const VARIANT_HEX: Record<string, string> = {
  blue: "#0284c7",
  yellow: "#eab308",
};

function variantSwatch(v: ShopifyVariant): string {
  const value = v.selectedOptions[0]?.value?.toLowerCase();
  return (value && VARIANT_HEX[value]) || "#94a3b8";
}

function variantLabel(v: ShopifyVariant): string {
  const value = v.selectedOptions[0]?.value;
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : v.title;
}

type Props = {
  product: ShopifyProduct;
  variantId: string;
  onVariantChange: (id: string) => void;
  bundleId: BundleId;
  onBundleChange: (id: BundleId) => void;
};

export function BuyBox({
  product,
  variantId,
  onVariantChange,
  bundleId,
  onBundleChange,
}: Props) {
  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const bundle = getBundle(bundleId);

  const unitPriceCents = priceCents(variant.price.amount);
  const unitWasCents = priceCents(variant.compareAtPrice?.amount);
  const bundlePriceCents = unitPriceCents * bundle.quantity;
  const bundleWasCents = (unitWasCents || unitPriceCents) * bundle.quantity;
  const savingsCents = bundleWasCents - bundlePriceCents;

  return (
    <div className="space-y-7">
      <header>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          <span className="mr-2 inline-block size-2 bg-primary align-middle" />
          Bestseller · {FALLBACK_AVG.toFixed(1)}/5
        </p>
        <h1
          className="mt-3 text-5xl leading-[0.9] tracking-tight text-foreground md:text-6xl"
          style={{ fontFamily: DISPLAY }}
        >
          {product.title.toUpperCase()}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-foreground/80 md:text-lg">
          60m laser. 5m steel tape. 90° cross-line. One body, every measurement.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={cn(
                "size-4",
                i <= Math.round(FALLBACK_AVG)
                  ? "fill-primary text-primary"
                  : "text-foreground/20"
              )}
              strokeWidth={1.5}
            />
          ))}
        </div>
        <span className="font-mono tabular-nums text-foreground">
          {FALLBACK_AVG.toFixed(1)}/5
        </span>
        <span className="text-foreground/40">·</span>
        <span className="text-foreground/70">
          {FALLBACK_COUNT} reviews
        </span>
      </div>

      <div className="border-t border-border pt-6">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
          <MoneyTicker
            cents={bundlePriceCents}
            className="text-5xl tabular-nums text-foreground md:text-6xl"
            style={{ fontFamily: DISPLAY }}
          />
          {savingsCents > 0 && (
            <>
              <span className="font-mono text-base text-foreground/40 line-through tabular-nums">
                {formatPrice(bundleWasCents)}
              </span>
              <span className="bg-primary px-2 py-1 font-mono text-xs font-bold uppercase tabular-nums tracking-wide text-primary-foreground">
                Save <MoneyTicker cents={savingsCents} />
              </span>
            </>
          )}
        </div>
        <SocialProofWidget />
      </div>

      <fieldset className="space-y-3">
        <div className="flex items-center justify-between">
          <legend className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            Color
          </legend>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-foreground/80">
            {variantLabel(variant)}
          </span>
        </div>
        <div role="radiogroup" aria-label="Color" className="flex gap-3">
          {product.variants.map((v) => (
            <button
              key={v.id}
              type="button"
              role="radio"
              aria-checked={v.id === variantId}
              aria-label={variantLabel(v)}
              disabled={!v.availableForSale}
              onClick={() => onVariantChange(v.id)}
              className={cn(
                "size-10 ring-offset-2 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40",
                v.id === variantId
                  ? "ring-2 ring-primary"
                  : "hover:ring-2 hover:ring-foreground/40"
              )}
              style={{ background: variantSwatch(v) }}
            />
          ))}
        </div>
      </fieldset>

      <div className="space-y-3">
        <form action={addLineAction}>
          <input type="hidden" name="merchandiseId" value={variantId} />
          <input type="hidden" name="quantity" value={bundle.quantity} />
          <ATCButton
            priceCents={bundlePriceCents}
            available={variant.availableForSale}
          />
        </form>

        <form action={expressCheckoutAction}>
          <input type="hidden" name="merchandiseId" value={variantId} />
          <input type="hidden" name="quantity" value={bundle.quantity} />
          <ExpressCheckoutButton available={variant.availableForSale} />
        </form>

        <p className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/55">
          Shop Pay · Apple Pay · Google Pay · Card
        </p>
      </div>

      <fieldset className="space-y-3">
        <legend className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
          Save with a bundle
        </legend>
        <div
          role="radiogroup"
          aria-label="Bundle"
          className="grid grid-cols-1 gap-2"
        >
          {BUNDLES.map((b) => (
            <BundleCard
              key={b.id}
              bundle={b}
              unitPriceCents={unitPriceCents}
              unitWasCents={unitWasCents}
              active={b.id === bundleId}
              onClick={() => onBundleChange(b.id)}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}

function ATCButton({
  priceCents,
  available,
}: {
  priceCents: number;
  available: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || !available}
      className="group flex h-14 w-full items-center justify-center gap-3 bg-primary font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition-all hover:bg-primary/90 active:translate-y-px disabled:opacity-60"
    >
      {!available ? (
        <span>Sold out</span>
      ) : pending ? (
        <span>Adding...</span>
      ) : (
        <>
          <span>Add to cart · {formatPrice(priceCents)}</span>
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-1"
            strokeWidth={3}
          />
        </>
      )}
    </button>
  );
}

function ExpressCheckoutButton({ available }: { available: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending || !available}
      className="group flex h-12 w-full items-center justify-center gap-2 border-2 border-foreground bg-background font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-foreground transition-all hover:bg-foreground hover:text-background active:translate-y-px disabled:opacity-60"
    >
      {pending ? (
        <span>Redirecting...</span>
      ) : (
        <>
          <Zap className="size-3.5 fill-primary text-primary group-hover:fill-background group-hover:text-background" strokeWidth={2.5} />
          <span>Buy Now · Express Checkout</span>
        </>
      )}
    </button>
  );
}

function BundleCard({
  bundle,
  unitPriceCents,
  unitWasCents,
  active,
  onClick,
}: {
  bundle: Bundle;
  unitPriceCents: number;
  unitWasCents: number;
  active: boolean;
  onClick: () => void;
}) {
  const totalPrice = unitPriceCents * bundle.quantity;
  const totalWas = (unitWasCents || unitPriceCents) * bundle.quantity;
  const savings = totalWas - totalPrice;
  const savingsPct = totalWas > 0 ? Math.round((savings / totalWas) * 100) : 0;
  const isFeatured = bundle.id === "trio";

  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        "relative w-full border p-4 text-left transition-all",
        active
          ? "border-primary ring-2 ring-primary"
          : "border-border hover:border-foreground/40",
        isFeatured && !active && "border-primary/40 bg-primary/[0.04]"
      )}
    >
      {bundle.badge && (
        <span
          className={cn(
            "absolute -top-2 left-3 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.18em]",
            isFeatured
              ? "bg-foreground text-background"
              : "bg-primary text-primary-foreground"
          )}
        >
          {bundle.badge}
        </span>
      )}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span
            className={cn(
              "text-4xl leading-none tracking-tight md:text-5xl",
              active || isFeatured ? "text-primary" : "text-foreground"
            )}
            style={{ fontFamily: DISPLAY }}
          >
            {bundle.quantity}×
          </span>
          <div>
            <div className="text-sm font-bold uppercase tracking-wide text-foreground">
              {bundle.label}
            </div>
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-foreground/60">
              {bundle.pitch}
            </div>
            <div className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-foreground/50">
              {formatPrice(unitPriceCents)} ea
              {bundle.freeShipping && " · Free ship"}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-lg font-bold tabular-nums text-foreground">
            {formatPrice(totalPrice)}
          </div>
          {savings > 0 && (
            <>
              <div className="font-mono text-[10px] tabular-nums text-foreground/40 line-through">
                {formatPrice(totalWas)}
              </div>
              <div className="mt-0.5 inline-block bg-primary px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tabular-nums tracking-widest text-primary-foreground">
                Save {savingsPct}%
              </div>
            </>
          )}
        </div>
      </div>
    </button>
  );
}

function MoneyTicker({
  cents,
  className,
  style,
}: {
  cents: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const value = useMotionValue(cents);
  const display = useTransform(value, (v) => formatPrice(v));

  useEffect(() => {
    const ctrl = animate(value, cents, { duration: 0.4, ease: "easeOut" });
    return () => ctrl.stop();
  }, [cents, value]);

  return (
    <motion.span className={className} style={style}>
      {display}
    </motion.span>
  );
}
