<template>
  <div class="p-5">
    <filter-bar class="mb-5" />
    <el-button type="primary" @click="openBiddings" class="mb-5">
      View Biddings
    </el-button>
    <div v-if="loading">
      <SkeletonLoader :skeletonCount="3" />
    </div>
    <div v-else>
      <el-row :gutter="20" class="mt-5">
        <el-col
          v-for="vehicle in store.filteredVehicles"
          :key="vehicle.id"
          :span="8"
        >
          <vehicle-card :vehicle="vehicle" />
        </el-col>
      </el-row>
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

const store = useBidStore();
const loading = ref(true);
const drawerVisible = ref(false);

onMounted(async () => {
  if (!store.vehicles.length) {
    await store.initializeData();
  }
  console.log("Vehicles loaded:", store.vehicles);
  loading.value = false;
});

const openBiddings = () => {
  drawerVisible.value = true;
  console.log("clicked", drawerVisible.value);
};
</script>
