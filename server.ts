import {createRequestHandler} from '@shopify/remix-oxygen';
import {createStorefrontClient} from '@shopify/hydrogen';
import {AppSession} from '~/lib/session.server';

export default {
  async fetch(
    request: Request,
    env: Record<string, string>,
    executionContext: ExecutionContext,
  ) {
    const waitUntil = executionContext.waitUntil.bind(executionContext);

    const session = await AppSession.init(request, [env.SESSION_SECRET]);

    const {storefront} = createStorefrontClient({
      i18n: {language: 'EN', country: 'US'},
      publicStorefrontToken: env.PUBLIC_STOREFRONT_API_TOKEN,
      storeDomain: env.PUBLIC_STORE_DOMAIN,
      storefrontApiVersion: env.PUBLIC_STOREFRONT_API_VERSION || '2025-01',
      waitUntil,
    });

    const handleRequest = createRequestHandler({
      // @ts-expect-error — virtual module from Hydrogen build
      build: () => import('virtual:remix/server-build'),
      mode: process.env.NODE_ENV,
      getLoadContext: () => ({
        session,
        storefront,
        env,
        waitUntil,
      }),
    });

    const response = await handleRequest(request);

    if (session) {
      response.headers.append('Set-Cookie', await session.commit());
    }

    return response;
  },
};
