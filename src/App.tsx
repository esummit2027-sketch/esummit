import { Navbar } from './components/Navbar';
import { SectionRail } from './components/SectionRail';
import { ScrollVideoEffect } from './components/ScrollVideoEffect';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Events } from './components/Events';
import { Speakers } from './components/Speakers';
import { StartupZone } from './components/StartupZone';
import { Schedule } from './components/Schedule';
import { Campus } from './components/Campus';
import { Sponsors } from './components/Sponsors';
import { Gallery } from './components/Gallery';
import { FAQ } from './components/FAQ';
import { Team } from './components/Team';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { useActiveSection } from './hooks/useActiveSection';

const SECTION_IDS = [
  'home',
  'about',
  'events',
  'speakers',
  'schedule',
  'startup-zone',
  'sponsors',
  'team',
  'contact',
];

export default function App() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <>
      <Navbar active={active} />
      <SectionRail active={active} />

      <main>
        {/* The hero and its scroll transition are one unit: the sticky stage
            below is what turns the full-bleed video into a floating card. */}
        <section id="home" aria-label="E-Summit NIT Meghalaya">
          <ScrollVideoEffect>
            <Hero />
          </ScrollVideoEffect>
        </section>

        <About />
        <Events />
        <Speakers />
        <StartupZone />
        <Schedule />
        <Campus />
        <Sponsors />
        <Gallery />
        <FAQ />
        <Team />
        <FinalCta />
      </main>

      <Footer />
    </>
  );
}
