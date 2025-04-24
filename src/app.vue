<script setup lang="ts">
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
  </NuxtLayout>
</template>

<style lang="css">
body {
  @apply min-h-screen;
}
</style>
