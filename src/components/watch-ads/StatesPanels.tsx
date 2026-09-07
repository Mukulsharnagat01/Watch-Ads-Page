import { CheckCircle2, Inbox, PartyPopper, Sparkles } from "lucide-react";

/** Shown when no advertisements match the active filter. */
export function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card-gradient p-10 text-center animate-fade-up">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground animate-float">
        <Inbox className="size-8" />
      </span>
      <h3 className="mt-4 font-display text-lg font-bold">No Ads Available</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        You have watched everything in this category. New advertisements are added every few hours —
        check back soon to keep earning VEs.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-xl bg-earn-gradient px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-glow hover:brightness-110"
      >
        Show all advertisements
      </button>
    </div>
  );
}

/** Success overlay celebrating a credited reward. */
export function RewardSuccess({ amount, onClose }: { amount: number; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Reward successfully earned"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-primary/30 bg-card-gradient p-8 text-center shadow-glow animate-pop"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="pointer-events-none absolute -top-16 left-1/2 size-40 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
        <span className="relative mx-auto flex size-16 items-center justify-center rounded-2xl bg-earn-gradient text-primary-foreground animate-reward-glow">
          <PartyPopper className="size-8" />
        </span>
        <h3 className="relative mt-5 font-display text-xl font-bold">Reward Earned!</h3>
        <p className="relative mt-1 text-sm text-muted-foreground">
          Your wallet has been credited instantly.
        </p>
        <p className="relative mt-4 font-display text-4xl font-extrabold text-gold-gradient">
          +{amount} VEs
        </p>
        <p className="relative mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <CheckCircle2 className="size-3.5 text-primary" />
          Convertible to real cash at withdrawal
        </p>
        <button
          type="button"
          onClick={onClose}
          className="relative mt-6 w-full rounded-xl bg-earn-gradient px-4 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-glow hover:brightness-110"
        >
          <span className="flex items-center justify-center gap-2">
            <Sparkles className="size-4" />
            Keep Earning
          </span>
        </button>
      </div>
    </div>
  );
}
