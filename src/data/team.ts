export interface TeamMember {
  name: string;
  role: string;
  /** Optional headshot: '/images/team/name.jpg' */
  photo?: string;
  email?: string;
}

export interface TeamGroup {
  group: string;
  blurb: string;
  members: TeamMember[];
}

export const team: TeamGroup[] = [
  {
    group: 'Core',
    blurb: 'Owns the summit end to end.',
    members: [
      { name: 'Aditya Rana', role: 'Convenor' },
      { name: 'Priya Sangma', role: 'Co-convenor' },
      { name: 'Nishant Kalita', role: 'General Secretary, E-Cell' },
    ],
  },
  {
    group: 'Operations',
    blurb: 'Venues, logistics, hospitality and the schedule holding together.',
    members: [
      { name: 'Rishav Das', role: 'Head of Operations' },
      { name: 'Larisa Kharkongor', role: 'Hospitality Lead' },
      { name: 'Mohit Verma', role: 'Logistics Lead' },
    ],
  },
  {
    group: 'Partnerships & Outreach',
    blurb: 'Sponsors, speakers, and everyone we need in the room.',
    members: [
      { name: 'Ankita Bose', role: 'Sponsorship Lead' },
      { name: 'Daniel Marak', role: 'Speaker Relations' },
      { name: 'Shreya Nair', role: 'Campus Outreach' },
    ],
  },
  {
    group: 'Design & Tech',
    blurb: 'This website, the brand, and everything on a screen that weekend.',
    members: [
      { name: 'Kabir Sethi', role: 'Design Lead' },
      { name: 'Meera Iyer', role: 'Web & Tech Lead' },
      { name: 'Joel Lyngdoh', role: 'Media Lead' },
    ],
  },
];
