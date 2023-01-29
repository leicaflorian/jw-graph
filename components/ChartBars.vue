<template>
  <canvas ref="canvas" class="chart-bars"></canvas>
</template>

<script lang="ts">

import { onMounted } from '@vue/runtime-core'
import { Chart } from 'chart.js/auto'
import { Ref } from 'vue'
import { useMainStore } from '~/stores/main'

export default defineComponent({
  name: 'ChartBars',
  setup (props) {
    const canvas: Ref<HTMLCanvasElement> = ref()
    const store = useMainStore()
    let chartInstance = null

    const years = computed(() => store.activeCountryReportData ? Object.keys(store.activeCountryReportData).reduce((acc, key) => {
      if (key.match(/[0-9]{4}/)) {
        acc.push(key)
      }

      return acc
    }, []) : [])

    const data = computed(() => years.value.map(year => store.activeCountryReportData[year][store.activeCategory]))

    onMounted(() => {
      chartInstance = new Chart(canvas.value, {
        type: 'bar',
        data: {
          labels: years.value,
          datasets: [{
            label: store.activeCategory,
            data: data.value,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    })

    return {
      canvas
    }
  }
})
</script>

<style scoped>

</style>
