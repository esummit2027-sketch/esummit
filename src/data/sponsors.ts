export interface Sponsor {
  name: string;
  /**
   * Drop a logo (SVG or transparent PNG) into public/images/sponsors/ and
   * point to it, e.g. '/images/sponsors/acme.svg'. Without a logo the tile
   * falls back to a clean wordmark, so nothing ever renders broken.
   */
  logo?: string;
  url?: string;
}

export interface SponsorTier {
  id: string;
  tier: string;
  /** Controls tile size and prominence. 1 = largest. */
  weight: 1 | 2 | 3 | 4;
  sponsors: Sponsor[];
}

export const sponsorTiers: SponsorTier[] = [
  {
    id: 'co-powered',
    tier: 'Co-Powered By',
    weight: 1,
    sponsors: [{ name: 'Bombay Stock Exchange (BSE)', logo: '/logos/bse.png' }],
  },
  {
    id: 'associate',
    tier: 'Associate Partner',
    weight: 2,
    sponsors: [{ name: 'COMING SOON...', url: '#sponsors' }],
  },
  {
    id: 'startup-arena',
    tier: 'Startup Arena Partner',
    weight: 2,
    sponsors: [{ name: 'COMING SOON...', url: '#sponsors' }],
  },
  {
    id: 'festival',
    tier: 'Festival Partner',
    weight: 3,
    sponsors: [{ name: 'COMING SOON...', url: '#sponsors' }],
  },
  {
    id: 'knowledge',
    tier: 'Knowledge Partner',
    weight: 3,
    sponsors: [{ name: 'COMING SOON...', url: '#sponsors' }],
  },
  {
    id: 'hospitality',
    tier: 'Hospitality Partner',
    weight: 4,
    sponsors: [{ name: 'COMING SOON...', url: '#sponsors' }],
  },
  {
    id: 'media',
    tier: 'Media Partner',
    weight: 4,
    sponsors: [{ name: 'COMING SOON...', url: '#sponsors' }],
  },
];
