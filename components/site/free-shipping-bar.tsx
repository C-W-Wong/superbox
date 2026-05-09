import { getCartFromCookie } from "@/lib/cart";
import { formatPrice, priceCents } from "@/lib/money";

const FREE_SHIP_THRESHOLD_CENTS = 7500;

export async function FreeShippingBar() {
  const cart = await getCartFromCookie();
  const subtotalCents = cart ? priceCents(cart.cost.subtotalAmount.amount) : 0;

  if (subtotalCents === 0) {
    return (
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-1.5 text-center md:px-8">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
            Free shipping on bundles · 30-day money-back · Built for the job site
          </span>
        </div>
      </div>
    );
  }

  if (subtotalCents >= FREE_SHIP_THRESHOLD_CENTS) {
    return (
      <div className="bg-foreground text-primary">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-1.5 text-center md:px-8">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]">
            ✓ You qualify for free shipping
          </span>
        </div>
      </div>
    );
  }

  const remainingCents = FREE_SHIP_THRESHOLD_CENTS - subtotalCents;
  const pct = Math.min(
    100,
    Math.round((subtotalCents / FREE_SHIP_THRESHOLD_CENTS) * 100)
  );

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-1.5 md:flex-row md:items-center md:justify-center md:gap-4 md:px-8">
        <span className="text-center font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
          Add{" "}
          <span className="font-bold tabular-nums">
            {formatPrice(remainingCents)}
          </span>{" "}
          more for free shipping
        </span>
        <div
          className="h-1 w-full max-w-[160px] self-center bg-primary-foreground/25 md:w-40"
          aria-hidden
        >
          <div
            className="h-full bg-primary-foreground transition-[width] duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
