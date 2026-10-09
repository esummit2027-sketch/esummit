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
  { label: 'Speakers', href: '#speakers', rail: 'Speakers' },
  { label: 'Schedule', href: '#schedule', rail: 'Schedule' },
  { label: 'Startup Zone', href: '#startup-zone', rail: 'Startups' },
  { label: 'Sponsors', href: '#sponsors', rail: 'Partners' },
  { label: 'Team', href: '#team', rail: 'Team' },
  { label: 'Contact', href: '#contact', rail: 'Contact' },
];
