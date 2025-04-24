<script setup lang="ts">
import { AppHeader } from '#components'
</script>

<template>
  <div class="max-w-screen overflow-x-hidden">
    <AppHeader />
    <main class="flex flex-col min-h-dvh pt-12">
      <div class="mx-auto w-full max-w-md">
        <slot />
      </div>
    </main>
  </div>
</template>
