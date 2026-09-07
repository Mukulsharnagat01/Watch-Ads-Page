/**
 * Dummy data for the Watch Ads page.
 * No backend integration is required for this task, so all values below are
 * realistic placeholders used across the hero, stats and ad list sections.
 */

export type AdStatus = "available" | "watching" | "completed" | "locked";

export type AdCategory = "Shopping" | "Finance" | "Gaming" | "Travel" | "Food" | "Education";

export interface Advertisement {
  id: string;
  title: string;
  brand: string;
  category: AdCategory;
  /** Reward paid in VEs (VELOOP Earn Tokens). */
  reward: number;
  /** Ad length in seconds. */
  duration: number;
  status: AdStatus;
  /** Marks limited-time high reward ads. */
  bonus?: boolean;
  description: string;
}

export const ADVERTISEMENTS: Advertisement[] = [
  {
    id: "ad-01",
    title: "Advertisement 1",
    brand: "NovaMart Mega Sale",
    category: "Shopping",
    reward: 38,
    duration: 30,
    status: "available",
    bonus: true,
    description: "Festive shopping deals with up to 70% off across every category.",
  },
  {
    id: "ad-02",
    title: "Advertisement 2",
    brand: "PayNest Wallet",
    category: "Finance",
    reward: 20,
    duration: 45,
    status: "available",
    description: "Instant UPI transfers, zero fees and secure bank-grade encryption.",
  },
  {
    id: "ad-03",
    title: "Advertisement 3",
    brand: "Arcade Rush",
    category: "Gaming",
    reward: 15,
    duration: 20,
    status: "available",
    description: "A new season of tournaments with daily in-game reward drops.",
  },
  {
    id: "ad-04",
    title: "Advertisement 4",
    brand: "SkyRoute Travel",
    category: "Travel",
    reward: 26,
    duration: 35,
    status: "available",
    description: "Flat discounts on domestic flights and curated weekend getaways.",
  },
  {
    id: "ad-05",
    title: "Advertisement 5",
    brand: "FreshBowl Kitchen",
    category: "Food",
    reward: 18,
    duration: 25,
    status: "completed",
    description: "Chef-crafted meals delivered hot within thirty minutes.",
  },
  {
    id: "ad-06",
    title: "Advertisement 6",
    brand: "SkillForge Academy",
    category: "Education",
    reward: 30,
    duration: 40,
    status: "locked",
    description: "Industry-mentored courses in development, design and data.",
  },
];

/** Headline account figures shown in the hero and statistics cards. */
export const EARNINGS_SUMMARY = {
  todayEarnings: 96,
  lifetimeEarnings: 12450,
  weeklyEarnings: 1260,
  availableAds: 12,
  completedAdsToday: 5,
  totalAdsCompleted: 486,
  dailyGoal: 250,
  /** Conversion rate used to preview cash value: 100 VEs = ₹1. */
  vesPerRupee: 100,
  minimumWithdrawal: 5000,
};

export interface TimelineEntry {
  id: string;
  label: string;
  amount: number;
  time: string;
}

export const RECENT_EARNINGS: TimelineEntry[] = [
  { id: "t1", label: "FreshBowl Kitchen", amount: 18, time: "12 min ago" },
  { id: "t2", label: "Daily streak bonus", amount: 25, time: "1 hr ago" },
  { id: "t3", label: "PayNest Wallet", amount: 20, time: "3 hrs ago" },
  { id: "t4", label: "Arcade Rush", amount: 15, time: "5 hrs ago" },
  { id: "t5", label: "NovaMart Mega Sale", amount: 18, time: "Yesterday" },
];
