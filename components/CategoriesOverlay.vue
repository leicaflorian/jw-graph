<template>
  <div class="card categories-overlay border-0" data-bs-theme="dark">
    <div class="list-group">
      <div class="list-group-item list-group-item-action" :class="{'active': category.text === active}"
           v-for="(category, i) in categories" :key="i + category.text"
           @click="active = category.text">
        {{ $t(category.text) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { useActiveCategory } from '~/composables/states'

export default defineComponent({
  name: 'CategoriesOverlay',
  emits: ['update:active'],
  setup (props, { emit }) {
    const active = useActiveCategory()
    const categories = [
      {
        text: 'Population'
      },
      {
        text: '2022 Peak Pubs.'
      },
      {
        text: 'Ratio, 1 Publisher to'
      },
      {
        text: '2022 Av. Pubs.'
      },
      {
        text: '% Inc. Over 2021'
      },
      {
        text: '2022 No. Bptzd.'
      },
      {
        text: 'Av. Pio. Pubs.'
      },
      {
        text: 'No. of Congs.'
      },
      {
        text: 'Av. Bible Studies'
      },
      {
        text: 'Memorial Attendance'
      }
    ]

    return {
      active,
      categories
    }
  }
})
</script>

<style scoped lang="scss">
.categories-overlay {
  position: absolute;
  top: var(--bs-card-spacer-x);
  left: var(--bs-card-spacer-x);
  z-index: 1;
  width: 200px;
}
</style>
