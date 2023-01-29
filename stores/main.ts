import { defineStore } from 'pinia'
import { ReportEntry } from '~/types/ReportEntry'
import { onMounted } from '@vue/runtime-core'
import { kebabCase } from 'lodash'

export const useMainStore = defineStore('main', () => {
  const activeCategory = ref('population')
  const settingsTheme = ref('blue-marble')
  const activeYear = ref(new Date().getFullYear() - 1)
  const availableReports = ref<any[]>([])
  const activeReport = ref([])
  const activeCountry = ref(null)
  const worldCountries = ref([])
  const activeCountryData = ref(null)
  const activeCountryReportData = ref(null)
  const showCountryDetails = ref(false)
  
  const availableYears = computed(() => {
    return availableReports.value.reduce((acc, report) => {
      const year = report._path.match(/[0-9].+/)[0]
      
      if (!acc.find((d) => d.value === year)) {
        acc.push({ value: year })
      }
      
      return acc
    }, [])
  })
  
  async function setActiveCountry (country: string) {
    if (country) {
      const countryData = worldCountries.value.find((c) => c.names.includes(country))
      const name = kebabCase(countryData?.country || country)
      const reports = (await queryContent('/percountryreports/' + name).findOne()) as any
      
      activeCountryData.value = countryData ?? null
      activeCountryReportData.value = reports
    }
  }
  
  function setActiveReport (report: ReportEntry[]) {
    activeReport.value = report
  }
  
  function updateCountryDetailsModalState (status: boolean) {
    showCountryDetails.value = status
  }
  
  onMounted(async () => {
    worldCountries.value = (await queryContent('world_countries').where({ _type: 'json' }).findOne()).body
    availableReports.value = await queryContent().where({ _file: /^report_.*/ })
      .without('body').find()
  })
  
  return {
    activeCategory,
    settingsTheme,
    activeYear,
    activeReport,
    activeCountry,
    activeCountryData,
    activeCountryReportData,
    availableYears,
    showCountryDetails,
    worldCountries,
    setActiveCountry,
    setActiveReport,
    updateCountryDetailsModalState
  }
})

// http://localhost:3000/api/_content/query?_params={"where":[{"_path":"--REGEX+/^\\\\/percountryreports\\\\/United\\\\+States\\\\+of\\\\+America/"}],"sort":[{"_file":1,"$numeric":true}]}
