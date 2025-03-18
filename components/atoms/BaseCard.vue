<template>
  <div class="bg-white p-4 flex flex-col w-80">
    <!-- Skeleton Loader -->
    <div v-if="isLoading" class="animate-pulse">
      <div class="bg-gray-300 rounded-full w-32 h-32 mb-4"></div>
      <div class="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div class="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div class="h-4 bg-gray-300 rounded w-full mb-4"></div>
      <div class="h-10 bg-gray-300 rounded w-1/3"></div>
    </div>

    <!-- Actual Content -->
    <template v-else>
      <img
        :src="imageSrc"
        :alt="altText"
        class="object-cover rounded-full mb-4"
        @click="handleProductModalClick"
      />
      <div class="text-lg font-semibold text-gray-800">{{ label }}</div>
      <div class="text-xl font-bold text-gray-900 mb-1">{{ amount }}</div>
      <div class="text-sm text-gray-800 truncate max-w-md" :title="description">
        {{ description }}
      </div>
      <div class="flex items-center mt-4">
        <BaseButton
          padding="large"
          color="blue"
          :label="btnLabel"
          @click="handleClick"
        />
        <Icon name="heroicons:heart" size="20" class="ml-auto" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watchEffect } from "vue";

const props = defineProps({
  imageSrc: String,
  altText: String,
  label: String,
  description: String,
  amount: [String, Number],
  btnLabel: String,
});

const emit = defineEmits(["click", "productModalClick"]);
const isLoading = ref(true);

// Simulating API response
watchEffect(() => {
  if (props.imageSrc) {
    setTimeout(() => {
      isLoading.value = false;
    }, 2000); // Simulate API loading time
  }
});

// Emit click event
const handleClick = () => {
  emit("click");
};

// Emit product detail click event
const handleProductModalClick = () => {
  emit("productModalClick");
};
</script>
