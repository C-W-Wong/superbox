import { Star } from "lucide-react";

export function StarRow({
  count,
  size = "size-3.5",
}: {
  count: number;
  size?: string;
}) {
  return (
    <div className="flex" aria-label={`${count} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${size} ${i <= count ? "fill-primary text-primary" : "fill-transparent text-foreground/25"}`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}
