<template>
  <div class="p-5">
    <filter-bar class="mb-5" />
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useBidStore } from "@/store/bidStore";
import FilterBar from "@/components/FilterBar.vue";
import VehicleCard from "@/components/VehicleCard.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";

const store = useBidStore();
const loading = ref(true);

onMounted(async () => {
  if (!store.vehicles.length) {
    await store.initializeData();
  }
  console.log("Vehicles loaded:", store.vehicles);
  loading.value = false;
});
</script>
