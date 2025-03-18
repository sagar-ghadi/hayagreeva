import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoaderStore = defineStore("loader", () => {
  const isLoading = ref(false);

  // Set loader
  const setLoading = (state) => {
    isLoading.value = state;
  };

  return { isLoading, setLoading };
});
