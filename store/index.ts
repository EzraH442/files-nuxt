export const useMainStore = defineStore('main', {
  state: () => ({
    convert: false,
  }),
  actions: {
    setConvert(convert: boolean) {
      this.convert = convert;
    },
  },
});
