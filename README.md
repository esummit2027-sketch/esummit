# E-Summit · NIT Meghalaya

Production website for the flagship entrepreneurship and innovation summit of
NIT Meghalaya. React + Vite + TypeScript + Tailwind CSS, built to compile to a
folder of static files you upload to Hostinger. No Node server, no VPS, no
Docker, no backend.

---

## Quick start

You need **Node.js 18 or newer**. Check with `node -v`; if it prints something
older, install the current LTS from nodejs.org first.

```bash
npm install     # once, after downloading
npm run dev     # local preview at http://localhost:5173
npm run build   # production build into dist/
npm run preview # serve dist/ locally to check the real build
```

---

## Deploying to Hostinger

**Step 1 — Install dependencies**

```bash
npm install
```

**Step 2 — Run it locally and check everything looks right**

```bash
npm run dev
```

**Step 3 — Build**

```bash
npm run build
```

**Step 4 — Find the output**

Everything you need is now in the `dist/` folder.

**Step 5 — Open Hostinger's File Manager**

In hPanel: **Hosting → Manage → File Manager**, then open `public_html`.

**Step 6 — Upload the contents of `dist/`, not the folder itself**

Select everything *inside* `dist/` — `index.html`, the `assets/` folder,
`videos/`, `images/`, `favicon.svg`, `robots.txt` and `.htaccess` — and upload
those into `public_html`. When you are done, `public_html/index.html` must
exist. If you end up with `public_html/dist/index.html`, the site will 404.

The fastest route is to zip the *contents* of `dist/` locally, upload the one
zip, and use File Manager's **Extract** command inside `public_html`.

Your domain should now serve the site.

### Two things people miss on the first upload

**`.htaccess` is a hidden file.** File Manager hides it by default. Open the
settings menu (top right) and turn on **Show hidden files**, or the routing,
caching and video MIME rules will silently not be uploaded. If your videos
refuse to play on the live site but work locally, this is almost always why.

**Clear the old build.** If you are replacing an existing site, delete the old
`assets/` folder before uploading the new one. Vite fingerprints filenames, so
stale files linger forever otherwise.

### Deploying into a subfolder

`vite.config.ts` sets `base: './'`, so the build already uses relative paths
and works from `public_html/esummit/` without changes. One edit is needed in
`public/.htaccess`:

```apache
RewriteBase /esummit/
RewriteRule . /esummit/index.html [L]
```

### Turning on HTTPS

Issue the free SSL certificate in hPanel first (**Security → SSL**). Once it is
active, uncomment the redirect block at the bottom of `public/.htaccess`,
rebuild, and re-upload. Doing it before the certificate exists will make the
site unreachable.

---

## Replacing the background video

The video is referenced from exactly one place, so swapping it needs no code
changes.

1. Put your new file at `public/videos/esummit-background.mp4`, replacing the
   existing one and keeping the same filename.
2. Run `npm run build`.
3. Upload the new `dist/` contents to `public_html`.

If you want to keep a different filename, edit `VIDEO_URL` in
`src/config/siteConfig.ts` instead.

There is also a WebM copy at `public/videos/esummit-background.webm`, offered
to browsers first because it is roughly half the size. If you replace the MP4
and do not have a WebM, either delete the `.webm` file **and** set
`VIDEO_URL_WEBM: ''` in `siteConfig.ts`, or the browser will keep playing the
old WebM.

### Getting your video to a sensible size

Aim for **under 10 MB**, ideally under 6. The file ships with every visit, and
on shared hosting it is the single biggest thing between someone and your
homepage. The included video is 1080p and about 1.8 MB.

With ffmpeg:

```bash
ffmpeg -i input.mp4 -an -vf "scale=1920:-2" \
  -c:v libx264 -crf 24 -preset slow -movflags +faststart \
  public/videos/esummit-background.mp4
```

What each flag is doing:

- `-an` strips the audio track. The video is muted by definition — autoplay
  only works muted — so the audio is pure wasted bytes.
