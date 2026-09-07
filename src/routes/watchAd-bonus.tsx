import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Flame, Gift, Sparkles, Timer, Zap } from "lucide-react";
import { StatCard } from "@/components/watch-ads/StatCard";

export const Route = createFileRoute("/watchAd-bonus")({
  head: () => ({
    meta: [
      { title: "Bonus Rewards – Earn 2x VEs | VELOOP Rewards" },
      {
        name: "description",
        content:
          "Claim limited-time bonus advertisements on VELOOP Rewards and earn double VELOOP Earn Tokens before the timer runs out.",
      },
      { property: "og:title", content: "Bonus Rewards – Earn 2x VEs | VELOOP Rewards" },
      {
        property: "og:description",
        content: "Limited-time double reward advertisements on the VELOOP Rewards platform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BonusPage,
});

const BONUS_ADS = [
  { id: "b1", title: "Bonus Advertisement 1", reward: 76, duration: 30, multiplier: "2x" },
  { id: "b2", title: "Bonus Advertisement 2", reward: 60, duration: 45, multiplier: "2x" },
  { id: "b3", title: "Bonus Advertisement 3", reward: 45, duration: 25, multiplier: "3x" },
];

function BonusPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[1400px] space-y-8 px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Watch Ads
        </Link>

        <section className="relative overflow-hidden rounded-3xl border border-gold/30 bg-hero-gradient p-6 shadow-soft sm:p-10 animate-fade-up">
          <span className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-gold/20 blur-3xl" />
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
            <Flame className="size-3.5" />
            Limited-Time Event
          </span>
          <h1 className="relative mt-4 font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Bonus Ads · <span className="text-gold-gradient">Double Your VEs</span>
          </h1>
          <p className="relative mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            For the next few hours every bonus advertisement pays multiplied VELOOP Earn Tokens.
            Rewards are credited instantly and convert to real cash just like regular earnings.
          </p>
          <p className="relative mt-5 inline-flex items-center gap-2 rounded-xl border border-gold/30 bg-background/40 px-3 py-2 text-sm font-semibold text-gold animate-reward-glow">
            <Timer className="size-4" />
            Ends in 04h 26m 12s
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard icon={Gift} label="Bonus Ads Left" value={3} tone="gold" />
          <StatCard icon={Zap} label="Bonus VEs Earned" value={340} suffix="VEs" tone="earn" delay={80} />
          <StatCard icon={Sparkles} label="Current Multiplier" value={2} suffix="x" tone="accent" delay={160} />
        </section>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {BONUS_ADS.map((ad, index) => (
            <article
              key={ad.id}
              className="group rounded-3xl border border-gold/25 bg-card-gradient p-5 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-gold animate-fade-up"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-gold-gradient text-gold-foreground">
                  <Gift className="size-6" />
                </span>
                <span className="rounded-full bg-gold/15 px-2.5 py-1 text-xs font-bold text-gold">
                  {ad.multiplier} Reward
                </span>
              </div>
              <h2 className="mt-4 text-lg font-semibold">{ad.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{ad.duration} Seconds</p>
              <p className="mt-3 font-display text-2xl font-bold text-gold-gradient">
                +{ad.reward} VEs
              </p>
              <button
                type="button"
                className="mt-4 w-full rounded-xl bg-gold-gradient px-4 py-3 text-sm font-semibold text-gold-foreground transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
              >
                Watch Bonus Ad
              </button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
