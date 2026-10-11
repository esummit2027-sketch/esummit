import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navItems } from '../data/nav';
import { siteConfig } from '../config/siteConfig';
import { cx, asset } from '../lib/asset';

export function Navbar({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* The bar goes solid once the hero starts leaving. Passive listener +
     a boolean guard means we only touch state when it actually flips. */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock the page behind the mobile sheet, and let Escape close it. */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2 focus:font-display focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={cx(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled ? 'py-3' : 'py-5',
        )}
      >
        <nav
          className={cx(
            'shell flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 sm:px-6',
            scrolled
            ? 'glass shadow-[0_10px_40px_-18px_rgba(11,21,38,0.22)]'
            : 'border border-transparent',
          )}
          aria-label="Primary"
        >
          <a href="#home" className="flex items-center gap-3 sm:gap-3.5" aria-label="SWISF 2027, copowered by BSE, home">
            <img src={asset('/logos/swisf-logo.png')} alt="" className="h-9 w-auto shrink-0" />
            <span
              className={cx(
                'font-display text-[15px] font-extrabold uppercase tracking-[0.14em] transition-colors duration-500 whitespace-nowrap',
                scrolled ? 'text-slate' : 'text-chalk',
              )}
            >
              SWISF 2027
            </span>
            <span
              className={cx(
                'h-6 w-[1.5px] transition-colors duration-500 shrink-0',
                scrolled ? 'bg-slate/20' : 'bg-white/25',
              )}
              aria-hidden="true"
            />
            <span className="flex flex-col items-center justify-center shrink-0">
              <img
                src={asset(scrolled ? '/logos/bse.png' : '/logos/bse-white.png')}
                alt="BSE"
                className="h-4 sm:h-[18px] w-auto object-contain transition-opacity duration-300"
              />
              <span
                className={cx(
                  'mt-0.5 text-[7.5px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 whitespace-nowrap leading-none',
                  scrolled ? 'text-muted' : 'text-haze',
                )}
              >
                COPOWERED BY
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {navItems.map((item) => {
              const id = item.href.slice(1);
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={cx(
                      'relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300',
                      isActive
                        ? scrolled
                          ? 'text-slate'
                          : 'text-chalk'
                        : scrolled
                          ? 'text-muted hover:text-slate'
                          : 'text-haze hover:text-chalk',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className={cx(
                          'absolute inset-0 rounded-full ring-1 ring-inset',
                          scrolled
                            ? 'bg-accent/[0.08] ring-accent/20'
                            : 'bg-white/[0.10] ring-white/15',
                        )}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={siteConfig.links.register}
              className={cx(
                'tap hidden items-center rounded-full px-5 py-2.5 font-display text-[12px] font-bold uppercase tracking-[0.1em]',
                'transition-all duration-300 hover:-translate-y-0.5 sm:inline-flex',
                scrolled ? 'text-white shadow-glow' : 'text-[#04121a]',
              )}
              style={{
                background: scrolled
                  ? 'linear-gradient(100deg,#1657C7 0%,#6D3EE8 100%)'
                  : 'linear-gradient(100deg,#00E5FF 0%,#2979FF 100%)',
              }}
            >
              Register
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={cx(
                'tap flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500 xl:hidden',
                scrolled
                  ? 'border-slate/15 bg-paper/70 text-slate hover:border-accent/50 hover:text-accent'
                  : 'border-white/25 text-chalk hover:border-cyan/60 hover:text-cyan',
              )}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-canvas/95 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="absolute inset-x-0 top-0 px-5 pb-10 pt-28"
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.035, duration: 0.4 }}
                    className="border-b border-slate/10"
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-4"
                    >
                      <span className="num w-6 text-[11px] font-medium text-accent/70">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-2xl font-bold uppercase tracking-tight text-slate">
                        {item.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <a
                href={siteConfig.links.register}
                onClick={() => setOpen(false)}
                className="tap mt-8 flex items-center justify-center rounded-full py-4 font-display text-[13px] font-bold uppercase tracking-[0.12em] text-white shadow-glow"
                style={{ background: 'linear-gradient(100deg,#1657C7 0%,#2E6BE0 45%,#6D3EE8 100%)' }}
              >
                Register now
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


