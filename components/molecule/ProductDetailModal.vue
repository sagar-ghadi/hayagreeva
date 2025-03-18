<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50"
  >
    <div
      class="relative w-full max-w-screen-lg bg-white rounded-lg shadow-lg p-6 md:p-8 max-h-screen overflow-y-auto"
    >
      <!-- Close Button -->
      <button
        class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 cursor-pointer"
        @click="closeModal"
      >
        ✖
      </button>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Product Image -->
        <div>
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="w-full h-64 object-cover rounded-lg"
          />
        </div>

        <!-- Product Details -->
        <div class="flex flex-col justify-center">
          <h2 class="text-2xl font-bold text-gray-900">{{ product.title }}</h2>
          <p class="text-gray-600 text-sm mt-2">{{ product.description }}</p>
          <p class="text-2xl font-semibold text-blue-600 mt-4">
            ${{ product.price }}
          </p>

          <!-- Additional Product Info -->
          <div class="mt-4 text-sm text-gray-700 space-y-1">
            <p><strong>Warranty:</strong> {{ product.warrantyInformation }}</p>
            <p><strong>Shipping:</strong> {{ product.shippingInformation }}</p>
            <p>
              <strong>Status:</strong>
              <span class="text-green-600 font-semibold">{{
                product.availabilityStatus
              }}</span>
            </p>
          </div>

          <!-- Add to Cart Button -->
          <div class="mt-6">
            <BaseButton
              color="blue"
              label="Add to Cart"
              class="w-full md:w-auto"
              @click="emit('addToCart', product)"
            />
          </div>
        </div>
      </div>

      <!-- Reviews Section -->
      <div class="mt-8">
        <h3 class="text-lg font-semibold border-b pb-2">Customer Reviews</h3>
        <div v-if="product.reviews.length > 0" class="space-y-4 mt-4">
          <div
            v-for="review in product.reviews"
            :key="review.id"
            class="p-4 border rounded-lg shadow-sm"
          >
            <p class="font-semibold">{{ review.user }}</p>
            <p class="text-yellow-500">
              {{ "★".repeat(review.rating) }}{{ "☆".repeat(5 - review.rating) }}
            </p>
            <p class="text-sm text-gray-700 mt-1">{{ review.comment }}</p>
          </div>
        </div>
        <p v-else class="text-gray-500 mt-4">No reviews yet.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  product: Object,
  isOpen: Boolean,
});

const emit = defineEmits(["close", "addToCart"]);

// Emit event
const closeModal = () => {
  emit("close");
};
</script>
