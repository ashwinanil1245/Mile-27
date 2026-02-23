import {useEffect, useRef, useCallback} from 'react';
import {gsap} from 'gsap';

interface MagneticOptions {
  strength?: number;
  ease?: number;
  radius?: number;
}

/**
 * Magnetic cursor effect — element subtly follows cursor
 * when hovering nearby. Premium, tactile interaction.
 *
 * Principle: The element doesn't chase the cursor aggressively.
 * It leans toward it, like gravity. Restraint is key.
 */
export function useMagnetic<T extends HTMLElement = HTMLDivElement>(
  options: MagneticOptions = {},
) {
  const {strength = 0.3, ease = 0.15, radius = 0.5} = options;
  const ref = useRef<T>(null);
  const position = useRef({x: 0, y: 0});
  const currentPosition = useRef({x: 0, y: 0});
  const rafId = useRef<number>(0);
  const isHovering = useRef(false);

  const lerp = useCallback(
    (start: number, end: number, factor: number) =>
      start + (end - start) * factor,
    [],
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      position.current = {
        x: distX * strength * radius,
        y: distY * strength * radius,
      };
    };

    const handleMouseEnter = () => {
      isHovering.current = true;
    };

    const handleMouseLeave = () => {
      isHovering.current = false;
      position.current = {x: 0, y: 0};
    };

    const animate = () => {
      currentPosition.current.x = lerp(
        currentPosition.current.x,
        position.current.x,
        ease,
      );
      currentPosition.current.y = lerp(
        currentPosition.current.y,
        position.current.y,
        ease,
      );

      gsap.set(element, {
        x: currentPosition.current.x,
        y: currentPosition.current.y,
      });

      rafId.current = requestAnimationFrame(animate);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId.current);
      gsap.set(element, {x: 0, y: 0});
    };
  }, [strength, ease, radius, lerp]);

  return ref;
}
