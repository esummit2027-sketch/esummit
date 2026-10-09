import type { ReactNode } from 'react';
import { useCanHover } from '../hooks/useMediaQuery';
import { Linkedin, Globe, ArrowUpRight } from 'lucide-react';
import { speakers, type Speaker } from '../data/speakers';
import { Monogram, Reveal, SectionHeading } from './Primitives';
import { asset, cx } from '../lib/asset';

function XIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.11l11.97 15.64Z" />
    </svg>
  );
}

function SpeakerCard({ speaker, large = false }: { speaker: Speaker; large?: boolean }) {
  // No hover on a touchscreen means a hover-only note is simply never seen.
  const canHover = useCanHover();

  return (
    <article
      className={cx(
        'group relative overflow-hidden rounded-2xl border border-slate/10 bg-paper',
        'transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/45 hover:shadow-lift',
      )}
    >
      <div className={cx('relative overflow-hidden', large ? 'aspect-[4/5]' : 'aspect-[4/5]')}>
        {speaker.photo ? (
          <img
            src={asset(speaker.photo)}
            alt={speaker.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]">
            <Monogram name={speaker.name} />
          </div>
        )}

        {/* Scrim only where a real photograph needs one. */}
        {speaker.photo && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate/60 via-transparent to-transparent" />
        )}

        {speaker.note && (
          <div
            className={cx(
              'pointer-events-none absolute inset-x-2 bottom-2 rounded-xl px-4 py-3 transition-all duration-500',
              'bg-paper/85 backdrop-blur-md ring-1 ring-inset ring-slate/10',
              canHover
                ? 'translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
                : 'translate-y-0 opacity-100',
            )}
          >
            <p className="text-[12.5px] leading-snug text-slate/85">{speaker.note}</p>
          </div>
        )}
      </div>

      <div className="relative p-4 sm:p-5">
        <h3
          className={cx(
            'font-display font-bold uppercase leading-tight text-slate',
            large ? 'text-2xl' : 'text-[17px]',
          )}
        >
          {speaker.name}
        </h3>
        <p className="mt-1.5 text-[13.5px] leading-snug text-muted">
          {speaker.role}
          <span className="mx-1.5 text-slate/20">|</span>
          <span className="text-accent">{speaker.org}</span>
        </p>

        {speaker.social && (
          <div className="mt-4 flex items-center gap-2">
            {speaker.social.linkedin && (
              <SocialDot href={speaker.social.linkedin} label={`${speaker.name} on LinkedIn`}>
                <Linkedin size={14} />
              </SocialDot>
            )}
            {speaker.social.x && (
              <SocialDot href={speaker.social.x} label={`${speaker.name} on X`}>
                <XIcon />
              </SocialDot>
            )}
            {speaker.social.site && (
              <SocialDot href={speaker.social.site} label={`${speaker.name}'s website`}>
                <Globe size={14} />
              </SocialDot>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function SocialDot({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer noopener"
      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate/10 text-muted transition-colors duration-300 hover:border-accent/55 hover:bg-accent/10 hover:text-accent"
    >
      {children}
    </a>
  );
}

export function Speakers() {
  const headliners = speakers.filter((s) => s.headliner);
  const others = speakers.filter((s) => !s.headliner);

  return (
    <section id="speakers" className="band bg-canvas">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading
              index="03"
              kicker="Who you'll hear from"
              title={<>Meet the visionaries</>}
              lede="Founders who have raised and founders who have folded, investors who write the cheques, and operators who ship. The full line-up is announced in waves."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href="#register"
              className="group inline-flex shrink-0 items-center gap-2 text-[13px] font-medium tracking-[0.08em] text-accent transition-colors hover:text-accent"
            >
              See the full line-up
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 lg:grid-cols-4">
          {headliners.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.06} className="sm:col-span-1">
              <SpeakerCard speaker={s} large />
            </Reveal>
          ))}
          {others.map((s, i) => (
            <Reveal key={s.id} delay={0.06 + i * 0.05}>
              <SpeakerCard speaker={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
