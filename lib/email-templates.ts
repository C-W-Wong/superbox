export type AbandonmentVariant = "1h" | "24h" | "72h";

export type AbandonmentEmail = {
  subject: string;
  preheader: string;
  bodyText: string;
  cta: { label: string; url: string };
};

export function buildAbandonmentEmail(
  variant: AbandonmentVariant,
  cartUrl: string,
  discountCode?: string
): AbandonmentEmail {
  if (variant === "1h") {
    return {
      subject: "Your SuperBox is waiting",
      preheader: "Finish checkout in two clicks.",
      bodyText: [
        "Looks like you stepped away mid-checkout.",
        "",
        "Your 3-in-1 Laser Tape is still in your cart. Inventory is moving fast — we'd hate for you to miss it.",
        "",
        "Pick up where you left off:",
      ].join("\n"),
      cta: { label: "Resume Checkout", url: cartUrl },
    };
  }
  if (variant === "24h") {
    const code = discountCode ?? "SUPER10";
    return {
      subject: `Still thinking? Take 10% off — code ${code}`,
      preheader: "One-time code, expires in 48 hours.",
      bodyText: [
        "We saved your cart for you.",
        "",
        `As a thank-you for taking another look — use code ${code} for 10% off your order. Works on bundles too.`,
        "",
        "Code expires in 48 hours.",
      ].join("\n"),
      cta: { label: "Apply Code & Checkout", url: `${cartUrl}?discount=${code}` },
    };
  }
  return {
    subject: "Last chance — your SuperBox cart is about to expire",
    preheader: "We'll release the inventory in 24 hours.",
    bodyText: [
      "This is the last reminder we'll send.",
      "",
      "Your cart will be released in the next 24 hours so we can free up the inventory for other customers.",
      "",
      "If you still want it, here's the fastest way back:",
    ].join("\n"),
    cta: { label: "Complete My Order", url: cartUrl },
  };
}
