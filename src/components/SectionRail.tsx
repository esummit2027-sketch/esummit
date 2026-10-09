import { motion, useScroll, useSpring } from 'framer-motion';
import { navItems } from '../data/nav';
import { cx } from '../lib/asset';

/**
 * A fixed rail on wide screens that answers one question: where am I in a
 * page this long? It is a wayfinding device, not decoration — which is why
 * it only appears once there is enough width for it to sit outside the
 * content column.
 */
export function SectionRail({ active }: { active: string }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  return (
    <>
      {/* Thin progress line along the very top. */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[55] h-px origin-left"
        style={{
          scaleX: progress,
          background: 'linear-gradient(90deg,#00E5FF 0%,#2979FF 45%,#6D3EE8 100%)',
        }}
        aria-hidden="true"
      />

      <nav
        className="fixed left-7 top-1/2 z-40 hidden -translate-y-1/2 2xl:block"
        aria-label="Section navigation"
      >
        <ul className="flex flex-col gap-4">
          {navItems.map((item) => {
            const id = item.href.slice(1);
            const isActive = active === id;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group flex items-center gap-3"
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span
                    className={cx(
                      'h-px transition-all duration-500',
                      isActive ? 'w-7 bg-accent' : 'w-3.5 bg-slate/25 group-hover:w-5 group-hover:bg-slate/45',
                    )}
                  />
                  <span
                    className={cx(
                      'text-[11px] font-medium tracking-[0.14em] transition-all duration-500',
                      isActive
                        ? 'text-accent opacity-100'
                        : 'text-muted opacity-0 group-hover:opacity-100',
                    )}
                  >
                    {item.rail ?? item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
