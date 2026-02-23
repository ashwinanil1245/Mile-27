import {useRef, useEffect} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useMagnetic} from '~/hooks/useMagnetic';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * EditorialBanner — Full-width cinematic statement
 *
 * A single, oversized typographic statement with parallax background.
 * This section is emotional, not informational.
 * Purpose: reinforce brand positioning through atmosphere.
 */
export function EditorialBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>({strength: 0.15});

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !bgRef.current) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Text reveal on scroll
      gsap.fromTo(
        textRef.current,
        {y: 80, opacity: 0},
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        },
      );

      // Parallax background
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 scale-110">
        <div className="absolute inset-0 bg-gradient-to-b from-void via-carbon to-void" />
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/5 blur-3xl" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-void/40" />

      {/* Content */}
      <div ref={textRef} className="container-narrow relative z-10 text-center opacity-0">
        <span className="text-micro mb-8 block text-ember/80">
          The Mile 27 Promise
        </span>

        <h2 className="text-display mb-8 leading-tight text-white">
          The last mile
          <br />
          demands the
          <br />
          <span className="italic text-white/40">best armor.</span>
        </h2>

        <p className="mx-auto mb-10 max-w-lg text-body leading-relaxed text-smoke">
          Named after the invisible wall — the moment where everything
          separates the committed from the casual. Mile 27 is built for
          those who push past limits.
        </p>

        <a
          ref={ctaRef}
          href="/collections"
          className="magnetic-wrap inline-flex items-center gap-3 bg-ember px-8 py-4 text-caption tracking-widest text-white transition-all duration-500 hover:bg-ember-muted"
        >
          <span>Shop Now</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
