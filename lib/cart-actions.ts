"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  CART_COOKIE_NAME,
  CART_COOKIE_OPTS,
  getCartFromCookie,
} from "./cart";
import {
  addToCart,
  createCart,
  removeCartLine,
  updateCartLine,
} from "./shopify";

export async function addLineAction(formData: FormData) {
  const merchandiseId = String(formData.get("merchandiseId"));
  const quantity = Number(formData.get("quantity") ?? 1);
  if (!merchandiseId || quantity < 1) return;

  const cookieStore = await cookies();
  let cartId = cookieStore.get(CART_COOKIE_NAME)?.value;

  if (!cartId) {
    const cart = await createCart();
    cartId = cart.id;
    cookieStore.set(CART_COOKIE_NAME, cartId, CART_COOKIE_OPTS);
  }

  await addToCart(cartId, merchandiseId, quantity);
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function updateLineAction(formData: FormData) {
  const lineId = String(formData.get("lineId"));
  const quantity = Number(formData.get("quantity"));
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE_NAME)?.value;
  if (!cartId || !lineId) return;

  if (quantity <= 0) {
    await removeCartLine(cartId, lineId);
  } else {
    await updateCartLine(cartId, lineId, quantity);
  }
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function removeLineAction(formData: FormData) {
  const lineId = String(formData.get("lineId"));
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE_NAME)?.value;
  if (!cartId || !lineId) return;
  await removeCartLine(cartId, lineId);
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function checkoutAction() {
  const cart = await getCartFromCookie();
  if (cart?.checkoutUrl) {
    redirect(cart.checkoutUrl);
  }
  redirect("/products/3-in-1-laser-measuring-tape-tool");
}

export async function expressCheckoutAction(formData: FormData) {
  const merchandiseId = String(formData.get("merchandiseId"));
  const quantity = Number(formData.get("quantity") ?? 1);
  if (!merchandiseId || quantity < 1) return;

  const cart = await createCart();
  const updated = await addToCart(cart.id, merchandiseId, quantity);
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE_NAME, cart.id, CART_COOKIE_OPTS);

  if (updated.checkoutUrl) redirect(updated.checkoutUrl);
  redirect("/cart");
}
