import { useCountUp } from '../hooks/useCountUp';
import { Reveal, SectionHeading } from './Primitives';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  note: string;
}

const stats: Stat[] = [
  { value: 3, suffix: '', label: 'Days', note: 'Of summit and festival' },
  { value: 2, suffix: '', label: 'Worlds', note: 'Summit by day, festival by night' },
  { value: 1, suffix: '', label: 'City', note: 'Shillong, the concert capital of India' },
  { value: 8, suffix: '', label: 'States', note: 'One stage for the entire Northeast' },
];

const pillars = [
  {
    title: 'Innovation',
    body: 'Ideas, startups and the people building them.',
  },
  {
    title: 'Capital',
    body: 'Investors, mentors and the knowledge to grow.',
  },
  {
    title: 'Culture',
    body: 'Music, community and the spirit of the hills.',
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
                title={<>One stage for the entire Northeast.</>}
                lede={
                  <>
                    SWISF 2027 is a three-day summit and festival in Shillong, Meghalaya.
                    By day, the summit brings founders, investors, students and leaders into one room. By night, the festival fills the city with music.
                  </>
                }
              />
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-muted">
                It is built to connect the region’s talent with India’s innovation and finance ecosystem, and with the world. The talent is here, and so are the ideas. SWISF 2027 exists to give founders that national and global exposure.
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
