"use client";

import { useEffect, useState } from "react";
import { Eye, ShoppingBag } from "lucide-react";

function dailySeed() {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function hourSeed() {
  const d = new Date();
  return dailySeed() * 100 + d.getHours();
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function viewerCount(): number {
  const rnd = mulberry32(hourSeed());
  return 14 + Math.floor(rnd() * 18);
}

function soldToday(): number {
  const rnd = mulberry32(dailySeed());
  return 88 + Math.floor(rnd() * 102);
}

export function SocialProofWidget() {
  const [viewing, setViewing] = useState<number | null>(null);

  useEffect(() => {
    setViewing(viewerCount());
    const wiggle = window.setInterval(() => {
      setViewing((v) => {
        if (v === null) return v;
        const drift = Math.random() < 0.5 ? -1 : 1;
        const next = Math.max(8, Math.min(34, v + drift));
        return next === v ? v : next;
      });
    }, 12000);
    return () => window.clearInterval(wiggle);
  }, []);

  if (viewing === null) return null;
  const sold = soldToday();

  return (
    <div
      className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border border-border bg-foreground/[0.03] px-4 py-3"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2">
        <span
          className="size-2 animate-pulse bg-emerald-500"
          aria-hidden
        />
        <Eye className="size-3.5 text-foreground/70" strokeWidth={2} />
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] tabular-nums text-foreground">
          {viewing}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70">
          viewing now
        </span>
      </div>
      <span className="hidden h-3 w-px bg-border sm:block" aria-hidden />
      <div className="flex items-center gap-2">
        <ShoppingBag className="size-3.5 text-foreground/70" strokeWidth={2} />
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] tabular-nums text-foreground">
          {sold}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70">
          sold today
        </span>
      </div>
    </div>
  );
}
