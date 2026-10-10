import type { LucideIcon } from 'lucide-react';
import {
  Rocket,
  Mic,
  Handshake,
  Lightbulb,
  GraduationCap,
  Store,
  Music,
  Users,
  Tent
} from 'lucide-react';

export interface EventItem {
  id: string;
  title: string;
  blurb: string;
  /** Longer copy revealed on the featured card. */
  detail?: string;
  icon: LucideIcon;
  day: string | number;
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
      'Northeast startups pitch live to VCs, angels and experts.',
    detail:
      'The headline event where founders present their vision to a room full of active investors. Eight minutes on the clock, unfiltered feedback on stage.',
    icon: Rocket,
    day: '1-3',
    format: 'Competition',
    meta: 'By day',
    href: '#register',
    featured: true,
  },
  {
    id: 'keynotes',
    title: 'Keynotes & Fireside Chats',
    blurb: 'Leaders from business, finance and government.',
    icon: Mic,
    day: '1-3',
    format: 'Main Stage',
    meta: 'By day',
    href: '#register',
  },
  {
    id: 'panels',
    title: 'Panel Discussions',
    blurb: 'Raising capital, listing, agri-tech, tourism-tech and women founders.',
    icon: Users,
    day: '1-3',
    format: 'Main Stage',
    meta: 'By day',
    href: '#register',
  },
  {
    id: 'investor-connect',
    title: 'Investor Connect',
    blurb: 'One-to-one meetings between investors and founders.',
    icon: Handshake,
    day: '2-3',
    format: 'Curated meetings',
    meta: 'By day',
    href: '#register',
  },
  {
    id: 'student-innovation',
    title: 'Student Innovation Challenge',
    blurb: 'College teams pitch their ideas and prototypes.',
    icon: Lightbulb,
    day: 2,
    format: 'Competition',
    meta: 'By day',
    href: '#register',
  },
  {
    id: 'schools-innovation',
    title: 'Schools Innovation Showcase',
    blurb: 'Young innovators from schools across the region.',
    icon: GraduationCap,
    day: 1,
    format: 'Showcase',
    meta: 'By day',
    href: '#register',
  },
  {
    id: 'expo',
    title: 'Expo of Stalls',
    blurb: 'Startups, incubators, government schemes and local enterprise.',
    icon: Store,
    day: '1-3',
    format: 'Exhibition',
    meta: 'By day',
    href: '#register',
  },
  {
    id: 'concerts',
    title: 'Concerts & Jam Sessions',
    blurb: 'Northeast bands and independent artists, open collaborative jam sessions.',
    icon: Music,
    day: '1-3',
    format: 'Live Music',
    meta: 'By night',
    href: '#register',
  },
  {
    id: 'night-market',
    title: 'Night Market',
    blurb: 'Food, crafts and products from local entrepreneurs.',
    icon: Tent,
    day: '1-3',
    format: 'Festival',
    meta: 'By night',
    href: '#register',
  },
];
