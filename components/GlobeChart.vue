<template>
  <div ref="globeDiv"></div>
</template>

<script lang="ts">
import Globe, { GlobeInstance } from 'globe.gl'
import * as d3 from 'd3'
import { computed, onMounted } from '@vue/runtime-core'
import { WorldCountry } from '~/types/WorldCountry'
import { curveBumpY } from 'd3'
import { useSettingsTheme } from '~/composables/states'
import { ReportEntry } from '~/types/ReportEntry'

export default defineComponent({
  name: 'GlobeChart',
  props: {
    year: Number,
    category: { type: String, required: true },
    theme: {
      type: String,
      default: 'dark'
    }
  },
  setup (props) {
    const theme = useSettingsTheme()
    const globeDiv = ref()
    const worldCountries = ref<WorldCountry[]>([])
    const reportData = ref<ReportEntry[]>([])
    const globe = ref<GlobeInstance>()
    const mapCountries = {
      'Antigua': 'Antigua and Barbuda',
      'United States of America': 'United States'
    }
    let unknownCountries = []

    const globeData = computed(() => {
      unknownCountries = []

      return reportData.value.reduce((acc, entry) => {
        if (!entry[props.category]) {
          return acc
        }

        const countryData = worldCountries.value.find((d) => {
          const rightName = mapCountries[entry.country_or_territory] || entry.country_or_territory
          return d.country === rightName
        })
        const size = +entry[props.category].replaceAll(',', '') || 0

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

    watch(() => props.category, () => {
      globe.value.pointsData(globeData.value)
    })

    watch(() => props.year, async () => {
      reportData.value = (await queryContent('report_' + props.year).findOne()).body as any
      globe.value.pointsData(globeData.value)
    })

    watch(() => theme.value, () => {
      globe.value.globeImageUrl(`/earth-${theme.value}.jpg`)
    })

    onMounted(async () => {
      worldCountries.value = (await queryContent('world_countries').findOne()).body as WorldCountry[]
      reportData.value = (await queryContent('report_' + props.year).findOne()).body as any

      console.log('found unknown countries', unknownCountries)

      // console.table(globeData.value)

      globe.value = Globe()

      globe.value(globeDiv.value)
          .globeImageUrl(`/earth-${theme.value}.jpg`)
          .bumpImageUrl('/earth-topology.png')
          .backgroundImageUrl('/night-sky.png')
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
