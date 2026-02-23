import type {MetaFunction} from '@shopify/remix-oxygen';
import {Hero} from '~/components/Hero';
import {ProductShowcase} from '~/components/ProductShowcase';
import {FeaturesStrip} from '~/components/FeaturesStrip';
import {BrandStory} from '~/components/BrandStory';
import {EditorialBanner} from '~/components/EditorialBanner';

export const meta: MetaFunction = () => {
  return [
    {title: 'Mile 27 — Engineered for the Fearless'},
    {
      name: 'description',
      content:
        'Premium motorcycle helmets. Precision-engineered carbon fiber protection meets uncompromising design.',
    },
  ];
};

/**
 * Index route — The cinematic homepage
 *
 * Section flow (intentional pacing):
 * 1. Hero — Emotional hook, cinematic entrance
 * 2. Features — Trust signals, quick scan
 * 3. Product Showcase — Desire trigger
 * 4. Brand Story — Narrative depth, craftsmanship
 * 5. Editorial Banner — Emotional reinforcement
 *
 * Each section has breathing room (py-section).
 * The rhythm: impact → breathe → impact → breathe → close.
 */
export default function Homepage() {
  return (
    <>
      <Hero />
      <FeaturesStrip />
      <ProductShowcase />
      <BrandStory />
      <EditorialBanner />
    </>
  );
}
