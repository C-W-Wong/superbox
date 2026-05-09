import type { Metadata } from "next";
import { Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Track your order — SuperBox",
};

const DISPLAY = "var(--font-bebas)";

export default function TrackOrderPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12 md:px-8 md:py-20">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
        Order tracking
      </p>
      <h1
        className="mt-2 text-5xl leading-[0.9] tracking-tight text-foreground md:text-7xl"
        style={{ fontFamily: DISPLAY }}
      >
        TRACK YOUR ORDER
      </h1>
      <p className="mt-4 text-base text-foreground/80">
        Enter the tracking number from your shipping confirmation email.
      </p>

      <form
        action="https://parcelsapp.com/en/tracking/"
        method="GET"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 space-y-4"
      >
        <div>
          <label
            htmlFor="tracking"
            className="block font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-primary"
          >
            Tracking number
          </label>
          <div className="mt-2 flex w-full border border-border bg-card transition-colors focus-within:border-primary">
            <input
              id="tracking"
              name="t"
              type="text"
              required
              placeholder="e.g. 1Z999AA10123456784"
              className="w-full bg-transparent px-4 py-3 font-mono text-sm tabular-nums text-foreground outline-none placeholder:text-foreground/40"
            />
            <button
              type="submit"
              className="border-l border-border px-4 text-foreground/60 transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Track shipment"
            >
              <Send className="size-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </form>

      <div className="mt-12 border border-border bg-card p-6">
        <h2
          className="text-2xl tracking-wide text-foreground"
          style={{ fontFamily: DISPLAY }}
        >
          NO TRACKING NUMBER?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground/80">
          Tracking numbers arrive by email within 1–3 business days of placing
          your order. If it has been longer, email{" "}
          <a
            href="mailto:info@superboxbrand.com"
            className="text-primary underline transition-colors hover:text-foreground"
          >
            info@superboxbrand.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
