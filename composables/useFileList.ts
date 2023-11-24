import {
  emptyListReturn,
  type _File,
  type _Directory,
} from '~/server/api/files/list';

export const useFileList = () => {
  const directory = useDirectory();
  const data = ref<{ files: _File[]; directories: _Directory[] }>({
    files: [],
    directories: [],
  });
  const loading = ref(false);
  const error = ref('');

  const params: Record<string, string> = {
    delimiter: '/',
    prefix: directory,
  };

  loading.value = true;

  const refetch = () => {
    return $fetch('/api/files/list', { params })
      .then((res) => {
        if (res.error === 'Session expired' || res.error === 'Bad Request') {
          navigateTo('/login');
          error.value = res.error;
        }

        const ret = { files: res.files, directories: res.directories };
        data.value.files = ret.files;
        data.value.directories = ret.directories;
        return ret;
      })
      .catch((e) => {
        error.value = 'an error occured';
        return emptyListReturn;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  refetch();

  return { data, loading, error };
};
