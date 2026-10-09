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
    id: 'title',
    tier: 'Title Partner',
    weight: 1,
    sponsors: [{ name: 'Your Brand Here', url: '#sponsors' }],
  },
  {
    id: 'platinum',
    tier: 'Platinum',
    weight: 2,
    sponsors: [
      { name: 'Northbridge Capital' },
      { name: 'Kernel Cloud' },
      { name: 'Orbit Fintech' },
    ],
  },
  {
    id: 'gold',
    tier: 'Gold',
    weight: 3,
    sponsors: [
      { name: 'Vertex Labs' },
      { name: 'Solstice Energy' },
      { name: 'Meridian Health' },
      { name: 'Bluepine' },
    ],
  },
  {
    id: 'silver',
    tier: 'Silver',
    weight: 4,
    sponsors: [
      { name: 'Cascade' },
      { name: 'Rootstock' },
      { name: 'Halo Design' },
      { name: 'Trailhead' },
      { name: 'Nimbus' },
    ],
  },
  {
    id: 'ecosystem',
    tier: 'Ecosystem Partners',
    weight: 4,
    sponsors: [
      { name: 'Meghalaya Startup Mission' },
      { name: 'NITM Incubation Centre' },
      { name: 'Startup India' },
      { name: 'IIC' },
      { name: 'E-Cell Network' },
    ],
  },
];
