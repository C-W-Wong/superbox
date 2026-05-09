const DISPLAY = "var(--font-bebas)";

export function ProductDescription({ html }: { html: string }) {
  if (!html?.trim()) return null;

  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-3xl px-4 py-12 md:px-8 md:py-16">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
          The detail
        </p>
        <h2
          className="mt-2 text-4xl leading-[0.9] tracking-tight text-foreground md:text-5xl"
          style={{ fontFamily: DISPLAY }}
        >
          ABOUT THIS TOOL
        </h2>
        <div
          className="mt-8 max-w-none text-foreground/85 [&_a]:text-primary [&_a]:underline [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:my-1 [&_p]:my-3 [&_p]:leading-relaxed [&_strong]:text-foreground [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </section>
  );
}
