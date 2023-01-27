<template>
  <div class="card categories-overlay border-0" data-bs-theme="dark">
    <div class="card-body">

      <label class="form-label">{{ $t('category') }}</label>

      <Dropdown v-model="active" :options="categories"></Dropdown>
    </div>
  </div>
</template>

<script lang="ts">

import { useActiveCategory, useActiveYear } from '~/composables/states'

export default defineComponent({
  name: 'CategoriesOverlay',
  emits: ['update:active'],
  setup (props, { emit }) {
    const active = useActiveCategory()
    const year = useActiveYear()
    const t = useI18n().t

    const categoriesList = ['population', 'peak_pubs', 'ratio_1_publisher_to', 'av_pubs', 'inc_over', 'no_bptzd', 'av_pio_pubs', 'no_of_congs', 'av_bible_studies', 'memorial_attendance']
    const categories = computed(() => {
      return categoriesList.map(category => {
        return {
          value: category,
          text: t('categories.' + category, { year: year.value, lastYear: year.value - 1 })
        }
      })
    })

    return {
      active,
      year,
      categories
    }
  }
})
</script>

<style scoped lang="scss">
.categories-overlay {
  position: absolute;
  top: var(--bs-card-spacer-x);
  left: var(--bs-card-spacer-x);
  z-index: 1;
  width: 200px;
}
</style>
