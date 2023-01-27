import { defineStore } from 'pinia'
import { ReportEntry } from '~/types/ReportEntry'
import { onMounted } from '@vue/runtime-core'
import { kebabCase } from 'lodash'

export const useMainStore = defineStore('main', () => {
  const activeCategory = ref('population')
  const settingsTheme = ref('blue-marble')
  const activeYear = ref(new Date().getFullYear() - 1)
  const activeReport = ref([])
  const activeCountry = ref(null)
  const activeCountryData = ref([])
  const reports = ref([])
  
  watch(activeCountry, async (country) => {
    if (country) {
      const name = kebabCase(country)
      
      const reports = (await queryContent('/percountryreports/' + name).find())
      
      activeCountryData.value = reports
    }
  })
  
  onMounted(async () => {
    // reports.value = await queryContent().where({ _path: /report.*/ }).find()
  })
  
  return {
    activeCategory,
    settingsTheme,
    activeYear,
    activeReport,
    activeCountry,
    activeCountryData,
    reports
  }
})

// http://localhost:3000/api/_content/query?_params={"where":[{"_path":"--REGEX+/^\\\\/percountryreports\\\\/United\\\\+States\\\\+of\\\\+America/"}],"sort":[{"_file":1,"$numeric":true}]}