- `-crf 24` is the quality dial. Lower is better and bigger; 20–26 is the
  useful range.
- `-movflags +faststart` moves the file index to the front so playback can
  begin before the download finishes. Skip this and the video appears to hang.

If the file is still too large, cut the length rather than the quality. Ten
seconds on a loop reads the same as thirty.

### The colour grade on the current video

The footage in `public/videos/` is not the raw file — it has been graded to fit
the site's palette. The source was a warm golden sunrise, which fought the deep
black and electric cyan design in two ways: the colour clashed, and the bright
cloudscape left white headline text sitting at roughly 150/255 luminance, which
is unreadable.

The grade cools it toward steel-blue, pulls saturation back, and drops the
midtones. To re-apply it to a new clip, or to adjust it:

```bash
ffmpeg -i input.mp4 -an \
  -vf "crop=1120:630:0:45,\
eq=contrast=1.16:brightness=-0.12:saturation=0.50,\
colorbalance=rs=-0.10:rm=-0.13:rh=-0.18:gs=-0.02:bs=0.16:bm=0.13:bh=0.08,\
curves=all='0/0 0.5/0.40 1/0.90',\
scale=1920:1080:flags=lanczos" \
  -c:v libx264 -crf 24 -preset slow -movflags +faststart \
  public/videos/esummit-background.mp4
```

- `crop=1120:630:0:45` removes the AI-generation watermark from the bottom-right
  corner. Drop this if your footage has no watermark.
- `saturation=0.50` is the main dial for how much of the original colour
  survives. Raise it toward 0.7 for a warmer result.
- `brightness` and the `curves` midpoint control how dark it gets.

**If you swap in dark footage, turn the scrim down.** `heroDimFrom` in
`siteConfig.ts` is currently `0.62`, which is tuned for bright clouds. Dark
footage wants around `0.30` or the hero will look muddy for no reason.

Note that the hero stays dark even though the rest of the page is light — the
video is the anchor, and it shrinks into a dark card floating on the pale
canvas as you scroll.

### Updating the poster image

`public/images/video-poster.jpg` shows during loading, on slow connections,
when autoplay is blocked, and for anyone using "reduce motion". Make it a frame
from your video so the switch is invisible:

```bash
ffmpeg -ss 0.3 -i public/videos/esummit-background.mp4 \
  -frames:v 1 -q:v 6 public/images/video-poster.jpg
```

---

## Editing content

Nothing in `src/components/` needs to be touched for routine updates.

| What you want to change | File |
| --- | --- |
| Dates, countdown target, email, phone, social links, video paths | `src/config/siteConfig.ts` |
| Events and their descriptions | `src/data/events.ts` |
| Speaker line-up | `src/data/speakers.ts` |
| Three-day schedule | `src/data/schedule.ts` |
| Sponsor tiers and logos | `src/data/sponsors.ts` |
| FAQ questions | `src/data/faq.ts` |
| Gallery photos | `src/data/gallery.ts` |
| Organising team | `src/data/team.ts` |
| Navigation and section rail labels | `src/data/nav.ts` |

**The countdown.** Set `startsAt` in `siteConfig.ts` to your real start moment
in ISO 8601 with the India offset:

```ts
startsAt: '2026-11-06T09:30:00+05:30',
```

The `+05:30` matters. Without it the timer is wrong for anyone outside your
timezone, and browsers disagree about how to interpret the bare form.

**Speaker photos.** Drop files into `public/images/speakers/` and set
`photo: '/images/speakers/name.jpg'`. Any speaker without a photo renders a
generated monogram tile instead — the grid never shows a broken image, so you
can publish the line-up before the headshots arrive.

**Sponsor logos.** Drop SVG or transparent PNG files into
`public/images/sponsors/` and set `logo: '/images/sponsors/acme.svg'`. Without
a logo the tile falls back to a set wordmark, which still looks deliberate.

