<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import type { IHeroStats } from '~/shared/types/hero-stats'

useSeoMeta({
  title: 'Home',
})

const config = useRuntimeConfig()
const total = useTotal()

const isVisible = ref(false)
const searchValue = ref('')

// data fetching in Nuxt can using $fetch, useFetch, useAsyncData
// ref: https://nuxt.com/docs/getting-started/data-fetching

const fetcher = async () => await fetch(`${config.public.apiHost}/heroStats`)

const { data, isLoading } = useQuery<IHeroStats[]>({
  queryKey: ['hero-stats'],
  queryFn: async () => {
    const res = await fetcher()
    return res.json()
  },
})

// if need fetching in SSR mode we can use onServerPrefetch in tanstack
// "suspense" is from method from useQuery
// ref: https://tanstack.com/query/latest/docs/framework/vue/guides/ssr#nuxt-3
// onServerPrefetch(async () => {
//   await suspense()
// })

watch(
  data,
  (val) => {
    total.value = val?.length ?? 0
  },
  { once: true }
)

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
  <div v-if="isLoading" class="px-4"><LazySkeleton /></div>
  <div v-else>
    <div class="px-4">
      <div
        v-for="item in listData"
        :key="item.id"
        class="[&:not(:last-child)]:mb-3"
      >
        <CardList
          :name="item.localized_name"
          :type="item.attack_type"
          :image="`${config.public.heroAssetHost}${item.img}`"
          :roles="item.roles"
        />
      </div>
    </div>
    <FloatingContent
      v-model:search-value="searchValue"
      :is-visible="isVisible"
      @show="isVisible = true"
      @hide="isVisible = false"
    />
  </div>
</template>
