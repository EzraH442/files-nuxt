export default defineEventHandler(async (event) => {
  const urlObj = getRequestURL(event);
  console.log('New request: ' + urlObj);
});
