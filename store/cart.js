import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  const cart = ref([]);
  const isCartOpen = ref(false);

  // Add items to cart
  const addToCart = (product) => {
    const existingProduct = cart.value.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
    isCartOpen.value = true;
  };

  // Update the quantity of product
  const updateQuantity = (item, change) => {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart.value = cart.value.filter((p) => p.id !== item.id);
    }
  };

  // Remove the cart items
  const removeFromCart = (item) => {
    cart.value = cart.value.filter((p) => p.id !== item.id);
  };

  // Close the cart
  const closeCart = () => {
    isCartOpen.value = false;
  };

  // Total items count
  const totalItems = computed(() =>
    cart.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  // Total price count
  const totalPrice = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  return {
    cart,
    isCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    closeCart,
    totalItems,
    totalPrice,
  };
});
