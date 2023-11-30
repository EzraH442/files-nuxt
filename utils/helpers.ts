export const extractFileName = (path: string) => {
  return path.substring(path.lastIndexOf('/') + 1);
};

export const extractFolderName = (path: string) => {
  return path.substring(
    path.substring(0, path.length - 1).lastIndexOf('/') + 1,
    path.length - 1,
  );
};

const imageRegex = /\.(JPEG|PNG|JPG|GIF|MP)$/i;
const videoRegex = /\.(MOV|MP4|MPV)$/i;
const heicRegex = /\.(HEIC)$/i;

export const isImage = (fileName: string) => imageRegex.test(fileName);
export const isVideo = (fileName: string) => videoRegex.test(fileName);
export const isHEIC = (fileName: string) => heicRegex.test(fileName);

const round = (n: number) => {
  return Math.round(n * 10) / 10;
};
const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];

export const toHumanSize = (size: number) => {
  for (let i = 0; i < units.length; i++) {
    if (size < 1024) {
      return `${round(size)} ${units[i]}`;
    }
    size /= 1024;
  }
  return 'File too large';
};
