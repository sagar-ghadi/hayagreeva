<template>
    <div v-if="totalPages > 1" class="flex justify-center mt-6 items-center">
      <button
        @click="$emit('prev')"
        :disabled="currentPage === 1"
        class="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span class="text-gray-700 dark:text-gray-300 mx-4">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button
        @click="$emit('next')"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    currentPage: Number,
    totalPages: Number,
  });
  </script>
  