import {useScrollReveal} from '~/hooks/useGsap';

/**
 * FeaturesStrip — Horizontal feature highlights
 *
 * Minimal. No fluff. Icons + micro-copy.
 * Enters on scroll with stagger.
 * Serves as a trust signal / differentiator strip.
 */

const FEATURES = [
  {
    icon: ShieldIcon,
    title: 'ECE 22.06',
    description: 'Exceeds global safety standards',
  },
  {
    icon: WeightIcon,
    title: '850g',
    description: 'Ultra-lightweight carbon shell',
  },
  {
    icon: WindIcon,
    title: 'CFD Vents',
    description: 'Computational aero design',
  },
  {
    icon: LockIcon,
    title: 'Emergency',
    description: 'Quick-release cheek pads',
  },
];

export function FeaturesStrip() {
  const ref = useScrollReveal<HTMLDivElement>({
    y: 30,
    stagger: 0.1,
    selector: '[data-feature]',
    duration: 0.7,
  });

  return (
    <section className="border-y border-white/5 py-16">
      <div ref={ref} className="container-wide">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              data-feature
              className="flex flex-col items-center text-center md:items-start md:text-left"
            >
              <feature.icon />
              <h3 className="text-subheading mt-4 text-white">
                {feature.title}
              </h3>
              <p className="text-caption mt-2 text-smoke">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className="text-ember"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function WeightIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className="text-ember"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  );
}

function WindIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className="text-ember"
    >
      <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className="text-ember"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}
