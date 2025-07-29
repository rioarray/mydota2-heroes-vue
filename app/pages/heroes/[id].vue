<script setup lang="ts">
useSeoMeta({
  title: 'Detail of Heroes',
})

// ref: https://nuxt.com/docs/getting-started/routing#route-validation
definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
  },
})
</script>

<template>
  <div>sads</div>
</template>
