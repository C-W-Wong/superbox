import { Crosshair, MousePointerClick, MonitorCheck } from "lucide-react";
import { DISPLAY } from "@/lib/fonts";
import { SectionEyebrow } from "@/components/site/section-eyebrow";

const STEPS = [
  {
    n: "01",
    Icon: MousePointerClick,
    title: "Press Once",
    desc: "One button cycles between laser, tape, and cross-line. No menus, no apps, no learning curve.",
    detail: "Glove-friendly · One-thumb operation",
  },
  {
    n: "02",
    Icon: Crosshair,
    title: "Aim & Hold",
    desc: "Class II 635nm beam hits up to 100m. Front and rear benchmarks let you measure from either end of the body.",
    detail: "±0.5mm accuracy · Outdoor-visible beam",
  },
  {
    n: "03",
    Icon: MonitorCheck,
    title: "Read & Save",
    desc: "Backlit screen shows the result instantly. Tap to save — 20 readings stored in memory for the whole job.",
    detail: "Auto unit convert · No notebook required",
  },
];

export function PDPHowItWorks() {
  return (
    <section className="bg-foreground text-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="mb-10 max-w-2xl md:mb-14">
          <SectionEyebrow>Three taps · Done</SectionEyebrow>
          <h2
            className="mt-5 text-5xl uppercase leading-[0.9] tracking-tight md:text-6xl"
            style={{ fontFamily: DISPLAY }}
          >
            How it works.
            <br />
            <span className="text-primary">No manual needed.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px bg-background/15 md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.n} className="bg-foreground p-6 md:p-8">
              <div className="flex items-start justify-between">
                <span
                  className="text-7xl leading-none tracking-tight text-primary md:text-8xl"
                  style={{ fontFamily: DISPLAY }}
                >
                  {step.n}
                </span>
                <step.Icon
                  className="size-10 text-background/40"
                  strokeWidth={1.5}
                />
              </div>
              <h3
                className="mt-8 text-3xl uppercase tracking-tight md:text-4xl"
                style={{ fontFamily: DISPLAY }}
              >
                {step.title}
              </h3>
              <p className="mt-3 text-base text-background/75 md:text-lg">
                {step.desc}
              </p>
              <p className="mt-6 border-l-2 border-primary pl-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background/55">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
