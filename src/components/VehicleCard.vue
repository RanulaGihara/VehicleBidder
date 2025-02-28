<template>
  <el-card
    shadow="hover"
    class="m-4 w-[380px] h-[410px] flex flex-col overflow-hidden rounded-lg"
  >
    <div class="relative w-full h-52 overflow-hidden mb-4">
      <el-image :src="vehicle.image" class="w-full h-full object-cover" />
      <div class="absolute bottom-2 right-2 flex space-x-2">
        <div
          class="bg-green-800 text-white text-xs font-semibold px-2 py-1 rounded"
        >
          LKR {{ vehicle.price.toLocaleString() }}
        </div>
      </div>
    </div>

    <div class="px-4 py-2 flex items-center justify-between flex-1">
      <h3 class="font-semibold text-lg">
        {{ vehicle.brand }} {{ vehicle.model }}
        <span class="text-sm text-gray-500">({{ vehicle.year }})</span>
      </h3>
    </div>
    <div class="px-2 mb-2 flex items-center justify-between flex-1">
      <p class="text-gray-400 text-xs ml-2">Color: {{ vehicle.color }}</p>
    </div>

    <!-- Bid Section -->
    <div class="px-4 pt-5  mt-4 border-t">
      <!-- <el-input
        v-model="bidPrice"
        placeholder="Enter bid amount"
        type="number"
        @input="validateBid"
        size="small"
        class="mb-2"
      />
      <el-button  
        type="primary"
        :disabled="!isValidBid"
        @click="submitBid"
        size="small"
        class="w-60"
      >
        Submit
      </el-button> -->

      <div class="flex items-center space-x-4">
        <el-input
          v-model="bidPrice"
          placeholder="Enter your bid amount"
          type="number"
          @input="validateBid"
          size="small"
          class="flex-1"
        />
        <el-button
          type="primary"
          :disabled="!isValidBid"
          @click="submitBid"
          size="small"
          class="w-20"
        >
          Submit
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
