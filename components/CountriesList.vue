<template>
  <div class="card countries-list-overlay border-0 overflow-hidden">
    <div class="card-body">
      <div class="card-title mb-0">{{ $t('countries-list') }}</div>
    </div>

    <div class="list-group overflow-auto list-group-flush" ref="listDiv">
      <div class="list-group-item d-flex"
           :class="{ 'active': store.activeCountryData?.names.includes(country.country_or_territory) }"
           v-for="(country, i) in orderedCountries" :key="country.country_or_territory"
           @click="onItemClick(country)">
        <span class="ms-2" @click.stop="onValueClick(country)">{{ getItemValue(country) }}</span>
        <span class="flex-fill" style="direction: ltr">{{ getItemText(country, i + 1) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Ref } from 'vue'
import { ReportEntry } from '~/types/ReportEntry'
import { useFormatters } from '~/composables/formatters'
import { useMainStore } from '~/stores/main'

export default defineComponent({
  name: 'CountriesList',
  setup (props) {
    const store = useMainStore()
    const formatters = useFormatters()
    const listDiv = ref()
    const countries: Ref<ReportEntry[]> = ref([])
    let preventScroll = false

    const orderedCountries = computed(() => {
      return store.activeReport.sort((a, b) => {
        return b[store.activeCategory] - a[store.activeCategory]
      })
    })

    function getItemText (entry: ReportEntry, i: number) {
      return `${i} - ${entry.country_or_territory}`
    }

    function getItemValue (entry: ReportEntry) {
      let value = formatters.formatNumber(entry[store.activeCategory])

      if (store.activeCategory === 'inc_over') {
        value = `${value}%`
      }

      return value
    }

    function onItemClick (country: ReportEntry) {
      preventScroll = true
      store.setActiveCountry(country.country_or_territory)
    }

    function onValueClick (country) {
      preventScroll = true
      store.setActiveCountry(country.country_or_territory)

      setTimeout(() => {
        store.updateCountryDetailsModalState(true)
      }, 1000)
    }

    watch(() => store.activeCountryData, (newVal) => {
      if (preventScroll) {
        preventScroll = false

        return
      }

      // must scroll to the active country
      nextTick(() => {
        const activeCountryEl = listDiv.value.querySelector('.active')

        if (activeCountryEl) {
          // listDiv.value.scrollTop = activeCountryEl.offsetTop - 100
          activeCountryEl.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
        }
      })

    })

    return {
      listDiv,
      orderedCountries,
      store,
      getItemText,
      getItemValue,
      onItemClick,
      onValueClick
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
