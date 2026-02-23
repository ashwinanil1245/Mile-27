import {useEffect, useRef} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useMagnetic} from '~/hooks/useMagnetic';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hero — Cinematic entrance for Mile 27
 *
 * Architecture:
 * 1. Full viewport, dark atmospheric background
 * 2. Typography reveals in staggered sequence
 * 3. Subtle parallax on background layer
 * 4. Scroll indicator pulses at bottom
 * 5. On scroll: content fades, image zooms subtly
 *
 * This is NOT a template hero. It's a cinematic opening sequence.
 * Every element has intentional timing and purpose.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const headingLine1Ref = useRef<HTMLDivElement>(null);
  const headingLine2Ref = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Master entrance timeline — cinematic pacing
      const tl = gsap.timeline({
        delay: 2.8, // After loader completes
        defaults: {ease: 'power3.out'},
      });

      // Background zoom-in from slight scale
      tl.fromTo(
        bgRef.current,
        {scale: 1.15, opacity: 0},
        {scale: 1, opacity: 1, duration: 2, ease: 'power2.out'},
        0,
      );

      // Overlay gradient fade
      tl.fromTo(
        overlayRef.current,
        {opacity: 0},
        {opacity: 1, duration: 1.5},
        0.3,
      );

      // Tagline — small text appears first (sets context)
      tl.fromTo(
        taglineRef.current,
        {y: 30, opacity: 0},
        {y: 0, opacity: 1, duration: 0.8},
        0.8,
      );

      // Divider line draws in
      tl.fromTo(
        dividerRef.current,
        {scaleX: 0},
        {scaleX: 1, duration: 1, ease: 'power4.inOut'},
        1.0,
      );

      // Heading line 1 — massive type, clip reveal from bottom
      tl.fromTo(
        headingLine1Ref.current,
        {y: 100, opacity: 0, clipPath: 'inset(100% 0 0 0)'},
        {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0% 0 0 0)',
          duration: 1,
          ease: 'power4.out',
        },
        1.1,
      );

      // Heading line 2 — staggered delay
      tl.fromTo(
        headingLine2Ref.current,
        {y: 100, opacity: 0, clipPath: 'inset(100% 0 0 0)'},
        {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0% 0 0 0)',
          duration: 1,
          ease: 'power4.out',
        },
        1.3,
      );

      // Subtext
      tl.fromTo(
        subtextRef.current,
        {y: 20, opacity: 0},
        {y: 0, opacity: 1, duration: 0.8},
        1.8,
      );

      // CTA button
      tl.fromTo(
        ctaRef.current,
        {y: 20, opacity: 0},
        {y: 0, opacity: 1, duration: 0.8},
        2.0,
      );

      // Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        {opacity: 0},
        {opacity: 1, duration: 0.6},
        2.5,
      );

      // === Scroll-linked animations ===

      // Parallax: background moves slower than content
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (bgRef.current) {
            gsap.set(bgRef.current, {
              yPercent: self.progress * 30,
            });
          }
        },
      });

      // Content fades on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '40% top',
        scrub: true,
        onUpdate: (self) => {
          const contentElements = [
            taglineRef.current,
            headingLine1Ref.current,
            headingLine2Ref.current,
            subtextRef.current,
            ctaRef.current,
          ];
          contentElements.forEach((el) => {
            if (el) {
              gsap.set(el, {
                opacity: 1 - self.progress * 1.5,
                y: self.progress * -50,
              });
            }
          });
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const ctaMagneticRef = useMagnetic<HTMLAnchorElement>({strength: 0.15});

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background — Atmospheric dark image */}
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-0"
        style={{willChange: 'transform'}}
      >
        {/* Using CSS gradient as placeholder for premium imagery */}
        <div className="absolute inset-0 bg-gradient-to-b from-carbon via-void to-void" />
        {/* Atmospheric noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Dramatic light leak — top-left glow */}
        <div className="absolute -top-1/4 -left-1/4 h-full w-full rounded-full bg-gradient-radial from-white/[0.04] to-transparent blur-3xl" />
      </div>

      {/* Overlay gradient for text contrast */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent opacity-0"
      />

      {/* Content */}
      <div className="container-wide relative z-10 flex flex-col items-center text-center">
        {/* Tagline */}
        <div ref={taglineRef} className="mb-6 opacity-0">
          <span className="text-micro tracking-[0.3em] text-smoke">
            Premium Motorcycle Helmets
          </span>
        </div>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="mb-10 h-px w-16 origin-center scale-x-0 bg-ember"
        />

        {/* Main heading — two lines for cinematic weight */}
        <div className="overflow-hidden">
          <div ref={headingLine1Ref} className="opacity-0">
            <h1 className="text-hero font-extrabold leading-none tracking-tight text-white">
              ENGINEERED
            </h1>
          </div>
        </div>
        <div className="overflow-hidden">
          <div ref={headingLine2Ref} className="opacity-0">
            <h1 className="text-hero font-extrabold leading-none tracking-tight text-white">
              <span className="text-white/40">FOR THE</span>{' '}
              <span className="text-ember">FEARLESS</span>
            </h1>
          </div>
        </div>

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="mt-8 max-w-md text-body leading-relaxed text-smoke opacity-0"
        >
          Precision-crafted protection meets uncompromising design.
          Where safety becomes a statement.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="mt-12 opacity-0">
          <a
            ref={ctaMagneticRef}
            href="/collections"
            className="magnetic-wrap group relative inline-flex items-center gap-3 border border-white/20 px-8 py-4 text-caption tracking-widest text-white transition-all duration-500 hover:border-white/60 hover:bg-white/5"
          >
            <span>Explore Collection</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-micro text-smoke/50">Scroll</span>
          <div className="h-12 w-px overflow-hidden bg-white/10">
            <div className="h-full w-full origin-top animate-pulse bg-white/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
