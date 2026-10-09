import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { schedule } from '../data/schedule';
import { Reveal, SectionHeading } from './Primitives';
import { cx } from '../lib/asset';

export function Schedule() {
  const [activeId, setActiveId] = useState(schedule[0].id);
  const day = schedule.find((d) => d.id === activeId) ?? schedule[0];

  return (
    <section id="schedule" className="band bg-canvas">
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="06"
            kicker="Three days"
            title={<>The journey begins</>}
            lede="A full schedule with room numbers goes out to registered attendees a week before the summit. This is the shape of it."
          />
        </Reveal>

        {/* Tabs */}
        <Reveal delay={0.06}>
          <div
            className="mt-12 flex gap-2 overflow-x-auto pb-1 no-scrollbar"
            role="tablist"
            aria-label="Summit schedule by day"
          >
            {schedule.map((d) => {
              const selected = d.id === activeId;
              return (
                <button
                  key={d.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`panel-${d.id}`}
                  id={`tab-${d.id}`}
                  onClick={() => setActiveId(d.id)}
                  className={cx(
                    'tap relative shrink-0 rounded-full px-5 py-3 text-left transition-colors duration-300 sm:px-6',
                    selected ? 'text-white' : 'text-muted hover:text-slate',
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="schedule-tab"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'linear-gradient(100deg,#1657C7 0%,#6D3EE8 100%)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative flex items-baseline gap-2.5">
                    <span className="font-display text-[14px] font-extrabold uppercase tracking-[0.1em]">
                      {d.label}
                    </span>
                    <span
                      className={cx(
                        'text-[12px]',
                        selected ? 'text-white/70' : 'text-muted/75',
                      )}
                    >
                      {d.date}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Panel */}
        <div
          role="tabpanel"
          id={`panel-${day.id}`}
          aria-labelledby={`tab-${day.id}`}
          className="mt-10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={day.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-display text-[13px] font-bold uppercase tracking-[0.2em] text-accent">
                {day.theme}
              </p>

              <ol className="mt-8">
                {day.slots.map((slot, i) => (
                  <motion.li
                    key={slot.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.06, duration: 0.45 }}
                    className="group relative grid grid-cols-[56px_1fr] gap-x-4 border-t border-slate/10 py-5 last:border-b sm:grid-cols-[92px_1fr] sm:gap-x-5 sm:py-6 md:grid-cols-[112px_1fr_150px]"
                  >
                    <span className="num pt-0.5 font-display text-[15px] font-bold tracking-tight text-accent sm:text-[17px]">
                      {slot.time}
                    </span>

                    <div>
                      <h3 className="flex flex-wrap items-center gap-3 font-display text-[clamp(1.05rem,2vw,1.35rem)] font-bold uppercase leading-tight text-slate">
                        {slot.title}
                        {slot.keynote && (
                          <span className="rounded-full border border-violet-deep/35 bg-violet-deep/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-violet-deep">
                            ANCHOR
                          </span>
                        )}
                      </h3>
                      <p className="mt-2 max-w-[58ch] text-[14.5px] leading-relaxed text-muted">
                        {slot.detail}
                      </p>
                      <p className="mt-2 text-[13px] text-muted/75 md:hidden">{slot.venue}</p>
                    </div>

                    <span className="hidden pt-1 text-right text-[13px] text-muted/85 md:block">
                      {slot.venue}
                    </span>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
