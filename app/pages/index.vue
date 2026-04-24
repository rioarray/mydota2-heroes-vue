<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useWindowVirtualizer } from '@tanstack/vue-virtual'

useSeoMeta({
  title: 'Home',
})

const config = useRuntimeConfig()
const total = useTotal()

const isVisible = ref(false)
const searchValue = ref('')

const parentRef = ref<HTMLElement | null>(null)
const parentOffsetRef = ref(0)

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

onMounted(() => {
  parentOffsetRef.value = parentRef.value?.offsetTop ?? 0
  measureAll()
})

watch(
  data,
  (val) => {
    total.value = val?.length ?? 0
  },
  { once: true }
)

const virtualizer = useWindowVirtualizer({
  count: data.value?.length ?? 127,
  estimateSize: () => 45,
  scrollMargin: parentOffsetRef.value,
})

const virtualRows = computed(() => virtualizer.value.getVirtualItems())
const totalSize = computed(() => virtualizer.value.getTotalSize())
const virtualItemEls = shallowRef([])

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

const measureAll = () => {
  virtualizer.value.measureElement(null)
  virtualItemEls.value.forEach((el) => {
    if (el) virtualizer.value.measureElement(el)
  })
}

onMounted(measureAll)

onUpdated(measureAll)
</script>

<template>
  <div v-if="isLoading" class="px-4"><LazySkeleton /></div>
  <div v-else>
    <div
      ref="parentRef"
      class="px-4 relative"
      :style="{ height: `${totalSize}px` }"
    >
      <div
        class="absolute top-0 left-0 w-full"
        :style="{
          transform: `translateY(${
            virtualRows[0]?.start ?? 0 - virtualizer.options.scrollMargin
          }px)`,
        }"
      >
        <div
          v-for="dataRow in virtualRows"
          ref="virtualItemEls"
          :key="dataRow.index"
          :data-index="dataRow.index"
          class="[&:not(:last-child)]:mb-3"
        >
          <CardList
            :id="listData[dataRow.index]?.id ?? 0"
            :name="listData[dataRow.index]?.localized_name ?? ''"
            :type="listData[dataRow.index]?.attack_type ?? ''"
            :image="`${config.public.heroAssetHost}${listData[dataRow.index]?.img}`"
            :roles="listData[dataRow.index]?.roles ?? []"
          />
        </div>
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
