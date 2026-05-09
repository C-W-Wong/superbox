# Email & Lifecycle

This file documents the email programs SuperBox runs and how they're wired.

## 1. Newsletter signup

- **Trigger:** `subscribeAction` in `lib/newsletter-actions.ts`
- **Recipient list:** Shopify Customers (tagged `newsletter`) via `subscribeToNewsletter` in `lib/admin.ts`
- **Surfaces:** Footer form, homepage `<NewsletterCTA>`, exit-intent modal
- **Welcome email:** Sent by Shopify Email automation. Configure in Shopify Admin → Marketing → Automations → "Welcome new subscribers"

## 2. Cart abandonment

- **Source of truth:** **Shopify Email's native abandonment recovery** (Marketing → Automations → "Abandoned checkouts")
- **Why Shopify-native:** All carts and customer emails live in Shopify; Shopify already fires the webhook with full cart context. Building our own scheduler is duplicate work.
- **Schedule:** 1h, 24h, 72h after abandonment
- **Templates:** copy lives in `lib/email-templates.ts` (`buildAbandonmentEmail`). Paste the subject + body + CTA into Shopify Email's editor when configuring the automation.
- **Discount code for 24h variant:** create a one-time-per-customer 10% off code in Shopify (Discounts → Create), default name `SUPER10`. Reference it in the 24h email.

### If we move off Shopify Email

If we later want full design control, the migration target is **Resend + Vercel Cron**:

1. Install `resend` and `react-email`. Add `RESEND_API_KEY` to env.
2. Convert `buildAbandonmentEmail` strings into `react-email` JSX templates.
3. Add Shopify webhook (`checkouts/create` and `checkouts/update`) → Vercel API route at `/api/webhooks/shopify-checkout` to record `abandonedAt` for every checkout.
4. Add a Vercel Cron entry (every 30 min) that scans for unpaid checkouts hitting 1h / 24h / 72h thresholds and dispatches the matching template via Resend.

We are **not** doing this today — Shopify-native is good enough until volume justifies the lift.

## 3. Order confirmation, shipping, delivery

All handled by Shopify's transactional emails. No code change needed.

## 4. Post-purchase upsell

- **Constraint:** We are headless; Shopify owns the post-checkout thank-you page, so we cannot inject custom upsells there.
- **Workaround:** Pre-purchase upsell on `/cart` via `<CartUpsell>` (`app/cart/_components/cart-upsell.tsx`) + email-based winback automations from Shopify Email (e.g. "Buy a 2nd as a gift" 14 days post-purchase).
