"use client";

import { useFormStatus } from "react-dom";
import { ArrowRight, Plus } from "lucide-react";
import Image from "next/image";
import { updateLineAction } from "@/lib/cart-actions";
import { formatPrice, priceCents } from "@/lib/money";
import type { ShopifyCart } from "@/lib/shopify";
import { DISPLAY } from "@/lib/fonts";
import { SectionEyebrow } from "@/components/site/section-eyebrow";

type CartLine = ShopifyCart["lines"]["edges"][number]["node"];

function getUpsell(qty: number) {
  if (qty === 1) {
    return {
      from: 1,
      to: 2,
      savingsCents: 2000,
      perk: "Plus free shipping",
      pitch: "Pair with a partner",
    };
  }
  if (qty === 2) {
    return {
      from: 2,
      to: 3,
      savingsCents: 3000,
      perk: "Gift one. Keep two.",
      pitch: "Best Value",
    };
  }
  return null;
}

export function CartUpsell({
  cart,
}: {
  cart: ShopifyCart;
}) {
  const lines = cart.lines.edges.map((e) => e.node);
  if (lines.length === 0) return null;

  const productLine = lines.reduce((acc: CartLine | null, l) =>
    !acc || l.quantity > acc.quantity ? l : acc
  , null as CartLine | null);
  if (!productLine) return null;

  const upsell = getUpsell(productLine.quantity);
  if (!upsell) return null;

  const lineTotalCents = priceCents(productLine.cost.totalAmount.amount);
  const unitCents = Math.round(lineTotalCents / productLine.quantity);
  const projectedTotalCents = unitCents * upsell.to;

  return (
    <section
      className="mb-8 border-2 border-primary bg-primary/[0.04] p-5 md:p-6"
      aria-label="Bundle upsell"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          {productLine.merchandise.image && (
            <div className="relative size-20 shrink-0 overflow-hidden bg-background">
              <Image
                src={productLine.merchandise.image.url}
                alt=""
                width={productLine.merchandise.image.width}
                height={productLine.merchandise.image.height}
                sizes="80px"
                className="size-full object-cover"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <SectionEyebrow withDot={false} className="text-[10px]">
              {upsell.pitch} · One-click add
            </SectionEyebrow>
            <p
              className="mt-1 text-2xl uppercase leading-tight tracking-tight text-foreground md:text-3xl"
              style={{ fontFamily: DISPLAY }}
            >
              Add 1 more — save{" "}
              <span className="text-primary">
                {formatPrice(upsell.savingsCents)}
              </span>
            </p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/60">
              {upsell.perk} · New total {formatPrice(projectedTotalCents - upsell.savingsCents)}
            </p>
          </div>
        </div>

        <form action={updateLineAction} className="md:ml-auto md:shrink-0">
          <input type="hidden" name="lineId" value={productLine.id} />
          <input type="hidden" name="quantity" value={upsell.to} />
          <UpsellButton />
        </form>
      </div>
    </section>
  );
}

function UpsellButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex h-12 w-full items-center justify-center gap-2 bg-foreground px-6 font-mono text-xs font-bold uppercase tracking-[0.22em] text-background transition-all hover:bg-primary hover:text-primary-foreground active:translate-y-px disabled:opacity-60 md:w-auto"
    >
      {pending ? (
        "Adding..."
      ) : (
        <>
          <Plus className="size-3.5" strokeWidth={3} />
          Upgrade
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-1"
            strokeWidth={3}
          />
        </>
      )}
    </button>
  );
}
