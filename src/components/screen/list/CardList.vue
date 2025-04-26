<!-- image from https://www.freepik.com/author/ibrandify -->

<script setup lang="ts">
defineProps<{
  name: string
  type: string
  image: string
  roles: string[]
}>()
</script>

<template>
  <div
    class="bg-[url(~/assets/image/background.jpg)] bg-no-repeat bg-center bg-cover bg-origin-border w-full h-full py-4 px-3 relative border border-slate-200 rounded-xl overflow-hidden"
  >
    <div class="flex items-center flex-row justify-between">
      <div class="flex flex-col">
        <h4 class="font-semibold">{{ name }}</h4>
        <p class="text-sm text-slate-500">{{ type }}</p>
        <div class="grid grid-cols-2 gap-1 mt-2">
          <div
            v-for="item in roles"
            :key="item"
            class="rounded-[4px] bg-red-800 px-2 py-1 text-xs text-white text-center"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <NuxtImg :src="image" :alt="name" class="w-[100px] h-[65px] rounded-md" />
    </div>
  </div>
</template>
