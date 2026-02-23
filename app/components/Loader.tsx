import {useEffect, useRef, useState} from 'react';
import {gsap} from 'gsap';

/**
 * Loader — Premium loading experience
 *
 * Philosophy: The loader IS part of the experience.
 * It sets the cinematic tone before any content appears.
 * A counter from 0–100 with the brand name reveal.
 */
export function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!loaderRef.current || !counterRef.current || !brandRef.current || !lineRef.current) return;

    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsComplete(true);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsComplete(true);
      },
    });

    // Counter animation 0 → 100
    const counter = {value: 0};
    tl.to(counter, {
      value: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(counter.value)
            .toString()
            .padStart(3, '0');
        }
      },
    });

    // Progress line
    tl.to(
      lineRef.current,
      {
        scaleX: 1,
        duration: 2,
        ease: 'power2.inOut',
      },
      0,
    );

    // Brand name reveal
    tl.fromTo(
      brandRef.current,
      {opacity: 0, y: 20},
      {opacity: 1, y: 0, duration: 0.6, ease: 'power3.out'},
      0.3,
    );

    // Exit: sweep up
    tl.to(loaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power4.inOut',
      delay: 0.3,
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (isComplete) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-void"
      aria-hidden="true"
    >
      {/* Brand name */}
      <div ref={brandRef} className="mb-12 opacity-0">
        <span className="text-caption tracking-widest text-smoke">
          MILE 27
        </span>
      </div>

      {/* Counter */}
      <span
        ref={counterRef}
        className="font-mono text-6xl font-light tracking-tight text-white/20"
      >
        000
      </span>

      {/* Progress line */}
      <div className="mt-8 h-px w-48 overflow-hidden bg-steel">
        <div
          ref={lineRef}
          className="h-full w-full origin-left scale-x-0 bg-white"
        />
      </div>
    </div>
  );
}
