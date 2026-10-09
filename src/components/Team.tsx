import { Mail } from 'lucide-react';
import { team } from '../data/team';
import { siteConfig } from '../config/siteConfig';
import { Reveal, SectionHeading } from './Primitives';

/**
 * Grouped by function rather than shown as a wall of identical headshots.
 * If you are looking for someone, you are almost always looking for the group
 * they belong to, not their face.
 */
export function Team() {
  return (
    <section id="team" className="band bg-canvas">
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="11"
            kicker="Who runs it"
            title={<>The people behind it</>}
            lede="E-Summit is student-run. Every name below is carrying a full course load at the same time — which is worth remembering when you meet them at 3 a.m. on hackathon night."
          />
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.06}>
              <div className="border-t border-slate/10 pt-5">
                <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.18em] text-accent">
                  {group.group}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{group.blurb}</p>

                <ul className="mt-6 space-y-4">
                  {group.members.map((m) => (
                    <li key={m.name}>
                      <span className="block font-display text-[15px] font-bold uppercase tracking-[0.02em] text-slate">
                        {m.name}
                      </span>
                      <span className="mt-0.5 block text-[13px] text-muted">{m.role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08}>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="mt-14 inline-flex items-center gap-2.5 text-[14px] text-muted transition-colors hover:text-accent"
          >
            <Mail size={16} aria-hidden="true" />
            Reach the organising team
          </a>
        </Reveal>
      </div>
    </section>
  );
}
