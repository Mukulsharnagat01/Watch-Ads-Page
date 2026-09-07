import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 to `target` with an ease-out curve.
 * Used by the hero and statistics counters.
 */
export function useCountUp(target: number, duration = 1200, enabled = true) {
  const [value, setValue] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, duration, enabled]);

  return value;
}
