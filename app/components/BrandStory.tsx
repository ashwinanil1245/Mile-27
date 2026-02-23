import {useRef, useEffect} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useScrollReveal, useImageReveal, useParallax} from '~/hooks/useGsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * BrandStory — Cinematic editorial section
 *
 * This section breaks the grid rhythm intentionally.
 * Split layout: oversized image left, editorial text right.
 * The image reveals with clip-path, text staggers in.
 *
 * Emotional purpose: Build trust through craftsmanship narrative.
 * Commerce second, story first.
 */
export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRevealRef = useImageReveal<HTMLDivElement>({
    direction: 'left',
    duration: 1.4,
  });
  const textRef = useScrollReveal<HTMLDivElement>({
    y: 50,
    duration: 0.9,
    stagger: 0.15,
    selector: '[data-reveal]',
  });
  const parallaxRef = useParallax<HTMLDivElement>(-0.15);
  const statsSectionRef = useRef<HTMLDivElement>(null);

  // Counter animation for stats
  useEffect(() => {
    if (!statsSectionRef.current) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const counters = statsSectionRef.current!.querySelectorAll(
        '[data-count]',
      );

      counters.forEach((counter) => {
        const target = parseInt(
          (counter as HTMLElement).dataset.count || '0',
          10,
        );
        const obj = {value: 0};

        ScrollTrigger.create({
          trigger: counter,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              value: target,
              duration: 2,
              ease: 'power2.out',
              onUpdate: () => {
                (counter as HTMLElement).textContent = Math.floor(
                  obj.value,
                ).toLocaleString();
              },
            });
          },
        });
      });
    }, statsSectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-section overflow-hidden">
      <div className="container-wide">
        {/* Split layout */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image side */}
          <div ref={imageRevealRef} className="relative aspect-[4/5] overflow-hidden">
            <div ref={parallaxRef} className="absolute inset-0 scale-110">
              {/* Premium image placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-graphite via-carbon to-void" />
              {/* Helmet craftsmanship visual hint */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="h-48 w-48 rounded-full border border-white/5 lg:h-64 lg:w-64" />
                  <div className="absolute inset-4 rounded-full border border-white/10" />
                  <div className="absolute inset-8 rounded-full bg-gradient-to-b from-steel/30 to-transparent" />
                </div>
              </div>
              {/* Atmospheric grain */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />
            </div>
          </div>

          {/* Text side */}
          <div ref={textRef} className="lg:pl-8">
            <span
              data-reveal
              className="text-micro mb-6 block text-ember"
            >
              Our Philosophy
            </span>

            <h2
              data-reveal
              className="text-heading mb-8 text-white"
            >
              Protection is not
              <br />
              a compromise.
              <br />
              <span className="text-white/30">It&apos;s a craft.</span>
            </h2>

            <div data-reveal className="mb-8 h-px w-12 bg-ember" />

            <p
              data-reveal
              className="mb-6 max-w-md leading-relaxed text-smoke"
            >
              Every Mile 27 helmet begins as an obsession with the
              intersection of safety engineering and aesthetic precision.
              We don&apos;t build helmets. We engineer confidence.
            </p>

            <p
              data-reveal
              className="mb-10 max-w-md leading-relaxed text-smoke/70"
            >
              Carbon fiber shells hand-laid by specialists. Ventilation
              systems modeled in computational fluid dynamics. Visors
              tested against ballistic-grade impacts. Every gram
              accounted for.
            </p>

            <a
              data-reveal
              href="/about"
              className="link-underline text-caption inline-flex items-center gap-2 text-white transition-colors duration-300 hover:text-ember"
            >
              <span>Read Our Story</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Stats bar — horizontal divider with numbers */}
        <div
          ref={statsSectionRef}
          className="mt-24 grid grid-cols-2 gap-8 border-t border-white/5 pt-12 md:grid-cols-4"
        >
          <Stat number={27} suffix="+" label="Years of Engineering" />
          <Stat number={14} suffix="" label="Safety Certifications" />
          <Stat number={850} suffix="g" label="Lightest Shell Weight" />
          <Stat number={100} suffix="%" label="Carbon Fiber Construction" />
        </div>
      </div>
    </section>
  );
}

function Stat({
  number,
  suffix,
  label,
}: {
  number: number;
  suffix: string;
  label: string;
}) {
  return (
    <div className="text-center md:text-left">
      <div className="mb-2 flex items-baseline justify-center gap-1 md:justify-start">
        <span
          data-count={number}
          className="font-display text-3xl font-bold text-white lg:text-4xl"
        >
          0
        </span>
        {suffix && (
          <span className="text-body text-ember">{suffix}</span>
        )}
      </div>
      <span className="text-micro text-smoke">{label}</span>
    </div>
  );
}
