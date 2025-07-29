<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

useHead({
  // as a string,
  // where `%s` is replaced with the title
  titleTemplate: '%s - MyDota 2 Heroes',
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
    <VueQueryDevtools />
  </NuxtLayout>
</template>

<style lang="css">
body {
  @apply min-h-dvh;
}
</style>
