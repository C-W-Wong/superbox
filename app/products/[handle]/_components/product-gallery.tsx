"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Maximize2, X } from "lucide-react";
import type { ShopifyProduct, ShopifyImage } from "@/lib/shopify";
import { cn } from "@/lib/utils";

type Props = {
  product: ShopifyProduct;
  variantId: string;
};

export function ProductGallery({ product, variantId }: Props) {
  const variant = product.variants.find((v) => v.id === variantId);
  const variantImageUrl = variant?.image?.url;
  const images = product.images;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!variantImageUrl) return;
    const idx = images.findIndex((img) => img.url === variantImageUrl);
    if (idx >= 0) setSelectedIndex(idx);
  }, [variantImageUrl, images]);

  if (!images.length) {
    return <div className="aspect-square w-full bg-muted" />;
  }

  const selected = images[selectedIndex] ?? images[0];

  return (
    <>
      <div className="md:sticky md:top-32 md:self-start">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label="Open zoomed view"
          className="group relative block aspect-square w-full overflow-hidden bg-muted"
        >
          <Image
            key={selected.url}
            src={selected.url}
            alt={selected.altText ?? product.title}
            width={selected.width}
            height={selected.height}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <span className="pointer-events-none absolute right-3 top-3 inline-flex size-9 items-center justify-center bg-background/85 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            <Maximize2 className="size-4" strokeWidth={2} />
          </span>
        </button>
        {images.length > 1 && (
          <div className="mt-2 grid grid-cols-5 gap-2">
            {images.slice(0, 5).map((img, i) => (
              <button
                key={img.url}
                type="button"
                onClick={() => setSelectedIndex(i)}
                className={cn(
                  "aspect-square overflow-hidden bg-muted transition-all",
                  i === selectedIndex
                    ? "ring-2 ring-primary"
                    : "opacity-60 hover:opacity-100"
                )}
                aria-label={`View image ${i + 1}`}
              >
                <Image
                  src={img.url}
                  alt=""
                  width={img.width}
                  height={img.height}
                  sizes="120px"
                  className="size-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          startIndex={selectedIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: ShopifyImage[];
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight")
        setIndex((i) => Math.min(images.length - 1, i + 1));
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, images.length]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!zoomed) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin({ x, y });
  }

  const img = images[index];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95 p-2 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute right-4 top-4 z-10 inline-flex size-10 items-center justify-center bg-background text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        <X className="size-5" strokeWidth={2.5} />
      </button>

      <div
        className={cn(
          "relative max-h-[90vh] max-w-[90vw] cursor-zoom-in overflow-hidden touch-pan-y",
          zoomed && "cursor-zoom-out"
        )}
        onClick={() => setZoomed((v) => !v)}
        onMouseMove={handleMove}
      >
        <Image
          src={img.url}
          alt={img.altText ?? ""}
          width={img.width}
          height={img.height}
          sizes="90vw"
          className={cn(
            "h-auto max-h-[90vh] w-auto max-w-[90vw] object-contain transition-transform duration-300",
            zoomed ? "scale-[2]" : "scale-100"
          )}
          style={
            zoomed
              ? { transformOrigin: `${origin.x}% ${origin.y}%` }
              : undefined
          }
        />
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 bg-background/90 px-3 py-2 backdrop-blur-sm">
          {images.map((im, i) => (
            <button
              key={im.url}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
                setZoomed(false);
              }}
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={cn(
                "size-2 transition-colors",
                i === index ? "bg-primary" : "bg-foreground/30 hover:bg-foreground/60"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
