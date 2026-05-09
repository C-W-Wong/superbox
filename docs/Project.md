# Project

Headless storefront for SuperBox. Update when the stack, structure, or
backend integration meaningfully changes.

For brand/product see `Business.md`. For visual identity see `Design.md`.
For deployment see `deploy.md`.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Runtime:** React 19, TypeScript 5
- **Styling:** Tailwind CSS 4 (`@tailwindcss/postcss`)
- **Components:** shadcn/ui on `@base-ui/react` (modern shadcn default — *not*
  Radix UI). Note: base-ui has no `asChild` prop and no `type="single"
  collapsible` on Accordion — use `render` or style triggers directly.
- **Icons:** lucide-react
- **Motion:** framer-motion (used for price tickers, sticky-ATC scroll trigger,
  laser-line / pulse keyframes)
- **Fonts:** Inter (sans) and JetBrains Mono (mono) via `next/font/google`,
  exposed as `--font-inter` and `--font-jetbrains-mono`, mapped into
  Tailwind's `font-sans` / `font-mono` in `app/globals.css`
- **Backend:** Shopify Storefront API (cart, checkout, products, policies)
- **Hosting:** Vercel (per `deploy.md`)
- **Rendering:** Pages use `revalidate = 3600` for product/collection data,
  `revalidate = 86400` for shop policies. Cart is dynamic per-request.

## Conventions

- **App Router**, no `src/` directory. Routes live at `app/` root.
- **Path alias:** `@/*` → repo root (`@/lib/...`, `@/components/ui/...`).
- **Package manager:** npm.
- **Component colocation:** route-specific UI under `app/<route>/_components/`.
  Shared site chrome (header, footer, cart count) lives in
  `components/site/`. shadcn primitives live in `components/ui/`.
- **Server actions** live in `lib/cart-actions.ts` (`"use server"` at the top).
- **Read-only server helpers** (e.g. `getCartFromCookie`) live in `lib/cart.ts`
  — `import "server-only"`, no `"use server"` directive.

## Shopify wiring

Env vars in `.env.local`:

- `SHOPIFY_STORE_DOMAIN=2uggvw-tv.myshopify.com`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` — public-safe, used server-side via
  `lib/shopify.ts`
- `SHOPIFY_ADMIN_ACCESS_TOKEN` — used by `lib/admin.ts` for newsletter signup
  (`customerCreate` with `emailMarketingConsent`). Requires `write_customers`
  scope on the custom app
- `SHOPIFY_API_KEY` — custom app client ID, not needed for Storefront flows

API version: `2025-10`. Cart cookie: `superbox_cart_id` (httpOnly, lax,
30-day max age). Checkout = redirect to `cart.checkoutUrl` returned by the
Storefront API.

`next.config.ts` allows `cdn.shopify.com/s/files/**` for `next/image`.

## Routes (current)

| Route                        | Render                | Source |
| ---------------------------- | --------------------- | ------ |
| `/`                          | Dynamic (cookies)     | `app/page.tsx` — hero, 3-in-1, Pro/DIY tabs, comparison, testimonials, bundles, newsletter CTA, final CTA |
| `/products/[handle]`         | Dynamic (cookies)     | `app/products/[handle]/page.tsx` — gallery, buy-box, trust strip, specs drawer, descriptionHtml, FAQ, mobile sticky ATC |
| `/collections/all`           | Dynamic (cookies)     | `app/collections/all/page.tsx` — featured product + ghost accessory cards |
| `/cart`                      | Dynamic (cookies)     | `app/cart/page.tsx` — Shopify-backed line items, qty controls, checkout |
| `/policies/[handle]`         | Dynamic (cookies)     | `app/policies/[handle]/page.tsx` — pulled from Shopify `shop.{shippingPolicy,...}` |
| `/pages/track-your-order`    | Static                | `app/pages/track-your-order/page.tsx` — form posts to parcelsapp.com |

All routes show as "Dynamic" in the build output because `cookies()` is
called inside the layout's `<CartCount />` Suspense boundary, which forces
the whole app/layout.tsx tree dynamic. To restore SSG/PPR for the PDP and
collection, enable Cache Components / `experimental.ppr` and isolate the
cookie call. Deferred — perceived performance is fine via streaming.

## What's done vs not

**Done:**
- Real Shopify Storefront integration (products, cart, checkout, policies)
- Site shell (header + footer) on every route
- Cart flow with httpOnly cookie, line item editing, Shopify checkout redirect
- Homepage with hero, modes, Pro/DIY, comparison, testimonials, bundles, newsletter CTA, final CTA
- PDP with gallery, buy-box, specs drawer, descriptionHtml block, FAQ, mobile sticky ATC
- Collection page (feature-led with ghost accessory cards)
- All 4 policy pages dynamic from Shopify
- Track-order page
- Newsletter signup via Admin API (`customerCreate` + `emailMarketingConsent`); footer form on every route plus homepage CTA section. **Requires** `write_customers` scope on the Admin token
- Static testimonials + rating in `lib/reviews.ts` (`FALLBACK_AVG = 4.7`, `FALLBACK_COUNT = "1,000+"`, six `FALLBACK_REVIEWS` with photos in `public/images/reviews/`). Single source of truth — homepage, PDP buy-box, mobile sticky ATC, and PDP testimonials section all import from here. Decision: keep static; live Shopify store has no review app either

**Not done (intentionally cut for MVP):**
- Customer accounts / login (Shopify Customer Account API). `/pages/track-your-order` covers the main customer-support need; revisit if/when there's reason to engage repeat buyers
- UGC video grid on homepage (Design.md sec 7 calls for this; cut due to no real UGC assets)
- Search / filters
- New product photography (current photos have embedded promotional text and badges that are baked into the JPEGs)
- Shopify admin work still needed: confirm `write_customers` scope on Admin token so newsletter signup actually writes customers
