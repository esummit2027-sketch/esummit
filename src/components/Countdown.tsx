import { siteConfig } from '../config/siteConfig';
import { useCountdown } from '../hooks/useCountdown';

const pad = (n: number) => String(n).padStart(2, '0');

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="num font-display text-[clamp(1.5rem,6.5vw,3.1rem)] font-extrabold leading-none text-chalk"
        style={{ fontVariationSettings: "'wdth' 108" }}
      >
        {value}
      </span>
      <span className="mt-2 text-[8.5px] font-medium tracking-[0.18em] text-haze sm:text-[10px] sm:tracking-[0.24em]">{label}</span>
    </div>
  );
}

function Colon() {
  return <span className="pb-6 font-display text-2xl font-light text-cyan/35">/</span>;
}

export function Countdown() {
  const { days, hours, minutes, seconds, done } = useCountdown(siteConfig.startsAt);

  if (done) {
    return (
      <div className="glass-dark inline-flex items-center gap-3 rounded-full px-6 py-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
        </span>
        <span className="font-display text-sm font-bold uppercase tracking-[0.14em]">
          Happening now
        </span>
      </div>
    );
  }

  return (
    <div
      className="glass-dark inline-flex items-end gap-3 rounded-2xl px-4 py-4 sm:gap-6 sm:px-9 sm:py-5"
      role="timer"
      aria-label={`${days} days, ${hours} hours, ${minutes} minutes until E-Summit begins`}
    >
      <Unit value={String(days)} label="DAYS" />
      <Colon />
      <Unit value={pad(hours)} label="HOURS" />
      <Colon />
      <Unit value={pad(minutes)} label="MINUTES" />
      <Colon />
      <Unit value={pad(seconds)} label="SECONDS" />
    </div>
  );
}
