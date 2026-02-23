import {createCookieSessionStorage} from '@shopify/remix-oxygen';
import type {HydrogenSession} from '@shopify/hydrogen';

export class AppSession implements HydrogenSession {
  #sessionStorage;
  #session;

  constructor(
    sessionStorage: ReturnType<typeof createCookieSessionStorage>,
    session: Awaited<
      ReturnType<
        ReturnType<typeof createCookieSessionStorage>['getSession']
      >
    >,
  ) {
    this.#sessionStorage = sessionStorage;
    this.#session = session;
  }

  static async init(request: Request, secrets: string[]) {
    const storage = createCookieSessionStorage({
      cookie: {
        name: 'mile27_session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets,
      },
    });

    const session = await storage.getSession(request.headers.get('Cookie'));

    return new this(storage, session);
  }

  get has() {
    return this.#session.has;
  }

  get get() {
    return this.#session.get;
  }

  get flash() {
    return this.#session.flash;
  }

  get unset() {
    return this.#session.unset;
  }

  get set() {
    return this.#session.set;
  }

  destroy() {
    return this.#sessionStorage.destroySession(this.#session);
  }

  commit() {
    return this.#sessionStorage.commitSession(this.#session);
  }
}
