# Design

Visual and UX direction for the SuperBox headless storefront. Sourced from a
Gemini 3.1 Pro consult on the live Shopify-default site (2026-05-08), refined
in conversation. Update when the brand position, palette, or page specs change.

Tech surface for everything below: Next.js (App Router) + Tailwind CSS +
shadcn/ui + `next/image` + Framer Motion. Backend is Shopify Storefront API
(cart, checkout, inventory only).

## Brand position

**"DeWalt meets DJI."** Pro-grade precision instrument, not a gadget.

Two trust signals running in parallel:
- **Pro contractors** — industrial spec confidence, IP rating, drop resistance
- **DIY enthusiasts** — "won't ruin your project" reassurance, simplicity, social proof

The current live site reads like a generic dropshipping theme (giant logo
hero, embedded text in JPEGs, Chinese characters in collection filters,
typo on the hero asset). The rebuild has to *look* like a real brand to
charge $54.95 for a tape measure.

## Visual identity

### Typography

- **Headlines / UI:** Söhne. Fallback: Inter, tight-tracked.
- **Specs / measurements:** JetBrains Mono — used **exclusively** for laser
  readouts, technical specs, prices, and any numeric callout. The mono
  treatment subconsciously signals "calibration and data."
- **Body:** Söhne or Inter at appropriate weight. Never use mono for body.

### Color system

| Role           | Hex       | Usage |
| -------------- | --------- | ----- |
| Background     | `#F8FAFC` | All page backgrounds. Cleaner than pure white. |
| Brand dark     | `#0F172A` | Primary text and structural blocks |
| Action         | `#EAB308` | ATC, primary buttons, star ratings — matches the yellow product variant |
| Laser callout  | `#EF4444` | **Only** for laser-mimic micro-interactions (1px border on active bundle, hero scan animation). Never for buttons. |
| Variant blue   | `#0284C7` | Color swatch + secondary accent |
| Variant yellow | `#EAB308` | Color swatch + same as Action (intentional) |

Tailwind mapping: `slate-50`, `slate-900`, `yellow-500`, `red-500`, `sky-600`.

### Photography & 3D

- **Hero:** clean 3D studio renders with dramatic side-lighting. **No
  embedded text or trust badges in the image.** Trust signals belong in the
  DOM.
- **Context:** gritty in-context shots — contractor's hand on drywall or
  timber, depth of field
- **Spec visualization:** exploded-view diagrams with line callouts in
  JetBrains Mono labels
- **The cross-line laser:** *do not photograph it.* Use a 5-second muted MP4
  of the tool projecting onto a wall while a person aligns picture frames.
  This is the wedge feature; static photos won't sell it.

### Iconography

- Lucide-react. 2px stroke, sharp corners (not rounded).
- Commission 4 custom icons for the digital-display modes — Pythagorean,
  Area, Volume, Line — standard libraries don't cover these accurately.

### Motion (Framer Motion)

- **High-value:** number ticker animating the savings amount when a bundle
  is selected
- **Subtle:** 1px red line sweeping left-to-right across the main product
  image once on page load (laser-scan mimic)
- Avoid generic fade/slide motion that makes the site feel like a template

## Reference brands

- **Ridge Wallet** — single-SKU bundle UI on the PDP. Borrow their bundle-
  card hierarchy and the way they push savings.
- **Peak Design** — tech-spec accordions and the way they mix lifestyle
  photography with hyper-nerdy material callouts.

## Page specs

### Homepage

**Above the fold (50/50 split):**
- Left: muted, looping 3-second `<video>` of the tape extending and the
  laser hitting a wall
- Right: H1 "Measure Everything. Carry One Tool." + reviews strip (4.7/5,
  900+) + yellow primary CTA "Shop SuperBox"

**Sections in order:**
1. **3-in-1 Breakdown** — large centered image with three pulsing hot-spots
   (tape, rangefinder, cross-line). Clicking one updates a side panel.
