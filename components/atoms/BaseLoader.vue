<template>
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
      <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  </template>
  
  <script setup>
  import { useLoaderStore } from "@/store/loader";
  import { storeToRefs } from "pinia";
  
  const loaderStore = useLoaderStore();
  const { isLoading } = storeToRefs(loaderStore);
  </script>
  