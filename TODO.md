# TODO: WISF 2027 Website Update

Based on the newly provided brochure, the website needs a significant overhaul to transition from "E-Summit NIT Meghalaya" to "WISF 2027 (World Innovation Summit & Festival)". 

Below is a detailed list of tasks required to make the website resonate accurately with the brochure.

## 1. Global Site Configuration (`src/config/siteConfig.ts`)
In the footer section mention the event is being organsied in association with E-Cell NIT Meghalaya

## 2. Hero Section (`src/components/Hero.tsx`)
- **Headline Words**: Change this to World Innovation Summit & Festival.
- **Subtitle Paragraph**: Remove the whose Subtitle paragraph and change it to copowered by Bombay Stock Exchange.
- **Branding**: Remove the WISF 2027 - Co-powered by Bombay Stock Exchange
- **Timer**: The timer is not visible when the page loads ensure that it does is fully visible.

## 3. Navbar Section (`src/components/`)
Change the logo to the sisf-logo.png and instead of NIT Meghalaya change it to copowered by BSE (use the logo of BSE).

## 4. Meet the Visionaries:
Comment out this component and also hide it from the navbar and Contact

## 5. Q&A Section
Here the div/section containing "Questions? We’ve got answers." overlaps the questions and answers section a little fix this.


## 6. Partnerships & Sponsors (`src/data/sponsors.ts` & `src/components/Sponsors.tsx`)
- **BSE Highlight**: Add the logo of BSE here
- **Partnership Tiers**: Instead of YOUR BRAND HERE, change it to COMING SOON...

## 7. Past Editions (`src/components/`)
Remove this whole section from the website, the navbar and footer
