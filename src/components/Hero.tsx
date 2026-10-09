import { motion, type Variants } from 'framer-motion';
import { MapPin, CalendarDays } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { Countdown } from './Countdown';
import { GhostCta, PrimaryCta } from './Primitives';

/**
 * The one orchestrated moment on the page. Everything below the hero uses a
 * single quiet reveal; the entrance sequence is spent here and nowhere else.
 */
const stagger: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

/** The headline words arrive as a wipe, not a fade — it reads as typeset. */
const wipe: Variants = {
  hidden: { opacity: 0, y: '38%' },
  shown: { opacity: 1, y: '0%', transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
};

const WORDS = ['Build.', 'Innovate.', 'Disrupt.'];

export function Hero() {
  return (
    <motion.div
      className="flex h-full flex-col justify-between pb-8 pt-24 sm:pb-10 md:pt-28"
      variants={stagger}
      initial="hidden"
      animate="shown"
    >
      <div className="shell flex flex-1 flex-col justify-center">
        {/* Identity line. The rule and the dates are information, not chrome. */}
        <motion.div variants={rise} className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="font-display text-[13px] font-bold uppercase tracking-[0.32em] text-cyan">
            E-Summit
          </span>
          <span className="hidden h-px w-10 bg-white/25 sm:block" />
          <span className="text-[13px] font-medium tracking-[0.14em] text-haze">
            {siteConfig.instituteFull}
          </span>
        </motion.div>

        {/* Headline. Three lines, each on its own baseline, clipped so the
            wipe reveals from beneath a hard edge. */}
        <h1 className="mt-6">
          {WORDS.map((word) => (
            <span key={word} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                variants={wipe}
                className="display-hero block text-[clamp(2.9rem,min(10.5vw,11.5vh),7.5rem)] text-chalk"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          variants={rise}
          className="mt-7 max-w-[46ch] text-[clamp(0.98rem,1.7vw,1.2rem)] leading-relaxed text-chalk/80"
        >
          Where ambitious minds, groundbreaking ideas and future-changing
          innovations converge.
        </motion.p>

        <motion.div
          variants={rise}
          className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3 text-[14px] text-haze"
        >
          <span className="inline-flex items-center gap-2">
            <CalendarDays size={16} className="text-cyan/80" aria-hidden="true" />
            {siteConfig.dateLabel}
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin size={16} className="text-cyan/80" aria-hidden="true" />
            {siteConfig.venue}
          </span>
        </motion.div>

        <motion.div variants={rise} className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
          <PrimaryCta href={siteConfig.links.register} tone="dark">
            Register now
          </PrimaryCta>
          <GhostCta href="#about" tone="dark">
            Explore E-Summit
          </GhostCta>
        </motion.div>
      </div>

      {/* Bottom rail: countdown on the left, scroll hint on the right. */}
      <div className="shell mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <motion.div variants={rise}>
          <Countdown />
        </motion.div>

        <motion.a
          variants={rise}
          href="#about"
          className="group hidden items-center gap-3 self-end text-[11px] font-medium tracking-[0.24em] text-haze transition-colors hover:text-cyan sm:inline-flex"
        >
          SCROLL TO EXPLORE
          <span className="relative flex h-9 w-5 items-start justify-center rounded-full border border-white/25 pt-1.5 transition-colors group-hover:border-cyan/60">
            <span className="h-1.5 w-1 animate-scroll-hint rounded-full bg-cyan" />
          </span>
        </motion.a>
      </div>
    </motion.div>
  );
}
