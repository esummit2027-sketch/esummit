import type { LucideIcon } from 'lucide-react';
import {
  Rocket,
  Code2,
  Lightbulb,
  GraduationCap,
  Handshake,
  Mic,
  Store,
} from 'lucide-react';

export interface EventItem {
  id: string;
  title: string;
  blurb: string;
  /** Longer copy revealed on the featured card. */
  detail?: string;
  icon: LucideIcon;
  day: 1 | 2 | 3;
  format: string;
  /** Free-text prize / seat / duration line. Keep it short. */
  meta: string;
  href: string;
  /** One card carries the section — set true on exactly one item. */
  featured?: boolean;
}

export const events: EventItem[] = [
  {
    id: 'pitch-arena',
    title: 'Startup Pitch Arena',
    blurb:
      'Eight minutes on the clock in front of a panel of operators and cheque-writers.',
    detail:
      'Shortlisted teams get a mentor sprint the night before, then pitch live to a jury of angels, early-stage VCs and founders who have raised. The room votes; the jury decides. Feedback is given on stage, unfiltered.',
    icon: Rocket,
    day: 3,
    format: 'Competition',
    meta: '₹2L prize pool · 24 teams shortlisted',
    href: '#register',
    featured: true,
  },
  {
    id: 'hackathon',
    title: 'Hackathon',
    blurb: 'Thirty-six hours to ship something that works against a live problem statement.',
    icon: Code2,
    day: 2,
    format: 'Build sprint',
    meta: '36 hours · teams of 4',
    href: '#register',
  },
  {
    id: 'ideathon',
    title: 'Ideathon',
    blurb: 'No code required. Take a rough idea to a defensible one-page case.',
    icon: Lightbulb,
    day: 2,
    format: 'Competition',
    meta: 'Open to first-years',
    href: '#register',
  },
  {
    id: 'workshop',
    title: 'Founder Workshops',
    blurb: 'Small rooms, working sessions — pricing, GTM, hiring, and the cap table.',
    icon: GraduationCap,
    day: 2,
    format: 'Workshop track',
    meta: '6 tracks · 40 seats each',
    href: '#register',
  },
  {
    id: 'investor-connect',
    title: 'Investor Connect',
    blurb: 'Scheduled 1:1 slots between vetted startups and visiting funds.',
    icon: Handshake,
    day: 3,
    format: 'Curated meetings',
    meta: 'By application · 20-min slots',
    href: '#register',
  },
  {
    id: 'panels',
    title: 'Panel Discussions',
    blurb: 'Honest conversations on building from the Northeast, and building for it.',
    icon: Mic,
    day: 1,
    format: 'Main stage',
    meta: '4 panels · open to all',
    href: '#register',
  },
  {
    id: 'expo',
    title: 'Startup Expo',
    blurb: 'A working floor of demos — hardware, climate, AI tooling, D2C.',
    icon: Store,
    day: 2,
    format: 'Exhibition',
    meta: '30+ stalls · all three days',
    href: '#register',
  },
];
