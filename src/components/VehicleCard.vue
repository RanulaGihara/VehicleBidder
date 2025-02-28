<template>
  <el-card shadow="hover" class="m-4 w-[300px] flex flex-col justify-between">
    <!-- Vehicle Image -->
    <div class="w-full">
      <el-image :src="vehicle.image" class="w-full h-auto" />
    </div>

    <!-- Vehicle Information -->
    <div class="mt-2">
      <h3 class="font-semibold text-lg">
        {{ vehicle.brand }} {{ vehicle.model }} {{ vehicle.year }}
      </h3>
      <p class="text-gray-600">{{ vehicle.color }}</p>
      <p class="text-gray-800">
        Price: LKR {{ vehicle.price.toLocaleString() }}
      </p>
    </div>

    <!-- Bid Section -->
    <div class="mt-4 flex flex-col gap-2">
      <el-input
        v-model="bidPrice"
        placeholder="Enter bid amount"
        type="number"
        @input="validateBid"
      />
      <el-button type="primary" :disabled="!isValidBid" @click="submitBid">
        Submit
      </el-button>
      <div v-if="errorMessage" class="text-red-500 text-sm">
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
