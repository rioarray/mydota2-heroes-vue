<script setup lang="ts">
import { motion } from 'motion-v'

type IEvents = (type: 'visible', event: MouseEvent) => void

const emit = defineEmits<IEvents>()
defineProps<{
  icon: string
}>()

const onVisible = (event: MouseEvent) => {
  emit('visible', event)
}
</script>

<template>
  <motion.button
    class="flex items-center justify-center border border-slate-200 bg-white rounded-full w-[42px] h-[42px]"
    :while-press="{ y: 1 }"
    @click="onVisible"
  >
    <Icon :name="icon" class="w-[22px] h-[22px] text-red-800" />
  </motion.button>
</template>
