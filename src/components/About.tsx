import { useCountUp } from '../hooks/useCountUp';
import { Reveal, SectionHeading } from './Primitives';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  note: string;
}

const stats: Stat[] = [
  { value: 5000, suffix: '+', label: 'Participants', note: 'across three days' },
  { value: 50, suffix: '+', label: 'Speakers', note: 'founders, operators, investors' },
  { value: 30, suffix: '+', label: 'Events', note: 'competitions and sessions' },
  { value: 20, suffix: '+', label: 'Startups', note: 'demoing on the expo floor' },
  { value: 10, suffix: '+', label: 'Partners', note: 'backing the summit' },
];

const pillars = [
  {
    title: 'Entrepreneurship',
    body: 'The unglamorous parts — first customers, first hires, first refusals.',
  },
  {
    title: 'Innovation',
    body: 'Ideas taken far enough to break, then rebuilt in front of a room.',
  },
  {
    title: 'Artificial intelligence',
    body: 'What is genuinely in production, separated from what is still a slide.',
  },
  {
    title: 'Startups',
    body: 'Teams at every stage, from a notebook sketch to a signed term sheet.',
  },
  {
    title: 'Technology',
    body: 'Hardware, climate tooling and software built for hard terrain.',
  },
  {
    title: 'Sustainability',
    body: 'Ventures that have to work inside real ecological limits.',
  },
];

function StatBlock({ stat }: { stat: Stat }) {
  const { ref, value } = useCountUp(stat.value);

  return (
    <div className="group relative border-t border-slate/10 pt-5">
      {/* The accent bar is the hover response — no card lift, no shadow. */}
      <span className="absolute left-0 top-0 h-px w-0 bg-accent transition-[width] duration-700 ease-out group-hover:w-full" />
      <span
        ref={ref}
        className="num block font-display text-[clamp(2.2rem,4.6vw,3.4rem)] font-extrabold leading-none text-slate"
      >
        {value.toLocaleString('en-IN')}
        <span className="text-accent">{stat.suffix}</span>
      </span>
      <span className="mt-3 block font-display text-[13px] font-bold uppercase tracking-[0.14em] text-slate/90">
        {stat.label}
      </span>
      <span className="mt-1 block text-[13px] text-muted">{stat.note}</span>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="band bg-canvas">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionHeading
                index="01"
                kicker="About the summit"
                title={<>The future starts here.</>}
                lede={
                  <>
                    E-Summit is the flagship entrepreneurship and innovation summit of
                    NIT Meghalaya. For three days it puts students, founders, investors,
                    industry leaders and the merely curious in the same rooms — and gives
                    them something harder than a lecture to do together.
                  </>
                }
              />
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-muted">
                It is organised by the student Entrepreneurship Cell, and it runs on a
                simple bet: that the fastest way to learn how a company gets built is to
                stand next to people who are building one, and then try it yourself
                before the weekend ends.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:col-span-5">
            <ul className="space-y-0">
              {pillars.map((p) => (
                <li
                  key={p.title}
                  className="group grid grid-cols-[auto_1fr] gap-4 border-b border-slate/10 py-4 first:border-t"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/40 transition-colors duration-300 group-hover:bg-accent" />
                  <span>
                    <span className="block font-display text-[15px] font-bold uppercase tracking-[0.06em] text-slate">
                      {p.title}
                    </span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-muted">
                      {p.body}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.06}>
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10 md:grid-cols-3 lg:mt-20 lg:grid-cols-5">
            {stats.map((s) => (
              <StatBlock key={s.label} stat={s} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
