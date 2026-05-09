"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

type Props = {
  src: string;
  poster: string;
  className?: string;
};

export function HeroVideoPlayer({ src, poster, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    if (!next && v.paused) {
      v.play().catch(() => {
        /* user-gesture required failure handled silently */
      });
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        className={className ?? "absolute inset-0 size-full object-cover"}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-4 left-4 inline-flex h-10 items-center gap-2 bg-background/85 px-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-foreground backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground md:bottom-8 md:left-8"
      >
        {muted ? (
          <>
            <VolumeX className="size-3.5" strokeWidth={2} />
            <span>Unmute</span>
          </>
        ) : (
          <>
            <Volume2 className="size-3.5" strokeWidth={2} />
            <span>Mute</span>
          </>
        )}
      </button>
    </>
  );
}
