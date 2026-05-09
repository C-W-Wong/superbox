# Business & Product

Source of truth for what SuperBox is, what it sells, and the commerce constraints
the storefront must respect. Update when the brand, SKU lineup, or policies change.

Tech stack lives in `Project.md`; deployment in `deploy.md`.

## Brand

- **Name:** SuperBox (also "SuperBox Tools", "SuperBox Brand")
- **Site:** https://www.superboxbrand.com/
- **Positioning:** Premium precision measurement tools for both professional
  contractors and DIY enthusiasts. Marketing emphasis is on Cross-Laser
  Projection accuracy and replacing multiple tools with one device.
- **Mission:** Redefine precision measurement standards through innovative
  laser measurement technology.
- **Markets:** United States, Canada, United Kingdom, Australia, New Zealand,
  plus other international destinations.
- **Support:** info@superboxbrand.com · Mon–Fri 9 AM–5 PM PST · Sat 9 AM–3 PM PST

## Product catalog

Currently a **single-SKU** store. The collection page (`/collections/all`)
lists exactly one product.

### 3-in-1 Laser Measuring Tape Tool

URL: `/products/3-in-1-laser-measuring-tape-tool`

Three measurement modes in one device:
1. Laser rangefinder — 40m or 60m (≈196 ft)
2. Physical tape measure — 5m, 19mm wide (65 manganese steel)
3. 90° cross-line laser projection

**Variants:** Blue, Yellow

**Pricing**

| Bundle | Price | Was   | Notes              |
| ------ | ----- | ----- | ------------------ |
| 1×     | $54.95 | $68.00 |                    |
| 2×     | $109.90 | $136.00 | Free shipping     |
| 3×     | $164.85 | $204.00 |                    |

**Key specs**

- Accuracy: ±0.5 mm / ±0.02 in (1 mm minimum scale)
- Laser: 635 nm Class II (≤1 mW)
- Power: 2× AAA (replaceable)
- Housing: ABS + TPR + coated manganese steel
- IP54, working temp 0–40 °C, storage −10 to 50 °C
- Auto-shutoff: 30 s laser, 180 s device
- Memory: 20 measurement groups
- Modes: length, continuous, area, volume, single/dual-side Pythagorean
- Units: metric and imperial, switch via 1-second button hold
- Front and rear measurement benchmarks

**Social proof:** 4.7 / 5 from 900+ reviews. Common themes: convenience,
accuracy, time-saving, versatility.

## Commerce policies

These constrain UI flows (PDP copy, cart, checkout success, account / order
pages) and customer-service tooling.

### Shipping (`/policies/shipping-policy`)

- Processing: 1–3 business days
- Delivery: US 5–10 biz days · Canada 7–14 · International 10–20
- Free shipping on selected orders/promotions; calculated at checkout
- Tracking emailed after shipment
- Customer is responsible for incorrect addresses and international
  customs/duties

### Returns (`/policies/refund-policy`)

- 30-day return window (14 days for EU under Right of Withdrawal)
- Item must be in original condition with original box and all accessories
- SuperBox pays return shipping for their errors (wrong/defective/damaged) and
  refunds original shipping; customer pays for change-of-mind returns
- Damage/defects must be reported within 72 hours for free replacement
- Order cancellation: within 12 hours (3 hours for Priority Processing)
- Refunds processed 3–5 business days after inspection
- Excessive returns may trigger review/denial
- Policy applies only to superboxbrand.com — marketplace orders excluded

### Order tracking (`/pages/track-your-order`)

Simple tracking-number form. The third-party provider (Shopify Order Status,
AfterShip, etc.) is not surfaced on the page; confirm before assuming.

## Site map (current live site)

- `/` — single-product landing
- `/products/3-in-1-laser-measuring-tape-tool` — PDP
- `/collections/all` — collection (1 product)
- `/cart`
- `/customer_authentication/redirect` — Shopify customer auth
- `/pages/track-your-order`
- `/policies/privacy-policy`
- `/policies/shipping-policy`
- `/policies/terms-of-service`
- `/policies/refund-policy`

No about, blog, or standalone FAQ pages today. No social-media links surfaced
in the header/footer.
