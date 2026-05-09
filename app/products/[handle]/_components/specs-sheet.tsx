"use client";

import { ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const DISPLAY = "var(--font-bebas)";

type SpecGroup = { group: string; items: { label: string; value: string }[] };

const SPECS: SpecGroup[] = [
  {
    group: "Measurement",
    items: [
      { label: "Laser range", value: "60 m / 196 ft" },
      { label: "Tape length", value: "5 m / 16 ft" },
      { label: "Tape width", value: "19 mm" },
      { label: "Accuracy", value: "±0.5 mm" },
      { label: "Minimum scale", value: "1 mm" },
    ],
  },
  {
    group: "Laser",
    items: [
      { label: "Laser class", value: "Class II · ≤1 mW" },
      { label: "Wavelength", value: "635 nm" },
      { label: "Laser auto-off", value: "30 s" },
      { label: "Device auto-off", value: "180 s" },
    ],
  },
  {
    group: "Modes",
    items: [
      { label: "Modes", value: "Length · Cont. · Area · Vol. · Pyth." },
      { label: "Memory", value: "20 measurements" },
      { label: "Units", value: "m · ft · in" },
      { label: "Benchmarks", value: "Front + rear" },
    ],
  },
  {
    group: "Build",
    items: [
      { label: "Housing", value: "ABS + TPR + manganese steel" },
      { label: "Tape material", value: "65 manganese steel" },
      { label: "Ingress rating", value: "IP54" },
      { label: "Working temp", value: "0–40 °C" },
      { label: "Storage temp", value: "−10 to 50 °C" },
      { label: "Power", value: "2× AAA (replaceable)" },
    ],
  },
];

export function SpecsSheet() {
  return (
    <Sheet>
      <SheetTrigger className="group inline-flex w-full items-center justify-between border border-border bg-card px-5 py-4 text-left transition-colors hover:border-primary">
        <span
          className="text-2xl leading-none tracking-wide text-foreground"
          style={{ fontFamily: DISPLAY }}
        >
          FULL TECH SPECS
        </span>
        <ChevronRight
          className="size-4 text-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
          strokeWidth={2}
        />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto border-border bg-card sm:max-w-md"
      >
        <SheetHeader>
          <SheetTitle
            className="text-3xl tracking-wide text-foreground"
            style={{ fontFamily: DISPLAY }}
          >
            TECH SPECS
          </SheetTitle>
          <SheetDescription className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            3-in-1 Laser Measuring Tape Tool
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-7 px-1 pb-8">
          {SPECS.map((group) => (
            <section key={group.group}>
              <h3
                className="border-b-2 border-primary pb-2 text-xl tracking-wide text-foreground"
                style={{ fontFamily: DISPLAY }}
              >
                {group.group.toUpperCase()}
              </h3>
              <dl className="mt-3 divide-y divide-border">
                {group.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-baseline justify-between gap-3 py-3 text-sm"
                  >
                    <dt className="text-foreground/70">{item.label}</dt>
                    <dd className="text-right font-mono tabular-nums text-foreground">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
