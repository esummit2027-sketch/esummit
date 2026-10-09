import { ArrowUpRight } from 'lucide-react';
import { sponsorTiers, type Sponsor, type SponsorTier } from '../data/sponsors';
import { siteConfig } from '../config/siteConfig';
import { asset, cx } from '../lib/asset';
import { Reveal, SectionHeading } from './Primitives';

/**
 * Tier weight drives tile height and type size, so the hierarchy is visible
 * before you read a single word. A sponsor without a logo file falls back to
 * a set wordmark rather than a broken image.
 */
const TILE_BY_WEIGHT: Record<SponsorTier['weight'], string> = {
  1: 'h-40 sm:h-48',
  2: 'h-28 sm:h-32',
  3: 'h-24 sm:h-28',
  4: 'h-20 sm:h-24',
};

const TEXT_BY_WEIGHT: Record<SponsorTier['weight'], string> = {
  1: 'text-[clamp(1.5rem,3.6vw,2.4rem)]',
  2: 'text-[clamp(1rem,2vw,1.35rem)]',
  3: 'text-[clamp(0.9rem,1.7vw,1.1rem)]',
  4: 'text-[clamp(0.8rem,1.5vw,0.98rem)]',
};

const COLS_BY_WEIGHT: Record<SponsorTier['weight'], string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-3',
  3: 'grid-cols-2 sm:grid-cols-4',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
};

function SponsorTile({ sponsor, tier }: { sponsor: Sponsor; tier: SponsorTier }) {
  const inner = sponsor.logo ? (
    <img
      src={asset(sponsor.logo)}
      alt={sponsor.name}
      loading="lazy"
      decoding="async"
      className="max-h-[58%] w-auto max-w-[76%] object-contain opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
    />
  ) : (
    <span
      className={cx(
        'px-4 text-center font-display font-extrabold uppercase tracking-[0.02em] text-slate/40 transition-colors duration-500 group-hover:text-slate',
        TEXT_BY_WEIGHT[tier.weight],
      )}
    >
      {sponsor.name}
    </span>
  );

  const classes = cx(
    'group relative flex items-center justify-center overflow-hidden rounded-xl border border-slate/10 bg-paper',
    'transition-colors duration-500 hover:border-accent/40 hover:bg-paper',
    TILE_BY_WEIGHT[tier.weight],
  );

  const glow =
    tier.weight === 1 ? (
      <span
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(80% 120% at 50% 120%, rgba(0,229,255,0.16) 0%, transparent 62%)',
        }}
      />
    ) : null;

  if (sponsor.url) {
    return (
      <a href={sponsor.url} className={classes}>
        {glow}
        {inner}
      </a>
    );
  }

  return (
    <div className={classes}>
      {glow}
      {inner}
    </div>
  );
}

export function Sponsors() {
  return (
    <section id="sponsors" className="band bg-canvas">
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="08"
            kicker="Partners"
            title={<>Powering the future</>}
            lede="E-Summit runs on the companies, funds and institutions that decide a room full of first-time builders is worth showing up for."
          />
        </Reveal>

        <div className="mt-14 space-y-12">
          {sponsorTiers.map((tier, i) => (
            <Reveal key={tier.id} delay={i * 0.05}>
              <div>
                <div className="mb-5 flex items-center gap-4">
                  <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.2em] text-accent">
                    {tier.tier}
                  </h3>
                  <span className="h-px flex-1 bg-slate/10" />
                  <span className="num text-[12px] text-muted/75">
                    {String(tier.sponsors.length).padStart(2, '0')}
                  </span>
                </div>

                <div className={cx('grid gap-4', COLS_BY_WEIGHT[tier.weight])}>
                  {tier.sponsors.map((s) => (
                    <SponsorTile key={s.name} sponsor={s} tier={tier} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.06}>
          <div className="card mt-14 flex flex-col items-start justify-between gap-6 p-6 sm:mt-16 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h3 className="font-display text-[clamp(1.3rem,2.6vw,1.9rem)] font-extrabold uppercase leading-tight text-slate">
                Partner with us
              </h3>
              <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-muted">
                Hiring drives, product workshops, branded tracks or a stall on the expo
                floor. Tell us what you want out of the weekend and we will build the
                package around it.
              </p>
            </div>

            <a
              href={`mailto:${siteConfig.contact.sponsorEmail}`}
              className="tap group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full border border-accent/40 bg-accent/[0.08] px-7 py-3.5 font-display text-[13px] font-bold uppercase tracking-[0.1em] text-accent transition-colors duration-300 hover:bg-accent hover:text-white sm:w-auto"
            >
              Request the deck
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
