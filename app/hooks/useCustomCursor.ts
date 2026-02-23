import {useEffect, useRef, useState, useCallback} from 'react';
import {gsap} from 'gsap';

type CursorState = 'default' | 'hover' | 'action' | 'hidden';

/**
 * Custom cursor system — dual-ring cursor that reacts to interactive elements.
 *
 * Philosophy (inspired by analysis):
 * - Outer ring: slow-following, creates depth parallax
 * - Inner dot: fast-following, direct positional feedback
 * - On hover over links/buttons: outer ring scales up, inner dot shrinks
 * - On action elements: ring morphs into contextual shape
 * - Zero gimmick — the cursor enhances perceived precision
 */
export function useCustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const mouse = useRef({x: 0, y: 0});
  const outerPos = useRef({x: 0, y: 0});
  const rafId = useRef<number>(0);

  const lerp = useCallback(
    (start: number, end: number, factor: number) =>
      start + (end - start) * factor,
    [],
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Don't show custom cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = {x: e.clientX, y: e.clientY};
      // Inner dot follows immediately
      gsap.set(inner, {x: e.clientX, y: e.clientY});
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="action"]',
      );
      if (interactive) {
        setCursorState('hover');
        gsap.to(outer, {
          scale: 2.5,
          opacity: 0.4,
          duration: 0.4,
          ease: 'power2.out',
        });
        gsap.to(inner, {scale: 0.5, duration: 0.3, ease: 'power2.out'});
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="action"]',
      );
      if (interactive) {
        setCursorState('default');
        gsap.to(outer, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        });
        gsap.to(inner, {scale: 1, duration: 0.3, ease: 'power2.out'});
      }
    };

    const handleMouseDown = () => {
      gsap.to(outer, {scale: 0.8, duration: 0.15, ease: 'power2.out'});
      gsap.to(inner, {scale: 1.5, duration: 0.15, ease: 'power2.out'});
    };

    const handleMouseUp = () => {
      gsap.to(outer, {
        scale: cursorState === 'hover' ? 2.5 : 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(inner, {
        scale: cursorState === 'hover' ? 0.5 : 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    // Animate outer ring with lag (creates depth)
    const animateOuter = () => {
      outerPos.current.x = lerp(outerPos.current.x, mouse.current.x, 0.12);
      outerPos.current.y = lerp(outerPos.current.y, mouse.current.y, 0.12);
      gsap.set(outer, {x: outerPos.current.x, y: outerPos.current.y});
      rafId.current = requestAnimationFrame(animateOuter);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    rafId.current = requestAnimationFrame(animateOuter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(rafId.current);
    };
  }, [cursorState, lerp]);

  return {outerRef, innerRef, cursorState};
}
