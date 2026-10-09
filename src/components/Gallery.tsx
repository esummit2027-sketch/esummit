import { useMemo, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryItems, type GalleryCategory, type GalleryItem } from '../data/gallery';
import { asset, cx } from '../lib/asset';
import { Reveal, SectionHeading } from './Primitives';

const CATEGORIES: Array<GalleryCategory | 'All'> = [
  'All',
  'Speakers',
  'Events',
  'Workshops',
  'Competitions',
  'Networking',
  'Campus',
];

const SPAN_CLASS: Record<GalleryItem['span'], string> = {
  tall: 'row-span-2 aspect-[3/4] sm:aspect-auto',
  wide: 'aspect-[16/10]',
  square: 'aspect-square',
};

/** Deterministic placeholder art so the grid reads as designed, not empty. */
function GeneratedTile({ item }: { item: GalleryItem }) {
  const hue = (item.seed * 37) % 360;
  return (
    <div className="absolute inset-0 bg-mist">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 100% at ${20 + (item.seed % 60)}% ${
            10 + (item.seed % 40)
          }%, hsl(${190 + (hue % 80)} 90% 52% / 0.30) 0%, transparent 60%),
            radial-gradient(100% 90% at ${70 - (item.seed % 40)}% 92%, hsl(${
              255 + (hue % 40)
            } 80% 58% / 0.26) 0%, transparent 58%)`,
        }}
      />
      <div className="absolute inset-0 grid-fine opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate/70 via-transparent to-transparent" />
    </div>
  );
}

export function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory | 'All'>('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === 'All' ? galleryItems : galleryItems.filter((g) => g.category === filter)),
    [filter],
  );

  /* Keyboard control for the lightbox: Escape closes, arrows move. */
  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? null : (i + 1) % visible.length));
      if (e.key === 'ArrowLeft')
        setLightbox((i) => (i === null ? null : (i - 1 + visible.length) % visible.length));
    };

    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, visible.length]);

  const current = lightbox === null ? null : visible[lightbox];

  return (
    <section id="gallery" className="band bg-canvas">
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="09"
            kicker="Past editions"
            title={<>Relive the moments</>}
            lede="Photographs from previous editions. Replace these with your own by dropping files into public/images/gallery and pointing the data file at them."
          />
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-10 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setFilter(c);
                  setLightbox(null);
                }}
                aria-pressed={filter === c}
                className={cx(
                  'tap rounded-full border px-4 py-2.5 text-[13px] font-medium transition-all duration-300',
                  filter === c
                    ? 'border-accent/55 bg-accent/10 text-accent'
                    : 'border-slate/10 text-muted hover:border-slate/20 hover:text-slate',
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-8 grid auto-rows-auto grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <motion.button
                key={item.id}
                layout
                type="button"
                onClick={() => setLightbox(i)}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={cx(
                  'group relative overflow-hidden rounded-xl border border-slate/10 bg-paper text-left shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift',
                  SPAN_CLASS[item.span],
                )}
              >
                {item.src ? (
                  <img
                    src={asset(item.src)}
                    alt={item.caption}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                ) : (
                  <GeneratedTile item={item} />
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-paper via-paper/80 to-transparent p-3 pt-8 sm:p-4 sm:pt-10">
                  <span className="block text-[10px] font-semibold tracking-[0.18em] text-accent">
                    {item.category.toUpperCase()}
                  </span>
                  <span className="mt-1 block text-[12.5px] leading-snug text-slate sm:text-[13.5px]">
                    {item.caption}
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
          >
            <div
              className="absolute inset-0 bg-slate/70 backdrop-blur-xl"
              onClick={() => setLightbox(null)}
            />

            <motion.figure
              className="relative w-full max-w-4xl"
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: 8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-slate/10">
                {current.src ? (
                  <img
                    src={asset(current.src)}
                    alt={current.caption}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <GeneratedTile item={current} />
                )}
              </div>

              <figcaption className="mt-4 flex items-center justify-between gap-4">
                <span className="text-[14px] text-white/90">{current.caption}</span>
                <span className="num shrink-0 text-[13px] text-white/60">
                  {String((lightbox ?? 0) + 1).padStart(2, '0')} / {String(visible.length).padStart(2, '0')}
                </span>
              </figcaption>

              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Close"
                className="tap absolute -top-3 right-0 flex h-11 w-11 -translate-y-full items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-cyan/60 hover:text-cyan"
              >
                <X size={18} />
              </button>

              <button
                type="button"
                onClick={() =>
                  setLightbox((i) => (i === null ? null : (i - 1 + visible.length) % visible.length))
                }
                aria-label="Previous image"
                className="tap absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate/10 bg-paper/90 text-slate shadow-card transition-colors hover:border-accent/55 hover:text-accent"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={() => setLightbox((i) => (i === null ? null : (i + 1) % visible.length))}
                aria-label="Next image"
                className="tap absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate/10 bg-paper/90 text-slate shadow-card transition-colors hover:border-accent/55 hover:text-accent"
              >
                <ChevronRight size={20} />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
