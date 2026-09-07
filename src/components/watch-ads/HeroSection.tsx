import { Coins, Flame, PlayCircle, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { EARNINGS_SUMMARY } from "@/data/ads";
import { useCountUp } from "@/hooks/useCountUp";

interface HeroSectionProps {
  todayEarnings: number;
  lifetimeEarnings: number;
  availableAds: number;
  totalAdsCompleted: number;
}

/** Premium hero: headline, live balances and the daily earnings progress ring. */
export function HeroSection({
  todayEarnings,
  lifetimeEarnings,
  availableAds,
  totalAdsCompleted,
}: HeroSectionProps) {
  const lifetime = useCountUp(lifetimeEarnings);
  const today = useCountUp(todayEarnings);
  const goalPercent = Math.min(Math.round((todayEarnings / EARNINGS_SUMMARY.dailyGoal) * 100), 100);
  const ringProgress = useCountUp(goalPercent, 1400);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-hero-gradient p-6 shadow-soft sm:p-8 lg:p-10 animate-fade-up">
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/3 size-72 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />

      <div className="relative grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" />
            VELOOP Rewards · Earning Module
          </span>

          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Watch Ads &amp; <span className="text-earn-gradient">Earn VEs</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Every advertisement you watch adds VELOOP Earn Tokens to your wallet. Convert them into
            real cash and withdraw straight to your linked bank account.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <HeroStat
              icon={Coins}
              label="Total VEs Earned"
              value={lifetime.toLocaleString("en-IN")}
            />
            <HeroStat icon={TrendingUp} label="Today's Earnings" value={`${today} VEs`} />
            <HeroStat icon={PlayCircle} label="Available Ads" value={String(availableAds)} />
            <HeroStat
              icon={Flame}
              label="Ads Completed"
              value={totalAdsCompleted.toLocaleString("en-IN")}
            />
          </div>

          <p className="mt-5 inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/40 px-3 py-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" />
            Secure, verified advertisers · Rewards credited instantly
          </p>
        </div>

        {/* Daily earnings progress */}
        <div className="rounded-3xl border border-border/70 bg-background/45 p-6 backdrop-blur">
          <p className="text-sm font-semibold">Daily Earnings Progress</p>
          <p className="text-xs text-muted-foreground">
            Goal: {EARNINGS_SUMMARY.dailyGoal} VEs per day
          </p>

          <div className="mt-5 flex items-center gap-5">
            <div
              className="relative grid size-28 shrink-0 place-items-center rounded-full"
              style={{
                background: `conic-gradient(var(--primary) ${ringProgress * 3.6}deg, var(--muted) 0deg)`,
              }}
              role="progressbar"
              aria-valuenow={goalPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Daily earnings progress"
            >
              <div className="grid size-[5.5rem] place-items-center rounded-full bg-background">
                <span className="font-display text-xl font-bold">{ringProgress}%</span>
              </div>
            </div>
            <div className="min-w-0 space-y-2 text-sm">
              <p>
                <span className="font-bold text-primary">{todayEarnings} VEs</span>
                <span className="text-muted-foreground"> earned today</span>
              </p>
              <p className="text-muted-foreground">
                {Math.max(EARNINGS_SUMMARY.dailyGoal - todayEarnings, 0)} VEs left to hit your daily
                goal.
              </p>
              <p className="text-xs text-muted-foreground">
                Weekly total: {EARNINGS_SUMMARY.weeklyEarnings.toLocaleString("en-IN")} VEs
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Coins;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-background/40 p-3">
      <Icon className="size-4 text-primary" />
      <p className="mt-2 truncate font-display text-lg font-bold">{value}</p>
      <p className="truncate text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}
