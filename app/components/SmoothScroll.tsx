import type {ReactNode} from 'react';

/**
 * SmoothScroll wrapper — lightweight container
 *
 * We keep native scrolling for performance and accessibility.
 * GSAP ScrollTrigger handles all scroll-linked animations
 * without hijacking the scroll itself.
 *
 * No Lenis/Locomotive — those add weight and accessibility issues.
 * The premium feel comes from our animation orchestration, not
 * from overriding the browser's scroll behavior.
 */
export function SmoothScroll({children}: {children: ReactNode}) {
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
