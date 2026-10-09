/**
 * Resolves a root-relative path ("/videos/x.mp4") against Vite's BASE_URL.
 *
 * Why this exists: vite.config.ts sets `base: './'` so the build survives being
 * dropped into a subfolder on Hostinger. Files in public/ are copied verbatim,
 * so their URLs have to be prefixed the same way at runtime.
 */
export function asset(path: string): string {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

/** Joins conditional class names. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
