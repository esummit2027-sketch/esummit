import { useEffect, useState } from 'react';

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** True once the target moment has passed. */
  done: boolean;
}

function diff(target: number): Countdown {
  const ms = target - Date.now();
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    done: false,
  };
}

/**
 * One interval for the whole page. Ticks on the second, and re-syncs when the
 * tab regains focus so a backgrounded phone doesn't show a stale timer.
 */
export function useCountdown(iso: string): Countdown {
  const target = new Date(iso).getTime();
  const [value, setValue] = useState<Countdown>(() => diff(target));

  useEffect(() => {
    if (Number.isNaN(target)) return;

    const tick = () => setValue(diff(target));
    tick();

    const id = window.setInterval(tick, 1000);
    document.addEventListener('visibilitychange', tick);

    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [target]);

  return value;
}
