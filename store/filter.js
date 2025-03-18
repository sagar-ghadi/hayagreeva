import { defineStore } from "pinia";
import { ref } from "vue";

export const useFilterStore = defineStore("filterStore", () => {
  const isFilterOpen = ref(false);

  // Categories grouped for the Accordion UI
  const categoryGroups = ref([
    { name: "Categories", items: ["Phones", "Laptops", "Tablets", "TVs"] },
  ]);

  const selectedFilters = ref({ categories: [] });

  // Toggle filter visibility
  const toggleFilter = () => {
    isFilterOpen.value = !isFilterOpen.value;
  };

  // Close filter panel
  const closeFilter = () => {
    isFilterOpen.value = false;
  };

  // Open filter panel
  const openFilter = () => {
    isFilterOpen.value = true;
  };

  return {
    isFilterOpen,
    categoryGroups,
    selectedFilters,
    toggleFilter,
    closeFilter,
    openFilter,
  };
});
