export interface NavItem {
  label: string;
  href: string;
  /** Shown in the desktop section rail. */
  rail?: string;
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home', rail: 'Home' },
  { label: 'About', href: '#about', rail: 'About' },
  { label: 'Events', href: '#events', rail: 'Events' },
  { label: 'Why Northeast', href: '#northeast', rail: 'Northeast' },
  { label: 'Attendees', href: '#attendees', rail: 'Attendees' },
  { label: 'Next Gen', href: '#next-gen', rail: 'Next Gen' },
  { label: 'Sponsors', href: '#sponsors', rail: 'Partners' },
  { label: 'Contact', href: '#contact', rail: 'Contact' },
];
