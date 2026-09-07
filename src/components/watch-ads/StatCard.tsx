import type { LucideIcon } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  hint?: string;
  tone?: "earn" | "gold" | "info" | "accent";
  delay?: number;
}

const toneRing: Record<NonNullable<StatCardProps["tone"]>, string> = {
  earn: "text-primary bg-primary/12 ring-primary/25",
  gold: "text-gold bg-gold/12 ring-gold/25",
  info: "text-info bg-info/12 ring-info/25",
  accent: "text-accent bg-accent/12 ring-accent/25",
};

/** Statistics tile with an animated counter. */
export function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  hint,
  tone = "earn",
  delay = 0,
}: StatCardProps) {
  const animated = useCountUp(value);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card-gradient p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 font-display text-2xl font-bold sm:text-3xl">
            {animated.toLocaleString("en-IN")}
            {suffix ? <span className="ml-1 text-base text-muted-foreground">{suffix}</span> : null}
          </p>
          {hint ? <p className="mt-1 truncate text-xs text-muted-foreground">{hint}</p> : null}
        </div>
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110",
            toneRing[tone],
          )}
        >
          <Icon className="size-5" />
        </span>
      </div>
    </div>
  );
}
