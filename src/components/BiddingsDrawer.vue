<template>
  <el-drawer
    v-model:visible="visible"
    title="Biddings"
    size="40%"
    direction="rtl"
    :with-header="true"
  >
    <div v-if="biddings.length">
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
          <p class="text-sm">Bid: {{ formatLKR(bid.bidPrice) }}</p>
        </div>
      </div>
      <div class="mt-4 text-right font-semibold">
        Total: {{ formatLKR(totalBids) }}
      </div>
    </div>
    <div v-else>
      <p>No bids yet.</p>
    </div>
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

const visible = computed({
  get: () => props.visible,
  set: (val: boolean) => emits("update:visible", val),
});

const store = useBidStore();
const biddings = computed(() => store.biddings);
const totalBids = computed(() => store.totalBids);
</script>
