import { Check, Minus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DISPLAY } from "@/lib/fonts";
import { SectionEyebrow } from "@/components/site/section-eyebrow";

type Column = {
  id: "superbox" | "stanley" | "bosch" | "tape";
  label: string;
  sub: string;
  featured: boolean;
};

const COLUMNS: readonly Column[] = [
  { id: "superbox", label: "SuperBox", sub: "3-in-1", featured: true },
  { id: "stanley", label: "Stanley", sub: "TLM65", featured: false },
  { id: "bosch", label: "Bosch", sub: "GLM 50C", featured: false },
  { id: "tape", label: "Old Tape", sub: "Stanley FatMax", featured: false },
] as const;

type Cell =
  | { type: "yes"; note?: string }
  | { type: "no" }
  | { type: "partial"; note: string }
  | { type: "text"; value: string };

const ROWS: { feature: string; cells: Record<Column["id"], Cell> }[] = [
  {
    feature: "Laser distance",
    cells: {
      superbox: { type: "text", value: "100m" },
      stanley: { type: "text", value: "20m" },
      bosch: { type: "text", value: "50m" },
      tape: { type: "no" },
    },
  },
  {
    feature: "Steel tape (hands-on)",
    cells: {
      superbox: { type: "text", value: "5m" },
      stanley: { type: "no" },
      bosch: { type: "no" },
      tape: { type: "text", value: "8m" },
    },
  },
  {
    feature: "90° cross-line laser",
    cells: {
      superbox: { type: "yes" },
      stanley: { type: "no" },
      bosch: { type: "no" },
      tape: { type: "no" },
    },
  },
  {
    feature: "Accuracy",
    cells: {
      superbox: { type: "text", value: "±0.5mm" },
      stanley: { type: "text", value: "±3mm" },
      bosch: { type: "text", value: "±1.5mm" },
      tape: { type: "text", value: "±1mm" },
    },
  },
  {
    feature: "Area / volume calc",
    cells: {
      superbox: { type: "yes" },
      stanley: { type: "yes" },
      bosch: { type: "yes" },
      tape: { type: "no" },
    },
  },
  {
    feature: "Pythagoras mode",
    cells: {
      superbox: { type: "yes" },
      stanley: { type: "no" },
      bosch: { type: "yes" },
      tape: { type: "no" },
    },
  },
  {
    feature: "20-group memory",
    cells: {
      superbox: { type: "yes" },
      stanley: { type: "no" },
      bosch: { type: "partial", note: "10 only" },
      tape: { type: "no" },
    },
  },
  {
    feature: "Bluetooth / app",
    cells: {
      superbox: { type: "no" },
      stanley: { type: "no" },
      bosch: { type: "yes" },
      tape: { type: "no" },
    },
  },
  {
    feature: "IP rating",
    cells: {
      superbox: { type: "text", value: "IP54" },
      stanley: { type: "text", value: "IP54" },
      bosch: { type: "text", value: "IP54" },
      tape: { type: "no" },
    },
  },
  {
    feature: "Price",
    cells: {
      superbox: { type: "text", value: "$54.95" },
      stanley: { type: "text", value: "$79" },
      bosch: { type: "text", value: "$129" },
      tape: { type: "text", value: "$24" },
    },
  },
];

function CellView({ cell, featured }: { cell: Cell; featured: boolean }) {
  if (cell.type === "yes") {
    return (
      <div
        className={cn(
          "flex items-center justify-center",
          featured ? "text-primary" : "text-foreground/80"
        )}
      >
        <Check className="size-5" strokeWidth={2.5} />
      </div>
    );
  }
  if (cell.type === "no") {
    return (
      <div className="flex items-center justify-center text-foreground/30">
        <X className="size-5" strokeWidth={2.5} />
      </div>
    );
  }
  if (cell.type === "partial") {
    return (
      <div className="flex flex-col items-center justify-center gap-1 text-foreground/60">
        <Minus className="size-4" strokeWidth={2.5} />
        <span className="font-mono text-[9px] uppercase tracking-widest">
          {cell.note}
        </span>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "text-center font-mono text-sm font-bold tabular-nums",
        featured ? "text-foreground" : "text-foreground/70"
      )}
    >
      {cell.value}
    </div>
  );
}

export function PDPComparison() {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="mb-10 max-w-2xl md:mb-14">
          <SectionEyebrow>How it stacks up</SectionEyebrow>
          <h2
            className="mt-5 text-5xl uppercase leading-[0.9] tracking-tight md:text-6xl"
            style={{ fontFamily: DISPLAY }}
          >
            One tool replaces
            <br />
            <span className="text-primary">three separate buys.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base text-foreground/70 md:text-lg">
            Side-by-side with the laser-only competition and your old tape
            measure. Same job, fewer tools.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th className="bg-foreground/[0.02] px-4 py-4 text-left font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/60">
                  Feature
                </th>
                {COLUMNS.map((col) => (
                  <th
                    key={col.id}
                    className={cn(
                      "px-4 py-4 text-center",
                      col.featured
                        ? "bg-primary text-primary-foreground"
                        : "bg-foreground/[0.02]"
                    )}
                  >
                    <div
                      className={cn(
                        "text-2xl uppercase tracking-tight",
                        col.featured ? "text-primary-foreground" : "text-foreground"
                      )}
                      style={{ fontFamily: DISPLAY }}
                    >
                      {col.label}
                    </div>
                    <div
                      className={cn(
                        "mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em]",
                        col.featured
                          ? "text-primary-foreground/80"
                          : "text-foreground/50"
                      )}
                    >
                      {col.sub}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, idx) => (
                <tr
                  key={row.feature}
                  className={cn(
                    "border-t border-border",
                    idx === ROWS.length - 1 ? "border-b" : ""
                  )}
                >
                  <th
                    scope="row"
                    className="bg-foreground/[0.02] px-4 py-4 text-left text-sm font-medium text-foreground"
                  >
                    {row.feature}
                  </th>
                  {COLUMNS.map((col) => (
                    <td
                      key={col.id}
                      className={cn(
                        "px-4 py-4",
                        col.featured ? "bg-primary/[0.06]" : ""
                      )}
                    >
                      <CellView cell={row.cells[col.id]} featured={col.featured} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/50">
          Competitor specs sourced from manufacturer datasheets · Updated 2026
        </p>
      </div>
    </section>
  );
}