2. **Pro vs DIY tabs** — shadcn Tabs. "For the Job Site" (IP54, drop
   resistance) vs "For the Home" (90° laser for picture-hanging).
3. **UGC social proof** — 3×3 grid of customer videos.

**Mobile:** video moves below the headline; Tabs become a vertical accordion.

### PDP — the conversion engine

**Above the fold:**
- Left column (sticky on desktop): image gallery. Mobile: swipeable carousel
  with pagination dots — *not* a vertical stack — so the buy box stays above
  fold.
- Right column (scrollable): Title → price → variant swatches (color
  circles with active ring) → bundle selector → ATC → trust strip.

**Sections in order:**
1. **Bundle selector** — shadcn Radio Group, 3 vertical cards. The 2-pack
   is visually larger with a yellow border and a "Most Popular + Free
   Shipping" badge straddling the top edge.
2. **The 90° cross-line demo** — 5-second muted MP4, not a photo.
3. **Trust + policy strip** — icon row directly under ATC: 30-day returns,
   1–3 day processing, free shipping over $75 (and on the 2/3-pack).
4. **Comparison vs traditional tape** — short table or before/after framing.
5. **Specs drawer** — shadcn Sheet triggered from "View Full Technical
   Specs". Keeps 635nm-laser-class detail off the main page for DIYers but
   accessible for pros.
6. **Reviews** — 4.7/5 anchored, themes surfaced ("convenient", "accurate",
   "everything in one").
7. **FAQ** — outdoor performance, durability, battery, units, warranty.

**Key interactions:**
- Color swatch click → image gallery swaps to that variant's photos, ATC
  text updates
- Bundle radio click → price + savings ticker animates (Framer Motion);
  free-shipping badge appears on 2/3-pack
- Mobile: fixed bottom ATC bar (`fixed bottom-0 w-full bg-white border-t
  p-4 z-50`) appears once the user scrolls past the in-flow buy box

### Collection / shop page

We have 1 SKU today; design for 3–10 SKUs without looking empty.

- **Top half:** full-width feature of the SuperBox tool (not a 1-cell grid)
- **Below:** bundles as visually distinct cards ("The Pro Kit (2×)") so
  they read as merchandised options, not just SKU variations
- **Bottom:** 2 ghost cards with silhouetted images — "Heavy-Duty Carrying
  Case (Coming Soon)" and "Rechargeable Battery Pack (Coming Soon)" — to
  make the catalog look bigger and prime customers for accessories

When real accessories ship, ghost cards become live products and the layout
scales naturally.

## Out of scope (for now)

- **Rebrand.** Gemini argued "SuperBox" fights the precision-tool
  positioning (sounds like an Android TV box, meal kit, or plastic
  container). Real point — but a name change is a separate business
  decision.
- **`/` → PDP redirect.** Gemini suggested skipping the homepage entirely
  until there are more SKUs. We're keeping the homepage; killing it would
  surrender SEO surface, brand storytelling, and content-marketing room.

## Build order

Highest-leverage items first, ordered by ROI for a single-SKU rebuild:

1. **Headless cart + Shopify Checkout handoff** — Storefront API cart
   creation, redirect to Shopify Checkout. Without this, none of the UI
   matters.
2. **PDP buy-box** — variant swatches + bundle radio + price/savings
   state + ATC. The single component where conversion happens.
3. **Mobile sticky ATC bar** — Framer Motion `useScroll` trigger after the
   in-flow buy-box scrolls past.
4. **Image gallery + laser demo video** — `next/image` + HTML5 video,
   priority load on hero.
5. **Trust + policy strip** — hardcoded icon row under ATC.
6. **Specs drawer** — shadcn Sheet for technical detail.
7. **Homepage** — 50/50 hero + Pro/DIY tabs + UGC grid.
8. **Collection page** — feature-led layout with bundles + ghost cards.
