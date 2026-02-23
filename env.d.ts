/// <reference types="vite/client" />
/// <reference types="@shopify/remix-oxygen" />
/// <reference types="@shopify/oxygen-workers-types" />

import type {HydrogenCart, HydrogenSessionData} from '@shopify/hydrogen';
import type {AppSession} from '~/lib/session.server';

declare module '@shopify/remix-oxygen' {
  interface AppLoadContext {
    cart: HydrogenCart;
    env: Env;
    session: AppSession;
    storefront: Storefront;
    waitUntil: ExecutionContext['waitUntil'];
  }

  interface SessionData extends HydrogenSessionData {}
}

interface Env {
  SESSION_SECRET: string;
  PUBLIC_STOREFRONT_API_TOKEN: string;
  PUBLIC_STORE_DOMAIN: string;
  PUBLIC_STOREFRONT_API_VERSION: string;
}
