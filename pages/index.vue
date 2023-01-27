<template>
  <GlobeChart></GlobeChart>

  <div class="jw-sidebar sidebar-left">
    <CategoriesOverlay class="flex-shrink-0"></CategoriesOverlay>

    <CountriesList class="flex-fill"></CountriesList>
  </div>

  <div class="jw-sidebar sidebar-right">
    <SettingsOverlay></SettingsOverlay>
  </div>

  <Timeline></Timeline>

  <CountryDetailsModal></CountryDetailsModal>
</template>

<script lang="ts">
import CountriesList from '~/components/CountriesList.vue'
import { onMounted } from '@vue/runtime-core'
import CountryDetailsModal from '~/components/CountryDetailsModal.vue'

export default defineComponent({
  name: 'Index',
  components: { CountryDetailsModal, CountriesList },
  setup (props) {

    onMounted(async () => {

    })

    return {}
  }
})
</script>

<style lang="scss">
.jw-sidebar {
  --jw-bg-rotation: 90deg;

  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: calc(100% - 66px);
  background: linear-gradient(var(--jw-bg-rotation), rgba(0, 0, 0, 0.8) 0%, transparent);
  z-index: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 1rem;

  .card {
    --bs-card-bg: transparent;

    .card-title {
      margin-bottom: var(--bs-card-spacer-y);
      font-weight: bold;
    }
  }

  .list-group {
    --bs-list-group-bg: transparent;
  }

  &.sidebar-left {
    left: 0;
    right: auto;
  }

  &.sidebar-right {
    --jw-bg-rotation: 270deg;
    left: auto;
    right: 0;
  }
}
</style>

