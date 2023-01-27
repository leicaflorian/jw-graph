<template>
  <div class="card settings-overlay border-0">
    <div class="card-body settings__item">

      <div class="card-title">{{ $t('theme') }}</div>

      <Dropdown v-model="mainStore.settingsTheme" :options="themeOptions"></Dropdown>
    </div>
  </div>
</template>

<script lang="ts">

import { useMainStore } from '~/stores/main'

export default defineComponent({
  name: 'SettingsOverlay',
  setup (props) {
    const mainStore = useMainStore()
    const t = useI18n().t
    const themeOptions = [
      { value: 'blue-marble', text: t('themes.light') },
      { value: 'dark-2', text: t('themes.dark') },
      { value: 'day-2', text: t('themes.day') },
      { value: 'night', text: t('themes.night') }
    ]

    return {
      mainStore,
      themeOptions
    }
  }
})
</script>

<style scoped lang="scss">
.settings-overlay {

}
</style>
