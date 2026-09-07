/** Loading placeholder shown while advertisements are being fetched. */
export function AdCardSkeleton() {
  return (
    <div className="rounded-3xl border border-border/70 bg-card-gradient p-5 shadow-soft">
      <div className="h-32 w-full rounded-2xl skeleton-shimmer" />
      <div className="mt-4 h-3 w-1/3 rounded-full skeleton-shimmer" />
      <div className="mt-3 h-4 w-2/3 rounded-full skeleton-shimmer" />
      <div className="mt-2 h-3 w-full rounded-full skeleton-shimmer" />
      <div className="mt-4 h-11 w-full rounded-2xl skeleton-shimmer" />
      <div className="mt-4 h-11 w-full rounded-xl skeleton-shimmer" />
    </div>
  );
}
