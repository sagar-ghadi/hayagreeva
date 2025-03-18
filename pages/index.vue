<template>
  <div class="container mx-auto w-full xl:mx-30">
    <!-- Search & Filter Section -->
    <div class="pt-16 px-6 block sm:flex justify-center items-center space-x-4 mx-auto">
      <div class="relative w-full">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for products, brands and more"
          class="w-full px-8 py-2 dark:border-gray-600 rounded-sm text-gray-900 dark:text-white bg-sky-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Icon
          name="heroicons:magnifying-glass"
          class="absolute left-2 top-2.5 text-gray-400"
          size="20"
        />
      </div>

      <div class="w-full md:w-2/3 flex space-x-2 mt-4 md:mt-0">
        <BaseButton
          icon="heroicons:magnifying-glass"
          color="yellow"
          label="Search again"
          @click="resetSearch"
        />
        <BaseButton
          class="lg:ml-20"
          icon="heroicons:funnel"
          label="Filters"
          @click="filterStore.openFilter"
        />
      </div>
    </div>

    <!-- Search Results Count -->
    <div
      v-if="searchQuery && filteredProductsComputed.length"
      class="mt-6 px-6 text-gray-700 dark:text-gray-300 text-lg font-semibold"
    >
      Showing {{ filteredProductsComputed.length }} result<span
        v-if="filteredProductsComputed.length > 1"
        >s</span
      >
      for "<span class="text-blue-500">{{ searchQuery }}</span>"
    </div>

    <!-- Product Grid -->
    <div
      v-if="filteredProductsComputed.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 px-6"
    >
      <BaseCard
        v-for="product in filteredProductsComputed"
        :key="product.id"
        :imageSrc="product.thumbnail"
        :label="product.title"
        :description="product.description"
        :amount="`$${product.price}`"
        btnLabel="ADD TO CART"
        @click="cartStore.addToCart(product)"
        @productModalClick="handleShowProductDetailModal(product)"
      />
    </div>

    <!-- No Results Found Message -->
    <div
      v-else-if="searchQuery && !filteredProductsComputed.length"
      class="text-center text-gray-500 dark:text-gray-400 mt-8"
    >
      <p class="text-lg font-semibold">No products found</p>
      <p class="text-sm">Try searching with a different keyword.</p>
    </div>

    <!-- Product Modal -->
    <ProductCart v-if="isCartOpen" />

    <!-- Filter Side Modal -->
    <ProductFilterSidebar v-if="isFilterOpen" />

    <!-- Product Detail Modal -->
    <ProductDetailModal
      :isOpen="showProductDetailModal"
      :product="getParticluarProductDetail"
      @close="showProductDetailModal = false"
      @addToCart="cartStore.addToCart(getParticluarProductDetail)"
    />

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useCartStore } from "@/store/cart";
import { useLoaderStore } from "@/store/loader";
import { useFilterStore } from "@/store/filter";
import { useProductStore } from "@/store/product";

const searchQuery = ref("");
const showProductDetailModal = ref(false);
const getParticluarProductDetail = ref({});
const productStore = useProductStore();
const cartStore = useCartStore();
const loaderStore = useLoaderStore();
const filterStore = useFilterStore();

const { products, filteredProducts } = storeToRefs(productStore);
const { isFilterOpen } = storeToRefs(filterStore);
const { isCartOpen } = storeToRefs(cartStore);

// Computed property for filtering by search query, category, and brand
const filteredProductsComputed = computed(() => {
  return filteredProducts.value.filter((product) => {
    const matchesSearch =
      !searchQuery.value ||
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase());

    return matchesSearch;
  });
});

// Clear search input
const resetSearch = () => {
  searchQuery.value = "";
};

// Show product detail modal
const handleShowProductDetailModal = (product) => {
  getParticluarProductDetail.value = product;
  showProductDetailModal.value = true;
};

// Fetch products on mount
onMounted(() => {
  productStore.fetchProducts();
});
</script>
