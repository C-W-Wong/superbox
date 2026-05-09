import type { Metadata } from "next";
import { getCartFromCookie } from "@/lib/cart";
import { CartView } from "./_components/cart-view";

export const metadata: Metadata = {
  title: "Cart — SuperBox",
};

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const cart = await getCartFromCookie();
  return <CartView cart={cart} />;
}
