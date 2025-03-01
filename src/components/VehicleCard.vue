<template>
  <el-card
    shadow="hover"
    class="m-4 w-[380px] h-[410px] flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 transition-all duration-300"
  >
    <!-- Vehicle Image -->
    <div class="relative w-full h-52 overflow-hidden mb-4">
      <el-image
        :src="vehicle.image"
        class="w-full h-full object-cover rounded-t-lg"
      />
      <!-- Price Badge -->
      <div class="absolute bottom-2 right-2 flex space-x-2">
        <div
          class="bg-green-700 text-white text-xs font-semibold px-2 py-1 rounded shadow-lg"
        >
          LKR {{ vehicle.price.toLocaleString() }}
        </div>
      </div>
    </div>

    <!-- Vehicle Information -->
    <div class="px-4 py-2 flex items-center justify-between flex-1">
      <h3 class="font-semibold text-lg text-gray-900 dark:text-white">
        {{ vehicle.brand }} {{ vehicle.model }}
        <span class="text-sm text-gray-500 dark:text-gray-400">
          ({{ vehicle.year }})
        </span>
      </h3>
    </div>
    <div class="px-2 mb-2 flex items-center justify-between flex-1">
      <p class="text-gray-600 dark:text-gray-400 text-xs ml-2">
        Color: {{ vehicle.color }}
      </p>
    </div>

    <!-- Bid Section -->
    <div class="px-4 pt-4 mt-4 border-t border-gray-200 dark:border-gray-600">
      <div class="flex items-center space-x-3">
        <!-- Bid Input -->
        <el-input
          v-model="bidPrice"
          placeholder="Enter your bid amount"
          type="number"
          @input="validateBid"
          size="small"
          class="flex-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <!-- Bid Button -->
        <el-button
          type="primary"
          :disabled="!isValidBid"
          @click="submitBid"
          size="small"
          class="w-16 bg-blue-500 dark:bg-blue-600 dark:text-white"
        >
          Bid
        </el-button>
      </div>
      <div v-if="errorMessage" class="text-red-500 text-xs mt-1">
        {{ errorMessage }}
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useBidStore } from "@/store/bidStore";
import type { Vehicle } from "@/types/vehicle";
import { ElMessage } from "element-plus";

const props = defineProps<{ vehicle: Vehicle }>();

const store = useBidStore();
const bidPrice = ref<number | null>(null);
const errorMessage = ref<string>("");

const validateBid = () => {
  if (bidPrice.value === null) {
    errorMessage.value = "";
  } else if (bidPrice.value <= 0) {
    errorMessage.value = "Bid must be a positive integer.";
  } else if (bidPrice.value <= props.vehicle.price) {
    errorMessage.value = `Bid must be greater than LKR ${props.vehicle.price}.`;
  } else {
    errorMessage.value = "";
  }
};

const isValidBid = computed(() => {
  return (
    bidPrice.value !== null &&
    bidPrice.value > props.vehicle.price &&
    !errorMessage.value
  );
});

const submitBid = () => {
  if (!isValidBid.value) return;
  if (bidPrice.value) {
    store.addBid(props.vehicle, bidPrice.value);
    bidPrice.value = null;
    errorMessage.value = "";
    ElMessage({
      message: "Bid submitted successfully!",
      type: "success",
      duration: 2000,
    });
  }
};
</script>
