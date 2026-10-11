import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { asset } from '../lib/asset';
import { Reveal, SectionHeading } from './Primitives';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * The Meghalaya band. The visual idea is a survey drawing rather than a
 * postcard: contour lines from a topographic map, redrawn as circuit traces.
 * Terrain and infrastructure using the same vocabulary — which is the whole
 * argument of the section.
 */
function Contours() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id="contour-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
          <stop offset="30%" stopColor="#00E5FF" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#8B5CF6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <path
          key={i}
          d={`M -40 ${430 - i * 34}
              C 150 ${400 - i * 36}, 230 ${470 - i * 30}, 400 ${425 - i * 34}
              S 640 ${356 - i * 33}, 800 ${404 - i * 32}
              S 1050 ${446 - i * 34}, 1240 ${392 - i * 33}`}
          stroke="url(#contour-fade)"
          strokeWidth={i === 3 ? 1.5 : 0.85}
          opacity={0.16 + i * 0.055}
        />
      ))}

      {/* Junction nodes where a contour meets a vertical trace. */}
      {[
        [286, 358],
        [543, 300],
        [812, 336],
        [1006, 268],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2={cx} y2={520} stroke="#00E5FF" strokeOpacity="0.14" strokeWidth="0.8" />
          <circle cx={cx} cy={cy} r="3" fill="#00E5FF" fillOpacity="0.85" />
          <circle cx={cx} cy={cy} r="8" stroke="#00E5FF" strokeOpacity="0.28" strokeWidth="0.8" />
        </g>
      ))}
    </svg>
  );
}

export function Campus() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // A shallow parallax — 8% of travel. Enough to feel layered, not enough
  // to cost anything on a mid-range laptop.
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section ref={ref} id="next-gen" className="on-dark band relative overflow-hidden bg-void">
      {/* Terrain plate */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%] will-change-transform"
        style={reduced ? undefined : { y: imageY }}
      >
        <img
          src={asset(siteConfig.RIDGE_IMAGE)}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-50 mask-fade-b"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 opacity-90">
        <Contours />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #050505 0%, rgba(5,5,5,0.55) 30%, rgba(7,17,31,0.4) 62%, #050505 100%)',
        }}
      />

      <div className="shell relative">
        <Reveal>
          <SectionHeading
            index="05"
            tone="dark"
            kicker="The Next Generation"
            title={<>Bringing teachers, parents and young minds into the innovation story.</>}
            lede="Through E-Cell’s Project Sunray, SWISF 2027 reaches schools across Meghalaya and the Northeast. Students build, present and learn alongside founders and mentors, and their families get a front-row seat to the region’s innovation story."
          />
        </Reveal>

        <Reveal delay={0.1}>
          {/* The three-term line is set as type, not as a badge. */}
          <div className="mt-14 flex flex-wrap items-baseline gap-x-6 gap-y-2 font-display text-[clamp(1.4rem,4.4vw,3.1rem)] font-extrabold uppercase leading-none tracking-tightest">
            <span className="text-chalk">Build</span>
            <span className="text-cyan/60">&times;</span>
            <span className="text-chalk">Showcase</span>
            <span className="text-violet/70">&times;</span>
            <span className="text-gradient-neon">Learn</span>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-4">
          {[
            {
              h: '01. Reach Out',
              time: 'Months ahead',
              p: 'Schools across the region are invited to take part.',
            },
            {
              h: '02. Build',
              time: 'In the run-up',
              p: 'Student teams develop projects with mentors from NIT Meghalaya.',
            },
            {
              h: '03. Showcase',
              time: 'At SWISF 2027',
              p: 'The best projects take the stage at the Schools Innovation Showcase.',
            },
            {
              h: '04. Learn',
              time: 'During the summit',
              p: 'Students and families join financial-literacy and investor-awareness sessions.',
            },
          ].map((item, i) => (
            <Reveal key={item.h} delay={0.06 + i * 0.07}>
              <div className="border-t border-white/10 pt-5">
                <h3 className="font-display text-[16px] font-bold uppercase tracking-[0.06em] text-chalk">
                  {item.h}
                </h3>
                <span className="mt-1 block text-[13px] font-bold tracking-[0.14em] text-cyan/80 uppercase">
                  {item.time}
                </span>
                <p className="mt-3 text-[14.5px] leading-relaxed text-haze">{item.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
