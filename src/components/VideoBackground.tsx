import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { asset, cx } from '../lib/asset';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * The single background video for the whole page.
 *
 * Everything here exists for a reason:
 *  - muted + playsInline + autoplay is the only combination browsers will
 *    start without a user gesture. All three are required; none is optional.
 *  - preload="metadata" keeps the initial payload small on shared hosting.
 *  - The video pauses when the tab is hidden AND when it scrolls out of view,
 *    which is the single biggest battery/CPU win on a page this long.
 *  - If the file is missing or the codec is unsupported, onError flips to the
 *    poster and the hero still looks finished. Nothing renders broken.
 *  - Reduced motion means the video never plays at all — poster only.
 */
export function VideoBackground({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const reduced = usePrefersReducedMotion();

  const poster = asset(siteConfig.VIDEO_POSTER);

  /* Autoplay + lifecycle. */
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || reduced) return;

    let onScreen = true;

    const sync = () => {
      if (document.hidden || !onScreen) {
        if (!video.paused) video.pause();
        return;
      }
      // play() rejects on some mobile browsers until an interaction; the
      // poster stays visible in that case, which is an acceptable outcome.
      const attempt = video.play();
      if (attempt && typeof attempt.catch === 'function') {
        attempt.catch(() => undefined);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? true;
        sync();
      },
      { threshold: 0.01 },
    );

    if (container) io.observe(container);
    document.addEventListener('visibilitychange', sync);
    sync();

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [reduced]);

  const showVideo = !failed && !reduced;

  return (
    <div ref={containerRef} className={cx('absolute inset-0 overflow-hidden bg-void', className)}>
      {/* Poster sits underneath permanently: it covers the first paint, the
          decode gap, and every failure mode, with no layout shift. */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className={cx(
          'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000',
          ready && showVideo ? 'opacity-0' : 'opacity-100',
        )}
        decoding="async"
      />

      {showVideo && (
        <video
          ref={videoRef}
          className={cx(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000',
            ready ? 'opacity-100' : 'opacity-0',
          )}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          disablePictureInPicture
          controls={false}
          tabIndex={-1}
          aria-hidden="true"
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
        >
          {siteConfig.VIDEO_URL_WEBM ? (
            <source src={asset(siteConfig.VIDEO_URL_WEBM)} type="video/webm" />
          ) : null}
          <source src={asset(siteConfig.VIDEO_URL)} type="video/mp4" />
        </video>
      )}

      {/* Ambient colour that reads as part of the footage rather than a filter. */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen opacity-45"
        style={{
          background:
            'radial-gradient(60% 50% at 18% 12%, rgba(0,229,255,0.20) 0%, transparent 62%), radial-gradient(55% 55% at 86% 88%, rgba(139,92,246,0.22) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}
