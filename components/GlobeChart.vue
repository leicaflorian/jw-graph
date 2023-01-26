<template>
  <div ref="globeDiv"></div>
</template>

<script lang="ts">
import Globe, { GlobeInstance } from 'globe.gl'
import * as d3 from 'd3'
import { computed, onMounted } from '@vue/runtime-core'
import { WorldCountry } from '~/types/WorldCountry'
import { curveBumpY } from 'd3'

export default defineComponent({
  name: 'GlobeChart',
  props: {
    year: String,
    sizeKey: { type: String, required: true },
    theme: {
      type: String,
      default: 'dark',
    }
  },
  setup (props) {
    const globeDiv = ref()
    const worldCountries = ref<WorldCountry[]>([])
    const countriesData = ref<any[]>([])
    const globe = ref<GlobeInstance>()
    const mapCountries = {
      'Antigua': 'Antigua and Barbuda',
      'United States of America': 'United States'
    }
    let unknownCountries = []

    const globeData = computed(() => {
      unknownCountries = []

      return countriesData.value.reduce((acc, country) => {
        const countryData = worldCountries.value.find((d) => {
          const rightName = mapCountries[country['Country or Territory']] || country['Country or Territory']
          return d.country === rightName
        })
        const size = +country[props.sizeKey].replaceAll(',', '') || 0

        if (!countryData) {
          unknownCountries.push(country['Country or Territory'])
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

    watch(() => props.sizeKey, () => {
      globe.value.pointsData(globeData.value)
    })

    onMounted(async () => {
      worldCountries.value = (await queryContent('world_countries').findOne()).body as WorldCountry[]
      countriesData.value = (await queryContent(props.year).findOne()).body as any

      console.log('found unknown countries', unknownCountries)

      // console.table(globeData.value)

      globe.value = Globe()

      globe.value(globeDiv.value)
          .globeImageUrl(`/earth-${props.theme}.jpg`)
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
