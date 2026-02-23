import {useEffect, useRef, useState} from 'react';
import {Link} from '@remix-run/react';
import {gsap} from 'gsap';
import {useMagnetic} from '~/hooks/useMagnetic';

interface NavigationProps {
  shopName: string;
}

/**
 * Navigation — Minimal, premium, sticky header
 *
 * Behavior:
 * - Transparent on hero, solid on scroll
 * - Hides on scroll down, reveals on scroll up
 * - Logo centered, nav links left, cart/actions right
 * - Magnetic effect on interactive elements
 */
export function Navigation({shopName}: NavigationProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const threshold = 100;

      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > threshold) {
        setIsVisible(currentScrollY < lastScrollY.current);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 z-[100] w-full transition-all duration-500 ${
        isScrolled
          ? 'bg-void/90 backdrop-blur-sm'
          : 'bg-transparent'
      } ${
        isVisible
          ? 'translate-y-0'
          : '-translate-y-full'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <nav className="container-wide flex items-center justify-between py-5">
        {/* Left — Nav links */}
        <div className="flex items-center gap-8">
          <NavLink href="/collections">Store</NavLink>
          <NavLink href="/about">About</NavLink>
        </div>

        {/* Center — Brand logo */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2"
          aria-label={shopName}
        >
          <span className="text-lg font-bold tracking-[0.25em] text-white uppercase">
            MILE 27
          </span>
        </Link>

        {/* Right — Actions */}
        <div className="flex items-center gap-6">
          <NavLink href="/contact">Contact</NavLink>
          <CartButton />
        </div>
      </nav>
    </header>
  );
}

function NavLink({href, children}: {href: string; children: string}) {
  const magneticRef = useMagnetic<HTMLAnchorElement>({strength: 0.2});

  return (
    <Link
      ref={magneticRef}
      to={href}
      className="link-underline text-caption text-smoke transition-colors duration-300 hover:text-white"
    >
      {children}
    </Link>
  );
}

function CartButton() {
  const magneticRef = useMagnetic<HTMLButtonElement>({strength: 0.25});

  return (
    <button
      ref={magneticRef}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-colors duration-300 hover:border-white/30"
      aria-label="Open cart"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-smoke"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    </button>
  );
}
