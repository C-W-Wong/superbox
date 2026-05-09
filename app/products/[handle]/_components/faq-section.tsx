"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const DISPLAY = "var(--font-bebas)";

const FAQS = [
  {
    q: "Does the laser work outdoors in bright sunlight?",
    a: "Yes. For distances over 30m in direct sun, use a target plate (sold separately) or measure against a darker surface for sharper laser visibility.",
  },
  {
    q: "Can I switch between metric and imperial mid-measurement?",
    a: "Hold the unit button for one second. The display flips between meters, feet, and inches without resetting your reading or the 20 stored measurements.",
  },
  {
    q: "How long do the batteries last?",
    a: "Two replaceable AAA batteries last about 30,000 measurements. The device auto-shuts after 180 seconds of inactivity to preserve power.",
  },
  {
    q: "How accurate is the 90° cross-line laser?",
    a: "Better than ±0.3° at 5m — sufficient for hanging frames, aligning shelves, and tiling. For fine carpentry over 5m, pair with a digital level.",
  },
  {
    q: "Is it durable enough for job sites?",
    a: "IP54 rated for dust and water splash. ABS+TPR housing survives most drops, and the 65 manganese steel tape resists kinking.",
  },
  {
    q: "What's in the box?",
    a: "The 3-in-1 tool, two AAA batteries, a wrist strap, a quick-start card, and the SuperBox 30-day money-back guarantee.",
  },
];

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="border-t border-border bg-background">
      <div className="px-6 py-12 md:px-12 md:py-16">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          Frequently asked
        </p>
        <h2
          className="mt-3 text-5xl leading-[0.9] tracking-tight text-foreground md:text-7xl"
          style={{ fontFamily: DISPLAY }}
        >
          ASKED. <span className="text-primary">ANSWERED.</span>
        </h2>
      </div>

      <div className="border-t border-border">
        {FAQS.map((faq, index) => {
          const isActive = activeIndex === index;
          return (
            <div key={index} className="border-b border-border">
              <button
                type="button"
                onClick={() => setActiveIndex(isActive ? null : index)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-muted md:px-12 md:py-7"
                aria-expanded={isActive}
              >
                <h3
                  className={`text-xl leading-tight tracking-wide transition-colors md:text-3xl ${isActive ? "text-primary" : "text-foreground"}`}
                  style={{ fontFamily: DISPLAY }}
                >
                  {faq.q}
                </h3>
                <ChevronDown
                  className={`size-5 shrink-0 transition-all ${isActive ? "rotate-180 text-primary" : "text-foreground/60"}`}
                  strokeWidth={2}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-3xl px-6 pb-6 text-sm leading-relaxed text-foreground/80 md:px-12 md:pb-7 md:text-base">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
