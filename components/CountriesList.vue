<template>
  <div class="card countries-list-overlay border-0 overflow-hidden">
    <div class="card-body">
      <div class="card-title mb-0">{{ $t('countries-list') }}</div>
    </div>

    <div class="list-group overflow-auto list-group-flush">
      <div class="list-group-item d-flex"
           v-for="(country, i) in orderedCountries" :key="country.country_or_territory"
           @click="onItemClick(country)">
        <span class="ms-2">{{ getItemValue(country) }}</span>
        <span class="flex-fill" style="direction: ltr">{{ getItemText(country, i + 1) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Ref } from 'vue'
import { ReportEntry } from '~/types/ReportEntry'
import { useFormatNumber } from '~/composables/formatters'
import { useMainStore } from '~/stores/main'

export default defineComponent({
  name: 'CountriesList',
  setup (props) {
    const store = useMainStore()
    const formatNumber = useFormatNumber()
    const countries: Ref<ReportEntry[]> = ref([])

    const orderedCountries = computed(() => {
      return store.activeReport.sort((a, b) => {
        return b[store.activeCategory] - a[store.activeCategory]
      })
    })

    function getItemText (entry: ReportEntry, i: number) {
      return `${i} - ${entry.country_or_territory}`
    }

    function getItemValue (entry: ReportEntry) {
      return formatNumber(entry[store.activeCategory])
    }

    function onItemClick (country: ReportEntry) {
      store.activeCountry = country.country_or_territory
    }

    return {
      orderedCountries,
      getItemText,
      getItemValue,
      onItemClick
    }
  }
})
</script>

<style scoped lang="scss">
.countries-list-overlay {
  .list-group {
    direction: rtl;
  }
}
</style>
