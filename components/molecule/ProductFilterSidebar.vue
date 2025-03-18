<template>
  <div class="fixed inset-0 bg-opacity-30 flex justify-end z-50">
    <!-- Sidebar -->
    <div class="w-96 bg-white h-full shadow-lg flex flex-col">
      <!-- Header -->
      <div
        class="flex justify-between items-center p-4 border-b border-gray-200"
      >
        <h2 class="text-lg font-semibold">All Filters</h2>
        <button
          @click="filterStore.closeFilter"
          class="text-2xl cursor-pointer"
        >
          &times;
        </button>
      </div>

      <!-- Filters -->
      <div class="p-4 flex-1 overflow-y-auto">
        <!-- Categories Accordion -->
        <div>
          <h3
            class="text-md mb-3 flex justify-between items-center cursor-pointer border-b border-gray-300 pb-2"
            @click="toggleAccordion('category')"
          >
            Categories
            <span
              :class="{ 'rotate-180': isAccordionOpen('category') }"
              class="transition-transform text-lg"
            >
              ⌄
            </span>
          </h3>

          <div v-show="isAccordionOpen('category')">
            {{category}}
            <label
              v-for="(count, category) in categoryCounts"
              :key="category"
              class="flex items-center space-x-2 mb-2 cursor-pointer border-gray-200 last:border-b last:pb-2"
            >
              <input
                type="checkbox"
                :value="category"
                v-model="selectedFilters.categories"
                class="form-checkbox text-blue-600"
              />
              <span class="text-gray-700">
                {{ capitalize(category) }} ({{ count }})
              </span>
            </label>
          </div>
        </div>

        <!-- Brands Accordion -->
        <div class="mt-4">
          <h3
            class="text-md mb-3 flex justify-between items-center cursor-pointer border-b border-gray-300 pb-2"
            @click="toggleAccordion('brand')"
          >
            Brands
            <span
              :class="{ 'rotate-180': isAccordionOpen('brand') }"
              class="transition-transform text-lg"
            >
              ⌄
            </span>
          </h3>

          <div v-show="isAccordionOpen('brand')">
            <label
              v-for="(count, brand) in brandCounts"
              :key="brand"
              class="flex items-center space-x-2 mb-2 cursor-pointer border-gray-200 last:border-b last:pb-2"
            >
              <input
                type="checkbox"
                :value="brand"
                v-model="selectedFilters.brands"
                class="form-checkbox text-blue-600"
              />
              <span class="text-gray-700"> {{ brand }} ({{ count }}) </span>
            </label>
          </div>
        </div>

        <!-- Price Accordion -->
        <div class="mt-4">
          <h3
            class="text-md mb-3 flex justify-between items-center cursor-pointer border-b border-gray-300 pb-2"
            @click="toggleAccordion('price')"
          >
            Price
            <span
              :class="{ 'rotate-180': isAccordionOpen('price') }"
              class="transition-transform text-lg"
            >
              ⌄
            </span>
          </h3>

          <div v-show="isAccordionOpen('price')">
            <select
              v-model="selectedSort"
              @change="applySort"
              class="w-full border border-gray-300 rounded-sm py-2 px-3"
            >
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Bottom Buttons -->
      <div class="p-4 border-t border-gray-200 flex justify-between">
        <BaseButton
          color="slate"
          class="w-40 mr-4"
          label="Clear All"
          @click="clearFilters"
        />
        <BaseButton
          color="emerald"
          class="w-40"
          label="Apply"
          @click="applyFilters"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, computed, watch } from "vue";
import { useFilterStore } from "@/store/filter";
import { useProductStore } from "@/store/product";

const filterStore = useFilterStore();
const productStore = useProductStore();
const { products } = storeToRefs(productStore);
const selectedFilters = ref({
  categories: [],
  brands: [],
});
const selectedSort = ref("lowToHigh"); // Add a sort option for price
const accordionStates = ref({
  category: true,
  brand: true,
  price: true, // Add price accordion state
});

// Compute category and brand counts dynamically
const categoryCounts = computed(() => {
  return products.value.reduce((counts, product) => {
    counts[product.category] = (counts[product.category] || 0) + 1;
    return counts;
  }, {});
});

// Filter counts and name
const brandCounts = computed(() => {
  return products.value.reduce((counts, product) => {
    if (!product.brand) {
      return counts; // Skip products with undefined brands
    }
    counts[product.brand] = (counts[product.brand] || 0) + 1;
    return counts;
  }, {});
});

// Toggle accordions
const toggleAccordion = (type) => {
  accordionStates.value[type] = !accordionStates.value[type];
};

const isAccordionOpen = (type) => {
  return accordionStates.value[type];
};

// Clear filters
const clearFilters = () => {
  selectedFilters.value.categories = [];
  selectedFilters.value.brands = [];
  selectedSort.value = "lowToHigh"; // Reset sort to default
  productStore.resetProducts();
};

// Watch selected filters to apply filtering
watch(
  selectedFilters,
  () => {
    productStore.filterProducts(
      selectedFilters.value.categories,
      selectedFilters.value.brands
    );
  },
  { deep: true }
);

// Watch for sort changes
watch(selectedSort, () => {
  applySort();
});

// Apply filters and sort to products
const applyFilters = () => {
  productStore.filterProducts(
    selectedFilters.value.categories,
    selectedFilters.value.brands
  );
  applySort();
};

// Apply sorting
const applySort = () => {
  if (selectedSort.value === "lowToHigh") {
    productStore.sortProducts("price", "asc");
  } else if (selectedSort.value === "highToLow") {
    productStore.sortProducts("price", "desc");
  }
};

// Capitalize the first letter of a string
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
</script>
