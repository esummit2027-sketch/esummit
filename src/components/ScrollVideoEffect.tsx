import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { VideoBackground } from './VideoBackground';
import { siteConfig } from '../config/siteConfig';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * The signature moment of the page.
 *
 * Scroll drives four cheap, GPU-composited properties on the video shell —
 * scale, border-radius, dim, and a small parallax on the hero content. The
 * video itself keeps playing at its own natural rate the entire time.
 *
 * Deliberately NOT done here: seeking currentTime from scroll position. That
 * technique forces a decode on every scroll event and janks badly on shared
 * hardware. The illusion of scroll-linked motion comes from transforms only.
 *
 * How the transition reads:
 *   progress 0.00  full-bleed, square corners, video at 1.0
 *   progress 0.35  corners begin rounding, scale easing in
 *   progress 1.00  a floating card at ~0.94 scale on deep black
 */
export function ScrollVideoEffect({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  // Track the hero's own travel through the viewport rather than the document,
  // so the timing is identical on a laptop and a tall phone.
  // 'end end' is the important part. The stage is sticky, so its travel is
  // (container height - viewport height). Measuring to 'end end' maps
  // progress 0 -> 1 exactly onto that travel; measuring to 'end start' would
  // leave the transition stranded around 45% when the stage releases.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // A light spring removes the stepping you get from wheel events without
  // adding perceptible lag.
  const progress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 26,
    mass: 0.32,
    restDelta: 0.001,
  });

  const { heroScaleTo, heroRadiusTo, heroDimFrom, heroDimTo } = siteConfig.motion;

  const scale = useTransform(progress, [0, 0.62], [1, heroScaleTo]);
  const radius = useTransform(progress, [0.06, 0.62], [0, heroRadiusTo]);
  const dim = useTransform(progress, [0, 0.85], [heroDimFrom, heroDimTo]);
  const inset = useTransform(progress, [0, 0.62], [0, 18]);

  // Content leaves faster than the video, which is what makes the two layers
  // read as separate planes instead of one flat image.
  const contentY = useTransform(progress, [0, 0.6], [0, -110]);
  const contentOpacity = useTransform(progress, [0, 0.4], [1, 0]);

  // Hoisted: hooks can never live inside a conditional expression in JSX.
  const edgeOpacity = useTransform(progress, [0.3, 0.75], [0, 1]);

  const shellStyle = reduced
    ? undefined
    : { scale, borderRadius: radius, marginLeft: inset, marginRight: inset };

  return (
    <div ref={ref} className="relative h-[200vh]">
      {/* The sticky stage. Everything inside is pinned for the first viewport
          and a bit, which is the window the transition plays out in. */}
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-canvas">
        <motion.div
          className="absolute inset-0 overflow-hidden will-change-transform"
          style={shellStyle}
        >
          <VideoBackground />

          {/* Readability layer. Kept as a gradient rather than a flat wash so
              the footage stays visible through the middle of the frame. */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: reduced ? heroDimFrom : dim,
              background:
                'linear-gradient(180deg, rgba(5,5,5,0.86) 0%, rgba(5,5,5,0.34) 30%, rgba(7,17,31,0.48) 62%, rgba(5,5,5,0.92) 100%)',
            }}
          />

          {/* Vignette — pulls the eye to the centre without darkening it. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 78% at 50% 46%, transparent 38%, rgba(5,5,5,0.72) 100%)',
            }}
          />

          {/* Hairline edge that appears only once the card has formed. */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: reduced ? 0 : radius,
              opacity: reduced ? 0 : edgeOpacity,
              boxShadow:
                'inset 0 0 0 1px rgba(255,255,255,0.14), 0 48px 120px -44px rgba(11,21,38,0.55)',
            }}
          />
        </motion.div>

        <motion.div
          className="relative z-10 h-full will-change-transform"
          style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
