import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '../data/faq';
import { siteConfig } from '../config/siteConfig';
import { Reveal, SectionHeading } from './Primitives';
import { cx } from '../lib/asset';

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="band bg-canvas">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <SectionHeading
                index="10"
                kicker="Before you ask"
                title={
                  <>
                    Questions? We&rsquo;ve
                    <br />
                    got answers.
                  </>
                }
              />
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-8 text-[15px] leading-relaxed text-muted">
                Anything not covered here, write to{' '}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-accent underline decoration-cyan/30 underline-offset-4 transition-colors hover:decoration-cyan"
                >
                  {siteConfig.contact.email}
                </a>
                . The organising team answers within a working day.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <ul>
              {faqs.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li key={item.q} className="border-b border-slate/10 first:border-t">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="tap group flex w-full items-start gap-4 py-5 text-left sm:gap-5 sm:py-6"
                      >
                        <span className="num pt-1 text-[12px] font-medium text-accent/70">
                          {String(i + 1).padStart(2, '0')}
                        </span>

                        <span
                          className={cx(
                            'flex-1 font-display text-[clamp(1.05rem,2vw,1.35rem)] font-bold uppercase leading-snug tracking-[-0.01em] transition-colors duration-300',
                            isOpen ? 'text-accent' : 'text-slate group-hover:text-accent',
                          )}
                        >
                          {item.q}
                        </span>

                        <span
                          className={cx(
                            'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                            isOpen
                              ? 'rotate-45 border-accent/55 bg-accent/10 text-accent'
                              : 'border-slate/15 text-muted group-hover:border-accent/45 group-hover:text-accent',
                          )}
                        >
                          <Plus size={16} />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[68ch] pb-6 pl-[44px] pr-2 text-[14.5px] leading-relaxed text-muted sm:pb-7 sm:pl-[52px] sm:pr-12 sm:text-[15px]">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
