export interface Slot {
  time: string;
  title: string;
  detail: string;
  venue: string;
  /** Marks the anchor moment of the day — rendered with a live accent. */
  keynote?: boolean;
}

export interface ScheduleDay {
  id: string;
  label: string;
  date: string;
  theme: string;
  slots: Slot[];
}

export const schedule: ScheduleDay[] = [
  {
    id: 'day-1',
    label: 'Day 1',
    date: 'Fri 6 Nov',
    theme: 'Set the room on fire',
    slots: [
      {
        time: '09:30',
        title: 'Registration & Opening Ceremony',
        detail: 'Doors, badges, and a short word from the Director on why this exists.',
        venue: 'Central Auditorium',
      },
      {
        time: '11:00',
        title: 'Opening Keynote',
        detail: 'A founder who started where you are sitting, on what the first two years actually cost.',
        venue: 'Main Stage',
        keynote: true,
      },
      {
        time: '13:30',
        title: 'Startup Talks',
        detail: 'Six founders, fifteen minutes each, one hard lesson apiece.',
        venue: 'Main Stage',
      },
      {
        time: '16:00',
        title: 'Panel — Building from the Northeast',
        detail: 'Logistics, talent, capital: what is genuinely harder and what is a myth.',
        venue: 'Main Stage',
      },
      {
        time: '18:30',
        title: 'Networking Social',
        detail: 'Open floor. Come with a question, leave with three contacts.',
        venue: 'Campus Lawn',
      },
    ],
  },
  {
    id: 'day-2',
    label: 'Day 2',
    date: 'Sat 7 Nov',
    theme: 'Make something',
    slots: [
      {
        time: '08:00',
        title: 'Hackathon Begins',
        detail: 'Problem statements unsealed. Thirty-six hours on the clock.',
        venue: 'Innovation Lab',
        keynote: true,
      },
      {
        time: '10:00',
        title: 'Workshop Track A — Pricing & GTM',
        detail: 'Working session: bring a product, leave with a pricing page.',
        venue: 'Seminar Hall 1',
      },
      {
        time: '12:00',
        title: 'Startup Expo Opens',
        detail: 'Thirty stalls of live demos across hardware, climate and AI tooling.',
        venue: 'Expo Grounds',
      },
      {
        time: '14:30',
        title: 'Ideathon Finals',
        detail: 'Ten shortlisted teams defend a one-page case in front of a jury.',
        venue: 'Seminar Hall 2',
      },
      {
        time: '17:00',
        title: 'Panel — AI Beyond the Demo',
        detail: 'What is actually shipping to production, and what is still a slide.',
        venue: 'Main Stage',
      },
    ],
  },
  {
    id: 'day-3',
    label: 'Day 3',
    date: 'Sun 8 Nov',
    theme: 'Put it in front of someone',
    slots: [
      {
        time: '09:00',
        title: 'Hackathon Demos',
        detail: 'Every team ships. Five minutes, live, no slides allowed.',
        venue: 'Innovation Lab',
      },
      {
        time: '11:00',
        title: 'Startup Pitch Arena',
        detail: 'Twenty-four teams, eight minutes each, feedback on stage.',
        venue: 'Main Stage',
        keynote: true,
      },
      {
        time: '14:00',
        title: 'Investor Connect',
        detail: 'Twenty-minute 1:1 slots between shortlisted startups and visiting funds.',
        venue: 'Meeting Rooms',
      },
      {
        time: '17:00',
        title: 'Awards Ceremony',
        detail: 'Prize pool distributed across pitch, hack and ideathon tracks.',
        venue: 'Central Auditorium',
      },
      {
        time: '19:00',
        title: 'Closing Celebration',
        detail: 'Live set, food stalls, and the last chance to corner a speaker.',
        venue: 'Campus Lawn',
      },
    ],
  },
];
