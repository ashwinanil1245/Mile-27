import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import type {LinksFunction, LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Navigation} from '~/components/Navigation';
import {Footer} from '~/components/Footer';
import {Loader} from '~/components/Loader';
import {SmoothScroll} from '~/components/SmoothScroll';
import {CustomCursor} from '~/components/CustomCursor';
import appStyles from '~/styles/app.css?url';

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: appStyles},
  {rel: 'preconnect', href: 'https://cdn.shopify.com'},
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
    crossOrigin: 'anonymous',
  },
];

export async function loader({context}: LoaderFunctionArgs) {
  const layout = {
    shop: {
      name: 'Mile 27',
      description: 'Premium Motorcycle Helmets — Engineered for the Fearless',
    },
  };
  return {layout};
}

export default function App() {
  const {layout} = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={layout.shop.description}
        />
        <title>{layout.shop.name}</title>
        <Meta />
        <Links />
      </head>
      <body className="bg-void text-chalk antialiased cursor-none md:cursor-none">
        <CustomCursor />
        <Loader />
        <SmoothScroll>
          <Navigation shopName={layout.shop.name} />
          <main>
            <Outlet />
          </main>
          <Footer shopName={layout.shop.name} />
        </SmoothScroll>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
