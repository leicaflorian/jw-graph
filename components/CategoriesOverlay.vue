<template>
  <div class="card categories-overlay border-0" data-bs-theme="dark">
    <div class="card-body">

      <div class="card-title">{{ $t('category') }}</div>

      <Dropdown v-model="mainStore.activeCategory" :options="categories"></Dropdown>
    </div>
  </div>
</template>

<script lang="ts">

import { useActiveCategory, useActiveYear } from '~/composables/states'
import { useMainStore } from '~/stores/main'

export default defineComponent({
  name: 'CategoriesOverlay',
  emits: ['update:active'],
  setup (props, { emit }) {
    const mainStore = useMainStore()
    const t = useI18n().t

    const categoriesList = ['population', 'peak_pubs', 'ratio_1_publisher_to', 'av_pubs', 'inc_over', 'no_bptzd', 'av_pio_pubs', 'no_of_congs', 'av_bible_studies', 'memorial_attendance']
    const categories = computed(() => {
      return categoriesList.map(category => {
        return {
          value: category,
          text: t('categories.' + category, { year: mainStore.activeYear, lastYear: mainStore.activeYear - 1 })
        }
      })
    })

    return {
      mainStore,
      categories
    }
  }
})
</script>

<style scoped lang="scss">
.categories-overlay {

}
</style>
