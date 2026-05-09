"use server";

import { subscribeToNewsletter } from "./admin";

export type SubscribeState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeAction(
  _prev: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const honey = String(formData.get("company") ?? "");
  if (honey) return { status: "success" };

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return { status: "error", message: "Enter a valid email address." };
  }

  try {
    const res = await subscribeToNewsletter(email);
    if (res.ok) return { status: "success" };
    if (res.reason === "invalid") {
      return { status: "error", message: "That email looks invalid." };
    }
    return { status: "error", message: "Something went wrong. Try again." };
  } catch {
    return { status: "error", message: "Something went wrong. Try again." };
  }
}
