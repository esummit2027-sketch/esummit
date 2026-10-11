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
      className="flex h-full flex-col justify-between pb-4 pt-16 sm:pb-6 md:pb-8 md:pt-20"
      variants={stagger}
      initial="hidden"
      animate="shown"
    >
      <div className="shell flex flex-1 flex-col justify-center">
        {/* Headline. Four lines, each on its own baseline, clipped so the
            wipe reveals from beneath a hard edge. */}
        <h1 className="mt-3 sm:mt-4">
          {WORDS.map((word) => (
            <span key={word} className="block overflow-hidden pb-[0.04em]">
              <motion.span
                variants={wipe}
                className="display-hero block text-[clamp(2.4rem,min(9.5vw,8.2vh),6.6rem)] text-chalk"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          variants={rise}
          className="mt-3 sm:mt-4 flex items-center gap-2 max-w-[46ch] text-[clamp(0.95rem,1.4vw,1.25rem)] leading-snug text-chalk/80"
        >
          <span>Copowered by Bombay Stock Exchange</span>
        </motion.p>

        <motion.div
          variants={rise}
          className="mt-4 sm:mt-6 flex flex-row flex-wrap items-center gap-3 sm:gap-4"
        >
          <PrimaryCta href={siteConfig.links.register} tone="dark">
            Register now
          </PrimaryCta>
          <GhostCta href="#about" tone="dark">
            Explore SWISF
          </GhostCta>
        </motion.div>
      </div>

      {/* Bottom rail: countdown on the left, date & location towards its right, scroll hint on the far right. */}
      <div className="shell mt-4 sm:mt-6 flex flex-col gap-3.5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <motion.div variants={rise}>
            <Countdown />
          </motion.div>

          {/* Date & Location towards the right of the countdown */}
          <motion.div
            variants={rise}
            className="flex flex-row flex-wrap items-center gap-x-5 gap-y-1.5 text-[12px] sm:flex-col sm:items-start sm:gap-1.5 sm:text-[13px] text-haze"
          >
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={15} className="text-cyan/80" aria-hidden="true" />
              {siteConfig.dateLabel}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} className="text-cyan/80" aria-hidden="true" />
              {siteConfig.venue}
            </span>
          </motion.div>
        </div>

        <motion.a
          variants={rise}
          href="#about"
          className="group hidden items-center gap-3 self-end text-[11px] font-medium tracking-[0.24em] text-haze transition-colors hover:text-cyan lg:inline-flex"
        >
          SCROLL TO EXPLORE
          <span className="relative flex h-8 w-4.5 items-start justify-center rounded-full border border-white/25 pt-1.5 transition-colors group-hover:border-cyan/60">
            <span className="h-1.5 w-1 animate-scroll-hint rounded-full bg-cyan" />
          </span>
        </motion.a>
      </div>
    </motion.div>
  );
}
