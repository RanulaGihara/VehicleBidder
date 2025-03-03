<template>
  <el-select
    v-model="selectedBrand"
    placeholder="Select brand"
    @change="onBrandChange"
    style="width: 400px"
  >
    <el-option value="">
      <template #default>
        <span class="text-gray-500 text-sm">All Brands</span>
      </template>
    </el-option>
    <el-option
      v-for="(brand, index) in brands"
      :key="index"
      :label="brand"
      :value="brand"
    />
  </el-select>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useBidStore } from "@/store/bidStore";
import { VehicleBrandsArray } from "@/types/vehicle";

const store = useBidStore();
const selectedBrand = ref<string>("");


const brands = VehicleBrandsArray;

const onBrandChange = (brand: string) => {
  store.setFilteredBrand(brand);
};
</script>
