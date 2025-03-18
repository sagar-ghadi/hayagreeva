import { defineStore } from "pinia";
import { ref } from "vue";
import { useLoaderStore } from "@/store/loader";

export const useProductStore = defineStore("product", () => {
  const products = ref([]);
  const filteredProducts = ref([]);
  const loaderStore = useLoaderStore();

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      loaderStore.setLoading(true);
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      products.value = data.products;
      filteredProducts.value = data.products;
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      loaderStore.setLoading(false);
    }
  };

  // Filter products based on selected categories and brands
  const filterProducts = (selectedCategories, selectedBrands) => {
    filteredProducts.value = products.value.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      return categoryMatch && brandMatch;
    });
  };

  // Reset products
  const resetProducts = () => {
    filteredProducts.value = products.value;
  };

  // Sort products based on price (ascending or descending)
  const sortProducts = (field, direction) => {
    filteredProducts.value.sort((a, b) => {
      if (direction === "asc") {
        return a[field] - b[field]; // Ascending order
      } else if (direction === "desc") {
        return b[field] - a[field]; // Descending order
      }
      return 0;
    });
  };

  return {
    products,
    filteredProducts,
    fetchProducts,
    filterProducts,
    resetProducts,
    sortProducts, // Add this to make it accessible
  };
});
