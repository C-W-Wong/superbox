import { getCartFromCookie } from "@/lib/cart";

export async function CartCount() {
  const cart = await getCartFromCookie();
  const count = cart?.totalQuantity ?? 0;
  if (count === 0) return null;
  return (
    <span className="inline-flex min-w-5 items-center justify-center bg-primary px-1.5 font-mono text-[10px] font-bold tabular-nums text-primary-foreground">
      {count}
    </span>
  );
}
