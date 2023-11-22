import {
  emptyListReturn,
  type _File,
  type _Directory,
} from '~/server/api/files/list';

export const useFileList = () => {
  const data = ref<{ files: _File[]; directories: _Directory[] }>({
    files: [],
    directories: [],
  });
  const loading = ref(false);
  const error = ref('');

  const route = useRoute();
  const directory = route.params.directory;

  let prefix;
  if (typeof directory !== 'string') {
    prefix = directory.reduce((prev, curr) => prev + '/' + curr);
  }

  if (prefix) {
    prefix += '/';
  }

  const params: Record<string, string> = {
    delimiter: '/',
  };

  if (prefix) {
    params.prefix = prefix;
  }

  loading.value = true;

  const refetch = () => {
    console.log('refetch');
    return $fetch('/api/files/list', { params })
      .then((res) => {
        console.log('ithen', res);
        if (res.error === 'Session expired') {
          navigateTo('/login');
          error.value = res.error;
        }

        console.log('test', res, res.files, res.directories);
        const ret = { files: res.files, directories: res.directories };
        console.log('ret is ', ret);
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
