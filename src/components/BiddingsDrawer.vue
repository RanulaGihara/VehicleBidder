<template>
  <el-drawer
    v-model:visible="visibleComputed"
    title="Biddings"
    size="40%"
    direction="rtl"
    :with-header="true"
  >
    <template v-if="biddings.length">
      <div class="flex flex-col h-full">
        <div class="flex-1 overflow-y-auto space-y-4">
          <div
            v-for="(bid, index) in biddings"
            :key="index"
            class="flex items-center space-x-4 p-2 border-b"
          >
            <img
              :src="bid.vehicle.image"
              alt="Vehicle Image"
              class="w-16 h-16 object-cover rounded"
            />
            <div>
              <h3 class="font-bold">
                {{ bid.vehicle.model }} ({{ bid.vehicle.year }})
              </h3>
              <p class="text-sm text-gray-400 mb-10">
                Bid: {{ formatLKR(bid.bidPrice) }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="mt-auto pt-4 border-t text-right font-semibold text-gray-400 mb-10"
        >
          Total: {{ formatLKR(totalBids) }}
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex w-full items-center justify-center space-x-8 mt-6">
        <p>No bids yet.</p>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed, defineEmits } from "vue";
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
