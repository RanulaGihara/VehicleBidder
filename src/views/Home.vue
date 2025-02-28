<template>
  <div class="p-5">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="flex w-full items-center justify-center space-x-8 mt-6">
        <filter-bar />
        <el-button type="success" @click="openBiddings">
          <!-- <el-icon class="mr-1">
            <arrow-left-bold />
          </el-icon> -->
          View Biddings
        </el-button>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="mt-5">
        <SkeletonLoader :skeletonCount="3" />
      </div>

      <!-- Cards Section -->
      <div v-else class="mt-10">
        <el-row :gutter="20">
          <el-col
            v-for="vehicle in store.filteredVehicles"
            :key="vehicle.id"
            :span="8"
          >
            <vehicle-card :vehicle="vehicle" />
          </el-col>
        </el-row>
      </div>
    </div>
    <BiddingsDrawer v-model="drawerVisible" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import FilterBar from "@/components/FilterBar.vue";
import VehicleCard from "@/components/VehicleCard.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import BiddingsDrawer from "@/components/BiddingsDrawer.vue";
import { useBidStore } from "@/store/bidStore";
import { ArrowLeftBold } from "@element-plus/icons-vue";

const store = useBidStore();
const loading = ref(true);
const drawerVisible = ref(false);


//todo - mobile responsive 
onMounted(async () => {
  if (!store.vehicles.length) {
    await store.initializeData();
  }
  console.log("Vehicles loaded:", store.vehicles);
  loading.value = false;
});

const openBiddings = () => {
  drawerVisible.value = true;
  console.log("Drawer visible:", drawerVisible.value);
};
</script>
