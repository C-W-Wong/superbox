import { ArrowRight, ArrowUpRight, Check, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { BUNDLES } from "@/lib/bundles";
import { formatPrice, priceCents } from "@/lib/money";
import {
  type DisplayReview,
  FALLBACK_AVG,
  FALLBACK_COUNT,
  FALLBACK_REVIEWS,
} from "@/lib/reviews";
import { getProduct } from "@/lib/shopify";
import { HeroVideoPlayer } from "./_components/hero-video-player";
import { HomeFAQ } from "./_components/home-faq";

export const revalidate = 3600;

const PRODUCT_HANDLE = "3-in-1-laser-measuring-tape-tool";

const DISPLAY = "var(--font-bebas)";

export default async function Home() {
  const product = await getProduct(PRODUCT_HANDLE);
  const unitPriceCents = priceCents(product?.priceRange.minVariantPrice.amount);
  const unitWasCents = priceCents(
    product?.compareAtPriceRange.minVariantPrice.amount
  );

  return (
    <>
      <Hero
        unitPriceCents={unitPriceCents}
        unitWasCents={unitWasCents}
        averageRating={FALLBACK_AVG}
        reviewCount={FALLBACK_COUNT}
      />
      <ModesSection />
      <CrossLine />
      <ComparisonHero />
      <Testimonials
        reviews={FALLBACK_REVIEWS}
        averageRating={FALLBACK_AVG}
        reviewCount={FALLBACK_COUNT}
      />
      <Bundles unitPriceCents={unitPriceCents} unitWasCents={unitWasCents} />
      <NewsletterCTA />
      <FinalCTA />
      <HomeFAQ />
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────

function Hero({
  unitPriceCents,
  unitWasCents,
  averageRating,
  reviewCount,
}: {
  unitPriceCents: number;
  unitWasCents: number;
  averageRating: number;
  reviewCount: string;
}) {
  return (
    <section className="relative isolate bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:min-h-[640px]">
        {/* Left copy column */}
        <div className="order-2 flex flex-col justify-center px-6 py-10 md:px-12 lg:order-1 lg:col-span-6 lg:py-16">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            <span className="mr-2 inline-block size-2 bg-primary align-middle" />
            New · {averageRating.toFixed(1)}/5 from {reviewCount} reviews
          </p>
          <h1
            className="mt-5 text-[20vw] leading-[0.85] tracking-tight text-foreground md:text-[12vw] lg:text-[9rem]"
            style={{ fontFamily: DISPLAY }}
          >
            ONE TOOL.
            <br />
            <span className="text-primary">THREE TASKS.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/80 md:text-lg">
            60-meter laser rangefinder. 5-meter steel tape. 90° cross-line laser.
            One body, calibrated to the same answer every time.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <Link
              href={`/products/${PRODUCT_HANDLE}`}
              className="group inline-flex h-14 items-center gap-2 bg-primary px-7 font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground transition-all hover:bg-primary/90 active:translate-y-px"
            >
              Shop the 3-in-1
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
            <div className="font-mono text-sm tabular-nums text-foreground/90">
              <span className="text-base font-semibold">{formatPrice(unitPriceCents)}</span>
              {unitWasCents > unitPriceCents && (
                <span className="ml-2 text-foreground/50 line-through">
                  {formatPrice(unitWasCents)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right product video */}
        <div className="relative order-1 aspect-[4/3] w-full overflow-hidden lg:order-2 lg:col-span-6 lg:aspect-auto">
          <HeroVideoPlayer
            src="/videos/marketing/main-30s-16x9.mp4"
            poster="/images/hero-product-yellow.jpg"
          />
          <div className="absolute bottom-4 right-4 bg-background px-4 py-3 md:bottom-8 md:right-8">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
              Spec
            </p>
            <p
              className="mt-1 text-3xl leading-none tracking-wide text-foreground md:text-4xl"
              style={{ fontFamily: DISPLAY }}
            >
              ±0.5MM · 60M
            </p>
          </div>
        </div>
      </div>

      {/* Bottom hazard strip */}
      <div className="hazard-stripe h-3" aria-hidden />
    </section>
  );
}

// ─── 3-IN-1 MODES ─────────────────────────────────────────────────────────

const MODES = [
  {
    n: "01",
    title: "LASER",
    spec: "60m · 196 ft",
    headline: "Hit-and-read across the room.",
    desc: "Class II 635nm laser. ±0.5mm accuracy. Auto unit conversion. Front and rear benchmarks.",
  },
  {
    n: "02",
    title: "TAPE",
    spec: "5m · 19mm",
    headline: "Tight contact measurements.",
    desc: "65 manganese steel tape. Slip-resistant lock. Stays flat under load. Won't kink on you.",
  },
  {
    n: "03",
    title: "CROSS-LINE",
    spec: "90° · Class II",
    headline: "Hang it level the first time.",
    desc: "Self-leveling vertical and horizontal projection. ±0.3° at 5m. Picture frames, tile, fixtures.",
  },
];

function ModesSection() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div className="border-b border-border px-6 py-10 md:px-12 md:py-12">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          The 3-in-1
        </p>
        <h2
          className="mt-3 text-5xl leading-[0.9] tracking-tight text-foreground md:text-7xl lg:text-8xl"
          style={{ fontFamily: DISPLAY }}
        >
          STOP CARRYING <br />
          <span className="text-foreground/40">THREE</span>{" "}
          <span className="text-primary">TOOLS.</span>
        </h2>
      </div>

      <ul>
        {MODES.map((m) => (
          <li
            key={m.n}
            className="grid grid-cols-1 border-b border-border md:grid-cols-12"
          >
            <div className="flex items-start gap-6 px-6 py-10 md:col-span-2 md:px-12 md:py-16">
              <span
                className="text-7xl leading-none tracking-tight text-primary md:text-8xl"
                style={{ fontFamily: DISPLAY }}
              >
                {m.n}
              </span>
            </div>
            <div className="px-6 py-6 md:col-span-7 md:px-0 md:py-16">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                {m.title} · {m.spec}
              </p>
              <h3
                className="mt-3 text-3xl leading-tight tracking-tight text-foreground md:text-5xl"
                style={{ fontFamily: DISPLAY }}
              >
                {m.headline}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/70">
                {m.desc}
              </p>
            </div>
            <div className="hidden items-center justify-end px-12 py-16 md:col-span-3 md:flex">
              <ArrowUpRight
                className="size-8 text-primary"
                strokeWidth={1.5}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ─── CROSS-LINE FEATURE ───────────────────────────────────────────────────

function CrossLine() {
  return (
    <section className="relative isolate bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Video */}
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/cross-line-demo-v3.jpg"
            className="absolute inset-0 size-full object-cover"
          >
            <source src="/videos/cross-line-loop-v2.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Copy */}
        <div className="flex flex-col justify-center bg-primary px-6 py-12 text-primary-foreground md:px-12 md:py-20">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em]">
            The wedge feature
          </p>
          <h2
            className="mt-4 text-5xl leading-[0.9] tracking-tight md:text-7xl"
            style={{ fontFamily: DISPLAY }}
          >
            HANG IT LEVEL.<br />
            <span className="text-primary-foreground/60">FIRST TRY.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-primary-foreground/80 md:text-lg">
            The 90° cross-line projects a perfect vertical and horizontal guide
            on any surface. Hang frames, align shelves, lay tile — without a
            square.
          </p>
          <ul className="mt-8 space-y-3 text-sm font-semibold">
            <FeatureBullet>Class II 635nm · ≤1 mW</FeatureBullet>
            <FeatureBullet>Self-leveling out of the box</FeatureBullet>
            <FeatureBullet>±0.3° accuracy at 5 meters</FeatureBullet>
          </ul>
        </div>
      </div>
    </section>
  );
}

function FeatureBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <Check
        className="mt-0.5 size-4 shrink-0 text-primary-foreground"
        strokeWidth={3}
      />
      <span>{children}</span>
    </li>
  );
}

// ─── COMPARISON ───────────────────────────────────────────────────────────

function ComparisonHero() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div className="px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            Carry less. Measure more.
          </p>
          <h2
            className="mt-3 text-5xl leading-[0.9] tracking-tight text-foreground md:text-8xl"
            style={{ fontFamily: DISPLAY }}
          >
            REPLACE.<br />
            <span className="text-foreground/40">THREE.</span>{" "}
            <span className="text-primary">TOOLS.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
            One tape, one laser meter, one bubble level — and three chances to
            grab the wrong one. SuperBox does all three jobs from one
            calibrated body.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-6xl">
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-border">
            <Image
              src="/images/comparison-flatlay-v2.jpg"
              alt="Three old tools versus one SuperBox"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────

function StarRow({ count, size = "size-3.5" }: { count: number; size?: string }) {
  return (
    <div className="flex" aria-label={`${count} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${size} ${i <= count ? "fill-primary text-primary" : "fill-transparent text-foreground/25"}`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function Testimonials({
  reviews,
  averageRating,
  reviewCount,
}: {
  reviews: DisplayReview[];
  averageRating: number;
  reviewCount: string;
}) {
  const featured = reviews[0];
  const gridReviews = featured ? reviews.slice(1) : reviews;
  return (
    <section className="relative isolate border-y border-border bg-background">
      {/* Header */}
      <div className="px-6 pt-12 md:px-12 md:pt-16">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          From people who swing hammers
        </p>
        <h2
          className="mt-3 text-5xl leading-[0.9] tracking-tight text-foreground md:text-7xl"
          style={{ fontFamily: DISPLAY }}
        >
          FIELD <span className="text-primary">TESTED.</span>
        </h2>
      </div>

      {/* Aggregate proof band — featured quote + rating */}
      <div className="mt-10 grid grid-cols-1 border-y border-border md:grid-cols-12">
        <div className="flex flex-col justify-center gap-3 border-border px-6 py-8 md:col-span-4 md:border-r md:px-12 md:py-10">
          <div className="flex items-end gap-4">
            <span
              className="text-7xl leading-none tracking-tight text-foreground md:text-8xl"
              style={{ fontFamily: DISPLAY }}
            >
              {averageRating.toFixed(1)}
            </span>
            <span className="pb-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-foreground/60">
              / 5.0
            </span>
          </div>
          <StarRow count={5} size="size-5" />
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">
            <span className="text-foreground">{reviewCount}</span>{" "}
            verified buyers
          </p>
        </div>

        {featured && (
          <figure className="col-span-1 flex flex-col md:col-span-8 md:flex-row">
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden border-b border-border md:aspect-square md:w-[240px] md:border-b-0 md:border-r">
              <Image
                src={featured.photo}
                alt={featured.alt}
                fill
                sizes="(max-width: 768px) 100vw, 240px"
                className="object-cover"
              />
            </div>
            <blockquote className="flex flex-1 flex-col justify-center gap-4 px-6 py-8 md:px-10 md:py-10">
              <StarRow count={featured.stars} size="size-4" />
              <p
                className="text-2xl leading-[1.1] tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl"
                style={{ fontFamily: DISPLAY }}
              >
                &ldquo;{featured.quote}&rdquo;
              </p>
              <figcaption className="flex flex-wrap items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em]">
                <span className="text-foreground">{featured.name}</span>
                <span className="h-px w-6 bg-border" aria-hidden />
                <span className="text-primary">
                  {featured.source === "tiktok" ? "VIA TIKTOK" : "VERIFIED BUYER"}
                </span>
              </figcaption>
            </blockquote>
          </figure>
        )}
      </div>

      {/* lg+ keeps 2 cols and pivots to horizontal layout — photo capped
          near native source width (~240/280px) to avoid upscale blur. */}
      <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2">
        {gridReviews.map((r, i) => (
          <article
            key={`${r.name}-${i}`}
            className="flex flex-col bg-card lg:flex-row"
          >
            <div className="relative aspect-square w-full shrink-0 overflow-hidden lg:aspect-square lg:w-[240px] xl:w-[280px]">
              <Image
                src={r.photo}
                alt={r.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                className="object-cover"
              />
              <span
                className={`absolute left-3 top-3 inline-flex items-center gap-1 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] ${
                  r.source === "tiktok"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background/90 text-foreground backdrop-blur-sm"
                }`}
              >
                {r.source === "tiktok" ? (
                  "TikTok"
                ) : (
                  <>
                    <Check className="size-3" strokeWidth={3} />
                    Verified
                  </>
                )}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
              <StarRow count={r.stars} />
              <p className="text-[15px] leading-relaxed text-foreground/85 md:text-base">
                &ldquo;{r.quote}&rdquo;
              </p>
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3">
                <p className="truncate font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground">
                  {r.name}
                </p>
                <p className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/55">
                  {r.meta}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>


      {/* Footer CTA */}
      <div className="border-t border-border px-6 py-8 md:px-12 md:py-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl font-mono text-xs uppercase tracking-[0.16em] text-foreground/60">
            Reviews pulled from verified buyers and TikTok creators. No paid placements.
          </p>
          <Link
            href={`/products/${PRODUCT_HANDLE}#reviews`}
            className="group inline-flex items-center gap-2 border border-border bg-background px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Read all {reviewCount} reviews
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── BUNDLES ──────────────────────────────────────────────────────────────

function Bundles({
  unitPriceCents,
  unitWasCents,
}: {
  unitPriceCents: number;
  unitWasCents: number;
}) {
  return (
    <section className="relative isolate bg-background">
      <div className="px-6 py-12 md:px-12 md:py-16">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          Bundle &amp; save
        </p>
        <h2
          className="mt-3 text-5xl leading-[0.9] tracking-tight text-foreground md:text-7xl"
          style={{ fontFamily: DISPLAY }}
        >
          ONE FOR YOU.<br />
          <span className="text-foreground/40">TWO FOR THE CREW.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 border-t border-border md:grid-cols-3">
        {BUNDLES.map((bundle, i) => {
          const total = unitPriceCents * bundle.quantity;
          const totalWas = (unitWasCents || unitPriceCents) * bundle.quantity;
          const savings = totalWas - total;
          const popular = bundle.id === "duo";
          return (
            <div
              key={bundle.id}
              className={`relative flex flex-col p-8 md:p-10 ${
                popular
                  ? "bg-primary text-primary-foreground"
                  : "bg-background"
              } ${i > 0 ? "border-t border-border md:border-l md:border-t-0" : ""}`}
            >
              {popular && (
                <span className="absolute right-0 top-0 bg-primary-foreground px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                  Most popular · Free ship
                </span>
              )}
              <p
                className={`font-mono text-[11px] font-semibold uppercase tracking-[0.22em] ${popular ? "text-primary-foreground/80" : "text-primary"}`}
              >
                {bundle.quantity > 1 ? `${formatPrice(unitPriceCents)} each` : "Single unit"}
              </p>
              <h3
                className={`mt-2 text-7xl leading-none tracking-tight md:text-8xl ${popular ? "text-primary-foreground" : "text-foreground"}`}
                style={{ fontFamily: DISPLAY }}
              >
                {bundle.quantity}×
              </h3>
              <div className="mt-6 flex items-baseline gap-2">
                <span
                  className={`font-mono text-3xl font-bold tabular-nums ${popular ? "text-primary-foreground" : "text-foreground"}`}
                >
                  {formatPrice(total)}
                </span>
                {savings > 0 && (
                  <span
                    className={`font-mono text-sm line-through tabular-nums ${popular ? "text-primary-foreground/60" : "text-foreground/40"}`}
                  >
                    {formatPrice(totalWas)}
                  </span>
                )}
              </div>
              {savings > 0 && (
                <p
                  className={`mt-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] ${popular ? "text-primary-foreground" : "text-primary"}`}
                >
                  Save {formatPrice(savings)}
                </p>
              )}

              <ul
                className={`mt-8 flex-1 space-y-3 text-sm ${popular ? "text-primary-foreground/90" : "text-foreground/80"}`}
              >
                <BundleBullet popular={popular}>
                  {bundle.quantity} × 3-in-1 Laser Tape
                </BundleBullet>
                <BundleBullet popular={popular}>
                  {bundle.freeShipping ? "Free worldwide shipping" : "Standard shipping"}
                </BundleBullet>
                <BundleBullet popular={popular}>30-day money-back</BundleBullet>
              </ul>

              <Link
                href={`/products/${PRODUCT_HANDLE}`}
                className={`mt-8 inline-flex h-12 items-center justify-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${
                  popular
                    ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    : "border border-foreground bg-background text-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                Shop {bundle.label.toLowerCase()}
                <ArrowRight className="size-3.5" strokeWidth={2.5} />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function BundleBullet({
  children,
  popular,
}: {
  children: React.ReactNode;
  popular: boolean;
}) {
  return (
    <li className="flex items-start gap-3">
      <Check
        className={`mt-0.5 size-4 shrink-0 ${popular ? "text-primary-foreground" : "text-primary"}`}
        strokeWidth={3}
      />
      <span>{children}</span>
    </li>
  );
}

// ─── NEWSLETTER CTA ───────────────────────────────────────────────────────

function NewsletterCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="mr-2 inline-block size-2 bg-primary align-middle" />
              Stay sharp
            </p>
            <h2
              className="mt-4 text-5xl leading-[0.9] tracking-tight md:text-7xl"
              style={{ fontFamily: DISPLAY }}
            >
              FIRST TO <br />
              <span className="text-primary">KNOW.</span>
            </h2>
          </div>
          <div className="flex flex-col justify-center">
            <p className="max-w-md text-base leading-relaxed text-background/80 md:text-lg">
              New tools, restocks, and the occasional measuring trick straight
              from the workshop. Drop your email — no spam, unsubscribe anytime.
            </p>
            <div className="mt-8">
              <NewsletterForm variant="cta" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
      <div className="hazard-stripe absolute inset-x-0 top-0 h-3" aria-hidden />
      <div className="hazard-stripe absolute inset-x-0 bottom-0 h-3" aria-hidden />
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-16 md:px-12 md:py-24">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em]">
            Ready when you are
          </p>
          <h2
            className="mt-4 text-6xl leading-[0.85] tracking-tight md:text-8xl"
            style={{ fontFamily: DISPLAY }}
          >
            GET <br />
            YOURS.
          </h2>
          <p className="mt-6 max-w-md text-base md:text-lg">
            Free shipping on bundles. 30-day money-back guarantee. Built to
            outlast the warranty.
          </p>
          <Link
            href={`/products/${PRODUCT_HANDLE}`}
            className="mt-8 inline-flex h-14 items-center gap-2 self-start bg-primary-foreground px-7 font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary transition-all hover:bg-primary-foreground/90 active:translate-y-px"
          >
            Shop the 3-in-1
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </Link>
        </div>
        <div className="relative aspect-square w-full overflow-hidden lg:aspect-auto">
          <Image
            src="/images/hero-product-yellow.jpg"
            alt="SuperBox 3-in-1"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
