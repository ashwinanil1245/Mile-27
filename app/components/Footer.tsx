import {Link} from '@remix-run/react';
import {useScrollReveal} from '~/hooks/useGsap';

interface FooterProps {
  shopName: string;
}

/**
 * Footer — Minimal, editorial, structured
 *
 * No clutter. Clean grid with essential links,
 * newsletter, and brand closer.
 */
export function Footer({shopName}: FooterProps) {
  const footerRef = useScrollReveal<HTMLElement>({
    y: 30,
    stagger: 0.08,
    selector: '[data-footer-reveal]',
    duration: 0.7,
  });

  return (
    <footer ref={footerRef} className="border-t border-white/5 bg-void">
      {/* Newsletter bar */}
      <div className="container-wide border-b border-white/5 py-16">
        <div
          data-footer-reveal
          className="flex flex-col items-center gap-6 md:flex-row md:justify-between"
        >
          <div>
            <h3 className="text-subheading text-white">Stay in formation.</h3>
            <p className="text-caption mt-2 text-smoke">
              New drops, engineering updates, exclusive access.
            </p>
          </div>
          <form
            className="flex w-full max-w-sm items-center gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 border-b border-white/20 bg-transparent px-0 py-3 text-body text-white outline-none placeholder:text-smoke/50 focus:border-ember transition-colors duration-300"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="text-caption border-b border-ember px-4 py-3 text-ember transition-colors duration-300 hover:text-white"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer grid */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div data-footer-reveal className="md:col-span-1">
            <span className="text-lg font-bold tracking-[0.25em] text-white uppercase">
              MILE 27
            </span>
            <p className="mt-4 max-w-xs text-caption leading-relaxed text-smoke">
              Precision-engineered motorcycle helmets for those who
              refuse to compromise.
            </p>
          </div>

          {/* Shop */}
          <div data-footer-reveal>
            <h4 className="text-micro mb-4 text-white">Shop</h4>
            <ul className="space-y-3">
              <FooterLink href="/collections">All Helmets</FooterLink>
              <FooterLink href="/collections/full-face">Full Face</FooterLink>
              <FooterLink href="/collections/modular">Modular</FooterLink>
              <FooterLink href="/collections/open-face">Open Face</FooterLink>
              <FooterLink href="/collections/accessories">Accessories</FooterLink>
            </ul>
          </div>

          {/* Company */}
          <div data-footer-reveal>
            <h4 className="text-micro mb-4 text-white">Company</h4>
            <ul className="space-y-3">
              <FooterLink href="/about">About Mile 27</FooterLink>
              <FooterLink href="/technology">Technology</FooterLink>
              <FooterLink href="/safety">Safety Standards</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div data-footer-reveal>
            <h4 className="text-micro mb-4 text-white">Support</h4>
            <ul className="space-y-3">
              <FooterLink href="/sizing">Size Guide</FooterLink>
              <FooterLink href="/shipping">Shipping</FooterLink>
              <FooterLink href="/returns">Returns</FooterLink>
              <FooterLink href="/warranty">Warranty</FooterLink>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container-wide border-t border-white/5 py-6">
        <div
          data-footer-reveal
          className="flex flex-col items-center justify-between gap-4 md:flex-row"
        >
          <span className="text-micro text-smoke/50">
            &copy; {new Date().getFullYear()} {shopName}. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-micro text-smoke/50 transition-colors duration-300 hover:text-white"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-micro text-smoke/50 transition-colors duration-300 hover:text-white"
              aria-label="Twitter"
            >
              Twitter
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-micro text-smoke/50 transition-colors duration-300 hover:text-white"
              aria-label="YouTube"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({href, children}: {href: string; children: string}) {
  return (
    <li>
      <Link
        to={href}
        className="text-caption text-smoke/70 transition-colors duration-300 hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}
