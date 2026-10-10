import { motion, type Variants } from 'framer-motion';
import { MapPin, CalendarDays } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { asset } from '../lib/asset';
import { Countdown } from './Countdown';
import { GhostCta, PrimaryCta } from './Primitives';

const stagger: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

const wipe: Variants = {
  hidden: { opacity: 0, y: '38%' },
  shown: { opacity: 1, y: '0%', transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } },
};

const WORDS = ['World', 'Innovation', 'Summit &', 'Festival'];

export function Hero() {
  return (
    <motion.div
      className="flex h-full flex-col justify-between pb-12 pt-16 sm:pb-16 md:pt-20"
      variants={stagger}
      initial="hidden"
      animate="shown"
    >
      <div className="shell flex flex-1 flex-col justify-center">
        {/* Identity line removed as per request */}

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
          className="mt-7 flex items-center gap-2 max-w-[46ch] text-[clamp(1.1rem,1.9vw,1.4rem)] leading-relaxed text-chalk/80"
        >
          <span>Copowered by Bombay Stock Exchange</span>
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
            Explore WISF
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
