<template>
  <button
    @click="handleClick"
    :class="[buttonClasses, paddingClasses]"
    class="flex items-center justify-center space-x-2 transition duration-300 cursor-pointer"
  >
    <Icon v-if="icon" :name="icon" size="20" />
    <span>{{ label }}</span>
  </button>
</template>

<script setup>
import { computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  icon: String, // Example: 'heroicons:plus'
  label: String, // Button text
  color: {
    type: String,
    default: "lime", // Default to lime if no color is provided
  },
  padding: {
    type: String,
    default: "default", // Default padding key
  },
});

// Emit event
const emit = defineEmits(["click"]);
const handleClick = () => {
  emit("click");
};

// Compute button classes dynamically based on the color prop
const buttonClasses = computed(() => {
  const colors = {
    lime: "bg-lime-600 hover:bg-lime-700 text-white",
    yellow: "bg-yellow-700 hover:bg-brown-800 text-white",
    blue: "bg-blue-700 hover:bg-blue-800 text-white rounded-full",
    slate:"bg-slate-700 hover:bg-slate-800 text-white",
    emerald:"bg-emerald-400 hover:bg-emerald-500 text-black",
  };
  return colors[props.color] || colors.lime;
});

// Compute padding classes dynamically
const paddingClasses = computed(() => {
  const paddings = {
    small: "px-2 py-1",
    default: "px-4 py-2",
    large: "px-20 py-3 text-xs",
  };
  return paddings[props.padding] || paddings.default;
});
</script>
