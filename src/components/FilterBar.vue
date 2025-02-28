<template>
  <el-select
    v-model="selectedBrand"
    placeholder="Select brand"
    @change="onBrandChange"
    style="width: 200px"
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

const store = useBidStore();

const brands = [
  "BMW",
  "Tesla",
  "Porsche",
  "Lamborghini",
  "Mercedes-Benz",
  "Toyota",
  "Honda",
];

const selectedBrand = ref<string>("");

const onBrandChange = (brand: string) => {
  store.setFilteredBrand(brand);
};
</script>
