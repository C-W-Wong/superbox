export function formatPrice(cents: number): string {
  const dollars = cents / 100;
  return `$${dollars.toFixed(2)}`;
}

export function priceCents(amount: string | null | undefined): number {
  if (!amount) return 0;
  return Math.round(parseFloat(amount) * 100);
}
