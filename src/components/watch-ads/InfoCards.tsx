import { ArrowRight, Banknote, Coins, ShieldCheck, Wallet } from "lucide-react";
import { EARNINGS_SUMMARY } from "@/data/ads";

/** Reward information cards: how VEs work, cash conversion and withdrawals. */
export function InfoCards() {
  const items = [
    {
      icon: Coins,
      title: "Earn VEs Instantly",
      body: "Every completed advertisement credits VELOOP Earn Tokens (VEs) to your wallet the moment the ad finishes.",
    },
    {
      icon: Banknote,
      title: "Convert To Real Cash",
      body: `Your VEs convert into real money at ${EARNINGS_SUMMARY.vesPerRupee} VEs = ₹1. Today's balance is already worth real value.`,
    },
    {
      icon: Wallet,
      title: "Withdraw To Your Bank",
      body: `Withdraw to your linked bank account once you cross the minimum balance of ${EARNINGS_SUMMARY.minimumWithdrawal.toLocaleString("en-IN")} VEs.`,
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={item.title}
          className="group rounded-3xl border border-border/70 bg-card-gradient p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 animate-fade-up"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/25 transition-transform duration-300 group-hover:scale-110">
            <item.icon className="size-5" />
          </span>
          <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{item.body}</p>
        </div>
      ))}
    </section>
  );
}

/** Trust banner reinforcing platform security and payout reliability. */
export function TrustBanner() {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-primary/25 bg-primary/8 p-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="flex items-center gap-3 text-sm text-muted-foreground">
        <ShieldCheck className="size-5 shrink-0 text-primary" />
        All rewards are verified and processed through VELOOP's secure payout system. Withdrawals
        are usually settled within 24 hours.
      </p>
      <span className="flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-primary">
        Payout policy <ArrowRight className="size-4" />
      </span>
    </div>
  );
}
