import { cn } from "@/lib/utils";

export function SectionEyebrow({
  withDot = true,
  tone = "primary",
  className,
  children,
}: {
  withDot?: boolean;
  tone?: "primary" | "primary-foreground";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] font-bold uppercase tracking-[0.22em]",
        tone === "primary" ? "text-primary" : "text-primary-foreground",
        className
      )}
    >
      {withDot && (
        <span
          className={cn(
            "mr-2 inline-block size-2 align-middle",
            tone === "primary" ? "bg-primary" : "bg-primary-foreground"
          )}
        />
      )}
      {children}
    </p>
  );
}
