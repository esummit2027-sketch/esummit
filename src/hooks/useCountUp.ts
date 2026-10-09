import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Counts from 0 to `to` the first time the element scrolls into view.
 * Driven by requestAnimationFrame, not setInterval, so it stays on the
 * compositor's clock and never queues up work while the tab is hidden.
 */
export function useCountUp(to: number, durationMs = 1600) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      setValue(to);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const start = performance.now();
        let frame = 0;

        const step = (now: number) => {
          const t = Math.min((now - start) / durationMs, 1);
          // easeOutExpo — fast off the line, gentle landing.
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setValue(Math.round(eased * to));
          if (t < 1) frame = requestAnimationFrame(step);
        };

        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to, durationMs, reduced]);

  return { ref, value };
}
