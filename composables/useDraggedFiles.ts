export enum FileStatus {
  PENDING_UPLOAD,
  UPLOADING,
  UPLOADED,
  UPLOAD_FAILED,
}

class UploadableFile {
  static NOT_UPLOADED: number = 0;

  file: File;
  status: FileStatus;

  constructor(file: File) {
    this.file = file;
    this.status = FileStatus.PENDING_UPLOAD;
  }

  async upload(dir: string) {
    this.status = FileStatus.UPLOADING;

    let formData = new FormData();

    formData.append(`${dir}${this.file.name}`, this.file);

    const { data, error } = await useFetch('/api/files/upload', {
      method: 'POST',
      body: formData,
    });

    console.log('result', data.value, error.value);

    if (!data) {
      this.status = FileStatus.UPLOAD_FAILED;
    } else {
      this.status = FileStatus.UPLOADED;
    }
    return data;
  }
}

export const useDraggedFiles = () => {
  const files = ref<UploadableFile[]>([]);

  const fileExists = (name: string) => {
    return files.value.some(({ file }) => file.name === name);
  };

  const addFiles = (newFiles: FileList) => {
    let newUploadableFiles = [...newFiles]
      .map((file) => new UploadableFile(file))
      .filter((file) => !fileExists(file.file.name));

    files.value = files.value.concat(newUploadableFiles);
  };

  const removeFile = (file: UploadableFile) => {
    const index = files.value.findIndex((f) => f.file.name === file.file.name);

    if (index > -1) files.value.splice(index, 1);
  };

  return { files, addFiles, removeFile };
};
