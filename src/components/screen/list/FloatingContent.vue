<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v'

// model is short in vue to handle "value" and "onchange" at the same time
// ref: https://vuejs.org/guide/essentials/forms.html
// ref: https://vuejs.org/guide/components/v-model.html
const searchValue = defineModel<string>('searchValue', { required: true })
const emit = defineEmits<{
  show: []
  hide: []
}>()

const props = defineProps<{ isVisible: boolean }>()

const searchRef = useTemplateRef<HTMLInputElement>('search-ref')

watchEffect(() => {
  if (props.isVisible) {
    searchRef.value?.focus?.()
  } else {
    searchValue.value = ''
  }
})
</script>

<template>
  <div class="fixed flex flex-col px-8 bottom-10 w-full max-w-md">
    <AnimatePresence :initial="false">
      <motion.div
        v-if="isVisible"
        :initial="{ opacity: 0, scale: 0 }"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0 }"
        class="border border-slate-200 bg-white rounded-md w-full h-[42px] p-2 mb-2"
      >
        <input
          ref="search-ref"
          v-model="searchValue"
          placeholder="Search heroes..."
          class="text-sm placeholder-slate-400 w-full h-full outline-none appearance-none"
        />
      </motion.div>
    </AnimatePresence>
    <div class="flex justify-end relative">
      <AnimatePresence :initial="false">
        <motion.div
          v-if="isVisible"
          :initial="{ opacity: 0, scale: 0 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0 }"
          class="flex w-full absolute justify-center"
        >
          <ActionIcon icon="ph:x-bold" @click="emit('hide')" />
        </motion.div>
      </AnimatePresence>
      <ActionIcon icon="ph:magnifying-glass-bold" @click="emit('show')" />
    </div>
  </div>
</template>
