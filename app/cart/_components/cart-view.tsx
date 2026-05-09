"use client";

import Image from "next/image";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  checkoutAction,
  removeLineAction,
  updateLineAction,
} from "@/lib/cart-actions";
import type { ShopifyCart } from "@/lib/shopify";
import { formatPrice, priceCents } from "@/lib/money";
import { CartUpsell } from "./cart-upsell";

const DISPLAY = "var(--font-bebas)";

type CartLine = ShopifyCart["lines"]["edges"][number]["node"];

export function CartView({ cart }: { cart: ShopifyCart | null }) {
  if (!cart || cart.totalQuantity === 0) return <EmptyCart />;

  const lines = cart.lines.edges.map((e) => e.node);
  const subtotal = priceCents(cart.cost.subtotalAmount.amount);
  const total = priceCents(cart.cost.totalAmount.amount);
  const freeShipping = subtotal >= 7500;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <header className="mb-10">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          {cart.totalQuantity} {cart.totalQuantity === 1 ? "item" : "items"}
        </p>
        <h1
          className="mt-2 text-5xl leading-[0.9] tracking-tight text-foreground md:text-7xl"
          style={{ fontFamily: DISPLAY }}
        >
          YOUR CART
        </h1>
      </header>

      <CartUpsell cart={cart} />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
        <ul className="md:col-span-2 divide-y divide-border border-y border-border">
          {lines.map((line) => (
            <CartLineRow key={line.id} line={line} />
          ))}
        </ul>
        <aside className="md:col-span-1">
          <div className="md:sticky md:top-24 border border-border bg-card p-6">
            <h2
              className="text-3xl leading-none tracking-wide text-foreground"
              style={{ fontFamily: DISPLAY }}
            >
              ORDER SUMMARY
            </h2>
            <dl className="mt-6 space-y-3 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row
                label="Shipping"
                value={freeShipping ? "Free" : "Calculated at checkout"}
                muted={!freeShipping}
              />
            </dl>
            <hr className="my-5 border-border" />
            <dl className="text-sm">
              <Row label="Total" value={formatPrice(total)} bold />
            </dl>
            <form action={checkoutAction} className="mt-6">
              <CheckoutButton />
            </form>
            <p className="mt-3 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/60">
              Secure checkout via Shopify
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function CartLineRow({ line }: { line: CartLine }) {
  const m = line.merchandise;
  const variant = m.selectedOptions[0]?.value;
  const linePriceCents = priceCents(line.cost.totalAmount.amount);
  return (
    <li className="flex gap-5 py-6">
      {m.image ? (
        <div className="relative size-24 flex-shrink-0 overflow-hidden bg-muted md:size-28">
          <Image
            src={m.image.url}
            alt=""
            width={m.image.width}
            height={m.image.height}
            sizes="120px"
            className="size-full object-cover"
          />
        </div>
      ) : (
        <div className="size-24 flex-shrink-0 bg-muted md:size-28" />
      )}
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              href={`/products/${m.product.handle}`}
              className="text-base font-semibold tracking-tight text-foreground hover:underline"
            >
              {m.product.title}
            </Link>
            {variant && (
              <p className="mt-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary">
                {variant}
              </p>
            )}
          </div>
          <p className="font-mono text-base font-bold tabular-nums text-foreground">
            {formatPrice(linePriceCents)}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <QuantityControls lineId={line.id} quantity={line.quantity} />
          <RemoveButton lineId={line.id} />
        </div>
      </div>
    </li>
  );
}

function QuantityControls({
  lineId,
  quantity,
}: {
  lineId: string;
  quantity: number;
}) {
  return (
    <div className="inline-flex items-center border border-border">
      <form action={updateLineAction}>
        <input type="hidden" name="lineId" value={lineId} />
        <input type="hidden" name="quantity" value={quantity - 1} />
        <button
          type="submit"
          aria-label="Decrease quantity"
          className="flex size-9 items-center justify-center text-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
        >
          <Minus className="size-3" strokeWidth={2} />
        </button>
      </form>
      <span className="min-w-9 border-x border-border text-center font-mono text-sm tabular-nums text-foreground">
        {quantity}
      </span>
      <form action={updateLineAction}>
        <input type="hidden" name="lineId" value={lineId} />
        <input type="hidden" name="quantity" value={quantity + 1} />
        <button
          type="submit"
          aria-label="Increase quantity"
          className="flex size-9 items-center justify-center text-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
        >
          <Plus className="size-3" strokeWidth={2} />
        </button>
      </form>
    </div>
  );
}

function RemoveButton({ lineId }: { lineId: string }) {
  return (
    <form action={removeLineAction}>
      <input type="hidden" name="lineId" value={lineId} />
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 p-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground/60 transition-colors hover:text-primary"
        aria-label="Remove from cart"
      >
        <Trash2 className="size-3.5" strokeWidth={2} />
        Remove
      </button>
    </form>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group flex h-14 w-full items-center justify-center gap-2 bg-primary font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition-all hover:bg-primary/90 active:translate-y-px disabled:opacity-60"
    >
      {pending ? (
        "Redirecting..."
      ) : (
        <>
          Checkout <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={3} />
        </>
      )}
    </button>
  );
}

function Row({
  label,
  value,
  muted,
  bold,
}: {
  label: string;
  value: string;
  muted?: boolean;
  bold?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <dt
        className={`font-mono text-[11px] font-semibold uppercase tracking-widest ${muted ? "text-foreground/40" : "text-foreground/70"}`}
      >
        {label}
      </dt>
      <dd
        className={[
          "font-mono tabular-nums",
          bold ? "text-base font-bold text-foreground" : "text-sm text-foreground/90",
          muted ? "text-foreground/40" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {value}
      </dd>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-24 text-center">
      <ShoppingBag
        className="size-10 text-foreground/40"
        strokeWidth={1.5}
      />
      <h1
        className="mt-6 text-5xl leading-[0.9] tracking-tight text-foreground md:text-6xl"
        style={{ fontFamily: DISPLAY }}
      >
        CART IS EMPTY
      </h1>
      <p className="mt-4 max-w-md text-base text-foreground/70">
        Add a SuperBox to start. Bundles ship free.
      </p>
      <Link
        href="/products/3-in-1-laser-measuring-tape-tool"
        className="mt-8 inline-flex h-14 items-center gap-2 bg-primary px-7 font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Shop the 3-in-1 <ArrowRight className="size-4" strokeWidth={3} />
      </Link>
    </div>
  );
}
