<template>
  <div class="card countries-list-overlay">
    <div class="card-title">Countries List</div>

    <div class="list-group overflow-auto">
      <div class="list-group-item d-flex"
           v-for="(country, i) in orderedCountries" :key="country.country_or_territory">
        <span class="flex-fill">{{ getItemText(country, i + 1) }}</span>
        <span class="ms-2">{{ getItemValue(country) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { useActiveCategory, useActiveYear } from '~/composables/states'
import { Ref } from 'vue'
import { ReportEntry } from '~/types/ReportEntry'
import { useFormatNumber } from '~/composables/formatters'

export default defineComponent({
  name: 'CountriesList',
  setup (props) {
    const year = useActiveYear()
    const activeCategory = useActiveCategory()
    const formatNumber = useFormatNumber()
    const countries: Ref<ReportEntry[]> = ref([])

    const orderedCountries = computed(() => {
      return countries.value.sort((a, b) => {
        return b[activeCategory.value] - a[activeCategory.value]
      })
    })

    function getItemText (entry: ReportEntry, i: number) {
      return `${i} - ${entry.country_or_territory}`
    }

    function getItemValue (entry: ReportEntry) {
      return formatNumber(entry[activeCategory.value])
    }

    watch(year, async (year) => {
      countries.value = (await queryContent('report_' + year).findOne()).body
    }, { immediate: true })

    return {
      orderedCountries,
      activeCategory,
      getItemText,
      getItemValue
    }
  }
})
</script>

<style scoped lang="scss">
.countries-list-overlay {
  position: absolute;
  top: 200px;
  left: 10px;
  height: 50vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  overflow-y: scroll;
}
</style>
