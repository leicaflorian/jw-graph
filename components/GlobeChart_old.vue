<template>
  <div class="hello" ref="chartDiv">
  </div>
</template>

<script lang="ts">
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import * as am5map from '@amcharts/amcharts5/map'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow'
import { onMounted } from '@vue/runtime-core'

export default defineComponent({
  name: 'GlobeChart',
  setup (props) {
    const chartDiv = ref()

    onMounted(() => {
      let root = am5.Root.new(chartDiv.value)

      root.setThemes([am5themes_Animated.new(root)])

      let chart = root.container.children.push(
          am5map.MapChart.new(root, {
            projection: am5map.geoOrthographic(),
            panX: 'rotateX',
            panY: 'rotateY',
            zoomControl: am5map.ZoomControl.new(root, {
            }),
            maxZoomLevel: 17,
            minZoomLevel: .8,
            homeZoomLevel: .9,
            // homeGeoPoint: { longitude: 10, latitude: 52 }
          })
      )

      const homeButton = chart.children.push(am5.Button.new(root, {
        paddingTop: 10,
        paddingBottom: 10,
        x: am5.percent(100),
        y: am5.percent(1),
        centerX: am5.percent(100),
        // interactiveChildren: false,
        icon: am5.Graphics.new(root, {
          svgPath: 'M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8',
          fill: am5.color(0xffffff)
        })
      }))

      homeButton.show()

      homeButton.events.on('click', function () {
        chart.goHome()
      })

      let polygonSeries = chart.series.push(
          am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_worldLow
          })
      )

      polygonSeries.mapPolygons.template.setAll({
        tooltipText: '{name}',
        interactive: true
      })

      polygonSeries.mapPolygons.template.states.create('hover', {
        fill: am5.color(0x677935)
      })
      polygonSeries.events.on("datavalidated", function() {
        chart.goHome();
      });
    })

    return {
      chartDiv
    }
  }
})
</script>


<style scoped>
.hello {
  width: 100%;
  height: 500px;
}
</style>
