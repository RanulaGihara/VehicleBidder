<template>
  <div
    class="relative min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-all duration-300"
  >

    <dark-mode-toggle class="absolute top-4 right-4 mr-11 mt-2" />

    <el-container style="height: 100vh">
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import darkModeToggle from "./components/common/darkModeToggle.vue";
</script>
