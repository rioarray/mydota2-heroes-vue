<script setup lang="ts">
import { LazyCardList } from '#components'
import { useQuery } from '@tanstack/vue-query'
import { AnimatePresence, motion } from 'motion-v'
import type { IHeroStats } from '~/shared/types/hero-stats'

useSeoMeta({
  title: 'Home',
})

const config = useRuntimeConfig()
const total = useTotal()

const isVisible = ref(false)
const searchValue = ref('')
const searchRef = useTemplateRef<HTMLInputElement>('search-ref')

const fetcher = async () => await fetch(`${config.public.apiHost}/heroStats`)

const { data, isLoading } = useQuery<IHeroStats[]>({
  queryKey: ['hero-stats'],
  queryFn: async () => {
    const res = await fetcher()
    return res.json()
  },
})

watchEffect(() => {
  total.value = data.value?.length ?? 0
})

watchEffect(() => {
  if (isVisible.value) {
    searchRef.value?.focus?.()
  } else {
    searchValue.value = ''
  }
})

const listData = computed(() => {
  let sortData = [...(data.value ?? [])].sort((a, b) => {
    return a.localized_name.localeCompare(b.localized_name)
  })

  if (searchValue.value) {
    sortData = sortData.filter((item) => {
      return (
        item.name.toLowerCase().indexOf(searchValue.value.toLowerCase()) > -1
      )
    })
  }
  return sortData
})
</script>

<template>
  <div v-if="isLoading" class="px-4">Loading...</div>
  <div v-else>
    <div class="px-4">
      <div
        v-for="item in listData"
        :key="item.id"
        class="[&:not(:last-child)]:mb-3"
      >
        <LazyCardList
          :name="item.localized_name"
          :type="item.attack_type"
          :image="`${config.public.heroAssetHost}${item.img}`"
          :roles="item.roles"
        />
      </div>
    </div>
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
            <ActionIcon icon="ph:x-bold" @visible="isVisible = false" />
          </motion.div>
        </AnimatePresence>
        <ActionIcon
          icon="ph:magnifying-glass-bold"
          @visible="isVisible = true"
        />
      </div>
    </div>
  </div>
</template>
