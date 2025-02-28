<template>
  <el-skeleton :loading="true" animated>
    <template #template>
      <el-row :gutter="20" class="mt-5">
        <el-col v-for="n in skeletonCount" :key="n" :span="8">
          <el-skeleton-item variant="image" class="w-[300px] h-[200px]" />
          <el-skeleton-item variant="text" class="mt-2 w-full" />
          <el-skeleton-item variant="text" class="w-4/5" />
          <el-skeleton-item variant="text" class="w-3/5" />
        </el-col>
      </el-row>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
const props = defineProps({
  skeletonCount: {
    type: Number,
    default: 3,
  },
});
</script>
