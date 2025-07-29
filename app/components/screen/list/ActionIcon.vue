<script setup lang="ts">
import { motion } from 'motion-v'

const emit = defineEmits<{ click: [] }>()
// disabled attribute inheritance
// ref: https://vuejs.org/guide/components/attrs.html#disabling-attribute-inheritance
defineOptions({
  inheritAttrs: false,
})
defineProps<{
  icon: string
}>()
</script>

<template>
  <motion.button
    class="flex items-center justify-center border border-slate-200 bg-white rounded-full w-[48px] h-[48px]"
    :while-press="{ y: 1 }"
    @click="emit('click')"
  >
    <Icon :name="icon" class="w-[24px] h-[24px] text-red-800" />
  </motion.button>
</template>
