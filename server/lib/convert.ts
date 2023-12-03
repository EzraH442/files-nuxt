export const convert = async (f: Blob) => {
  return await $fetch('go-convert:8090/convert', { method: 'post', body: f });
};
