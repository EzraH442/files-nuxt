export const useDirectory = () => {
  const route = useRoute();
  const d = route.params.directory;

  let directory = '';
  if (typeof d !== 'string') {
    d.forEach((v) => {
      directory += `${v}/`;
    });
  }

  return directory;
};
