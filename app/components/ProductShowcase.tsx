import {useRef, useEffect} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useStaggerEntrance, useScrollReveal} from '~/hooks/useGsap';
import {useMagnetic} from '~/hooks/useMagnetic';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  image: string;
  badge?: string;
}

const FEATURED_PRODUCTS: Product[] = [
  {
    id: 'phantom-x1',
    title: 'Phantom X1',
    subtitle: 'Full Carbon Shell',
    price: '$899',
    image: '',
    badge: 'New',
  },
  {
    id: 'stealth-pro',
    title: 'Stealth Pro',
    subtitle: 'Aero Series',
    price: '$749',
    image: '',
  },
  {
    id: 'vortex-r',
    title: 'Vortex R',
    subtitle: 'Racing Grade',
    price: '$1,199',
    image: '',
    badge: 'Limited',
  },
  {
    id: 'shadow-lite',
    title: 'Shadow Lite',
    subtitle: 'Urban Collection',
    price: '$599',
    image: '',
  },
];

/**
 * ProductShowcase — Staggered grid with premium hover interactions
 *
 * Design principles:
 * - Grid items enter with staggered scroll-reveal
 * - Hover: image scales subtly (1.05), overlay reveals info
 * - Price and details appear on hover with smooth transition
 * - No jarring movement — everything breathes
 */
export function ProductShowcase() {
  const headingRef = useScrollReveal<HTMLDivElement>({y: 40, duration: 0.8});
  const gridRef = useStaggerEntrance<HTMLDivElement>('[data-product-card]', {
    y: 60,
    stagger: 0.12,
    duration: 1,
  });

  return (
    <section className="relative py-section">
      {/* Section header */}
      <div ref={headingRef} className="container-wide mb-16">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-micro mb-4 block text-ember">
              Collection
            </span>
            <h2 className="text-display text-white">
              Select
              <br />
              <span className="text-white/30">Your Armor</span>
            </h2>
          </div>
          <ViewAllLink />
        </div>
      </div>

      {/* Product grid */}
      <div
        ref={gridRef}
        className="container-wide grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {FEATURED_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({product}: {product: Product}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const info = infoRef.current;
    if (!card || !image || !info) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleEnter = () => {
      gsap.to(image, {scale: 1.05, duration: 0.6, ease: 'power2.out'});
      gsap.to(info, {y: 0, opacity: 1, duration: 0.4, ease: 'power3.out'});
    };

    const handleLeave = () => {
      gsap.to(image, {scale: 1, duration: 0.6, ease: 'power2.out'});
      gsap.to(info, {y: 10, opacity: 0, duration: 0.3, ease: 'power2.in'});
    };

    card.addEventListener('mouseenter', handleEnter);
    card.addEventListener('mouseleave', handleLeave);

    return () => {
      card.removeEventListener('mouseenter', handleEnter);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <a
      ref={cardRef}
      href={`/products/${product.id}`}
      data-product-card
      className="group relative block aspect-[3/4] overflow-hidden bg-graphite"
      data-cursor="action"
    >
      {/* Product image container */}
      <div
        ref={imageRef}
        className="absolute inset-0"
        style={{willChange: 'transform'}}
      >
        {/* Gradient placeholder representing helmet imagery */}
        <div className="absolute inset-0 bg-gradient-to-br from-steel via-graphite to-carbon" />
        {/* Helmet silhouette hint */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-32 w-32 rounded-full bg-gradient-to-b from-titanium to-carbon opacity-60" />
        </div>
      </div>

      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-10">
          <span className="text-micro bg-ember px-3 py-1 text-white">
            {product.badge}
          </span>
        </div>
      )}

      {/* Bottom gradient for text readability */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-void/90 to-transparent" />

      {/* Product info — always visible */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-subheading text-white">
              {product.title}
            </h3>
            <p className="text-caption mt-1 text-smoke">
              {product.subtitle}
            </p>
          </div>
          <span className="text-body font-medium text-white">
            {product.price}
          </span>
        </div>

        {/* Hover-only detail bar */}
        <div
          ref={infoRef}
          className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 opacity-0"
          style={{transform: 'translateY(10px)'}}
        >
          <span className="text-micro text-smoke">View Details</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-white transition-transform duration-500 group-hover:translate-x-1"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}

function ViewAllLink() {
  const magneticRef = useMagnetic<HTMLAnchorElement>({strength: 0.2});

  return (
    <a
      ref={magneticRef}
      href="/collections"
      className="link-underline text-caption hidden text-smoke transition-colors duration-300 hover:text-white md:inline-block"
    >
      View All
    </a>
  );
}
