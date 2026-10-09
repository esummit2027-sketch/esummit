export interface Speaker {
  id: string;
  name: string;
  role: string;
  org: string;
  /**
   * Drop a headshot into public/images/speakers/ and reference it here,
   * e.g. '/images/speakers/ananya.jpg'. Leave it undefined and the card
   * renders a generated monogram tile instead of a broken image.
   */
  photo?: string;
  /** Short line shown on hover / focus. */
  note?: string;
  social?: { linkedin?: string; x?: string; site?: string };
  /** Ordering weight for the "headliner" slot. */
  headliner?: boolean;
}

export const speakers: Speaker[] = [
  {
    id: 'sp-1',
    name: 'Ananya Barua',
    role: 'Co-founder & CEO',
    org: 'Loomcraft',
    note: 'Built a ₹40Cr weave-tech supply chain out of Guwahati.',
    social: { linkedin: '#', x: '#' },
    headliner: true,
  },
  {
    id: 'sp-2',
    name: 'Rohan Mehrotra',
    role: 'Partner',
    org: 'Terrace Capital',
    note: 'Leads seed cheques across climate and industrial AI.',
    social: { linkedin: '#' },
    headliner: true,
  },
  {
    id: 'sp-3',
    name: 'Dr. Ibanri Syiem',
    role: 'Director, Innovation',
    org: 'Meghalaya Startup Mission',
    note: 'Runs the state grant programme backing 90+ ventures.',
    social: { linkedin: '#', site: '#' },
  },
  {
    id: 'sp-4',
    name: 'Karan Deshpande',
    role: 'VP Engineering',
    org: 'Nexolve AI',
    note: 'Scaled inference infrastructure to 4B calls a month.',
    social: { linkedin: '#', x: '#' },
  },
  {
    id: 'sp-5',
    name: 'Tenzin Dorjee',
    role: 'Founder',
    org: 'Highland Foods',
    note: 'Turned a college project into 200 farmer partnerships.',
    social: { linkedin: '#' },
  },
  {
    id: 'sp-6',
    name: 'Sneha Ravikumar',
    role: 'Head of Product',
    org: 'Payfold',
    note: 'Ships payments rails used by 1.2 lakh small merchants.',
    social: { linkedin: '#', x: '#' },
  },
  {
    id: 'sp-7',
    name: 'Arjun Nair',
    role: 'Angel Investor',
    org: 'Ex-Flipkart',
    note: '38 angel cheques, 6 exits, blunt feedback guaranteed.',
    social: { linkedin: '#' },
  },
  {
    id: 'sp-8',
    name: 'Wanshan Lyngdoh',
    role: 'Co-founder',
    org: 'Ridge Robotics',
    note: 'Building terrain-mapping drones for hill agriculture.',
    social: { linkedin: '#', site: '#' },
  },
];
