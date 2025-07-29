<script setup lang="ts">
const data: number[] = [0, 1, 2, 3, 4, 5, 6]
</script>

<template>
  <div v-for="item in data" :key="item" class="[&:not(:last-child)]:mb-3">
    <div
      class="w-full h-full py-4 px-3 relative border border-slate-200 rounded-xl"
    >
      <div class="flex animate-pulse">
        <div class="flex flex-col w-full">
          <div class="w-full max-w-[130px] h-4 rounded bg-gray-400 mb-2" />
          <div class="w-full h-4 rounded bg-gray-400 mb-2" />
          <div class="w-full h-4 rounded bg-gray-400" />
        </div>
      </div>
    </div>
  </div>
</template>
