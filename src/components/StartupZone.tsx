import { motion } from 'framer-motion';
import {
  Users,
  BookOpen,
  Hammer,
  Presentation,
  Trophy,
  Compass,
  type LucideIcon,
} from 'lucide-react';
import { Reveal, SectionHeading } from './Primitives';

/* --------------------------------------------------------------------------
   The journey. Numbering is legitimate here — this genuinely is a sequence,
   and each stop maps to a real thing that happens at the summit.
   -------------------------------------------------------------------------- */

const stages = [
  {
    name: 'Idea',
    body: 'You arrive with a hunch. The Ideathon forces it into one defensible page.',
  },
  {
    name: 'Build',
    body: 'Thirty-six hours in the hackathon turn the page into something that runs.',
  },
  {
    name: 'Validate',
    body: 'Workshop mentors take it apart — pricing, users, the assumption that breaks it.',
  },
  {
    name: 'Pitch',
    body: 'Eight minutes on the main stage, in front of people who fund this for a living.',
  },
  {
    name: 'Scale',
    body: 'Investor Connect slots and the expo floor turn interest into a next meeting.',
  },
];

function Journey() {
  return (
    <div className="mt-14">
      <ol className="relative grid gap-y-10 md:grid-cols-5 md:gap-x-4">
        {/* The connecting line: static rail, with a light travelling along it. */}
        <li
          aria-hidden="true"
          className="pointer-events-none absolute left-[11px] top-3 hidden h-[calc(100%-1.5rem)] w-px md:left-0 md:top-[11px] md:h-px md:w-full"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-cyan/10 via-cyan/35 to-violet/20 md:bg-gradient-to-r" />
          <span className="absolute inset-y-0 left-0 w-1/4 animate-pulse-line bg-gradient-to-r from-transparent via-cyan to-transparent opacity-70 md:block" />
        </li>

        {stages.map((stage, i) => (
          <Reveal as="li" key={stage.name} delay={i * 0.07} className="relative pl-9 md:pl-0">
            <span className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-accent/40 bg-paper md:relative md:top-0">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(22,87,199,0.12)]" />
            </span>

            <h3 className="mt-0 font-display text-[15px] font-extrabold uppercase tracking-[0.14em] text-slate md:mt-6">
              {stage.name}
            </h3>
            <p className="mt-2 max-w-[30ch] text-[14px] leading-relaxed text-muted">{stage.body}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Why attend
   -------------------------------------------------------------------------- */

interface Reason {
  n: string;
  title: string;
  body: string;
  icon: LucideIcon;
}

const reasons: Reason[] = [
  {
    n: '01',
    title: 'Network',
    body: 'Three days of proximity to people who are two or ten years ahead of you, in rooms small enough to actually talk.',
    icon: Users,
  },
  {
    n: '02',
    title: 'Learn',
    body: 'Working sessions on the parts nobody teaches: pricing, first hires, when to walk away from a customer.',
    icon: BookOpen,
  },
  {
    n: '03',
    title: 'Build',
    body: 'A hackathon with real problem statements from partner companies, and mentors on the floor all night.',
    icon: Hammer,
  },
  {
    n: '04',
    title: 'Pitch',
    body: 'Stage time in front of a jury that will tell you exactly what is wrong with your deck, out loud.',
    icon: Presentation,
  },
  {
    n: '05',
    title: 'Compete',
    body: 'A prize pool worth chasing across pitch, hack and ideathon tracks — and a line on your CV that means something.',
    icon: Trophy,
  },
  {
    n: '06',
    title: 'Explore',
    body: 'An expo floor of working demos from thirty ventures, most of them younger than you would guess.',
    icon: Compass,
  },
];

function WhyAttend() {
  return (
    <div className="mt-24">
      <Reveal>
        <SectionHeading
          index="05"
          kicker="Why come"
          title={<>Why you can't miss this</>}
        />
      </Reveal>

      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-slate/10 bg-slate/[0.08] shadow-card sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.div
              key={r.n}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden bg-canvas p-8 transition-colors duration-500 hover:bg-paper"
            >
              {/* Glow follows the card, not the cursor — cheaper and calmer. */}
              <span
                className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-25"
                style={{ background: 'radial-gradient(circle,#2979FF 0%,transparent 70%)' }}
              />

              <div className="relative flex items-start justify-between">
                <Icon size={24} strokeWidth={1.4} className="text-accent sm:h-[26px] sm:w-[26px]" aria-hidden="true" />
                <span className="num font-display text-[13px] font-bold tracking-[0.1em] text-slate/25">
                  {r.n}
                </span>
              </div>

              <h3 className="relative mt-7 font-display text-lg font-extrabold uppercase tracking-[0.02em] text-slate sm:mt-8 sm:text-xl">
                {r.title}
              </h3>
              <p className="relative mt-3 text-[14.5px] leading-relaxed text-muted">{r.body}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function StartupZone() {
  return (
    <section id="startup-zone" className="band bg-canvas">
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="04"
            kicker="Startup zone"
            title={<>From idea to impact</>}
            lede="The summit is sequenced deliberately. Each day hands you off to the next stage, so that a rough thought on Friday morning has somewhere real to land by Sunday evening."
          />
        </Reveal>

        <Journey />
        <WhyAttend />
      </div>
    </section>
  );
}
