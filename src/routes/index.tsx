import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Coins, Filter, PlayCircle, Sparkles, Target, TrendingUp } from "lucide-react";
import { ADVERTISEMENTS, EARNINGS_SUMMARY, type Advertisement, type AdStatus } from "@/data/ads";
import { HeroSection } from "@/components/watch-ads/HeroSection";
import { StatCard } from "@/components/watch-ads/StatCard";
import { AdCard } from "@/components/watch-ads/AdCard";
import { AdCardSkeleton } from "@/components/watch-ads/AdCardSkeleton";
import { InfoCards, TrustBanner } from "@/components/watch-ads/InfoCards";
import { BonusBanner } from "@/components/watch-ads/BonusBanner";
import { EarningsTimeline } from "@/components/watch-ads/EarningsTimeline";
import { EmptyState, RewardSuccess } from "@/components/watch-ads/StatesPanels";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Watch Ads & Earn VEs | VELOOP Rewards" },
      {
        name: "description",
        content:
          "Watch short advertisements on VELOOP Rewards, earn VELOOP Earn Tokens (VEs) instantly and convert them into real cash withdrawn to your bank account.",
      },
      { property: "og:title", content: "Watch Ads & Earn VEs | VELOOP Rewards" },
      {
        property: "og:description",
        content:
          "A premium rewards experience: watch ads, track daily progress and turn your VEs into real cash.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WatchAdsPage,
});

type FilterKey = "all" | "available" | "completed" | "bonus";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All Ads" },
  { key: "available", label: "Available" },
  { key: "completed", label: "Completed" },
  { key: "bonus", label: "Bonus" },
];

function WatchAdsPage() {
  const [ads, setAds] = useState<Advertisement[]>(ADVERTISEMENTS);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [activeAdId, setActiveAdId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [reward, setReward] = useState<number | null>(null);
  const [todayEarnings, setTodayEarnings] = useState(EARNINGS_SUMMARY.todayEarnings);
  const [lifetime, setLifetime] = useState(EARNINGS_SUMMARY.lifetimeEarnings);
  const [watchedToday, setWatchedToday] = useState(EARNINGS_SUMMARY.completedAdsToday);

  /** Simulated ad loading so the skeleton state is visible. */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  /** Drives the playback progress of the advertisement being watched. */
  useEffect(() => {
    if (!activeAdId) return;
    const ad = ads.find((item) => item.id === activeAdId);
    if (!ad) return;

    const interval = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) return 100;
        return current + 5;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [activeAdId, ads]);

  /** Credits the reward once playback reaches 100%. */
  useEffect(() => {
    if (!activeAdId || progress < 100) return;
    const ad = ads.find((item) => item.id === activeAdId);
    if (!ad) return;

    const timer = setTimeout(() => {
      setAds((current) =>
        current.map((item) =>
          item.id === ad.id ? { ...item, status: "completed" as AdStatus } : item,
        ),
      );
      setTodayEarnings((value) => value + ad.reward);
      setLifetime((value) => value + ad.reward);
      setWatchedToday((value) => value + 1);
      setReward(ad.reward);
      setActiveAdId(null);
      setProgress(0);
    }, 250);

    return () => clearTimeout(timer);
  }, [progress, activeAdId, ads]);

  const handleWatch = (ad: Advertisement) => {
    if (activeAdId) return;
    setActiveAdId(ad.id);
    setProgress(0);
    setAds((current) =>
      current.map((item) =>
        item.id === ad.id ? { ...item, status: "watching" as AdStatus } : item,
      ),
    );
  };

  const visibleAds = useMemo(() => {
    if (filter === "available") return ads.filter((ad) => ad.status === "available");
    if (filter === "completed") return ads.filter((ad) => ad.status === "completed");
    if (filter === "bonus") return ads.filter((ad) => ad.bonus);
    return ads;
  }, [ads, filter]);

  const availableCount = ads.filter((ad) => ad.status === "available").length;
  const remainingAds = Math.max(EARNINGS_SUMMARY.availableAds - watchedToday, 0);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[1600px] space-y-8 px-4 py-8 sm:px-6 lg:px-10 lg:py-12 2xl:max-w-[1800px]">
        <HeroSection
          todayEarnings={todayEarnings}
          lifetimeEarnings={lifetime}
          availableAds={availableCount}
          totalAdsCompleted={EARNINGS_SUMMARY.totalAdsCompleted + (watchedToday - EARNINGS_SUMMARY.completedAdsToday)}
        />

        {/* Statistics */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={TrendingUp}
            label="Today's Earnings"
            value={todayEarnings}
            suffix="VEs"
            hint={`≈ ₹${(todayEarnings / EARNINGS_SUMMARY.vesPerRupee).toFixed(2)} in cash`}
            tone="earn"
          />
          <StatCard
            icon={Coins}
            label="Total VEs Earned"
            value={lifetime}
            suffix="VEs"
            hint="Lifetime balance"
            tone="gold"
            delay={80}
          />
          <StatCard
            icon={PlayCircle}
            label="Ads Watched Today"
            value={watchedToday}
            hint="Keep your streak alive"
            tone="info"
            delay={160}
          />
          <StatCard
            icon={Target}
            label="Remaining Ads"
            value={remainingAds}
            hint="Refreshes at midnight"
            tone="accent"
            delay={240}
          />
        </section>

        <BonusBanner />

        {/* Available ads list */}
        <section className="space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
                <Sparkles className="size-5 text-primary" />
                Available Advertisements
              </h2>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="size-4" />
                Watch each ad completely to receive your VEs instantly.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Filter className="size-3.5" />
                Filter
              </span>
              {FILTERS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setFilter(item.key)}
                  className={cn(
                    "rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all duration-300",
                    filter === item.key
                      ? "border-primary/45 bg-primary/15 text-primary"
                      : "border-border/70 bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => <AdCardSkeleton key={index} />)
            ) : visibleAds.length === 0 ? (
              <EmptyState onReset={() => setFilter("all")} />
            ) : (
              visibleAds.map((ad, index) => (
                <AdCard
                  key={ad.id}
                  ad={ad}
                  index={index}
                  progress={ad.id === activeAdId ? progress : 0}
                  onWatch={handleWatch}
                />
              ))
            )}
          </div>
        </section>

        {/* Reward information */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold">How Your Rewards Work</h2>
          <InfoCards />
          <TrustBanner />
        </section>

        <EarningsTimeline />

        <footer className="pb-4 pt-2 text-center text-xs text-muted-foreground">
          VELOOP Rewards · Watch Ads Module · Dummy data used for demonstration purposes.
        </footer>
      </div>

      {reward !== null ? <RewardSuccess amount={reward} onClose={() => setReward(null)} /> : null}
    </main>
  );
}
