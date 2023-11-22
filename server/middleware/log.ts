export default defineEventHandler(async (event) => {
  const urlObj = getRequestURL(event);
  const cookies = parseCookies(event);
  console.log('New request: %s, cookies: %o', urlObj, cookies);
});
