import { useEffect, useState } from 'react';

/**
 * Live media query state.
 *
 * Used to tell hover-capable pointers apart from touch. Several components
 * reveal detail on hover, which is invisible on a phone — there is no hover
 * state to enter. Rather than duplicating markup, those components ask this
 * hook and simply render the detail unconditionally on touch devices.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return;
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True on devices that can actually hover — i.e. not a touchscreen. */
export function useCanHover(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}
