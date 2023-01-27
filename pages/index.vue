<template>
  <GlobeChart :year="+activeYear" :category="activeCategory" theme="night"></GlobeChart>

  <CategoriesOverlay></CategoriesOverlay>

  <CountriesList></CountriesList>

  <SettingsOverlay></SettingsOverlay>

  <Timeline></Timeline>
</template>

<script lang="ts">
import { onMounted } from '@vue/runtime-core'
import Globe from 'globe.gl'
import { useActiveCategory, useActiveYear } from '~/composables/states'
import CountriesList from '~/components/CountriesList.vue'

export default defineComponent({
  name: 'Index',
  components: { CountriesList },
  setup (props) {
    const activeCategory = useActiveCategory()
    const activeYear = useActiveYear()

    return {
      activeCategory,
      activeYear
    }
  }
})
</script>

<style scoped>

</style>

