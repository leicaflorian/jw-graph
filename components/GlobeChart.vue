<template>
  <div ref="globeDiv"></div>
</template>

<script lang="ts">
import Globe, { GlobeInstance } from 'globe.gl'
import * as d3 from 'd3'
import { computed, onMounted } from '@vue/runtime-core'
import { WorldCountry } from '~/types/WorldCountry'
import { ReportEntry } from '~/types/ReportEntry'
import { useMainStore } from '~/stores/main'

export default defineComponent({
  name: 'GlobeChart',
  props: {},
  setup (props) {
    const globeDiv = ref()
    const worldCountries = ref<WorldCountry[]>([])
    const globe = ref<GlobeInstance>()
    const mainStore = useMainStore()
    const mapCountries = {
      'Antigua': 'Antigua and Barbuda',
      'United States of America': 'United States'
    }
    let unknownCountries = []

    const globeData = computed(() => {
      unknownCountries = []

      return mainStore.activeReport.reduce((acc, entry) => {
        if (!entry[mainStore.activeCategory]) {
          return acc
        }

        const countryData = worldCountries.value.find((d) => {
          const rightName = mapCountries[entry.country_or_territory] || entry.country_or_territory
          return d.country === rightName
        })
        const size = +entry[mainStore.activeCategory].replaceAll(',', '') || 0

        if (!countryData) {
          unknownCountries.push(entry.country_or_territory)
          return acc
        }

        acc.push({
          lat: +countryData.latitude,
          lng: +countryData.longitude,
          name: countryData.country + `(${size})`,
          size
        })

        return acc
      }, [])
    })

    const min = computed(() => d3.min(globeData.value, (d: any) => +d.size))
    const max = computed(() => d3.max(globeData.value, (d: any) => +d.size))
    const weightColor = computed(() => d3.scaleSequentialSqrt(d3.interpolateYlOrRd).domain([0, max.value]))

    watch(() => mainStore.activeCategory, () => {
      globe.value.pointsData(globeData.value)
    })

    watch(() => mainStore.activeYear, async () => {
      mainStore.activeReport = (await queryContent('report_' + mainStore.activeYear).findOne()).body as any
      globe.value.pointsData(globeData.value)
    })

    watch(() => mainStore.settingsTheme, () => {
      globe.value.globeImageUrl(`/earth-${mainStore.settingsTheme}.jpg`)
    })

    onMounted(async () => {
      worldCountries.value = (await queryContent('world_countries').findOne()).body as WorldCountry[]
      mainStore.activeReport = (await queryContent('report_' + mainStore.activeYear).findOne()).body as any

      console.log('found unknown countries', unknownCountries)

      // console.table(globeData.value)

      globe.value = Globe()

      globe.value(globeDiv.value)
          .globeImageUrl(`/earth-${mainStore.settingsTheme}.jpg`)
          .bumpImageUrl('/earth-topology.png')
          .backgroundImageUrl('/night-sky-3.jpeg')
          // .globeMaterial({ color: '#fff', emissive: '#000', emissiveIntensity: 0.5, specular: '#000', shininess: 1 })
          .showAtmosphere(true)
          .pointsData(globeData.value)
          // .pointAltitude("size")
          .pointAltitude((d: any) => d.size * +`1e-${(max.value.toString().length - 1)}`)
          .pointColor((d: any) => weightColor.value(d.size))

      // myGlobe.controls().autoRotate = true
      // myGlobe.controls().autoRotateSpeed = 0.2
    })

    return {
      globeDiv
    }
  }
})
</script>

<style scoped>

</style>
