import { History, TrendingUp } from "lucide-react";
import { RECENT_EARNINGS } from "@/data/ads";

/** Recent earnings timeline built from dummy data. */
export function EarningsTimeline() {
  return (
    <section className="rounded-3xl border border-border/70 bg-card-gradient p-5 shadow-soft sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold">
          <History className="size-5 text-primary" />
          Recent Earnings
        </h2>
        <span className="rounded-full bg-primary/12 px-2.5 py-1 text-xs font-semibold text-primary">
          Last 24 hours
        </span>
      </div>

      <ul className="mt-5 space-y-3">
        {RECENT_EARNINGS.map((entry, index) => (
          <li
            key={entry.id}
            className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background/40 px-4 py-3 transition-colors duration-300 hover:border-primary/35 animate-fade-up"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <TrendingUp className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{entry.label}</p>
                <p className="text-xs text-muted-foreground">{entry.time}</p>
              </div>
            </div>
            <span className="shrink-0 text-sm font-bold text-gold">+{entry.amount} VEs</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
