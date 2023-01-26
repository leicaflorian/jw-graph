<template>
  <GlobeChart year="2022" :size-key="activeCategory" theme="day-2"></GlobeChart>

  <CategoriesOverlay></CategoriesOverlay>
</template>

<script lang="ts">
import { onMounted } from '@vue/runtime-core'
import Globe from 'globe.gl'
import { useActiveCategory } from '~/composables/states'

export default defineComponent({
  name: 'Index',
  setup (props) {
    const activeCategory = useActiveCategory()

    return {
      activeCategory
    }
  }
})
</script>

<style scoped>

</style>

