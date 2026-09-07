import { Link } from "@tanstack/react-router";
import { ArrowRight, Gift, Timer } from "lucide-react";

/** Limited-time bonus banner linking to the dedicated bonus page. */
export function BonusBanner() {
  return (
    <Link
      to="/watchAd-bonus"
      className="group flex flex-col gap-4 overflow-hidden rounded-3xl border border-gold/30 bg-card-gradient p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-gold sm:flex-row sm:items-center sm:justify-between sm:p-6"
    >
      <div className="flex items-center gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gold-gradient text-gold-foreground animate-reward-glow">
          <Gift className="size-6" />
        </span>
        <div>
          <p className="font-display text-lg font-bold">
            Limited-Time Bonus: <span className="text-gold-gradient">Earn 2x VEs</span>
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Timer className="size-4 text-gold" />
            Double rewards on bonus advertisements. Ends in 04h 26m.
          </p>
        </div>
      </div>
      <span className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold-gradient px-4 py-2.5 text-sm font-semibold text-gold-foreground transition-transform duration-300 group-hover:translate-x-1">
        Claim Bonus <ArrowRight className="size-4" />
      </span>
    </Link>
  );
}
