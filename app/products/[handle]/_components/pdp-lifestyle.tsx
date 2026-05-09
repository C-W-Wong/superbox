import { LazyVideo } from "./lazy-video";
import { DISPLAY } from "@/lib/fonts";
import { SectionEyebrow } from "@/components/site/section-eyebrow";

const USE_CASES = [
  {
    src: "/videos/pdp/kitchen-ceiling.mp4",
    poster: "/videos/pdp/kitchen-ceiling-poster.jpg",
    n: "01",
    title: "Kitchen Reach",
    caption: "Measure ceilings & high fixtures without dragging out a ladder.",
  },
  {
    src: "/videos/pdp/wall-tall.mp4",
    poster: "/videos/pdp/wall-tall-poster.jpg",
    n: "02",
    title: "Tall Walls",
    caption: "100m laser hits any wall — instant readout, even on stairwells.",
  },
  {
    src: "/videos/pdp/wood-stud.mp4",
    poster: "/videos/pdp/wood-stud-poster.jpg",
    n: "03",
    title: "Studs & Lumber",
    caption: "5m steel tape for hands-on framing, trim, and bench work.",
  },
];

const PROBLEMS = [
  "Tape blade buckles before you reach the mark",
  "Chasing the end across long distances by yourself",
  "Reading 1/16\" marks while balancing on a ladder",
  "Re-doing math because you wrote it down wrong",
];

export function PDPLifestyle() {
  return (
    <>
      <BuiltForProsSection />
      <FedUpSection />
      <StillGuessingSection />
    </>
  );
}

function BuiltForProsSection() {
  return (
    <section className="bg-foreground text-background">
      <div className="hazard-stripe h-3" aria-hidden />
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="mb-10 max-w-2xl md:mb-14">
          <SectionEyebrow>Field-tested · Real customers</SectionEyebrow>
          <h2
            className="mt-5 text-5xl uppercase leading-[0.9] tracking-tight md:text-7xl"
            style={{ fontFamily: DISPLAY }}
          >
            Built for Pros.
            <br />
            <span className="text-primary">Perfect for DIY.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base text-background/70 md:text-lg">
            One tool that earns its place in a contractor&apos;s belt and a
            homeowner&apos;s drawer. Same accuracy. Same calibration. Both worlds.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-background/15 sm:grid-cols-3">
          {USE_CASES.map((u) => (
            <article key={u.title} className="bg-foreground">
              <div className="relative aspect-[3/4] overflow-hidden">
                <LazyVideo
                  src={u.src}
                  poster={u.poster}
                  className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute left-3 top-3 bg-primary px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground">
                  {u.n}
                </div>
              </div>
              <div className="border-t border-background/10 p-5 md:p-6">
                <h3
                  className="text-2xl uppercase tracking-tight md:text-3xl"
                  style={{ fontFamily: DISPLAY }}
                >
                  {u.title}
                </h3>
                <p className="mt-2 text-sm text-background/70">{u.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FedUpSection() {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="relative mx-auto w-full max-w-md md:order-2 md:mx-0 md:max-w-none">
            <div className="relative aspect-[9/16] overflow-hidden bg-foreground/5 md:aspect-auto md:h-full md:min-h-[600px]">
              <LazyVideo
                src="/videos/pdp/tiktok-review.mp4"
                poster="/videos/pdp/tiktok-review-poster.jpg"
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute left-3 top-3 flex items-center gap-2 bg-foreground px-3 py-1.5 text-background">
                <span className="size-1.5 animate-pulse bg-primary" aria-hidden />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]">
                  Real Customer · TikTok
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center md:order-1">
            <SectionEyebrow>The Problem</SectionEyebrow>
            <h2
              className="mt-5 text-5xl uppercase leading-[0.9] tracking-tight md:text-6xl lg:text-7xl"
              style={{ fontFamily: DISPLAY }}
            >
              Fed up with slipping,
              <br />
              <span className="text-primary">bending tape measures?</span>
            </h2>
            <ul className="mt-8 space-y-4 text-base md:text-lg">
              {PROBLEMS.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span
                    className="mt-2 inline-block size-2 shrink-0 bg-primary"
                    aria-hidden
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 border-l-2 border-primary py-2 pl-4 text-lg italic text-foreground/80 md:text-xl">
              The SuperBox 3-in-1 fixes all four — at the same time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StillGuessingSection() {
  const stats = [
    { v: "100m", l: "Laser Range" },
    { v: "±0.5mm", l: "Accuracy" },
    { v: "5m", l: "Steel Tape" },
    { v: "20", l: "Memory Slots" },
  ];

  return (
    <section className="bg-foreground text-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="flex flex-col justify-center">
            <SectionEyebrow>The Solution</SectionEyebrow>
            <h2
              className="mt-5 text-5xl uppercase leading-[0.9] tracking-tight md:text-6xl lg:text-7xl"
              style={{ fontFamily: DISPLAY }}
            >
              Still guessing your
              <br />
              <span className="text-primary">measurements?</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-background/80 md:text-xl">
              Hit the button. Read the screen. Done. No squinting at 1/16&quot;
              marks. No two-person hand-offs.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-px bg-background/15">
              {stats.map((s) => (
                <div key={s.l} className="bg-foreground py-5 pl-5 pr-4 md:py-6 md:pl-6">
                  <p
                    className="text-4xl tracking-tight text-primary md:text-5xl"
                    style={{ fontFamily: DISPLAY }}
                  >
                    {s.v}
                  </p>
                  <p className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background/60">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md md:mx-0 md:max-w-none">
            <div className="relative aspect-[9/16] overflow-hidden bg-background/5 md:aspect-auto md:h-full md:min-h-[600px]">
              <LazyVideo
                src="/videos/pdp/product-showcase.mp4"
                poster="/videos/pdp/product-showcase-poster.jpg"
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute right-3 top-3 bg-primary px-3 py-1.5 text-primary-foreground">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]">
                  3-in-1 · Hands-on
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hazard-stripe h-3" aria-hidden />
    </section>
  );
}
