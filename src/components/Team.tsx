import { Reveal, SectionHeading } from './Primitives';

const attendees = [
  { role: 'Founders & Startups', desc: 'From first-time builders to funded ventures.' },
  { role: 'Investors & VCs', desc: 'Seeking the next big idea.' },
  { role: 'Students & Colleges', desc: 'The future of innovation.' },
  { role: 'Schools', desc: 'Young innovators with big dreams.' },
  { role: 'Government', desc: 'Policymakers shaping the ecosystem.' },
  { role: 'Industry', desc: 'Corporates and business leaders.' },
  { role: 'Artists & Musicians', desc: 'Bringing the culture to life.' },
  { role: 'Guests', desc: 'From India and abroad.' },
];

export function Team() {
  return (
    <section id="attendees" className="band bg-canvas">
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="04"
            kicker="Who comes together"
            title={<>One stage for every voice</>}
            lede="Many collaborators. One shared vision: a stronger Northeast. SWISF 2027 welcomes partners, speakers and guests from organisations across India and the world."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {attendees.map((attendee, i) => (
            <Reveal key={attendee.role} delay={i * 0.05} className="group p-6 rounded-2xl border border-slate/10 bg-slate/[0.04] transition-colors hover:bg-slate/[0.08]">
              <h4 className="font-display text-md font-bold text-slate uppercase">{attendee.role}</h4>
              <p className="mt-2 text-sm text-muted leading-relaxed">{attendee.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
