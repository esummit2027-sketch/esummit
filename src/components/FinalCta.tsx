import { useEffect, useRef } from 'react';
import { siteConfig } from '../config/siteConfig';
import { GhostCta, PrimaryCta, Reveal } from './Primitives';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * A small canvas particle field — roughly 60 nodes with proximity links.
 *
 * Chosen over a WebGL/Three.js scene on purpose: it is a few kilobytes of
 * code instead of a few hundred, it runs on integrated graphics, and it stops
 * entirely when scrolled out of view or when the tab is hidden. On a page that
 * already carries a background video, that restraint is the whole point.
 */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const COUNT = window.innerWidth < 768 ? 34 : 64;
    const LINK_DISTANCE = window.innerWidth < 768 ? 90 : 128;

    const nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00035,
      vy: (Math.random() - 0.5) * 0.00035,
      r: Math.random() * 1.4 + 0.6,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
      }

      // Links first so nodes sit on top of them.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const ax = nodes[i].x * width;
          const ay = nodes[i].y * height;
          const bx = nodes[j].x * width;
          const by = nodes[j].y * height;
          const d = Math.hypot(ax - bx, ay - by);
          if (d > LINK_DISTANCE) continue;

          ctx.strokeStyle = `rgba(22,87,199,${(1 - d / LINK_DISTANCE) * 0.20})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = 'rgba(22,87,199,0.42)';
        ctx.beginPath();
        ctx.arc(n.x * width, n.y * height, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? start() : stop()),
      { threshold: 0.05 },
    );
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : undefined);

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
      aria-hidden="true"
    />
  );
}

export function FinalCta() {
  return (
    <section id="register" className="relative overflow-hidden bg-canvas py-24 sm:py-32 md:py-40">
      <ParticleField />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background:
            'radial-gradient(75% 100% at 50% 116%, rgba(0,229,255,0.22) 0%, rgba(109,62,232,0.16) 40%, transparent 74%)',
        }}
      />

      <div className="shell relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-[16ch] text-[clamp(2.4rem,8.4vw,6rem)] font-extrabold uppercase leading-[0.88] tracking-tightest">
            <span className="block text-slate">The next big idea</span>
            <span className="block text-gradient">could be yours.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mx-auto mt-8 max-w-[54ch] text-[clamp(1rem,1.8vw,1.2rem)] leading-relaxed text-muted">
            Join the innovators, entrepreneurs, creators and dreamers shaping tomorrow.
            Registration for {siteConfig.edition} is open.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <PrimaryCta href={siteConfig.links.register}>Register now</PrimaryCta>
            <GhostCta href="#events">Explore events</GhostCta>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-[13px] tracking-[0.06em] text-muted/75">
            {siteConfig.dateLabel} &nbsp;·&nbsp; {siteConfig.venue}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
