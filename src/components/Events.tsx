import { useState } from 'react';
import { useCanHover } from '../hooks/useMediaQuery';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { events } from '../data/events';
import { siteConfig } from '../config/siteConfig';
import { asset } from '../lib/asset';
import { Reveal, SectionHeading } from './Primitives';
import { cx } from '../lib/asset';

/**
 * Deliberately not seven identical cards. One event carries the section as a
 * large panel; the rest are rows that open on hover or focus. The asymmetry
 * is the hierarchy — the Pitch Arena is the headline event, so it looks like it.
 */
export function Events() {
  const featured = events.find((e) => e.featured) ?? events[0];
  const rest = events.filter((e) => e.id !== featured.id);
  const [openId, setOpenId] = useState<string | null>(null);

  // On a touchscreen there is no hover, so the row detail would simply never
  // appear. Show it outright instead of hiding content behind a gesture that
  // does not exist on the device.
  const canHover = useCanHover();

  const FeaturedIcon = featured.icon;

  return (
    <section id="events" className="band bg-canvas">
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="02"
            kicker="What happens"
            title={<>Experience the future</>}
            lede="Seven tracks across three days. Some are competitions with prize money, some are working rooms with forty seats. Every one of them ends with you having made or decided something."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Featured panel */}
          <Reveal className="lg:col-span-5">
            <a
              href={featured.href}
              className="group relative flex h-full min-h-[380px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 p-7 shadow-lift transition-colors duration-500 hover:border-cyan/40 sm:min-h-[420px] sm:p-8"
              style={{
                background:
                  'linear-gradient(158deg, rgba(18,35,58,0.9) 0%, rgba(7,17,31,0.95) 52%, rgba(5,5,5,1) 100%)',
              }}
            >
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-45 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
                style={{ background: 'radial-gradient(circle,#00E5FF 0%,transparent 68%)' }}
              />
              {/* Texture plate — the same footage as the hero, held far back
                  so the card feels connected to the top of the page. */}
              <img
                src={asset(siteConfig.NETWORK_IMAGE)}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-screen transition-opacity duration-700 group-hover:opacity-30"
              />
              <div className="absolute inset-0 grid-fine-dark opacity-60" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-cyan-soft">
                  HEADLINE EVENT
                </span>
                <FeaturedIcon
                  size={40}
                  strokeWidth={1.25}
                  className="mt-8 text-cyan sm:mt-10"
                  aria-hidden="true"
                />
                <h3 className="mt-6 text-[clamp(1.7rem,3.4vw,2.5rem)] font-extrabold uppercase leading-[0.95] text-chalk">
                  {featured.title}
                </h3>
                <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-haze">
                  {featured.detail ?? featured.blurb}
                </p>
              </div>

              <div className="relative mt-8 flex items-end justify-between gap-4 border-t border-white/10 pt-5 sm:mt-10">
                <span className="text-[13px] text-haze">
                  <span className="block text-chalk/90">{featured.meta}</span>
                  <span className="mt-0.5 block">Day {featured.day} · {featured.format}</span>
                </span>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-chalk transition-all duration-300 group-hover:border-cyan group-hover:bg-cyan group-hover:text-void">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </a>
          </Reveal>

          {/* Rows */}
          <Reveal delay={0.08} className="lg:col-span-7">
            <ul className="h-full">
              {rest.map((event, i) => {
                const Icon = event.icon;
                const open = !canHover || openId === event.id;

                return (
                  <li key={event.id} className={cx(i === 0 && 'border-t border-slate/10')}>
                    <a
                      href={event.href}
                      onMouseEnter={() => setOpenId(event.id)}
                      onMouseLeave={() => setOpenId(null)}
                      onFocus={() => setOpenId(event.id)}
                      onBlur={() => setOpenId(null)}
                      className="group block border-b border-slate/10 py-4 transition-colors duration-300 hover:bg-slate/[0.03] sm:py-5"
                    >
                      <div className="flex items-center gap-5 px-1">
                        <Icon
                          size={22}
                          strokeWidth={1.4}
                          className="shrink-0 text-muted transition-colors duration-300 group-hover:text-accent"
                          aria-hidden="true"
                        />
                        <h3 className="flex-1 font-display text-[clamp(1.05rem,2.1vw,1.4rem)] font-bold uppercase tracking-[-0.01em] text-slate">
                          {event.title}
                        </h3>
                        <span className="hidden text-[12px] tracking-[0.1em] text-muted sm:block">
                          DAY {event.day}
                        </span>
                        <ArrowUpRight
                          size={17}
                          className="shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        />
                      </div>

                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="pl-[43px] pr-8 pt-3 text-[14.5px] leading-relaxed text-muted">
                              {event.blurb}
                              <span className="mt-1 block text-slate/70">{event.meta}</span>
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
