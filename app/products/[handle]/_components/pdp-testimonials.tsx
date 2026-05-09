"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import {
  type DisplayReview,
  FALLBACK_AVG,
  FALLBACK_COUNT,
  FALLBACK_REVIEWS,
} from "@/lib/reviews";
import { cn } from "@/lib/utils";
import { DISPLAY } from "@/lib/fonts";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { StarRow } from "@/components/site/star-row";

type FilterId = "all" | "verified" | "tiktok" | "five";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "verified", label: "Verified" },
  { id: "tiktok", label: "TikTok" },
  { id: "five", label: "5 ★" },
];

export function PDPTestimonials({
  reviews = FALLBACK_REVIEWS,
  averageRating = FALLBACK_AVG,
  reviewCount = FALLBACK_COUNT,
}: {
  reviews?: DisplayReview[];
  averageRating?: number;
  reviewCount?: string;
}) {
  const [filter, setFilter] = useState<FilterId>("all");

  const filtered = useMemo(() => {
    switch (filter) {
      case "verified":
        return reviews.filter((r) => r.source === "verified");
      case "tiktok":
        return reviews.filter((r) => r.source === "tiktok");
      case "five":
        return reviews.filter((r) => r.stars === 5);
      default:
        return reviews;
    }
  }, [filter, reviews]);

  const counts = useMemo(
    () => ({
      all: reviews.length,
      verified: reviews.filter((r) => r.source === "verified").length,
      tiktok: reviews.filter((r) => r.source === "tiktok").length,
      five: reviews.filter((r) => r.stars === 5).length,
    }),
    [reviews]
  );

  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <SectionEyebrow>1,000+ happy customers</SectionEyebrow>
            <h2
              className="mt-4 text-5xl uppercase leading-[0.9] tracking-tight text-foreground md:text-6xl"
              style={{ fontFamily: DISPLAY }}
            >
              From people who
              <br />
              <span className="text-primary">swing hammers.</span>
            </h2>
            <div className="mt-8 flex items-end gap-4">
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
            <p className="mt-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">
              <span className="text-foreground">{reviewCount}</span> verified buyers
            </p>

            <div
              className="mt-8 flex flex-wrap gap-2"
              role="tablist"
              aria-label="Filter reviews"
            >
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "inline-flex h-9 items-center gap-2 px-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors",
                    filter === f.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-foreground/[0.04] text-foreground hover:bg-foreground/10"
                  )}
                >
                  <span>{f.label}</span>
                  <span className="text-[10px] opacity-70">{counts[f.id]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-8">
            {filtered.length === 0 ? (
              <p className="text-foreground/60">No reviews match this filter.</p>
            ) : (
              <ReviewsCarousel reviews={filtered} filterKey={filter} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewsCarousel({
  reviews,
  filterKey,
}: {
  reviews: DisplayReview[];
  filterKey: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [pageInfo, setPageInfo] = useState({ current: 1, total: 1 });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      setAtStart(el.scrollLeft <= 1);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
      const total = Math.max(1, Math.round(el.scrollWidth / el.clientWidth));
      const current = Math.min(
        total,
        Math.round(el.scrollLeft / el.clientWidth) + 1
      );
      setPageInfo({ current, total });
    };

    update();
    el.scrollTo({ left: 0 });
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [filterKey, reviews.length]);

  const scrollByPage = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const showNav = !(atStart && atEnd);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p
          className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/55 md:hidden"
          aria-live="polite"
        >
          Swipe ·{" "}
          <span className="tabular-nums text-foreground">
            {pageInfo.current}/{pageInfo.total}
          </span>
        </p>
        <p
          className="hidden font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/55 md:block"
          aria-live="polite"
        >
          <span className="tabular-nums text-foreground">
            {pageInfo.current}/{pageInfo.total}
          </span>
        </p>
        <div
          className={cn(
            "hidden gap-2 md:flex",
            !showNav && "pointer-events-none opacity-0"
          )}
        >
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            disabled={atStart}
            aria-label="Previous reviews"
            className="inline-flex size-9 items-center justify-center bg-foreground/[0.04] text-foreground transition-colors hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-foreground/[0.04] disabled:hover:text-foreground"
          >
            <ChevronLeft className="size-4" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            disabled={atEnd}
            aria-label="Next reviews"
            className="inline-flex size-9 items-center justify-center bg-foreground/[0.04] text-foreground transition-colors hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-foreground/[0.04] disabled:hover:text-foreground"
          >
            <ChevronRight className="size-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="-mx-4 flex snap-x snap-mandatory gap-px overflow-x-auto bg-border px-4 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r, i) => (
          <article
            key={`${r.name}-${i}`}
            className="flex shrink-0 basis-[85%] snap-start flex-col bg-background sm:basis-1/2 md:basis-1/3"
          >
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={r.photo}
                alt={r.alt}
                fill
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 280px"
                className="object-cover"
              />
              <span
                className={cn(
                  "absolute left-2 top-2 inline-flex items-center gap-1 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em]",
                  r.source === "tiktok"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background/90 text-foreground backdrop-blur-sm"
                )}
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
            <div className="flex flex-1 flex-col gap-2 p-4">
              <StarRow count={r.stars} />
              <p className="text-sm leading-relaxed text-foreground/85">
                &ldquo;{r.quote}&rdquo;
              </p>
              <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-2">
                <p className="truncate font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground">
                  {r.name}
                </p>
                <p className="shrink-0 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/55">
                  {r.meta}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
