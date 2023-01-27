<template>
  <div class="card settings-overlay border-0">
    <div class="card-body settings__item">

      <div class="card-title">{{ $t("theme") }}</div>

      <Dropdown v-model="theme" :options="themeOptions"></Dropdown>

    </div>
  </div>
</template>

<script lang="ts">

export default defineComponent({
  name: 'SettingsOverlay',
  setup (props) {
    const theme = useSettingsTheme()
    const t = useI18n().t
    const themeOptions = [
      { value: 'blue-marble', text: t('themes.light') },
      { value: 'dark-2', text: t('themes.dark') },
      { value: 'day-2', text: t('themes.day') },
      { value: 'night', text: t('themes.night') }
    ]

    return {
      theme,
      themeOptions
    }
  }
})
</script>

<style scoped lang="scss">
.settings-overlay {

}
</style>
