import {
  BookOpen,
  Clock,
  CheckCircle2,
  Coins,
  Gamepad2,
  Lock,
  Plane,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { AdCategory, Advertisement } from "@/data/ads";
import { WatchAdButton } from "./WatchAdButton";
import { cn } from "@/lib/utils";

const CATEGORY_ICON: Record<AdCategory, LucideIcon> = {
  Shopping: ShoppingBag,
  Finance: Wallet,
  Gaming: Gamepad2,
  Travel: Plane,
  Food: UtensilsCrossed,
  Education: BookOpen,
};

const STATUS_LABEL = {
  available: "Available",
  watching: "Watching",
  completed: "Completed",
  locked: "Locked",
} as const;

interface AdCardProps {
  ad: Advertisement;
  progress: number;
  onWatch: (ad: Advertisement) => void;
  index: number;
}

/** Premium advertisement card: illustration, reward badge, status and CTA. */
export function AdCard({ ad, progress, onWatch, index }: AdCardProps) {
  const Icon = CATEGORY_ICON[ad.category];

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card-gradient p-5 shadow-soft transition-all duration-300 animate-fade-up",
        ad.status !== "locked" && "hover:-translate-y-1.5 hover:border-primary/45 hover:shadow-glow",
        ad.status === "locked" && "opacity-70",
      )}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      {ad.bonus ? (
        <span className="absolute right-7 top-7 z-10 flex items-center gap-1 whitespace-nowrap rounded-full bg-gold-gradient px-2.5 py-1 text-[11px] font-bold text-gold-foreground animate-reward-glow">
          <Sparkles className="size-3" />
          Bonus Ad
        </span>
      ) : null}

      {/* Advertisement illustration */}
      <div className="relative mb-4 flex h-32 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-background/50">
        <div className="absolute inset-0 opacity-40 bg-hero-gradient" aria-hidden />
        <span className="relative flex size-16 items-center justify-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/25 transition-transform duration-500 group-hover:scale-110 animate-float">
          <Icon className="size-8" />
        </span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {ad.title} · {ad.category}
        </p>
        <span
          className={cn(
            "flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
            ad.status === "available" && "bg-primary/15 text-primary",
            ad.status === "watching" && "bg-info/15 text-info",
            ad.status === "completed" && "bg-primary/15 text-primary",
            ad.status === "locked" && "bg-muted text-muted-foreground",
          )}
        >
          {ad.status === "completed" ? <CheckCircle2 className="size-3" /> : null}
          {ad.status === "locked" ? <Lock className="size-3" /> : null}
          {STATUS_LABEL[ad.status]}
        </span>
      </div>

      <h3 className="mt-1 text-lg font-semibold">{ad.brand}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{ad.description}</p>

      <div className="mt-4 flex items-center justify-between rounded-2xl border border-border/60 bg-background/40 px-3 py-2.5">
        <span className="flex items-center gap-2 text-sm font-bold text-gold">
          <Coins className="size-4" />+{ad.reward} VEs
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" />
          {ad.duration} Seconds
        </span>
      </div>

      <div className="mt-4">
        <WatchAdButton status={ad.status} progress={progress} onWatch={() => onWatch(ad)} />
      </div>
    </article>
  );
}
