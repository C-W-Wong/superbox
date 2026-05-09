import "server-only";

import { cookies } from "next/headers";
import { getCart } from "./shopify";

export const CART_COOKIE_NAME = "superbox_cart_id";

export const CART_COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};

export async function getCartFromCookie() {
  const cartId = (await cookies()).get(CART_COOKIE_NAME)?.value;
  if (!cartId) return null;
  try {
    return await getCart(cartId);
  } catch {
    return null;
  }
}
