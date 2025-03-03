<template>
  <el-drawer
    v-model:visible="visibleComputed"
    title="Biddings"
    size="40%"
    direction="rtl"
    :with-header="true"
    class="dark:bg-gray-800 bg-opacity-95 backdrop-blur-lg"
  >
    <template v-if="biddings.length">
      <div class="flex flex-col h-full dark:bg-gray-800">
        <div class="flex-1 overflow-y-auto space-y-4">
          <div
            v-for="(bid, index) in biddings"
            :key="index"
            class="flex items-center space-x-4 p-2 border-b border-gray-300 dark:border-gray-600"
          >
            <img
              :src="bid.vehicle.image"
              alt="Vehicle Image"
              class="w-16 h-16 object-cover rounded"
            />
            <div>
              <h3 class="font-bold text-gray-900 dark:text-white">
                {{ bid.vehicle.model }} ({{ bid.vehicle.year }})
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Bid: {{ formatLKR(bid.bidPrice) }}
              </p>
            </div>
          </div>
        </div>
        <!-- Total Section -->
        <div
          class="mt-auto pt-4 border-t border-gray-300 dark:border-gray-600 text-right font-semibold text-gray-900 dark:text-gray-400"
        >
          Total: {{ formatLKR(totalBids) }}
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex w-full items-center justify-center space-x-8 mt-6">
        <p class="text-gray-600 dark:text-gray-400">No bids yet.</p>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useBidStore } from "@/store/bidStore";
import { formatLKR } from "@/utils/helper-functions";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:visible"]);

const visibleComputed = computed({
  get: () => props.visible,
  set: (val: boolean) => emits("update:visible", val),
});

const store = useBidStore();
const biddings = computed(() => store.biddings);
const totalBids = computed(() => store.totalBids);
</script>
