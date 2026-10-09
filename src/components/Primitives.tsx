import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { cx } from '../lib/asset';

/* --------------------------------------------------------------------------
   Tone

   The page is light, but three bands stay dark on purpose: the hero video,
   the Meghalaya section and the footer. Rather than every component guessing,
   shared pieces take a `tone` and switch palette explicitly.
   -------------------------------------------------------------------------- */
export type Tone = 'light' | 'dark';

/* --------------------------------------------------------------------------
   Reveal — one restrained entrance, reused everywhere so the page has a
   single motion vocabulary instead of a different effect per section.
   -------------------------------------------------------------------------- */

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li';
}) {
  const props = {
    className,
    variants: revealVariants,
    initial: 'hidden' as const,
    whileInView: 'shown' as const,
    viewport: { once: true, margin: '-80px' },
    transition: { delay },
  };

  if (as === 'li') return <motion.li {...props}>{children}</motion.li>;
  return <motion.div {...props}>{children}</motion.div>;
}

/* --------------------------------------------------------------------------
   SectionHeading — the index number is real information (it tells you where
   you are in a long page), not decoration.
   -------------------------------------------------------------------------- */

export function SectionHeading({
  index,
  kicker,
  title,
  lede,
  align = 'left',
  tone = 'light',
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: 'left' | 'center';
  tone?: Tone;
}) {
  const dark = tone === 'dark';

  return (
    <div className={cx('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      <div
        className={cx(
          'flex items-center gap-3 text-[12.5px] sm:text-[13px]',
          dark ? 'text-haze' : 'text-muted',
          align === 'center' && 'justify-center',
        )}
      >
        <span
          className={cx('num font-display font-semibold', dark ? 'text-cyan/80' : 'text-accent')}
        >
          {index}
        </span>
        <span className={cx('h-px w-8', dark ? 'bg-cyan/35' : 'bg-accent/35')} />
        <span className="font-medium tracking-[0.02em]">{kicker}</span>
      </div>

      <h2
        className={cx(
          'mt-4 text-[clamp(1.9rem,5.4vw,4rem)] font-extrabold uppercase leading-[0.92] sm:mt-5',
          dark ? 'text-chalk' : 'text-slate',
        )}
      >
        {title}
      </h2>

      {lede ? (
        <p
          className={cx(
            'mt-5 max-w-[62ch] text-[16px] leading-relaxed sm:mt-6 sm:text-[17px]',
            dark ? 'text-haze' : 'text-muted',
            align === 'center' && 'mx-auto',
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Buttons

   Two gradients, not one. On the dark hero the neon cyan gradient carries
   dark text and looks electric. That same gradient on a white page fails
   contrast badly, so light surfaces get the deep blue-to-violet gradient
   with white text instead.
   -------------------------------------------------------------------------- */

const GRADIENT_NEON = 'linear-gradient(100deg,#00E5FF 0%,#2979FF 62%,#8B5CF6 100%)';
const GRADIENT_DEEP = 'linear-gradient(100deg,#1657C7 0%,#2E6BE0 45%,#6D3EE8 100%)';

export function PrimaryCta({
  href,
  children,
  className,
  tone = 'light',
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: Tone;
}) {
  const dark = tone === 'dark';

  return (
    <a
      href={href}
      className={cx(
        'tap group relative inline-flex items-center justify-center overflow-hidden rounded-full',
        'px-7 py-3.5 sm:px-8 sm:py-4',
        'font-display text-[13px] font-bold uppercase tracking-[0.1em] sm:text-[14px]',
        'transition-all duration-300 will-change-transform hover:-translate-y-0.5',
        dark ? 'text-[#04121a]' : 'text-white shadow-glow',
        className,
      )}
      style={{ background: dark ? GRADIENT_NEON : GRADIENT_DEEP }}
    >
      {/* Sheen sweeps only on hover — motion that answers an action. */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full" />
      <span className="relative">{children}</span>
    </a>
  );
}

export function GhostCta({
  href,
  children,
  className,
  tone = 'light',
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: Tone;
}) {
  const dark = tone === 'dark';

  return (
    <a
      href={href}
      className={cx(
        'tap inline-flex items-center justify-center rounded-full border',
        'px-7 py-3.5 sm:px-8 sm:py-4',
        'font-display text-[13px] font-bold uppercase tracking-[0.1em] sm:text-[14px]',
        'transition-all duration-300',
        dark
          ? 'border-white/25 text-chalk hover:border-cyan/60 hover:bg-cyan/10 hover:text-cyan-soft'
          : 'border-slate/15 bg-paper text-slate hover:-translate-y-0.5 hover:border-accent/45 hover:text-accent hover:shadow-card',
        className,
      )}
    >
      {children}
    </a>
  );
}

/* --------------------------------------------------------------------------
   Monogram — the fallback for any missing photo or logo. A generated tile
   beats a broken image icon, and it keeps the grid rhythm intact.
   -------------------------------------------------------------------------- */

const MONOGRAM_PAIRS = [
  ['#00E5FF', '#2979FF'],
  ['#2979FF', '#8B5CF6'],
  ['#8B5CF6', '#EC4899'],
  ['#00E5FF', '#8B5CF6'],
];

export function Monogram({ name, seed = 0 }: { name: string; seed?: number }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  const [a, b] = MONOGRAM_PAIRS[(name.length + seed) % MONOGRAM_PAIRS.length];

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-mist">
      <div
        className="absolute inset-0 opacity-30"
        style={{ background: `radial-gradient(120% 90% at 30% 8%, ${a} 0%, transparent 62%)` }}
      />
      <div
        className="absolute inset-0 opacity-25"
        style={{ background: `radial-gradient(110% 90% at 82% 96%, ${b} 0%, transparent 58%)` }}
      />
      <div className="absolute inset-0 grid-fine opacity-70" />
      <span className="relative font-display text-[clamp(2.4rem,7vw,4.4rem)] font-extrabold uppercase tracking-tightest text-slate/20">
        {initials}
      </span>
    </div>
  );
}
