"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import {
  subscribeAction,
  type SubscribeState,
} from "@/lib/newsletter-actions";
import { DISPLAY } from "@/lib/fonts";
import { HoneyField } from "@/components/site/honey-field";
import { SectionEyebrow } from "@/components/site/section-eyebrow";

const STORAGE_KEY = "sb_exit_intent_dismissed";
const DISCOUNT_CODE = "SUPER10";
const MIN_DELAY_MS = 5000;

const INITIAL: SubscribeState = { status: "idle" };

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(subscribeAction, INITIAL);
  const pathname = usePathname();
  const enabled = useMemo(
    () =>
      !pathname?.startsWith("/cart") && !pathname?.startsWith("/checkout"),
    [pathname]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!enabled) return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;

    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, MIN_DELAY_MS);

    function handleMouseLeave(e: MouseEvent) {
      if (!armed) return;
      if (e.clientY > 0) return;
      if (e.relatedTarget) return;
      trigger();
    }

    let lastY = window.scrollY;
    let lastT = Date.now();
    function handleScroll() {
      if (!armed) return;
      const y = window.scrollY;
      const t = Date.now();
      const dy = y - lastY;
      const dt = t - lastT;
      const velocity = dy / Math.max(dt, 1);
      if (velocity < -1.6 && y < 200) {
        trigger();
      }
      lastY = y;
      lastT = t;
    }

    function trigger() {
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      setOpen(true);
    }

    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.clearTimeout(armTimer);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [enabled]);

  function dismiss() {
    setOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, "1");
    }
  }

  useEffect(() => {
    if (state.status === "success" && typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, "1");
    }
  }, [state.status]);

  if (!open) return null;

  const submitted = state.status === "success";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      onClick={dismiss}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden border-2 border-primary bg-background"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center text-foreground/60 transition-colors hover:text-foreground"
        >
          <X className="size-5" strokeWidth={2.5} />
        </button>

        <div className="hazard-stripe h-3" aria-hidden />

        <div className="px-6 pt-8 pb-7 md:px-10 md:pt-10">
          <SectionEyebrow>Wait — before you go</SectionEyebrow>

          {submitted ? (
            <>
              <h2
                id="exit-intent-title"
                className="mt-4 text-5xl uppercase leading-[0.9] tracking-tight text-foreground md:text-6xl"
                style={{ fontFamily: DISPLAY }}
              >
                You&rsquo;re in.
              </h2>
              <p className="mt-4 text-base text-foreground/80 md:text-lg">
                Use this code at checkout for 10% off:
              </p>
              <div className="mt-5 border-2 border-foreground bg-foreground/[0.04] p-4 text-center">
                <p
                  className="text-5xl tracking-[0.15em] text-primary md:text-6xl"
                  style={{ fontFamily: DISPLAY }}
                >
                  {DISCOUNT_CODE}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/60">
                  10% off · One-time use · Bundles included
                </p>
              </div>
              <button
                type="button"
                onClick={dismiss}
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 bg-primary font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition-all hover:bg-primary/90"
              >
                Keep shopping
                <ArrowRight className="size-3.5" strokeWidth={3} />
              </button>
            </>
          ) : (
            <>
              <h2
                id="exit-intent-title"
                className="mt-4 text-5xl uppercase leading-[0.9] tracking-tight text-foreground md:text-6xl"
                style={{ fontFamily: DISPLAY }}
              >
                Take <span className="text-primary">10% off.</span>
              </h2>
              <p className="mt-4 text-base text-foreground/80 md:text-lg">
                Drop your email — we&rsquo;ll send a code you can use right now.
                Plus future tool drops &amp; restocks. No spam.
              </p>

              <form action={formAction} noValidate className="mt-6">
                <input type="hidden" name="source" value="exit-intent" />
                <div className="flex flex-col gap-3 sm:flex-row">
                  <label className="sr-only" htmlFor="exit-email">
                    Email address
                  </label>
                  <input
                    id="exit-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="you@email.com"
                    disabled={pending}
                    className="h-12 w-full min-w-0 border border-border bg-background px-3 font-mono text-xs uppercase tracking-[0.12em] text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none disabled:opacity-60"
                  />
                  <HoneyField />
                  <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex h-12 shrink-0 items-center justify-center gap-2 bg-primary px-6 font-mono text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition-all hover:bg-primary/90 active:translate-y-px disabled:opacity-60"
                  >
                    {pending ? "Sending..." : "Get my code"}
                    {!pending && (
                      <ArrowRight className="size-3.5" strokeWidth={3} />
                    )}
                  </button>
                </div>
                {state.status === "error" && (
                  <p
                    className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-destructive"
                    role="alert"
                  >
                    {state.message}
                  </p>
                )}
              </form>

              <button
                type="button"
                onClick={dismiss}
                className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/50 hover:text-foreground/80"
              >
                No thanks, I&rsquo;ll pay full price
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
