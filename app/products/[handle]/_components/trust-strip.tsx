import { Package, RotateCcw, Truck } from "lucide-react";

const items = [
  { icon: RotateCcw, label: "30-Day Returns" },
  { icon: Package, label: "Ships 1–3 Days" },
  { icon: Truck, label: "Free Ship $75+" },
];

export function TrustStrip() {
  return (
    <ul className="mt-8 grid grid-cols-3 gap-px border border-border bg-border">
      {items.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="flex flex-col items-center gap-2 bg-background px-2 py-4 text-center"
        >
          <Icon className="size-4 text-primary" strokeWidth={2} />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-foreground/80">
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}
