export default checkAuth(async (e) => {
  const query = getQuery<{ filename?: string }>(e);
  const file = query?.filename?.toString() ?? '';

  const token = getCookie(e, 'token');
  const url = `https://static.ezrahuang.com/file/ezrah442-testing/${file}?token=${token}`;

  if (file) {
    try {
      return await $fetch(url);
    } catch (e) {
      console.error(e);
    }
  }
});
