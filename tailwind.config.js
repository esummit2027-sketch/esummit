/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* LIGHT SURFACES — the page is now built on these. */
        canvas: '#F6F8FB',
        paper: '#FFFFFF',
        mist: '#EDF1F7',

        /* DARK SURFACES — kept for the three bands that stay dark on purpose:
           the hero video, the Meghalaya band, and the footer. The contrast
           between them and the light body is the rhythm of the page. */
        void: '#050505',
        navy: '#07111F',
        ink: '#0B1725',

        /* TEXT */
        slate: '#0B1526',
        muted: '#5A6A80',
        chalk: '#E8EEF5',
        haze: '#8FA3B8',

        /* ACCENTS — two tiers, because the brief's neon palette does not
           survive a light background.

           Neon tier (cyan / electric / magenta): decoration only on light —
           gradient fills, glows, rules, hover states. Never small text.

           Deep tier (accent / violet-deep): the readable versions. Every
           label, link and small accent on a light surface uses these. */
        cyan: { DEFAULT: '#00E5FF', soft: '#5CF0FF', deep: '#0090B3' },
        electric: '#2979FF',
        accent: '#1657C7',
        violet: { DEFAULT: '#8B5CF6', deep: '#6D3EE8' },
        magenta: '#EC4899',
      },
      fontFamily: {
        display: ['Archivo', 'Arial Black', 'system-ui', 'sans-serif'],
        sans: ['"Inter Tight"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: { tightest: '-0.045em' },
      boxShadow: {
        card: '0 1px 2px rgba(11,21,38,0.04), 0 8px 24px -12px rgba(11,21,38,0.10)',
        lift: '0 2px 4px rgba(11,21,38,0.05), 0 24px 48px -20px rgba(11,21,38,0.20)',
        glow: '0 2px 4px rgba(11,21,38,0.05), 0 28px 56px -24px rgba(22,87,199,0.42)',
      },
      keyframes: {
        'pulse-line': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(400%)' },
        },
        'scroll-hint': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '35%': { opacity: '1' },
          '100%': { transform: 'translateY(14px)', opacity: '0' },
        },
      },
      animation: {
        'pulse-line': 'pulse-line 3.2s cubic-bezier(0.4,0,0.2,1) infinite',
        'scroll-hint': 'scroll-hint 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
