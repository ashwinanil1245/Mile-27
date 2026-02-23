import {useCustomCursor} from '~/hooks/useCustomCursor';

/**
 * CustomCursor — Dual-ring cursor system
 *
 * Outer ring: 40px, follows with lag (depth parallax)
 * Inner dot: 8px, instant follow
 *
 * Hidden on touch devices via CSS and JS check.
 * Respects prefers-reduced-motion.
 */
export function CustomCursor() {
  const {outerRef, innerRef} = useCustomCursor();

  return (
    <>
      {/* Outer ring — slow follow, creates perceived depth */}
      <div
        ref={outerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 mix-blend-difference md:block"
        style={{willChange: 'transform'}}
        aria-hidden="true"
      />
      {/* Inner dot — instant follow, precision feedback */}
      <div
        ref={innerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference md:block"
        style={{willChange: 'transform'}}
        aria-hidden="true"
      />
    </>
  );
}
