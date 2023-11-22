import { makeVerifyRequest } from '~/server/lib/verify';

export default defineNuxtRouteMiddleware(async (to, from) => {
  // console.log('auth middleware universal');
  // if (process.server) {
  //   console.log('auth middleware server');
  //   const e = useRequestEvent();
  //   const token = getCookie(e, 'token');
  //   if (!token) {
  //     console.log('missing token, redirecting...');
  //     return navigateTo('/login');
  //   }
  //   console.log('verifying token...');
  //   const verifyResponse = await makeVerifyRequest(
  //     new URLSearchParams({ token }),
  //   );
  //   console.log(verifyResponse);
  //   if (!verifyResponse.valid) {
  //     console.log('invalid token, redirecting...');
  //     return navigateTo('/login');
  //   }
  //   console.log(token);
  // }
});