**Gallery.** Same pattern: files in `public/images/gallery/`, `src` set in the
data file. Items without a `src` render a generated gradient tile, so the
masonry layout holds its shape while you are still collecting photographs.

**Registration.** `links.register` currently points at `#register`, the final
call-to-action band. Replace it with your Google Form, Unstop, or Konfhub URL
and every button on the page follows.

---

## The light theme

The page is light, with three bands that stay dark on purpose: the **hero
video**, the **Meghalaya band**, and the **footer**. That alternation is the
rhythm of the page — a uniformly light page this long goes flat, and the dark
hero card floating on a pale canvas is the strongest moment in the design.

### Two accent tiers, and why

The brief's neon palette does not survive a light background. Measured against
the canvas colour:

| Colour | Contrast on light | Usable for |
| --- | --- | --- |
| Cyan `#00E5FF` | 1.45:1 | decoration only |
| Electric `#2979FF` | 3.74:1 | large text only |
| Violet `#8B5CF6` | 3.98:1 | large text only |
| **Accent `#1657C7`** | **6.13:1** | body text |
| **Violet-deep `#6D3EE8`** | **5.63:1** | body text |

So there are two tiers. The **neon tier** (`cyan`, `electric`, `magenta`)
is for gradient fills, glows and hover states — never for small text on a light
surface. The **deep tier** (`accent`, `violet-deep`) is what every label, link
and small accent actually uses.

The neon colours are still everywhere you would expect them — the hero
buttons, the countdown, the Meghalaya band, the footer — because those sit on
dark. Inside a dark band, add the `on-dark` class and the neon tier becomes
correct again.

Every text pairing in the built site clears WCAG AA. The weakest is muted grey
on the recessed panel colour at 4.86:1.

### Adding a section

Light section, which is the default:

```tsx
<section id="whatever" className="band bg-canvas">
  <div className="shell">
    <SectionHeading index="12" kicker="..." title={<>...</>} />
  </div>
</section>
```

Dark section — note both the `on-dark` class and `tone="dark"`:

```tsx
<section className="on-dark band bg-void">
  <div className="shell">
    <SectionHeading index="13" tone="dark" kicker="..." title={<>...</>} />
  </div>
</section>
```

`PrimaryCta` and `GhostCta` take the same `tone` prop, and switch between the
neon and deep gradients accordingly.

### Going back to a dark site

Swap the `canvas`, `paper` and `mist` values in `tailwind.config.js` for dark
ones and flip `slate`/`muted` with `chalk`/`haze`. The tone system means the
three dark bands need no changes at all.

---

## Responsive behaviour

Some of this is not visible on a desktop browser, so it is worth knowing it is
deliberate.

- **Hover-only content is shown outright on touch.** Event row descriptions and
  speaker bio notes reveal on hover. A phone has no hover state, so that
  content would simply never be seen. The `useCanHover` hook detects a genuine
  fine pointer and those components render the detail unconditionally when
  there isn't one — the same content, not a cut-down version.
- **The full navigation appears at `xl` (1280px), not `lg`.** Nine links plus
  the wordmark and the register button need about 1056px; the content shell at
  `lg` is only 960px, so the bar would have wrapped. Below `xl` it is the
  hamburger sheet.
- **The section rail appears at `2xl` (1536px).** It is positioned outside the
  content column, and that is the first width where a real gutter exists for
  it. Any narrower and it would sit on top of the headline.
- **Touch targets.** The `tap` utility enforces a 44px minimum on coarse
  pointers only, so controls do not get bloated on a mouse-driven screen.
- **Headline sizing uses `min(vw, vh)`.** It responds to whichever axis is
  scarcer, so a short wide laptop window scales the type down rather than
  pushing the countdown off screen. It holds at roughly 29% of viewport height
  from a 390px phone to a 1920px monitor.
- **CTAs stack full-width below `sm`** instead of wrapping into an awkward
  two-line cluster.

---

## How the hero transition works

This is the part most likely to be modified later, so it is worth
understanding.

