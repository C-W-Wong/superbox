"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQS = [
  {
    q: "How does the laser stay accurate at 60 meters?",
    a: "A 635nm Class II laser diode is calibrated to ±0.5mm at the factory. The dual-benchmark sensor compensates for body tilt, and the auto-shutoff at 30 seconds preserves the diode for the long haul.",
  },
  {
    q: "Can the cross-line laser replace a square?",
    a: "For most hanging, tiling, and alignment work — yes. The 90° cross-line projects accurate to ±0.3° at 5 meters. For fine carpentry past 5 meters, pair it with a digital level.",
  },
  {
    q: "Will it survive a drop on a job site?",
    a: "Yes. IP54 rated for dust and water splash. ABS+TPR housing absorbs shock; the manganese-steel tape resists kinking under typical job-site abuse.",
  },
  {
    q: "How do I switch between metric and imperial?",
    a: "Hold the unit button for one second. The display flips between meters, feet, and inches without resetting your reading or the 20 stored measurements.",
  },
  {
    q: "What's in the box?",
    a: "The 3-in-1 tool, two AAA batteries, a wrist strap, a quick-start card, and the SuperBox 30-day money-back guarantee.",
  },
];

const DISPLAY = "var(--font-bebas)";

export function HomeFAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="relative isolate bg-background">
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
                className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left transition-colors hover:bg-muted md:px-12 md:py-8"
                aria-expanded={isActive}
              >
                <h3
                  className={`text-2xl leading-tight tracking-wide transition-colors md:text-4xl ${isActive ? "text-primary" : "text-foreground"}`}
                  style={{ fontFamily: DISPLAY }}
                >
                  {faq.q}
                </h3>
                <ChevronDown
                  className={`size-6 shrink-0 transition-all ${isActive ? "rotate-180 text-primary" : "text-foreground/60"}`}
                  strokeWidth={2}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-3xl px-6 pb-8 text-base leading-relaxed text-foreground/80 md:px-12 md:text-lg">
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
