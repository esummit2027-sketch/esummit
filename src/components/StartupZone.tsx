import { motion } from 'framer-motion';
import { Leaf, Box, Plane, Music, Users, Shield, TrendingUp, Handshake, Compass, type LucideIcon } from 'lucide-react';
import { Reveal, SectionHeading } from './Primitives';

interface Potential {
  n: string;
  title: string;
  body: string;
  icon: LucideIcon;
}

const potentials: Potential[] = [
  {
    n: '01',
    title: 'Agriculture & Food',
    body: 'Rich biodiversity and unique agricultural products waiting for the right market.',
    icon: Leaf,
  },
  {
    n: '02',
    title: 'Bamboo & Crafts',
    body: 'Traditional handloom and crafts with immense global appeal and sustainable roots.',
    icon: Box,
  },
  {
    n: '03',
    title: 'Tourism',
    body: 'Unmatched hospitality and breathtaking landscapes ready for tourism-tech.',
    icon: Plane,
  },
  {
    n: '04',
    title: 'Creative Economy',
    body: 'Music and creative industries that are the heartbeat of the region.',
    icon: Music,
  },
];

const brings: Potential[] = [
  {
    n: '01',
    title: 'Mentors',
    body: 'Mentors with real experience who have built successful companies.',
    icon: Users,
  },
  {
    n: '02',
    title: 'Capital',
    body: 'Investors and VCs in the room, actively looking for the next big idea.',
    icon: TrendingUp,
  },
  {
    n: '03',
    title: 'Knowledge',
    body: 'Capital-markets knowledge to help founders understand funding and listing.',
    icon: Shield,
  },
  {
    n: '04',
    title: 'Exposure',
    body: 'National and global exposure, putting Northeast startups on the map.',
    icon: Compass,
  },
];

function RegionPotential() {
  return (
    <div className="mt-14">
      <h3 className="font-display text-lg font-extrabold uppercase text-slate mb-6">What the region holds</h3>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-slate/10 bg-slate/[0.08] shadow-card sm:grid-cols-2 lg:grid-cols-4">
        {potentials.map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.div
              key={r.n}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden bg-canvas p-6 transition-colors duration-500 hover:bg-paper"
            >
              <div className="relative flex items-start justify-between">
                <Icon size={24} strokeWidth={1.4} className="text-accent" aria-hidden="true" />
                <span className="num font-display text-[11px] font-bold tracking-[0.1em] text-slate/25">
                  {r.n}
                </span>
              </div>
              <h3 className="relative mt-5 font-display text-md font-extrabold uppercase text-slate">
                {r.title}
              </h3>
              <p className="relative mt-2 text-[13.5px] leading-relaxed text-muted">{r.body}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function WISFBrings() {
  return (
    <div className="mt-14">
      <h3 className="font-display text-lg font-extrabold uppercase text-slate mb-6">What WISF Brings</h3>
      <div className="grid gap-px overflow-hidden rounded-2xl border border-slate/10 bg-slate/[0.08] shadow-card sm:grid-cols-2 lg:grid-cols-4">
        {brings.map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.div
              key={r.n}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden bg-canvas p-6 transition-colors duration-500 hover:bg-paper"
            >
              <div className="relative flex items-start justify-between">
                <Icon size={24} strokeWidth={1.4} className="text-accent" aria-hidden="true" />
                <span className="num font-display text-[11px] font-bold tracking-[0.1em] text-slate/25">
                  {r.n}
                </span>
              </div>
              <h3 className="relative mt-5 font-display text-md font-extrabold uppercase text-slate">
                {r.title}
              </h3>
              <p className="relative mt-2 text-[13.5px] leading-relaxed text-muted">{r.body}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function StartupZone() {
  return (
    <section id="northeast" className="band bg-canvas">
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="03"
            kicker="Why the Northeast"
            title={<>A region of untapped potential</>}
            lede="Despite its immense potential, the Northeast’s contribution to India’s startup ecosystem remains very low. The talent is here, and so are the ideas. What the region’s founders lack is access."
          />
        </Reveal>

        <RegionPotential />
        <WISFBrings />
      </div>
    </section>
  );
}
