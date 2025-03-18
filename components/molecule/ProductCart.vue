<template>
  <div v-if="isCartOpen">
    <div
      class="fixed inset-0 bg-white flex flex-col h-screen z-50 shadow-2xl p-4 md:px-10 overflow-y-auto"
    >
      <!-- Modal Header -->
      <div class="relative flex items-center p-4 mb-6">
        <h2
          class="absolute left-1/2 transform -translate-x-1/2 text-2xl md:text-4xl font-medium"
        >
          Your Cart
        </h2>
        <button
          @click="cartStore.closeCart"
          class="text-2xl md:text-3xl cursor-pointer ml-auto"
        >
          &times;
        </button>
      </div>

      <!-- Empty Cart State -->
      <div
        v-if="cart.length === 0"
        class="flex flex-col items-center justify-center flex-grow text-center"
      >
        <Icon name="heroicons:shopping-cart" class="text-gray-400" size="50" />
        <p class="text-gray-600 mt-2 text-sm md:text-md">Your cart is empty</p>
        <BaseButton
          class="mt-4"
          label="Continue Shopping"
          color="blue"
          @click="cartStore.closeCart"
        />
      </div>

      <!-- Cart Items & Summary -->
      <div v-else class="flex flex-col lg:flex-row flex-grow overflow-hidden">
        <!-- Cart Items -->
        <div class="w-full lg:w-2/3 p-4 overflow-y-auto">
          <div
            class="grid grid-cols-3 grid-cols-[2fr_1fr_1fr_1fr_0.5fr] font-semibold py-2 border-b border-gray-300 text-gray-500 text-xs md:text-sm"
          >
            <span>PRODUCT</span>
            <span>PRICE</span>
            <span>QUANTITY</span>
            <span class="hidden md:block">TOTAL</span>
            <span></span>
          </div>
          <div
            v-for="item in cart"
            :key="item.id"
            class="grid grid-cols-3 grid-cols-[2fr_1fr_1fr_1fr_0.5fr] items-center border-b border-gray-300 py-4 gap-2"
          >
            <div class="flex items-center space-x-2">
              <img
                :src="item.thumbnail"
                alt=""
                class="w-12 h-12 md:w-14 md:h-14 object-cover rounded-md bg-gray-300"
              />
              <span class="text-gray-600 text-xs md:text-sm font-medium">{{
                item.title
              }}</span>
            </div>
            <p class="text-xs md:text-sm text-gray-600">${{ item.price }}</p>
            <div class="flex items-center space-x-1 md:space-x-2">
              <button
                @click="cartStore.updateQuantity(item, -1)"
                class="px-2 bg-gray-300 text-xs md:text-sm text-gray-600 rounded cursor-pointer"
              >
                -
              </button>
              <span class="text-xs md:text-sm">{{ item.quantity }}</span>
              <button
                @click="cartStore.updateQuantity(item, 1)"
                class="px-2 bg-gray-300 text-xs md:text-sm text-gray-600 rounded cursor-pointer"
              >
                +
              </button>
            </div>
            <p class="hidden md:block text-sm text-gray-600">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </p>
            <button
              @click="cartStore.removeFromCart(item)"
              class="px-1 ml-auto bg-gray-300 rounded-full cursor-pointer text-xs md:text-sm"
            >
              ✖
            </button>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="w-full lg:w-1/3 flex flex-col">
          <div class="bg-gray-100 p-4 md:p-6 mt-6 md:mt-14">
            <h3
              class="font-medium text-md md:text-lg text-gray-700 border-b border-gray-300 pb-2"
            >
              Order Summary
            </h3>
            <div
              class="mt-2 flex justify-between text-gray-500 text-xs md:text-sm"
            >
              <p>Total Items</p>
              <strong>{{ totalItems }}</strong>
            </div>
            <div
              class="mt-1 flex justify-between text-gray-500 text-xs md:text-sm"
            >
              <p>Subtotal</p>
              <strong>${{ totalPrice.toFixed(2) }}</strong>
            </div>
            <div
              class="mt-1 flex justify-between text-gray-500 text-xs md:text-sm"
            >
              <p>Shipping</p>
              <strong>Free</strong>
            </div>
            <p class="mt-1 text-lime-600 cursor-pointer text-xs md:text-sm">
              Add coupon code
            </p>
            <h3
              class="font-medium text-md md:text-lg text-gray-700 border-t border-gray-300 mt-4 pt-2 flex justify-between"
            >
              <p>Total</p>
              <strong>${{ totalPrice.toFixed(2) }}</strong>
            </h3>
          </div>
          <div class="mt-2 p-4">
            <BaseButton
              class="w-full py-2 md:py-3"
              label="CHECKOUT"
              color="lime"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "@/store/cart";

const cartStore = useCartStore();
const { cart, isCartOpen, totalItems, totalPrice } = storeToRefs(cartStore);
</script>
