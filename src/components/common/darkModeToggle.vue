<template>
  <div class="absolute top-4 right-4">
    <button
      @click="toggleDarkMode"
      class="relative w-14 h-7 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-all duration-300 shadow-lg"
    >
      <div
        class="absolute left-1 w-5 h-5 bg-white dark:bg-gray-900 rounded-full transition-all duration-300 transform flex items-center justify-center"
        :class="{ 'translate-x-7': themeStore.isDark }"
      >
        <!-- <component
          :is="themeStore.isDark ? MoonIcon : SunIcon"
          class="w-4 h-4 transition-all duration-300"
          :class="{
            'text-yellow-400': !themeStore.isDark,
            'text-gray-300': themeStore.isDark,
          }"
        /> -->
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from "@/store/themeStore";
// import { SunIcon, MoonIcon } from "@heroicons/vue/solid";

const themeStore = useThemeStore();

const toggleDarkMode = () => {
  themeStore.toggleTheme();
};
</script>
