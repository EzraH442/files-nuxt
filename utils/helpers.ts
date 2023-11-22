export const extractFileName = (path: string) => {
  return path.substring(path.lastIndexOf('/') + 1);
};

export const extractFolderName = (path: string) => {
  return path.substring(
    path.substring(0, path.length - 1).lastIndexOf('/') + 1,
    path.length - 1,
  );
};
