/* ==========================================================================
   siteConfig.ts — the one file you edit for day-to-day changes.
   Everything here flows through to the UI. No component hardcodes a date,
   a URL, or a video path.
   ========================================================================== */

export const siteConfig = {
  /* ---------------------------------------------------------------------
     BACKGROUND VIDEO
     Paths are written from the site root ("/videos/...") and are resolved
     at runtime by asset() in src/lib/asset.ts, which prefixes Vite's BASE_URL.
     That means these same strings work whether the build lands in
     public_html/ or public_html/esummit/ on Hostinger.

     To swap the video: drop a new file into public/videos/ with the same
     name, run `npm run build`, re-upload dist/. No code change needed.
     --------------------------------------------------------------------- */
  VIDEO_URL: '/videos/esummit-background.mp4',
  VIDEO_URL_WEBM: '/videos/esummit-background.webm', // optional; set to '' to skip
  VIDEO_POSTER: '/images/video-poster.jpg',

  /* Secondary imagery used by the Meghalaya + About bands. */
  RIDGE_IMAGE: '/images/meghalaya-ridge.jpg',
  NETWORK_IMAGE: '/images/network.jpg',

  /* ---------------------------------------------------------------------
     EVENT IDENTITY
     --------------------------------------------------------------------- */
  eventName: 'WISF 2027',
  institute: '',
  instituteFull: 'National Institute of Technology Meghalaya',
  edition: '2027',
  tagline: 'IGNITE INNOVATION • UNLOCK CAPITAL • CELEBRATE CULTURE',

  /* Countdown target. ISO 8601 with the +05:30 offset so the timer is
     correct for visitors in any timezone. Update this to your real date. */
  startsAt: '2027-04-25T09:30:00+05:30',
  dateLabel: 'Late April – Early May 2027',
  venue: 'Shillong, Meghalaya',

  /* ---------------------------------------------------------------------
     LINKS — replace the '#' placeholders with real destinations.
     --------------------------------------------------------------------- */
  links: {
    register:
      'https://docs.google.com/forms/d/e/1FAIpQLSdeqfogJHJjbLgaxrQZj5VoHFopSkufMvrCZHd3RZuZ5wIxaA/viewform?usp=publish-editor',
    brochure: '#',
    sponsorDeck: '#',
    instagram: 'https://www.instagram.com/ecell_nitmeghalaya/',
    linkedin: 'https://www.linkedin.com/company/e-cell-nit-meghalaya',
    x: 'https://x.com/ecell_nitm',
    youtube: 'https://www.youtube.com/@nitm_ecell',
    maps: 'https://www.google.com/maps/place/National+Institute+of+Technology+Meghalaya/@25.2575314,91.7379284,1055m/data=!3m1!1e3!4m6!3m5!1s0x3750f34447df0aa9:0xaf2daa97d7d1fba8!8m2!3d25.2568253!4d91.7412546!16s%2Fg%2F11b75jb3m2?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D',
  },

  contact: {
    email: 'swisf2027@gmail.com',
    sponsorEmail: 'swisf2027@gmail.com',
    phone: '+91 73036 18662',
    addressLines: [
      'Shillong 793003, Meghalaya, India',
    ],
  },

  /* ---------------------------------------------------------------------
     MOTION TUNING — lower these if you ever need more headroom on
     low-end hardware. All values are consumed by the hero transition.
     --------------------------------------------------------------------- */
  motion: {
    heroScaleTo: 0.94, // video shrinks to this by the end of the transition
    heroRadiusTo: 34, // px, corner radius at the end of the transition

    /**
     * Overlay opacity at the top of the page (heroDimFrom) and at the end of
     * the scroll transition (heroDimTo).
     *
     * This is the dial to turn when you change the video. The current footage
     * is a bright sunrise cloudscape, so it needs a heavier scrim than dark
     * footage would to keep white headline text readable. If you swap in
     * something dark, drop heroDimFrom to around 0.30 or the hero will look
     * needlessly murky.
     */
    heroDimFrom: 0.62,
    heroDimTo: 0.86,
  },
} as const;

export type SiteConfig = typeof siteConfig;
