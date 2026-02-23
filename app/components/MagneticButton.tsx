import {type ReactNode} from 'react';
import {useMagnetic} from '~/hooks/useMagnetic';

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

/**
 * MagneticButton — Reusable premium button with magnetic hover
 *
 * The button subtly follows the cursor when hovering,
 * creating a tactile, physically responsive interaction.
 *
 * Variants:
 * - primary: Ember background, high contrast
 * - secondary: White border, transparent fill
 * - ghost: No border, text only with underline
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'secondary',
  className = '',
}: MagneticButtonProps) {
  const magneticRef = useMagnetic<HTMLAnchorElement & HTMLButtonElement>({
    strength: 0.2,
    ease: 0.12,
  });

  const baseClasses =
    'magnetic-wrap inline-flex items-center gap-3 text-caption tracking-widest transition-all duration-500';

  const variantClasses = {
    primary:
      'bg-ember px-8 py-4 text-white hover:bg-ember-muted',
    secondary:
      'border border-white/20 px-8 py-4 text-white hover:border-white/60 hover:bg-white/5',
    ghost:
      'link-underline text-smoke hover:text-white',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a ref={magneticRef} href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button ref={magneticRef} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
