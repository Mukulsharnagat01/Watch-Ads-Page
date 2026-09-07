import { useState, type MouseEvent } from "react";
import { CheckCircle2, Loader2, Lock, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AdStatus } from "@/data/ads";

interface WatchAdButtonProps {
  status: AdStatus;
  progress?: number;
  onWatch: () => void;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

/**
 * Premium CTA with hover, loading, disabled, completed states and a ripple effect.
 */
export function WatchAdButton({ status, progress = 0, onWatch }: WatchAdButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const disabled = status !== "available";

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ripple = { id: Date.now(), x: event.clientX - rect.left, y: event.clientY - rect.top };
    setRipples((current) => [...current, ripple]);
    setTimeout(() => setRipples((current) => current.filter((r) => r.id !== ripple.id)), 600);
    onWatch();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-label={
        status === "completed"
          ? "Advertisement already watched"
          : status === "locked"
            ? "Advertisement locked"
            : "Watch advertisement"
      }
      className={cn(
        "relative w-full overflow-hidden rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        status === "available" &&
          "bg-earn-gradient text-primary-foreground hover:shadow-glow hover:brightness-110 active:scale-[0.98]",
        status === "watching" && "cursor-wait bg-primary/20 text-primary",
        status === "completed" && "cursor-not-allowed bg-primary/12 text-primary",
        status === "locked" && "cursor-not-allowed bg-muted text-muted-foreground",
      )}
    >
      {status === "watching" && (
        <span
          className="absolute inset-y-0 left-0 bg-primary/25 transition-[width] duration-200"
          style={{ width: `${progress}%` }}
          aria-hidden
        />
      )}

      <span className="relative flex items-center justify-center gap-2">
        {status === "available" && (
          <>
            <Play className="size-4 fill-current" />
            Watch Advertisement
          </>
        )}
        {status === "watching" && (
          <>
            <Loader2 className="size-4 animate-spin" />
            Playing… {progress}%
          </>
        )}
        {status === "completed" && (
          <>
            <CheckCircle2 className="size-4" />
            Reward Claimed
          </>
        )}
        {status === "locked" && (
          <>
            <Lock className="size-4" />
            Unlocks in 2 hrs
          </>
        )}
      </span>

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute size-2 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-primary-foreground/50"
          style={{ left: ripple.x, top: ripple.y }}
          aria-hidden
        />
      ))}
    </button>
  );
}
