<script setup lang="ts">
const total = useTotal()
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-10">
    <div class="bg-white mx-auto w-full max-w-md px-4">
      <div class="flex justify-between py-3">
        <h5 class="font-semibold">Dota 2</h5>
        <div class="font-semibold">#{{ total }}</div>
      </div>
    </div>
  </header>
</template>