Scroll position drives four cheap properties on the video shell: **scale**,
**border-radius**, **overlay opacity**, and a small **parallax offset** on the
hero text. The video plays at its own natural rate throughout and is never
touched.

Scrubbing `video.currentTime` from scroll position is the obvious way to build
this and it is a trap. It forces a seek and a decode on every scroll event,
which stutters badly on the mid-range laptops and phones most of your audience
will use. Transforms are composited on the GPU and cost effectively nothing.

Tuning lives in `siteConfig.ts` under `motion`:

```ts
heroScaleTo: 0.94,   // how far the video shrinks
heroRadiusTo: 34,    // corner radius of the finished card, in px
heroDimTo: 0.72,     // overlay opacity at the end
```

The scroll runway is the `h-[200vh]` on the outer element in
`ScrollVideoEffect.tsx`. Increase it for a slower, longer transition.

---

## Performance and accessibility notes

These are already handled; listed so nobody removes them by accident.

- The video is `muted`, `autoPlay`, `loop` and `playsInline`. **All four are
  required** for autoplay to work — iOS Safari in particular refuses without
  `playsInline`, and every browser refuses without `muted`.
- `preload="metadata"` keeps the initial request small.
- The video pauses when the tab is hidden *and* when it scrolls off screen.
- If the file is missing or the codec is unsupported, the poster takes over and
  the hero still looks finished.
- `prefers-reduced-motion` is respected throughout: no parallax, no scroll
  transition, no particle canvas, poster instead of video.
- The particle field in the final section is a small 2D canvas — roughly 60
  nodes — not WebGL. Three.js was not used anywhere. On a page that already
  carries a video, a 500 KB 3D library is a bad trade.
- Fonts come from Google Fonts with `preconnect` and `display=swap`.
- There is a skip link, visible keyboard focus, `aria-current` on the active
  nav item, and arrow-key navigation in the gallery lightbox.

---

## Project structure

```
public/
  videos/esummit-background.mp4     ← replace this file to change the video
  videos/esummit-background.webm    ← smaller alternative, served first
  images/video-poster.jpg           ← hero fallback frame
  images/meghalaya-ridge.jpg        ← used by the Meghalaya band
  images/network.jpg                ← texture on the featured event card
  .htaccess                         ← Apache rules, copied into dist/
  favicon.svg
  robots.txt

src/
  components/     Navbar, Hero, VideoBackground, ScrollVideoEffect, About,
                  Events, Speakers, StartupZone, Schedule, Campus, Sponsors,
                  Gallery, FAQ, Team, FinalCta, Footer, SectionRail,
                  Countdown, Primitives
  data/           events, speakers, schedule, sponsors, faq, gallery, team, nav
  config/         siteConfig.ts
  hooks/          useCountdown, useCountUp, useActiveSection,
                  usePrefersReducedMotion
  lib/            asset.ts
  App.tsx, main.tsx, index.css
```

---

## Notes on the build

`npm run build` runs Vite directly rather than `tsc && vite build`, so a stray
type error will not block a deploy the night before the summit. Run type
checking separately whenever you want it:

```bash
npm run typecheck
```

---

## Troubleshooting

**The video does not play on the live site.** Check `.htaccess` uploaded (it is
hidden by default in File Manager). Then confirm `public_html/videos/` actually
contains the file — File Manager sometimes drops large files on a slow upload.

**The page is blank and the console shows 404s for `/assets/...`.** The build
was uploaded into a subfolder but the paths are being resolved from the root.
`base: './'` in `vite.config.ts` should prevent this; make sure you did not
change it to `'/'`.

**Styles look unstyled.** The `assets/` folder did not upload completely.
Delete it on the server and upload again.

**Old version still showing after re-upload.** Hard-refresh
(Ctrl/Cmd + Shift + R). If it persists, clear the cache in hPanel under
**Website → Cache Manager**.

**The countdown shows the wrong time.** `startsAt` is missing its `+05:30`
offset.
