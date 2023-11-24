export const extractFileName = (path: string) => {
  return path.substring(path.lastIndexOf('/') + 1);
};

export const extractFolderName = (path: string) => {
  return path.substring(
    path.substring(0, path.length - 1).lastIndexOf('/') + 1,
    path.length - 1,
  );
};

const imageRegex = /\.(JPEG|PNG|JPG|GIF)$/i;
const videoRegex = /\.(MOV|MP4|MPV)$/i;
const heicRegex = /\.(HEIC)$/i;

export const isImage = (fileName: string) => imageRegex.test(fileName);
export const isVideo = (fileName: string) => videoRegex.test(fileName);
export const isHEIC = (fileName: string) => heicRegex.test(fileName);
