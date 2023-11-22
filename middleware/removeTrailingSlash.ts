export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.fullPath.endsWith('/')) {
    to.fullPath = to.fullPath.substring(0, to.fullPath.length - 1);
  }
});
