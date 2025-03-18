<template>
  <header class="bg-white dark:bg-gray-900 shadow-md relative z-40">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="text-1xl lg:text-2xl font-bold text-gray-900 dark:text-white"
        >
          VENIA
        </NuxtLink>

        <!-- Desktop Menu -->
        <nav class="hidden md:flex space-x-2 lg:space-x-6">
          <template v-for="(items, category) in menuItems" :key="category">
            <div v-if="Array.isArray(items)" class="relative group">
              <button
                class="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
              >
                {{ category }}
                <Icon
                  name="heroicons:chevron-down"
                  size="16"
                  class="ml-1 text-gray-500 dark:text-gray-400"
                />
              </button>
              <div
                class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition duration-300"
              >
                <NuxtLink
                  v-for="(item, index) in items"
                  :key="index"
                  :to="item.link"
                  class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition rounded-md"
                >
                  {{ item.name }}
                </NuxtLink>
              </div>
            </div>
            <NuxtLink
              v-else
              :to="items.link"
              class="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
            >
              {{ category }}
            </NuxtLink>
          </template>
        </nav>

        <!-- Right Side: Search + Sign Out -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- Sign Out Button -->
          <NuxtLink
            class="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition cursor-pointer"
          >
            <Icon name="heroicons:user" size="24" class="mr-1" />
            Sign In
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="md:hidden text-gray-900 dark:text-white"
        >
          <Icon
            :name="isOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'"
            size="24"
          />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="isOpen"
        class="md:hidden bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
      >
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <template v-for="(items, category) in menuItems" :key="category">
            <div
              v-if="Array.isArray(items)"
              class="border-t border-gray-300 dark:border-gray-700 mt-2 pt-2"
            >
              <button
                @click="toggleDropdown(category)"
                class="w-full text-left flex justify-between items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
              >
                {{ category }}
                <Icon
                  :name="
                    isDropdownOpen[category]
                      ? 'heroicons:chevron-up'
                      : 'heroicons:chevron-down'
                  "
                  size="16"
                  class="ml-1 text-gray-500 dark:text-gray-400"
                />
              </button>
              <div v-if="isDropdownOpen[category]" class="mt-2 space-y-1">
                <NuxtLink
                  v-for="(item, index) in items"
                  :key="index"
                  :to="item.link"
                  class="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition rounded-md"
                  @click="closeMenu"
                >
                  {{ item.name }}
                </NuxtLink>
              </div>
            </div>
            <NuxtLink
              v-else
              :to="items.link"
              class="block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition border-t border-gray-300 dark:border-gray-700 mt-2 pt-2"
              @click="closeMenu"
            >
              {{ category }}
            </NuxtLink>
          </template>
        </div>
        <!-- Mobile Sign in Button -->
        <NuxtLink
          class="border-t border-gray-300 dark:border-gray-700 mt-2 pt-2 flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition cursor-pointer"
        >
          <Icon name="heroicons:user" size="24" class="mr-1" />
          Sign In
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isOpen = ref(false);
const isDropdownOpen = ref({});
const searchQuery = ref("");

// Menu items
const menuItems = {
  Tops: [
    { name: "T-Shirts", link: "/" },
    { name: "Blouses", link: "/" },
  ],
  Bottoms: [
    { name: "Jeans", link: "/" },
    { name: "Trousers", link: "/" },
  ],
  Dresses: [
    { name: "Casual Dresses", link: "/" },
    { name: "Evening Dresses", link: "/" },
  ],
  Accessories: [
    { name: "Bags & Purses", link: "/" },
    { name: "Hats & Caps", link: "/" },
  ],
  "Shop the Look": [
    { name: "Casual Looks", link: "/" },
    { name: "Business Wear", link: "/" },
  ],
  "New Arrivals": { link: "/" },
};

// Toggle menu
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// Close menu
const closeMenu = () => {
  isOpen.value = false;
  isDropdownOpen.value = {};
};

// Toggle dropdown
const toggleDropdown = (menu) => {
  isDropdownOpen.value[menu] = !isDropdownOpen.value[menu];
};
</script>
