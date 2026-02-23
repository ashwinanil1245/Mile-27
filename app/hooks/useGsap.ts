import {useEffect, useRef, useCallback} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

// Register GSAP plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Check if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Core GSAP animation hook — provides a scoped ref and cleanup
 */
export function useGsapContext<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    return () => {
      ctx.current?.revert();
    };
  }, []);

  const createContext = useCallback(
    (callback: (self: gsap.Context) => void) => {
      if (!ref.current) return;
      ctx.current?.revert();
      ctx.current = gsap.context(callback, ref.current);
    },
    [],
  );

  return {ref, createContext, ctx};
}

/**
 * Scroll-triggered fade-up reveal animation
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: {
    y?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    selector?: string;
    start?: string;
  } = {},
) {
  const {
    y = 60,
    duration = 1,
    delay = 0,
    stagger = 0.1,
    selector,
    start = 'top 85%',
  } = options;

  const ref = useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return;

    const targets = selector
      ? ref.current.querySelectorAll(selector)
      : ref.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          y,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: 'play none none none',
          },
        },
      );
    }, ref.current);

    return () => ctx.revert();
  }, [y, duration, delay, stagger, selector, start, prefersReducedMotion]);

  return ref;
}

/**
 * Parallax scroll effect — subtle depth on images
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.3,
) {
  const ref = useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, ref.current);

    return () => ctx.revert();
  }, [speed, prefersReducedMotion]);

  return ref;
}

/**
 * Image reveal with clip-path animation
 */
export function useImageReveal<T extends HTMLElement = HTMLDivElement>(
  options: {
    direction?: 'up' | 'down' | 'left' | 'right';
    duration?: number;
    delay?: number;
  } = {},
) {
  const {direction = 'up', duration = 1.2, delay = 0} = options;
  const ref = useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return;

    const clipPaths: Record<string, {from: string; to: string}> = {
      up: {from: 'inset(100% 0 0 0)', to: 'inset(0 0 0 0)'},
      down: {from: 'inset(0 0 100% 0)', to: 'inset(0 0 0 0)'},
      left: {from: 'inset(0 100% 0 0)', to: 'inset(0 0 0 0)'},
      right: {from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0)'},
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {clipPath: clipPaths[direction].from},
        {
          clipPath: clipPaths[direction].to,
          duration,
          delay,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );
    }, ref.current);

    return () => ctx.revert();
  }, [direction, duration, delay, prefersReducedMotion]);

  return ref;
}

/**
 * Staggered children entrance — for grids, lists
 */
export function useStaggerEntrance<T extends HTMLElement = HTMLDivElement>(
  childSelector: string,
  options: {
    y?: number;
    stagger?: number;
    duration?: number;
    start?: string;
  } = {},
) {
  const {y = 40, stagger = 0.08, duration = 0.8, start = 'top 80%'} = options;
  const ref = useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return;

    const children = ref.current.querySelectorAll(childSelector);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        {y, opacity: 0},
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: 'play none none none',
          },
        },
      );
    }, ref.current);

    return () => ctx.revert();
  }, [childSelector, y, stagger, duration, start, prefersReducedMotion]);

  return ref;
}
