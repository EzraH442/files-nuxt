import type { EventHandler, EventHandlerRequest } from 'h3';
import { makeVerifyRequest } from '../lib/verify';

import { defineEventHandler } from 'h3';

export const checkAuth = <T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
): EventHandler<T, D> =>
  defineEventHandler<T>(async (e) => {
    console.log('checking auth');

    try {
      const token = getCookie(e, 'token');

      if (!token)
        throw createError({ statusCode: 400, statusMessage: 'Bad Request' });

      const response = await makeVerifyRequest(new URLSearchParams({ token }));

      if (!response.valid) {
        if (response.errors.length === 0) {
          throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
          });
        }

        if (response.errors[0] === 'Session expired') {
          throw createError({
            statusCode: 401,
            statusMessage: 'Session expired',
          });
        }

        console.error(response.errors[0]);
        throw createError({ statusCode: 400, statusMessage: 'Bad Request' });
      }

      const r = await handler(e);

      return r;
    } catch (err) {
      // console.log(err);
      return { error: err.message ?? 'An unknown error occured' };
    }
  });
